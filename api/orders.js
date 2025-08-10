import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
});

const db = getFirestore();

export default async (req, res) => {
  if (req.method === 'POST') {
    const { item, table } = req.body;
    
    if (!item || !table) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    try {
      const docRef = await db.collection('orders').add({
        item,
        table,
        status: "pendiente",
        createdAt: new Date()
      });
      
      return res.json({ 
        success: true, 
        orderId: docRef.id 
      });
    } catch (error) {
      console.error("Firestore error:", error);
      return res.status(500).json({ error: "Error al guardar" });
    }
  }
  
  res.status(405).end(); // Método no permitido
};