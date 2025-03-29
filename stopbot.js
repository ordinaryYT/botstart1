const FNLB = require('fnlb');

module.exports = async (req, res) => {
  try {
    const fnlb = new FNLB();
    await fnlb.stop();
    
    return res.json({ 
      success: true,
      message: 'All bots stopped successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};