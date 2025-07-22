import { create } from 'zustand'
import { fetchData } from "@/lib/apiService"

export const kmeansStore = create((set) => ({
    plot: {
        apiData: null,
        xTitle: 'X',
        yTitle: 'Y'
    },
    loadPlot: async (selectedK) => {
        const data = await fetchData(selectedK);
        return set(state => {
            return ({
                plot: {
                    ...state.plot,
                    apiData: data,
                    xTitle: data.feature_names[state.toolbar.selectedX],
                    yTitle: data.feature_names[state.toolbar.selectedY]
                },
                toolbar: {
                    ...state.toolbar, featureNames: data.feature_names
                }
            })
        });
    },
    toolbar: {
        featureNames: ['a', 'b', 'c'],
        k: ['K=2', 'K=3', 'K=4', 'K=5', 'K=6'],
        selectedX: 0,
        selectedY: 1,
        selectedK: 0,
        isShowCluster: false
    },
    updateToolbar: (newToolbar) => set((state) => ({
        toolbar: { ...state.toolbar, ...newToolbar }
    })),
}))