const fs = require('fs');
const path = require('path');

let actionsData = null;

const loadActions = () => {
  if (!actionsData) {
    try {
      const filePath = path.join(__dirname, 'source/action.json');
      const rawData = fs.readFileSync(filePath, 'utf8');
      actionsData = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading actions data:', error);
      actionsData = [];
    }
  }
  return actionsData;
};

const getActionById = (id) => {
  const actions = loadActions();
  return actions.find(action => action._id === id);
};

const getAllActions = () => {
  return loadActions();
};

module.exports = {
  getActionById,
  getAllActions
};

