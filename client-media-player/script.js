document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/videoList')
      .then(response => response.json())
      .then(videoList => {
        const tableBody = document.querySelector('#mediaTable tbody');
        videoList.forEach(videoTitle => {
          const tableRow = document.createElement('tr');
          const tableData = document.createElement('td');
          tableData.textContent = videoTitle;
          tableData.onclick = () => {
            playSelectedVideo(videoTitle);
            markActiveRow(tableRow);
          };
          tableRow.appendChild(tableData);
          tableBody.appendChild(tableRow);
        });
      })
      .catch(error => {
        console.error('Error retrieving video list:', error);
      });
  });
  
  function playSelectedVideo(videoName) {
    fetch(`http://localhost:3000/getVideoUrl?fileName=${encodeURIComponent(videoName)}`)
      .then(response => response.json())
      .then(data => {
        const mediaPlayer = document.getElementById('mediaPlayer');
        const mediaSource = document.getElementById('mediaSource');
        mediaSource.src = data.url;
        mediaPlayer.style.display = 'block';
        mediaPlayer.load();
        mediaPlayer.play();
      })
      .catch(error => {
        console.error('Error retrieving video URL:', error);
      });
  }
  
  function markActiveRow(activeRow) {
    const rows = document.querySelectorAll('#mediaTable tbody tr');
    rows.forEach(row => row.classList.remove('highlighted'));
    activeRow.classList.add('highlighted');
  }
  