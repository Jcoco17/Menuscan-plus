import QRCode from 'qrcode';

export default async (req, res) => {
  const { tableId } = req.query;
  const url = `https://${req.headers.host}/menu.html?table=${tableId}`;
  
  const qrSvg = await QRCode.toString(url, { type: 'svg' });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(qrSvg);
};