const FNLB = require('fnlb');

module.exports = async (req, res) => {
  // Set headers first
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // Handle both start and stop from one file
    const fnlb = new FNLB();
    
    if (req.url.includes('/start') && req.method === 'POST') {
      await fnlb.start({
        apiToken: process.env.FNLB_API_TOKEN,
        numberOfShards: 2,
        botsPerShard: 10
      });
      return res.json({ success: true, message: 'Started 20 bots' });
    }
    else if (req.url.includes('/stop') && req.method === 'POST') {
      await fnlb.stop();
      return res.json({ success: true, message: 'Stopped all bots' });
    }
    else {
      return res.status(404).json({ error: 'Endpoint not found' });
    }
    
  } catch (error) {
    console.error('Bot error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};