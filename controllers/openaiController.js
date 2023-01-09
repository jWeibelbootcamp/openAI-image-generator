const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    // pass in user data (number not working yet)
    const { prompt, n, size } = req.body;

    // image size choices
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.createImage({
            prompt,
            n,
            size: imageSize
        });

        const imageURL = response.data.data[0].url
        
        res.status(200).json({
            success: true,
            data: imageURL
        });
    } catch (error) {
        // specific error message, not for user
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        // generic error message
        res.status(400).json({
            success: false,
            error: 'The image could not be generated.'
        });
    };
};

module.exports = { generateImage };