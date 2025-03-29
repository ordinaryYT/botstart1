const FNLB = require('fnlb');

module.exports = async (req, res) => {
  // Set headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const fnlb = new FNLB();
    
    if (req.url === '/api/start' && req.method === 'POST') {
      await fnlb.start({
        apiToken: process.env.FNLB_API_TOKEN,
        numberOfShards: 2,
        botsPerShard: 10
      });
      return res.end(JSON.stringify({ 
        success: true, 
        message: 'Started 20 bots successfully' 
      }));
    }
    else if (req.url === '/api/stop' && req.method === 'POST') {
      await fnlb.stop();
      return res.end(JSON.stringify({ 
        success: true, 
        message: 'Stopped all bots successfully' 
      }));
    }
    
    return res.end(JSON.stringify({ 
      error: 'Endpoint not found' 
    }));
    
  } catch (error) {
    return res.end(JSON.stringify({ 
      success: false,
      error: error.message 
    }));
  }
};