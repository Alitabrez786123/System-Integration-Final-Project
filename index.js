const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Serve Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Azure Cognitive Services credentials
const region = 'eastus'; // Update with your region
const subscriptionKey = '9cBnlRvrF0ehjpzasNrY7XJyL9Y6N4IdD23itYbRnAkmffoFOUBPJQQJ99BDACYeBjFXJ3w3AAAFACOGBzG5'; // Replace with your Azure OCR subscription key
const endpoint = `https://siocrapi2.cognitiveservices.azure.com/vision/v3.2/read/analyze`; // Corrected the endpoint URL

// POST route to handle OCR request
app.post('/ocr', async (req, res) => {
    try {
        const imageUrl = req.body.imageUrl;

        if (!imageUrl) {
            return res.status(400).send('No image URL provided');
        }

        // Step 1: Initiate OCR process
        const response = await axios.post(endpoint, { url: imageUrl }, {
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': 'application/json',
            }
        });

        // Step 2: Retrieve the Operation Location from the response
        const operationLocation = response.headers['operation-location'];
        const operationId = operationLocation.split('/').pop(); // Extract the operation ID from the URL

        let result = null;
        // Step 3: Poll for the result until it's ready
        while (!result || (result.status === 'notStarted' || result.status === 'running')) {
            const resultResponse = await axios.get(`${operationLocation}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey
                }
            });

            result = resultResponse.data;

            // Step 4: Wait for the OCR process to complete
            if (result.status === 'notStarted' || result.status === 'running') {
                console.log('Waiting for result...');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
            }
        }

        // Step 5: If OCR succeeded, extract and return the text
        if (result.status === 'succeeded') {
            const extractedText = result.analyzeResult.readResults[0].lines.map(line => line.text).join('\n');
            console.log('Extracted Text:', extractedText); // Log the output for debugging
            res.json({ text: extractedText });
        } else {
            res.status(500).json({ error: 'OCR failed to process the image' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
