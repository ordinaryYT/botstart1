const FNLB = require('fnlb');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fnlb = new FNLB();
    await fnlb.stop();

    return res.status(200).json({ 
      success: true,
      message: 'Stopped all bots successfully'
    });
  } catch (error) {
    console.error('Error stopping bots:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to stop bots'
    });
  }
};