const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PLUMBER_URL = 'https://monnit-plumber-api.onrender.com';
const DASHBOARD_URL = process.env.DASHBOARD_URL || '*';
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', DASHBOARD_URL);
  next();
});

app.get('/data', async (req, res) => {
  console.log(`/data requested from ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
  try {
    const response = await fetch(`${PLUMBER_URL}/data`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/givenergy', async (req, res) => {
  console.log(`/givenergy requested from ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
  try {
    const response = await fetch(`${PLUMBER_URL}/givenergy`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch givenergy data' });
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
