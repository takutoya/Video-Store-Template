// public/main.js

// 動画一覧をAPIから取得し表示
async function loadVideos() {
  const res = await fetch('/api/videos');
  const videos = await res.json();
  const list = document.getElementById('video-list');
  list.innerHTML = '';
  videos.forEach(v => {
    list.innerHTML += `
      <div class="video-card">
        <img src="${v.thumbnailUrl}" class="thumb" />
        <h3>${v.title}</h3>
        <p>${v.description}</p>
        <video src="${v.videoUrl}" controls width="320"></video>
        <button disabled>購入ボタン（まだ非実装）</button>
      </div>
    `;
  });
}
loadVideos();
