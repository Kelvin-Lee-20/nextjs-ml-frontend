"use client";

import MyButton from "@/components/MyButton";
import MySelect from "@/components/MySelect";

import { useEffect, useState } from 'react';

export default function Index({
    featureNames,
    k,
    onXAxisChange,
    onYAxisChange,
    selectedXAxis,
    selectedYAxis,
    onKChange,
    selectedK,
    onUpdateData,
    onSetIsShowCluster }) {

    const handleButtonClick = () => {
        console.log('Button was clicked in parent component!');
        alert('Button clicked from parent!');
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <div className="flex gap-4">
                <div>
                    <MySelect selectedIndex={selectedXAxis} data={featureNames} key_prefix={'x_axis_'} handleChange={(event) => {
                        onXAxisChange(event.target.value)
                    }} />
                </div>
                <div>
                    <MySelect selectedIndex={selectedYAxis} data={featureNames} key_prefix={'y_axis_'} handleChange={(event) => {
                        onYAxisChange(event.target.value)
                    }} />
                </div>
                <MyButton
                    title="Original Data"
                    onClick={() => {
                        onSetIsShowCluster(false)
                    }}
                />
                <MyButton
                    title="After K-means Analysis"
                    onClick={() => {
                        onSetIsShowCluster(true)
                        onUpdateData()
                    }}
                />
                <div>
                    <MySelect selectedIndex={selectedK} data={k} key_prefix={'k_'} handleChange={(event) => {
                        onKChange(event.target.value)
                    }} />
                </div>
            </div>
        </>
    );
}
