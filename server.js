// server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// フロントの静的ファイル（public）を配信
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// 動画リストのダミーデータ（最初はDB不要！）
let videos = [
  {
    id: 1,
    title: 'サンプル動画',
    description: '最初のデモ動画です',
    videoUrl: 'https://samplelib.com/mp4/sample-720p.mp4',
    thumbnailUrl: 'https://via.placeholder.com/320x180.png?text=サムネイル'
  }
];

// 動画一覧API
app.get('/api/videos', (req, res) => {
  res.json(videos);
});

// 動画アップロードAPI（後で実装）
app.post('/api/upload', (req, res) => {
  // TODO: 実装
  res.status(501).send({ error: '未実装です' });
});

// Stripeの決済API（後で実装）
app.post('/api/checkout', (req, res) => {
  // TODO: 実装
  res.status(501).send({ error: '未実装です' });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバー起動 http://localhost:${PORT}`);
});
