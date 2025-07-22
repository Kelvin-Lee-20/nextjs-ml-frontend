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

    return <>
        {
            apiData && <div className="p-4 flex flex-col items-center">
                <h1 className="text-3xl mb-4">k-means clustering visualization (Iris dataset)</h1>
                <div className="mb-4">
                    <Plot />
                </div>
                <div><ToolBar /></div>
                {/* <div>DataTable</div> */}
            </div>
        }
    </>
}
