const axios = require('axios');
const sharp = require('sharp');

/**
 * Fetches an image from a URL and converts it to a JPEG buffer.
 * @param {string} url - The URL of the image to convert.
 * @param {number|string} id - The ID of the meme, used for naming.
 * @returns {Promise<{name: string, buffer: Buffer}>} An object containing the JPEG buffer and its name.
 */
async function fetchAndConvertToJpeg(url, id) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = await sharp(Buffer.from(response.data)).jpeg().toBuffer();
        return { name: `meme-${id}.jpg`, buffer };
    } catch (error) {
        console.error(`Error converting meme ${id} to JPEG:`, error);
        throw error; // Rethrow error to be handled by caller
    }
}

/**
 * Converts an array of memes to JPEG buffers with names.
 * @param {Array<Object>} memes - An array of memes, each with a URL and ID.
 * @returns {Promise<Array<{name: string, buffer: Buffer}>>} A promise that resolves to an array of objects, each containing a JPEG buffer and a name.
 */
async function createJpegNameBuffersFromMemes(memes) {
    return Promise.all(memes.map(meme => fetchAndConvertToJpeg(meme.url, meme.id)));
}

/**
 * Simulates fetching metadata for a meme.
 * @param {number|string} memeId - The ID of the meme.
 * @returns {Promise<Object>} The metadata for the meme.
 */
async function getMemeMetadataById(memeId) {
    // Placeholder function: Implement your logic to fetch real metadata
    // This example returns dummy data
    return {
        title: `Meme Title for ID ${memeId}`,
        creator: 'Creator Name',
        creationDate: '2021-01-01',
        tags: ['Funny', 'Satire'],
        likes: Math.floor(Math.random() * 1000)
    };
}

/**
 * Attaches metadata to each meme in the list.
 * @param {Array<Object>} memes - An array of memes.
 * @returns {Promise<Array<Object>>} A promise that resolves to the array of memes, each enriched with metadata.
 */
async function attachMetadataToMemes(memes) {
    return Promise.all(memes.map(async (meme) => {
        const metadata = await getMemeMetadataById(meme.id);
        return { ...meme, metadata };
    }));
}

module.exports = {
    createJpegNameBuffersFromMemes,
    attachMetadataToMemes
};
