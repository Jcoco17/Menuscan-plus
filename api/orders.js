import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Configura Firebase (usa tus credenciales)
const app = initializeApp({

  credential: applicationDefault(), // Auto-config en Vercel
  databaseURL: "https://menuscan-plus.firebaseio.com"
});

const db = getFirestore();

export default async (req, res) => {
  if (req.method === 'POST') {
    const { item, table } = req.body;
    
    // Guarda en Firestore
    await db.collection('orders').add({
      item,
      table,
      timestamp: new Date()
    });

    return res.status(200).json({ success: true });
  }
  res.status(405).end(); // Método no permitido
};