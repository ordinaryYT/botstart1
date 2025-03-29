const FNLB = require('fnlb');

module.exports = async (req, res) => {
  try {
    // Initialize the bot manager
    const fnlb = new FNLB();
    
    // Start 20 bots (2 shards × 10 bots each)
    await fnlb.start({
      apiToken: process.env.FNLB_API_TOKEN,
      numberOfShards: 2,
      botsPerShard: 10
    });

    return res.json({ 
      success: true,
      message: 'Started 20 Fortnite bots successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};