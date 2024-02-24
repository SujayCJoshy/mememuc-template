const JSZip = require('jszip');

/**
 * Zips multiple image buffers into a single ZIP archive.
 * @param {Array<Buffer>} imageBuffers - An array of image buffers to be zipped.
 * @returns {Promise<Buffer>} - The ZIP archive as a buffer.
 */
async function zipBuffers(imageBuffers) {
    const zip = new JSZip();
    // Loop through the image buffers and add them to the zip
    imageBuffers.forEach((buffer, index) => {
        // Name images as image1.jpg, image2.jpg, etc.
        zip.file(`image${index + 1}.jpg`, buffer);
    });

    // Generate ZIP file
    const content = await zip.generateAsync({ type: "nodebuffer" });
    return content;
}

module.exports = { zipBuffers };
