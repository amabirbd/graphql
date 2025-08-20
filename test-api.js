const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const GRAPHQL_URL = 'http://localhost:4000/graphql';
const AUTH_TOKEN = 'your-secret-bearer-token-here';

async function testGraphQLAPI() {
  console.log('🧪 Testing GraphQL API...\n');

  // Test 1: Get all nodes
  console.log('1. Testing nodes query...');
  try {
    const nodesQuery = `
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
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ query: nodesQuery })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.log('❌ Error:', data.errors[0].message);
    } else {
      console.log(`✅ Success! Found ${data.data.nodes.length} nodes`);
      console.log('First node:', data.data.nodes[0]?.name || 'No nodes found');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n2. Testing specific node query...');
  try {
    const nodeQuery = `
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
          }
          responses {
            _id
            name
          }
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ query: nodeQuery })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.log('❌ Error:', data.errors[0].message);
    } else {
      console.log('✅ Success! Node details retrieved');
      console.log('Node name:', data.data.node?.name);
      console.log('Has trigger:', !!data.data.node?.trigger);
      console.log('Response count:', data.data.node?.responses?.length || 0);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n3. Testing actions query...');
  try {
    const actionsQuery = `
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
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ query: actionsQuery })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.log('❌ Error:', data.errors[0].message);
    } else {
      console.log(`✅ Success! Found ${data.data.actions.length} actions`);
      console.log('First action:', data.data.actions[0]?.name || 'No actions found');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n4. Testing authentication (invalid token)...');
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid-token'
      },
      body: JSON.stringify({ query: '{ nodes { _id name } }' })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.log('✅ Success! Authentication working - invalid token rejected');
      console.log('Error message:', data.errors[0].message);
    } else {
      console.log('❌ Warning: Invalid token was accepted');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  console.log('\n🎉 API testing completed!');
  console.log('\n📚 You can now use the GraphQL Playground at: http://localhost:4000/graphql');
  console.log('🔐 Remember to include the Authorization header with the Bearer token');
}

// Run the test
testGraphQLAPI().catch(console.error);
