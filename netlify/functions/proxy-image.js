exports.handler = async function (event, context) {
  try {
    const imageUrl = event.queryStringParameters?.url;

    if (!imageUrl) {
      return {
        statusCode: 400,
        body: "No url provided"
      };
    }

    const res = await fetch(imageUrl);

    if (!res.ok) {
      return {
        statusCode: 500,
        body: "Failed to fetch image"
      };
    }

    const buffer = await res.arrayBuffer();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") || "image/png",
        "Cache-Control": "public, max-age=86400"
      },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    console.error("Proxy error:", err);
    return {
      statusCode: 500,
      body: "Proxy error"
    };
  }
};