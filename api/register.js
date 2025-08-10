import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
});

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  try {
    const user = await getAuth(app).createUser({
      email,
      password,
      emailVerified: true // Para evitar verificación por correo
    });

    return res.json({ uid: user.uid });
  } catch (error) {
    console.error("Error creando usuario:", error);
    return res.status(400).json({ error: error.message });
  }
};