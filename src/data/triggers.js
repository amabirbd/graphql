const fs = require('fs');
const path = require('path');

let triggersData = null;

const loadTriggers = () => {
  if (!triggersData) {
    try {
      const filePath = path.join(__dirname, 'source/trigger.json');
      const rawData = fs.readFileSync(filePath, 'utf8');
      triggersData = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading triggers data:', error);
      triggersData = [];
    }
  }
  return triggersData;
};

const getTriggerById = (id) => {
  const triggers = loadTriggers();
  return triggers.find(trigger => trigger._id === id);
};

const getAllTriggers = () => {
  return loadTriggers();
};

module.exports = {
  getTriggerById,
  getAllTriggers
};

