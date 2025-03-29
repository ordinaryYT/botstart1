const FNLB = require('fnlb');

module.exports = async (req, res) => {
  // Set proper content type
  res.setHeader('Content-Type', 'application/json');
  
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const fnlb = new FNLB();
    await fnlb.start({
      apiToken: process.env.FNLB_API_TOKEN,
      numberOfShards: 2,
      botsPerShard: 10
    });

    return res.status(200).json({ 
      success: true,
      message: 'Started 20 bots successfully' 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};