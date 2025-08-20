# GraphQL API Server

A GraphQL API server built with Node.js and Apollo Server that provides access to node, action, trigger, response, and resource template data.

## Features

- ✅ GraphQL API with Apollo Server
- ✅ Bearer token authentication
- ✅ Complete schema with all required types
- ✅ JSON file-based data source
- ✅ Relationship resolvers
- ✅ GraphQL Playground for testing
- ✅ Error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env

# Or use this bash script to create .env from .env.example
#!/bin/bash
if [ -f .env.example ]; then
    cp .env.example .env
    echo "✅ .env file created from .env.example"
else
    echo "❌ .env.example file not found"
    exit 1
fi
```

3. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Authentication

The API requires Bearer token authentication. Use the following token in your requests:

**Token:** `supersecrettoken`

### Example Headers
```
Authorization: Bearer supersecrettoken
```

## API Endpoints

- **GraphQL Endpoint:** `http://localhost:4000/graphql`
- **GraphQL Playground:** `http://localhost:4000/graphql` (browser)

## Available Queries

### Nodes
```graphql
# Get all nodes
query {
  nodes {
    _id
    name
    description
    root
    global
    compositeId
  }
}

# Get specific node
query {
  node(nodeId: "6296be3470a0c1052f89cccb") {
    _id
    name
    description
    trigger {
      _id
      name
    }
    responses {
      _id
      name
    }
    actions {
      _id
      name
    }
  }
}
```

### Actions
```graphql
# Get all actions
query {
  actions {
    _id
    name
    description
    resourceTemplate {
      _id
      name
    }
  }
}

# Get specific action
query {
  action(actionId: "6530933e6a1690d2f0c78a92") {
    _id
    name
    description
    params
  }
}
```

### Triggers
```graphql
# Get all triggers
query {
  triggers {
    _id
    name
    description
    params
  }
}

# Get specific trigger
query {
  trigger(triggerId: "629712b210f525845e1a92f8") {
    _id
    name
    description
    resourceTemplate {
      _id
      name
    }
  }
}
```

### Responses
```graphql
# Get all responses
query {
  responses {
    _id
    name
    description
    platforms {
      integrationId
      build
      localeGroups {
        localeGroup
        variations {
          name
          responses
        }
      }
    }
  }
}
```

### Resource Templates
```graphql
# Get all resource templates
query {
  resourceTemplates {
    _id
    name
    description
    type
    key
  }
}
```

## Testing with GraphQL Playground

1. Open your browser and go to `http://localhost:4000/graphql`
2. In the HTTP HEADERS section (bottom left), add:
```json
{
  "Authorization": "Bearer your-secret-bearer-token-here"
}
```
3. Write your GraphQL queries in the main editor
4. Click the play button to execute

## Example Query with Relationships

```graphql
query {
  node(nodeId: "6296be3470a0c1052f89cccb") {
    _id
    name
    description
    root
    global
    compositeId
    trigger {
      _id
      name
      description
      resourceTemplate {
        _id
        name
        type
      }
    }
    responses {
      _id
      name
      description
      platforms {
        integrationId
        build
        localeGroups {
          localeGroup
          variations {
            name
            responses
          }
        }
      }
    }
    actions {
      _id
      name
      description
      params
      resourceTemplate {
        _id
        name
      }
    }
    parents {
      _id
      name
      compositeId
    }
  }
}
```

## Data Structure

The API serves data from the following JSON files located in `src/data/source/`:
- `node.json` - Node objects with relationships
- `action.json` - Action objects
- `trigger.json` - Trigger objects  
- `response.json` - Response objects with platform-specific data
- `resourceTemplate.json` - Resource template objects

## Error Handling

The API includes comprehensive error handling:
- Authentication errors for invalid/missing tokens
- Data loading errors with fallbacks
- GraphQL validation errors
- Custom error formatting

## Development

### Project Structure
```
src/
├── schema/
│   ├── typeDefs.js      # GraphQL schema definitions
│   └── resolvers.js     # GraphQL resolvers
├── data/
│   ├── source/          # JSON data source files
│   │   ├── node.json
│   │   ├── action.json
│   │   ├── trigger.json
│   │   ├── response.json
│   │   └── resourceTemplate.json
│   ├── actions.js       # Action data loader
│   ├── triggers.js      # Trigger data loader
│   ├── responses.js     # Response data loader
│   ├── resourceTemplates.js # Resource template data loader
│   └── nodes.js         # Node data loader
├── middleware/
│   └── auth.js          # Authentication middleware
└── server.js            # Main server file
```

### Adding New Features

1. **New Query**: Add to `typeDefs.js` and implement resolver in `resolvers.js`
2. **New Type**: Define in `typeDefs.js` and add field resolvers if needed
3. **New Data Source**: Create new data loader in `data/` directory

## License

MIT

