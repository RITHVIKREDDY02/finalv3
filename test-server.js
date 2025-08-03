// Direct server test for VPS debugging
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5009;

// Basic middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist/public')));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Admin login test
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === 'Samara@tashan') {
    res.json({ success: true, token: 'test-token-123' });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Catch all for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Start server with explicit binding
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Test server running on http://0.0.0.0:${PORT}`);
  console.log(`🌐 Access externally at: http://89.116.121.62:${PORT}`);
});