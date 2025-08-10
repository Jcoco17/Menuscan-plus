import { initializeApp, cert } from 'firebase-admin/app'; // Asegúrate de importar 'cert'
import { getFirestore } from 'firebase-admin/firestore';

// Configuración corregida para Vercel
const firebaseConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // ¡Importante!
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { item, table } = req.body;
      
      const docRef = await db.collection('orders').add({
        item,
        table,
        timestamp: new Date()
      });

      return res.status(200).json({ 
        success: true,
        orderId: docRef.id 
      });
    } catch (error) {
      console.error('Error en Firestore:', error);
      return res.status(500).json({ error: 'Error al guardar el pedido' });
    }
  }
  res.status(405).end(); // Método no permitido
};