const FNLB = require('fnlb');

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const fnlb = new FNLB();
    await fnlb.stop();

    return res.status(200).json({ 
      success: true,
      message: '🛑 Stopped all bots successfully!'
    });
  } catch (error) {
    console.error('Bot stop error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to stop bots'
    });
  }
};