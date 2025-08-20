const fs = require('fs');
const path = require('path');

let resourceTemplatesData = null;

const loadResourceTemplates = () => {
  if (!resourceTemplatesData) {
    try {
      const filePath = path.join(__dirname, 'source/resourceTemplate.json');
      const rawData = fs.readFileSync(filePath, 'utf8');
      resourceTemplatesData = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading resource templates data:', error);
      resourceTemplatesData = [];
    }
  }
  return resourceTemplatesData;
};

const getResourceTemplateById = (id) => {
  const resourceTemplates = loadResourceTemplates();
  return resourceTemplates.find(template => template._id === id);
};

const getAllResourceTemplates = () => {
  return loadResourceTemplates();
};

module.exports = {
  getResourceTemplateById,
  getAllResourceTemplates
};

