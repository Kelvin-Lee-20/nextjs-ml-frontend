"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { kmeansStore } from "@/store/kmeans"
import { convertData } from "@/utils/helpers";

const Scatter = dynamic(() => import('react-chartjs-2').then((mod) => mod.Scatter), {
    ssr: false,
});

export default function Index() {

    var plot = kmeansStore((state) => state.plot)
    var apiData = plot.apiData
    var toolbar = kmeansStore((state) => state.toolbar)
    var selectedX = toolbar.selectedX
    var selectedY = toolbar.selectedY
    var isShowCluster = toolbar.isShowCluster

    return <Scatter
        data={{
            datasets: convertData(apiData, selectedX, selectedY, isShowCluster),
        }}
        options={{
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: apiData.feature_names[selectedX]
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: apiData.feature_names[selectedY]
                    }
                }
            }
        }}
    />

}
