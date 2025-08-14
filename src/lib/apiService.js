const API_BASE_URL = 'http://127.0.0.1:5000';

export const fetchData = async (selectedK) => {
    const response = await fetch(`${API_BASE_URL}/api/kmeans/` + (parseInt(selectedK) + 2));
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const fetchObjectDetect = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/objectdetect`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
