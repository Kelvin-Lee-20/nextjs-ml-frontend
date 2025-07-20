'use client'

import Image from "next/image";
import dynamic from 'next/dynamic'
import Script from 'next/script';

export default function Index() {
    return (
        <>
            <Script
                src="https://cdn.plot.ly/plotly-3.1.0-rc.0.min.js"
                strategy="lazyOnload"
                onLoad={() =>

                    Plotly.newPlot("gd", /* JSON object */ {
                        "data": [{ "y": [1, 2, 3] }],
                        // "layout": { "width": 1200, "height": 600 },
                        // "config": { 'displayModeBar': false }
                    })

                }
            />
            <div id="gd"></div>
        </>
    );
}
