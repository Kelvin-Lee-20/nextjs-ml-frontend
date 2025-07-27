'use client'

import Plot from "@/components/Plot";
import ToolBar from "@/components/ToolBar";
import { useEffect } from 'react';
import _ from 'lodash';
import { kmeansStore } from "@/store/kmeans"

export default function Index() {

    var selectedK = kmeansStore((state) => state.toolbar.selectedK)
    var loadPlot = kmeansStore((state) => state.loadPlot)
    var apiData = kmeansStore((state) => state.plot.apiData)

    useEffect(() => {
        loadPlot(selectedK);
    }, []);

    return (<>
        {
            apiData && <div className="p-4">
                <h1 className="text-xl md:text-3xl mb-8 text-center">k-means clustering visualization (Iris dataset)</h1>
                <div className="w-full h-[300px] md:h-[500px] max-w-[800px] mx-auto mb-8">
                    <Plot />
                </div>
                <div className="flex justify-center"><ToolBar /></div>
            </div>
        }
    </>)

}
