'use client'

import Plot from "@/components/Plot";
import Plotly from "@/components/Plotly";
import ToolBar from "@/components/ToolBar";
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { convertData } from "@/utils/helpers";
import { fetchData } from "@/lib/apiService"

export default function Index() {

    const [plotData, setPlotData] = useState(null);
    const [featureNames, setfeatureNames] = useState([]);
    const [k, setK] = useState(['K=2', 'K=3', 'K=4', 'K=5', 'K=6']);

    const [selectedXAxis, setSelectedXAxis] = useState(0);
    const [selectedYAxis, setSelectedYAxis] = useState(1);
    const [selectedK, setSelectedK] = useState(0);

    const [isShowCluster, setIsShowCluster] = useState(false);

    useEffect(() => {

        const getData = async () => {
            try {
                const result = await fetchData(selectedK);
                console.log(result)
                setPlotData(result);
                setfeatureNames(result.feature_names)
            } catch (err) {
                // setError(err.message);
            } finally {
                // setLoading(false);
            }
        }

        getData();

    }, []);

    return (
        <>
            {
                plotData && <div className="p-4">
                    <h1 className="text-3xl mb-4">k-means clustering visualization (Iris dataset)</h1>
                    <div className="mb-4">
                        <Plot
                            data={convertData(plotData, selectedXAxis, selectedYAxis, isShowCluster)}
                            xTitle={plotData.feature_names[selectedXAxis]}
                            yTitle={plotData.feature_names[selectedYAxis]}
                        />
                    </div>
                    <ToolBar
                        selectedXAxis={selectedXAxis}
                        selectedYAxis={selectedYAxis}
                        featureNames={featureNames}
                        k={k}
                        selectedK={selectedK}
                        onXAxisChange={(idx) => {
                            setSelectedXAxis(idx)
                        }}
                        onYAxisChange={(idx) => {
                            setSelectedYAxis(idx)
                        }}
                        onKChange={(idx) => {
                            setSelectedK(idx)
                        }}
                        onSetIsShowCluster={(f) => {
                            setIsShowCluster(f)
                        }}
                        onUpdateData={async () => {
                            const result = await fetchData(selectedK);
                            console.log(result)
                            setPlotData(result);
                            setfeatureNames(result.feature_names)
                        }}
                    />
                </div>
            }

        </>
    );
}
