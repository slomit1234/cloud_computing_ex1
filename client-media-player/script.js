document.addEventListener('DOMContentLoaded', () => {
    const videoListContainer = document.getElementById('videoList');

    // Fetch the list of videos from the API
    fetch('http://localhost:3000/videoList')
        .then(response => response.json())
        .then(videos => {
            videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.className = 'videoItem';
                videoItem.textContent = video;
                videoListContainer.appendChild(videoItem);
            });
        })
        .catch(error => {
            console.error('Error fetching video list:', error);
            videoListContainer.textContent = 'Error :[';
        });
});
