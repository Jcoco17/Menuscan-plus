import QRCode from 'qrcode';

export default async (req, res) => {
  const { tableId } = req.query;
  
  if (!tableId) {
    return res.status(400).json({ error: "Falta tableId" });
  }

  try {
    const menuUrl = `https://${req.headers.host}/menu.html?table=${encodeURIComponent(tableId)}`;
    const qrSvg = await QRCode.toString(menuUrl, { type: 'svg' });
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(qrSvg);
  } catch (error) {
    res.status(500).json({ error: "Error generando QR" });
  }
};