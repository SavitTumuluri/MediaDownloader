const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const {
  getOriginalUrl,
  search,
  downloads,
  downloads2,
  downloads3,
  downloadAlbum,
  downloadAlbum2,
  downloadAlbum3,
  downloadTrack,
  downloadTrack2,
  downloadTrack3
  } = require("@nechlophomeriaa/spotifydl");
const { PassThrough } = require('stream');
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;
 
app.use(cors());
app.use(express.json());

app.post('/download/youtube', async (req, res) => {
  console.log('POST received');
  const { url } = req.body;

  if (!ytdl.validateURL(url)) {
    console.error('Invalid URL:', url);
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    const info = await ytdl.getInfo(url);
    //console.log('Video Info:', info); // Log the video info
    const audioStream = ytdl(url, {
      filter: 'audioonly',
    });
    console.log(audioStream);

    // Error handling for audio stream
    audioStream.on('error', (err) => {
      console.error('Error with audio stream:', err);
      return res.status(500).send('Failed to retrieve audio');
    });

    // Set up ffmpeg for audio conversion
    res.set({
      'Content-Disposition': `attachment; filename="${info.videoDetails.title}.mp3"`,
      'Content-Type': 'audio/mpeg',
    });

    // Pipe audio to response with error handling
    ffmpeg(audioStream)
      .audioBitrate(128)
      .format('mp3')
      .on('error', (err) => {
        console.error('Error during conversion:', err);
        res.status(500).send('Failed to convert audio');
      })
      .on('end', () => {
        console.log('Conversion finished successfully');
      })
      .pipe(res, { end: true });
  } catch (err) {
    console.error('Unexpected error:', err); // Log unexpected errors
    res.status(500).send('Failed to process the request');
  }
});

app.post('/download/spotify', async (req, res) => {
  const { url } = req.body;
  console.log('post received');
  const downTrack = await downloadTrack2(url); // query || url
  console.log(downTrack);
  console.log(downTrack.title);
  res.set({
    'Content-Disposition': `attachment; filename="${downTrack.title}.mp3"`,
    'Content-Type': 'audio/mpeg',
  });

  console.log(downTrack.audioBuffer);
  const audioStream = new PassThrough();
  audioStream.end(downTrack.audioBuffer);
  console.log(audioStream);
  // Pipe audio to response with error handling
  ffmpeg(audioStream)
    .audioBitrate(128)
    .format('mp3')
    .on('error', (err) => {
      console.error('Error during conversion:', err);
      res.status(500).send('Failed to convert audio');
    })
    .on('end', () => {
      console.log('Conversion finished successfully');
    })
    .pipe(res, { end: true });
});


app.get('/download', (req, res, next) => {
  try {
    // Your existing code to handle downloading would go here

    // Send a response to confirm the endpoint is working
    res.status(200).send('Download endpoint is working!');
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
