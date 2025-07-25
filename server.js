// server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // uploads フォルダに保存

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
app.post('/api/upload', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), (req, res) => {
  // ファイルとテキスト情報を取得
  const { title, description } = req.body;
  const videoFile = req.files['video'][0];
  const thumbFile = req.files['thumbnail'][0];

  // 動画・サムネイルファイルのパス
  const videoUrl = '/uploads/' + videoFile.filename;
  const thumbnailUrl = '/uploads/' + thumbFile.filename;

  // 動画リストに追加
  const newVideo = {
    id: Date.now(),
    title,
    description,
    videoUrl,
    thumbnailUrl
  };
  videos.unshift(newVideo); // 新しい順に追加
  res.json({ success: true });
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

// 静的ファイルとして uploads フォルダを公開する設定も追加：
app.use('/uploads', express.static('uploads'));

