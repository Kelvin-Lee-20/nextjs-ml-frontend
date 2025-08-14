'use client'

import MyDropPhotoBox from "@/components/MyDropPhotoBox";
import ObjectDetectResults from "@/components/ObjectDetectResults";
import { useState } from 'react';

export default function Index() {

    const [detectionData, setDetectionData] = useState(null);
    const [boundingBox, setBoundingBox] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(false);

    return (<>
        <div className="p-4">
            <h1 className="text-xl md:text-3xl mb-8 text-center">Object Detection use YOLOv8 model</h1>
            {
                <div className="flex justify-center p-0">
                    <MyDropPhotoBox
                        onDetectionComplete={setDetectionData}
                        onDataLoading={setIsLoadingData}
                        bbox={boundingBox}
                    />
                    {
                        isLoadingData && <div className="ml-4 text-xl">Loading...</div>
                    }
                    <div className="ml-2">
                        {
                            !isLoadingData && detectionData &&
                            <ObjectDetectResults
                                data={detectionData}
                                onItemHover={(obj) => {
                                    setBoundingBox(obj)
                                }}
                            />
                        }
                    </div>
                </div>
            }
        </div>
    </>)

}