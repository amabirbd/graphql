const fs = require('fs');
const path = require('path');

let nodesData = null;

const loadNodes = () => {
  if (!nodesData) {
    try {
      const filePath = path.join(__dirname, 'source/node.json');
      const rawData = fs.readFileSync(filePath, 'utf8');
      nodesData = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading nodes data:', error);
      nodesData = [];
    }
  }
  return nodesData;
};

const getNodeById = (id) => {
  const nodes = loadNodes();
  return nodes.find(node => node._id === id);
};

const getAllNodes = () => {
  return loadNodes();
};

module.exports = {
  getNodeById,
  getAllNodes
};

