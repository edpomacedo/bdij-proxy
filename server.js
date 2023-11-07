const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/proxy', async (req, res) => {
  try {
    const { resource } = req.query;

    if (!resource) {
      return res.status(400).json({ error: 'Parameter "resource" is required.' });
    }

    const apiUrl = `https://web.bdij.com.br/w/rest.php/v1/page/${resource}`;
    const { data } = await axios.get(apiUrl);

    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
