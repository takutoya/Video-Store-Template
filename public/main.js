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

// 追加するコード
document.getElementById('upload-form').onsubmit = async function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const videoFile = document.getElementById('video').files[0];
  const thumbnailFile = document.getElementById('thumbnail').files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('video', videoFile);
  formData.append('thumbnail', thumbnailFile);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    alert('アップロード完了！');
    loadVideos(); // 再読み込み
    this.reset();
  } else {
    alert('アップロード失敗');
  }
};
