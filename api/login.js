import { getAuth } from 'firebase-admin/auth';

export default async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await getAuth().createUser({ email, password });
    return res.json({ uid: user.uid });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};