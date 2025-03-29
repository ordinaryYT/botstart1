const FNLB = require('fnlb');

module.exports = async (req, res) => {
  console.log('Received request:', req.method, req.url); // Debug logging
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const fnlb = new FNLB();
    
    if (req.method === 'POST' && req.url === '/api/start') {
      console.log('Starting bots...');
      await fnlb.start({
        apiToken: process.env.FNLB_API_TOKEN,
        numberOfShards: 2,
        botsPerShard: 10
      });
      return res.end(JSON.stringify({ success: true, message: 'Started 20 bots' }));
    }
    else if (req.method === 'POST' && req.url === '/api/stop') {
      console.log('Stopping bots...');
      await fnlb.stop();
      return res.end(JSON.stringify({ success: true, message: 'Stopped all bots' }));
    }
    
    return res.end(JSON.stringify({ error: 'Invalid endpoint' }));
    
  } catch (error) {
    console.error('Error:', error);
    return res.end(JSON.stringify({ 
      success: false,
      error: error.message 
    }));
  }
};