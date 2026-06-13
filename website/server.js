import express from 'express';
import handler from './api/submit-enquiry.js';

try {
  process.loadEnvFile();
} catch (e) {
  console.log('[API DEV INFO] No local .env file found. Relying on system/process environment variables.');
}

const app = express();
app.use(express.json({ limit: '10mb' }));

// Mock request and response wrapper to match Vercel signature
app.post('/api/submit-enquiry', async (req, res) => {
  console.log(`[API DEV] Received project enquiry for: ${req.body.name} (${req.body.email})`);
  
  try {
    await handler(req, res);
  } catch (error) {
    console.error('[API DEV ERROR] Failed to execute API handler:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error in dev API' });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Local Dev API Server running at http://127.0.0.1:${PORT}`);
  console.log(`======================================================\n`);
});
