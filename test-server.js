// Simple test server to check if the webview can connect
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Server</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #3b82f6;
        }
      </style>
    </head>
    <body>
      <h1>Test Server Working!</h1>
      <p>If you can see this page, the server is working correctly at port ${port}.</p>
      <p>Current time: ${new Date().toLocaleString()}</p>
    </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Test server listening at http://localhost:${port}`);
});