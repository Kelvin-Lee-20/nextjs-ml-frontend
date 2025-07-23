"use client";

import MyButton from "@/components/MyButton";
import MySelect from "@/components/MySelect";
import { kmeansStore } from "@/store/kmeans"

export default function Index() {

    var toolbar = kmeansStore((state) => state.toolbar)
    var featureNames = toolbar.featureNames
    var k = toolbar.k
    var selectedX = toolbar.selectedX
    var selectedY = toolbar.selectedY
    var selectedK = toolbar.selectedK
    var updateToolbar = kmeansStore((state) => state.updateToolbar)
    var loadPlot = kmeansStore((state) => state.loadPlot)

    return (<>
        <div className="flex flex-col md:flex-row gap-4">
            <div>
                <MySelect
                    selectedIndex={selectedX}
                    data={featureNames}
                    key_prefix={'x_axis_'}
                    handleChange={(event) => {
                        updateToolbar({ selectedX: event.target.value })
                    }} />
            </div>
            <div>
                <MySelect
                    selectedIndex={selectedY}
                    data={featureNames}
                    key_prefix={'y_axis_'}
                    handleChange={(event) => {
                        updateToolbar({ selectedY: event.target.value })
                    }} />
            </div>
            <MyButton
                title="Original Data"
                onClick={() => {
                    updateToolbar({ isShowCluster: false })
                    loadPlot(selectedK)
                }}
            />
            <MyButton
                title="K-means Analysis"
                onClick={() => {
                    updateToolbar({ isShowCluster: true })
                    loadPlot(selectedK)
                }}
            />
            <div>
                <MySelect
                    selectedIndex={selectedK}
                    data={k}
                    key_prefix={'k_'}
                    handleChange={(event) => {
                        updateToolbar({ selectedK: event.target.value })
                    }} />
            </div>
        </div>
    </>)
}
