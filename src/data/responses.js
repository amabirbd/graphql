const fs = require('fs');
const path = require('path');

let responsesData = null;

const loadResponses = () => {
  if (!responsesData) {
    try {
      const filePath = path.join(__dirname, 'source/response.json');
      const rawData = fs.readFileSync(filePath, 'utf8');
      responsesData = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading responses data:', error);
      responsesData = [];
    }
  }
  return responsesData;
};

const getResponseById = (id) => {
  const responses = loadResponses();
  return responses.find(response => response._id === id);
};

const getAllResponses = () => {
  return loadResponses();
};

module.exports = {
  getResponseById,
  getAllResponses
};

