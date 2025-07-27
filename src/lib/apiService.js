const API_BASE_URL = 'http://54.206.120.116:5000';

export const fetchData = async (selectedK) => {
    const response = await fetch(`${API_BASE_URL}/api/kmeans/` + (parseInt(selectedK) + 2));
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

