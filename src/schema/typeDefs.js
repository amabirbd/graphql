const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Long
  scalar JSON

  type Action {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
    params: JSON
  }

  type Trigger {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
    params: JSON
  }

  type ResponseVariation {
    name: String!
    responses: [JSON]
  }

  type ResponseLocaleGroup {
    localeGroupId: ID
    localeGroup: String
    variations: [ResponseVariation]
    name: String!
    responses: JSON
  }

  type ResponsePlatform {
    integrationId: ID
    build: Float
    localeGroups: [ResponseLocaleGroup]
  }

  type Response {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    platforms: [ResponsePlatform]
    tags: [String]
  }

  type ResourceTemplate {
    _id: ID!
    createdAt: Long
    updatedAt: Long
    name: String!
    description: String
    schema: JSON
    integrationId: String
    functionString: String
    key: String
    type: String
  }

  type Position {
    x: Float
    y: Float
  }

  type Redirect {
    nodeCompositeId: String
    sendResponse: Boolean
    runPreAction: Boolean
    runPostAction: Boolean
  }

  type NodeObject {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    parents: [NodeObject]
    parentIds: [ID]
    root: Boolean
    trigger: Trigger
    triggerId: ID
    responses: [Response]
    responseIds: [ID]
    actions: [Action]
    actionIds: [ID]
    preActions: [Action]
    postActions: [Action]
    priority: Float
    compositeId: ID
    global: Boolean
    colour: String
    position: Position
    redirect: Redirect
    analytics: JSON
    memberTagging: JSON
    type: String
    tags: [String]
    saveCompositeId: Boolean
  }

  type Query {
    node(nodeId: ID!): NodeObject
    nodes: [NodeObject]
    action(actionId: ID!): Action
    actions: [Action]
    trigger(triggerId: ID!): Trigger
    triggers: [Trigger]
    response(responseId: ID!): Response
    responses: [Response]
    resourceTemplate(templateId: ID!): ResourceTemplate
    resourceTemplates: [ResourceTemplate]
  }
`;

module.exports = typeDefs;

