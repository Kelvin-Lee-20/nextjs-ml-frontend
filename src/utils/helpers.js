import _ from 'lodash';

const packData = (data, target) => {
    var zipped = _.zip(data, target);
    var grouped = _.groupBy(zipped, ([_, label]) => label);
    grouped = _.mapValues(grouped, (group) => group.map(([item]) => item));
    return grouped
}

export const colors = (opacity) => {

    const colorArray = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#8AC249",
        "#EA5545",
        "#F46A9B",
        "#EF9B20",
        "#EDBF33",
        "#87BC45",
        "#27AEEF",
        "#B33DC6",
        "#00AEEF",
        "#E60049",
        "#0BB4FF",
        "#50E991",
        "#E6D800",
        "#9B19F5"
    ];

    if (opacity) {
        if (opacity !== undefined && opacity !== null) {
            return colorArray.map(hex => {
                // Remove # if present
                let hexValue = hex.replace('#', '');

                // Expand short form (e.g., #F53 → FF5533)
                if (hexValue.length === 3) {
                    hexValue = hexValue.split('').map(c => c + c).join('');
                }

                // Convert to RGBA
                const r = parseInt(hexValue.substring(0, 2), 16);
                const g = parseInt(hexValue.substring(2, 4), 16);
                const b = parseInt(hexValue.substring(4, 6), 16);

                return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            });
        }
    }

    return colorArray;

}

export const getColor = (idx) => {
    return [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#8AC249",
        "#EA5545",
        "#F46A9B",
        "#EF9B20",
        "#EDBF33",
        "#87BC45",
        "#27AEEF",
        "#B33DC6",
        "#00AEEF",
        "#E60049",
        "#0BB4FF",
        "#50E991",
        "#E6D800",
        "#9B19F5"][idx]
}

export const convertData = (data, x = 0, y = 1, isShowCluster) => {

    var grouped_data = packData(data.data, isShowCluster ? data.y_kmeans : data.target)

    var result = _.mapValues(grouped_data, (item, idx) => {
        var obj = {
            label: isShowCluster ? 'Cluster ' + (parseInt(idx) + 1) : data.target_names[idx], // Dataset label (shown in legend)
            data: _.map(item, (subArray) => ({
                x: _.get(subArray, x, null),  // Default to null if undefined
                y: _.get(subArray, y, null)   // Default to null if undefined
            })),
            pointRadius: 4,
            pointHoverRadius: 4,
            backgroundColor: getColor(idx)
        }
        return obj
    })

    var a = _.mapValues(data.cluster_centers_, (item, idx) => {
        var obj = {
            x: _.get(item, x, null),  // Default to null if undefined
            y: _.get(item, y, null)   // Default to null if undefined
        }
        return obj
    })

    var obj = {
        label: 'Cluster Center',
        data: _.values(a),
        pointStyle: 'triangle',
        pointRadius: 30,
        pointHoverRadius: 30
    }

    return isShowCluster ? [..._.values(result), obj] : [..._.values(result)]
}