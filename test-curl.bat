@echo off
echo Testing GraphQL API with curl...

echo.
echo 1. Testing nodes query with valid token:
curl -X POST ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer your-secret-bearer-token-here" ^
  -d "{\"query\":\"{ nodes { _id name description root global compositeId } }\"}" ^
  http://localhost:4000/graphql

echo.
echo.
echo 2. Testing authentication with invalid token:
curl -X POST ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer invalid-token" ^
  -d "{\"query\":\"{ nodes { _id name } }\"}" ^
  http://localhost:4000/graphql

echo.
echo.
echo 3. Testing without authorization header:
curl -X POST ^
  -H "Content-Type: application/json" ^
  -d "{\"query\":\"{ nodes { _id name } }\"}" ^
  http://localhost:4000/graphql

echo.
echo.
echo Test completed!
pause

