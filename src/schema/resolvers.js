const { getActionById, getAllActions } = require('../data/actions');
const { getTriggerById, getAllTriggers } = require('../data/triggers');
const { getResponseById, getAllResponses } = require('../data/responses');
const { getResourceTemplateById, getAllResourceTemplates } = require('../data/resourceTemplates');
const { getNodeById, getAllNodes } = require('../data/nodes');

const resolvers = {
  Query: {
    // Node queries
    node: (_, { nodeId }) => getNodeById(nodeId),
    nodes: () => getAllNodes(),
    
    // Action queries
    action: (_, { actionId }) => getActionById(actionId),
    actions: () => getAllActions(),
    
    // Trigger queries
    trigger: (_, { triggerId }) => getTriggerById(triggerId),
    triggers: () => getAllTriggers(),
    
    // Response queries
    response: (_, { responseId }) => getResponseById(responseId),
    responses: () => getAllResponses(),
    
    // Resource template queries
    resourceTemplate: (_, { templateId }) => getResourceTemplateById(templateId),
    resourceTemplates: () => getAllResourceTemplates(),
  },

  // Field resolvers for relationships
  Action: {
    resourceTemplate: (parent) => {
      if (parent.resourceTemplateId) {
        return getResourceTemplateById(parent.resourceTemplateId);
      }
      return null;
    }
  },

  Trigger: {
    resourceTemplate: (parent) => {
      if (parent.resourceTemplateId) {
        return getResourceTemplateById(parent.resourceTemplateId);
      }
      return null;
    }
  },

  NodeObject: {
    // Resolve trigger relationship
    trigger: (parent) => {
      if (parent.triggerId) {
        return getTriggerById(parent.triggerId);
      }
      return null;
    },

    // Resolve responses relationship
    responses: (parent) => {
      if (parent.responses && Array.isArray(parent.responses)) {
        return parent.responses.map(responseId => getResponseById(responseId)).filter(Boolean);
      }
      return [];
    },

    // Resolve actions relationship
    actions: (parent) => {
      if (parent.actions && Array.isArray(parent.actions)) {
        return parent.actions.map(actionId => getActionById(actionId)).filter(Boolean);
      }
      return [];
    },

    // Resolve preActions relationship
    preActions: (parent) => {
      if (parent.preActions && Array.isArray(parent.preActions)) {
        return parent.preActions.map(actionId => getActionById(actionId)).filter(Boolean);
      }
      return [];
    },

    // Resolve postActions relationship
    postActions: (parent) => {
      if (parent.postActions && Array.isArray(parent.postActions)) {
        return parent.postActions.map(actionId => getActionById(actionId)).filter(Boolean);
      }
      return [];
    },

    // Resolve parents relationship
    parents: (parent) => {
      if (parent.parents && Array.isArray(parent.parents)) {
        return parent.parents.map(parentId => getNodeById(parentId)).filter(Boolean);
      }
      return [];
    }
  },

  // Custom scalar resolvers
  Long: {
    __serialize: (value) => {
      return parseInt(value);
    }
  },

  JSON: {
    __serialize: (value) => {
      return value;
    }
  }
};

module.exports = resolvers;

