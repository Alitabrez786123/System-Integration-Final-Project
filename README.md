
# Project: Azure Cognitive Services OCR Integration

## Description
This project integrates Azure Cognitive Services' OCR API into a Node.js application. The API allows you to extract text from images using the Azure Vision API. It supports processing images hosted remotely via URLs.

## Prerequisites
- **Node.js** installed
- **Postman**: For testing the API.

## Setup

### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/Alitabrez786123/System-Integration-Final-Project.git
```
```bash
cd System-Integration-Final-Project
```
### 2. Install Dependencies
Install the required dependencies:
```bash
npm install
```
### 3. Azure Cognitive services credentials:
- region: "eastus"
- subscription key: '9cBnlRvrF0ehjpzasNrY7XJyL9Y6N4IdD23itYbRnAkmffoFOUBPJQQJ99BDACYeBjFXJ3w3AAAFACOGBzG5'
- endpoint: `https://siocrapi2.cognitiveservices.azure.com/vision/v3.2/read/analyze`

## Running the Project

After setting up the project, run the server:
```bash
node index.js
```
The application will run on http://localhost:10000.

Test the OCR functionality using Postman:
```bash
Send a POST request to http://localhost:10000/ocr with the following body:
```
```json
{
  "imageUrl": "https://your-image-url-here"
}
```
The server will process the image using Azure Cognitive Services and return the extracted text as a JSON response.

```Endpoints
POST /ocr: This endpoint receives an image URL and performs OCR on it.
```
Request Body:

```json
{
  "imageUrl": "https://your-image-url-here"
}
```
Response:

```json
{
  "text": "Extracted text from the image"
}
```
## Deployment on Render
I have deployed the Azure OCR API on "Render" instead of "Digital Ocean", the following is the link for the Live API

https://system-integration-final-project.onrender.com

However, when you directly try to open the link, you will get "Cannot GET", but when you send POST request to the same URL on "POSTMAN" you will get the output

## Project Documentation
Project Report is uploaded in the repository as "System_Integration_Final_Project.pdf", pleasego through it for detailed process and execution screenshots
Thank you!

## Swagger API Documentation
To access the Swagger API documentation:

Start the server:

```bash
node index.js
```
Open your browser and navigate to http://localhost:3000/api-docs to view the Swagger documentation.
