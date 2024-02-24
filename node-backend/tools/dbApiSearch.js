// dbApiSearch.js

// Import the monk library
const db = require('monk')('localhost/omm-ws2223'); // Ensure this matches your database connection string

// Access the memes collection
const memes = db.get('memes');

/**
 * Search for memes in the database based on query parameters.
 * @param {Object} queryParams The query parameters from the request.
 * @returns {Promise<Array>} A promise that resolves to an array of found memes.
 */
async function findMemesInDB(queryParams) {
    // Build the query based on provided query parameters
    let query = {};
    const options = {
        // Add pagination or sorting options here if needed
        sort: { creationDate: -1 }, // Example: default sorting
    };

    // Example filters based on possible query parameters
    if (queryParams.user) query.user = queryParams.user;
    if (queryParams.title) query.title = queryParams.title;
    if (queryParams.topCaption) query.topCaption = queryParams.topCaption;
    if (queryParams.bottomCaption) query.bottomCaption = queryParams.bottomCaption;
    if (queryParams.template) query.template = queryParams.template;
    
    // Adjust for pagination if parameters are provided
    if (queryParams.page && queryParams.limit) {
        const page = parseInt(queryParams.page, 10) || 1;
        const limit = parseInt(queryParams.limit, 10) || 10;
        options.skip = (page - 1) * limit;
        options.limit = limit;
    }

    // Execute the query
    try {
        const result = await memes.find(query, options);
        return result;
    } catch (error) {
        console.error("Error accessing database:", error);
        throw error; // Rethrow to be handled by the caller
    }
}

// Export the function for use in other modules
module.exports = { findMemesInDB };
