"use client";

import { useRef, useState, useCallback, useEffect } from 'react';
import { fetchObjectDetect } from "@/lib/apiService"
import * as d3 from 'd3';

export default function Index({ onDetectionComplete, onDataLoading, bbox, }) {

    const [image, setImage] = useState(null);
    const [imageSize, setImageSize] = useState(null);
    const fileInputRef = useRef(null);

    const svgRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 640);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) processFile(files[0]);
    }, []);

    const handleFileSelect = useCallback((e) => {
        const files = e.target.files;
        if (files && files.length > 0) processFile(files[0]);
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const processFile = (file) => {
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target?.result);
        };
        reader.readAsDataURL(file);
    };

    const uploadImage = async () => {
        if (!image) return;

        onDataLoading(true);

        try {
            const blob = await fetch(image).then(res => res.blob());
            const formData = new FormData();
            formData.append('file', blob, 'uploaded-image.png');
            const data = await fetchObjectDetect(formData);
            console.log('Response from API:', data);
            onDetectionComplete(data.detections);

        } catch (error) {
            // setUploadResult({ error: error instanceof Error ? error.message : 'Upload failed' });
        } finally {
            onDataLoading(false);
        }
    };

    useEffect(() => {
        if (image) {
            uploadImage();
        }
    }, [imageSize]);

    const getImageSize = () => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            setImageSize({
                width: img.width,
                height: img.height
            });
        };
    }

    useEffect(() => {
        if (image) {
            getImageSize();
        }
    }, [image]);

    const isPortraitPhoto = () => {
        if (!imageSize) return false
        let isPortrait = imageSize.height > imageSize.width;
        return isPortrait
    };

    useEffect(() => {

        if (!imageSize || !bbox) return

        let isPortrait = isPortraitPhoto()
        const width = isPortrait ? (imageSize.width / imageSize.height) * (isSmallScreen ? 300 : 500) : (isSmallScreen ? 300 : 500);
        const height = isPortrait ? (isSmallScreen ? 300 : 500) : (imageSize.height / imageSize.width) * (isSmallScreen ? 300 : 500);

        var ratioW = width / imageSize.width
        var ratioH = height / imageSize.height

        if (!svgRef.current) return;

        d3.select(svgRef.current).selectAll('*').remove();

        if (bbox.points.length == 0) return

        const svg = d3.select(svgRef.current);
        const polygonPoints = [
            [bbox.points[0] * ratioW, bbox.points[1] * ratioH],
            [bbox.points[2] * ratioW, bbox.points[1] * ratioH],
            [bbox.points[2] * ratioW, bbox.points[3] * ratioH],
            [bbox.points[0] * ratioW, bbox.points[3] * ratioH]
        ];

        const hex = bbox.color.replace('#', '');
        const opacity = 0.3
        const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');

        svg.append('polygon')
            .attr('points', polygonPoints.map(d => d.join(',')).join(' '))
            .attr('fill', `#${hex}${alpha}`)
            .attr('stroke', bbox.color)
            .attr('stroke-width', 2);

    }, [bbox, imageSize]);

    return (
        <div
            className="
              border-6 
              border-dashed 
              border-gray-300 
              -p-8 
              text-center 
              items-center 
              justify-center 
              flex
              w-[300px]
              h-[300px] 
              sm:w-[500px] 
              sm:h-[500px]
              hover:cursor-pointer
              "
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
        >
            {
                imageSize &&
                <div className="flex flex-col items-center relative">
                    <img
                        src={image}
                        alt="Preview"
                        className={isPortraitPhoto() ? "h-[300px] sm:h-[500px]" : "w-[300px] sm:w-[500px]"}
                    />
                    <svg
                        ref={svgRef}
                        width={
                            isPortraitPhoto() ? (imageSize.width / imageSize.height) * (isSmallScreen ? 300 : 500) : (isSmallScreen ? 300 : 500)
                        }
                        height={
                            isPortraitPhoto() ? (isSmallScreen ? 300 : 500) : (imageSize.height / imageSize.width) * (isSmallScreen ? 300 : 500)
                        }
                        style={{ opacity: 1, _backgroundColor: 'red', position: 'absolute', pointerEents: 'none' }}
                    />
                </div>
            }
            <div style={{ display: imageSize ? 'none' : 'unset' }}>
                <p className="text-gray-600 text-xl">Drop me a photo</p>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                />
            </div>
        </div>
    )

}