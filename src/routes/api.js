const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/image-to-image', async (req, res) => {
  try {
    const { base64Image, style, prompt } = req.body || {};

    if (!base64Image || !style) {
      return res.status(400).json({ error: 'base64Image ve style gerekli' });
    }

    const payload = {
      init_image: base64Image,
      prompt: prompt || `Professional portrait with ${style} effect`,
      negative_prompt: 'low quality, blurry, distorted, ugly, bad quality',
      strength: 0.75,
      guidance_scale: 7.5,
      num_inference_steps: 25,
      sampler: 'euler'
    };

    const apiResponse = await axios.post(
      'https://modelslab.com/api/v7/images/image-to-image',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MODELSLAB_API_KEY}`
        },
        timeout: 120000
      }
    );

    const result = apiResponse.data;

    let imageUrl = null;
    if (result.proxy_links && Array.isArray(result.proxy_links) && result.proxy_links.length > 0) {
      imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(result.proxy_links[0])}&w=800&h=800&fit=cover&output=webp`;
    } else if (Array.isArray(result.output) && result.output.length > 0) {
      imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(result.output[0])}&w=800&h=800&fit=cover&output=webp`;
    } else if (result.output && typeof result.output === 'string') {
      imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(result.output)}&w=800&h=800&fit=cover&output=webp`;
    } else if (result.image_url) {
      imageUrl = `https://wsrv.nl/?url=${encodeURIComponent(result.image_url)}&w=800&h=800&fit=cover&output=webp`;
    }

    if (!imageUrl) {
      return res.status(400).json({ error: 'API yanıtında görsel bulunamadı', details: result });
    }

    res.json({ success: true, imageUrl, status: result.status || 'success' });
  } catch (error) {
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Çok fazla istek. Lütfen bekleyin.' });
    }
    res.status(500).json({ error: 'Sunucu hatası', message: error.message });
  }
});

module.exports = router;
