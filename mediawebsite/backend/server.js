const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const SpotifyDL = require('@nechlophomeriaa/spotifydl');
ffmpeg.setFfmpegPath(ffmpegPath);

const path = require('path');
const fs = require('fs');


const app = express();
const port = 5000;
 
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  console.log('POST received');
  const { url } = req.body;

  if (!ytdl.validateURL(url)) {
    console.error('Invalid URL:', url);
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    const info = await ytdl.getInfo(url);
    console.log('Video Info:', info); // Log the video info
    const audioStream = ytdl(url, {
      filter: 'audioonly',
    });

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

app.post('/downloadSpotify', async (req, res) => {
  const { url } = req.body;

  if (!SpotifyDL.isValidSpotifyUrl(url)) {
    return res.status(400).send('Invalid Spotify URL');
  }

  try {
    const trackData = await spotify.downloadTrack(url);

    res.set({
      'Content-Disposition': `attachment; filename="${trackData.name}.mp3"`,
      'Content-Type': 'audio/mpeg',
    });

    trackData.stream.pipe(res);
  } catch (error) {
    console.error('Error downloading Spotify track:', error);
    res.status(500).send('Failed to download from Spotify.');
  }
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
