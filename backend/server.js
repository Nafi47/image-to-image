import express from "express";
import axios from "axios";
import https from "https";

const app = express();

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

app.get("/image", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).send("No url");
  }

  try {
    const response = await axios.get(imageUrl, {
      httpsAgent,
      responseType: "arraybuffer",
      timeout: 20000
    });

    res.setHeader("Content-Type", response.headers["content-type"] || "image/png");
    res.send(response.data);

  } catch (err) {
    console.error("FETCH ERROR:", err.message);
    res.status(500).send("Proxy error");
  }
});

app.listen(3000, () => {
  console.log("Proxy running: http://localhost:3000");
});