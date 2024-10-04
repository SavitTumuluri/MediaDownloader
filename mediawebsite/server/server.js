const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const { url } = req.body;
  if (!ytdl.validateURL(url)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    const info = await ytdl.getInfo(url);
    const audioStream = ytdl(url, { filter: 'audioonly' });

    // Set up ffmpeg for audio conversion
    res.set({
      'Content-Disposition': `attachment; filename="${info.videoDetails.title}.mp3"`,
      'Content-Type': 'audio/mpeg',
    });

    // Pipe audio to response
    ffmpeg(audioStream)
      .audioBitrate(128)
      .format('mp3')
      .pipe(res, { end: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to process the request');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
