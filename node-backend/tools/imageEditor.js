const sharp = require('sharp');

class ImageEditor {
    constructor(buffer) {
        this.image = sharp(buffer);
    }

    async addCaptionsToBuffer({ topText, bottomText, template }) {
        // Load the template image
        let editedImage = this.image;

        // Define your caption options
        const captionOptions = {
            topText,
            bottomText,
            // You can adjust these options for font size, color, etc.
            fontSize: 32,
            font: 'Arial',
            textColor: 'white',
            strokeColor: 'black',
            strokeWidth: 1,
        };

        // Process and add captions (this is a simplified example)
        if (topText) {
            editedImage = await this.addText(editedImage, topText, 'top', captionOptions);
        }
        if (bottomText) {
            editedImage = await this.addText(editedImage, bottomText, 'bottom', captionOptions);
        }

        return await editedImage.toBuffer();
    }

    async addText(image, text, position, options) {
        const metadata = await image.metadata();
        const textWidth = metadata.width - 20; // 20px padding
        const textHeight = options.fontSize + 10; // 10px padding for text height

        // Create a canvas to draw text on
        const svgText = `
            <svg width="${metadata.width}" height="${metadata.height}">
                <style>
                    .caption { fill: ${options.textColor}; font-size: ${options.fontSize}px; font-family: ${options.font}; }
                </style>
                <rect x="0" y="${position === 'top' ? 0 : (metadata.height - textHeight)}" width="${metadata.width}" height="${textHeight}" fill="none" />
                <text x="50%" y="${position === 'top' ? textHeight : (metadata.height - 5)}" class="caption" text-anchor="middle">${text}</text>
            </svg>`;

        // Composite the SVG text over the original image
        return image.composite([{
            input: Buffer.from(svgText),
            top: 0,
            left: 0,
        }]);
    }
}

module.exports = ImageEditor;
