const sharp = require('sharp');

/**
 * Overlays the AI-generated image onto a base image at specific coordinates.
 * @param {string} processedImage - The AI-generated image (base64 or URL).
 * @returns {Promise<string>} - The final image as a base64 string.
 */
async function overlayImageOnBase(processedImage) {
  try {
    const baseImagePath = './public/assets/images/portfolio/kullan/RTE-1.jpg'; // Replace with your base image path

    // Load the base image
    const baseImage = sharp(baseImagePath);

    // Load the processed image
    const overlayImageBuffer = Buffer.from(
      processedImage.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );

    // Composite the images
    const finalImageBuffer = await baseImage
      .composite([
        {
          input: overlayImageBuffer,
          top: 150, // Replace with your desired Y coordinate
          left: 150, // Replace with your desired X coordinate
        },
      ])
      .toBuffer();

    // Convert the final image to base64
    return `data:image/jpeg;base64,${finalImageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error overlaying image:', error);
    throw new Error('Image processing failed');
  }
}

module.exports = { overlayImageOnBase };