const express = require('express');
const axios = require('axios');
const router = express.Router();
const { overlayImageOnBase } = require('../services/imageProcessor');

router.post('/image-to-image', async (req, res) => {
  try {
    const { base64Image } = req.body || {};

    if (!base64Image) {
      return res.status(400).json({ error: 'base64Image gerekli' });
    }

    const payload = {
      init_image: [base64Image],
      prompt: "Professional headshot of a young man with short light brown hair and round glasses, wearing a sharp black formal suit with a white shirt and a tie, looking confident. High resolution, photorealistic, 8k, isolated on a plain solid white background.",
      model_id: "seedream-4.5-i2i",
      aspect_ratio: "1:1",
      key: process.env.NEW_AI_API_KEY // API anahtarı .env dosyasından alınır
    };

    const apiResponse = await axios.post(
      'https://new-ai-model.com/api/v1/process-image',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEW_AI_API_KEY}`
        },
        timeout: 120000
      }
    );

    const result = apiResponse.data;

    if (!result || !result.processedImage) {
      return res.status(400).json({ error: 'API yanıtında işlenmiş görsel bulunamadı', details: result });
    }

    const finalImage = await overlayImageOnBase(result.processedImage);

    res.json({ success: true, finalImage });
  } catch (error) {
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Çok fazla istek. Lütfen bekleyin.' });
    }
    res.status(500).json({ error: 'Sunucu hatası', message: error.message });
  }
});

module.exports = router;
