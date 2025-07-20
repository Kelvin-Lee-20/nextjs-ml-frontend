"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Scatter = dynamic(() => import('react-chartjs-2').then((mod) => mod.Scatter), {
    ssr: false,
});

export default function Index({ data, xTitle, yTitle }) {

    return (
        <div style={{ maxHeight: 600 }}>
            <Scatter
                data={{
                    datasets: data,
                }}
                options={{
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: xTitle
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: yTitle
                            }
                        }
                    }
                }}

            />
        </div>
    );
}
