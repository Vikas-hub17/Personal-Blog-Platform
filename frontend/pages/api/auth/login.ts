import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// Dummy user data (Replace with database lookup)
const users = [
  { email: 'john.doe@example.com', 
    password: 'password123' 
  },
  {
    email: "jane.smith@example.com",
    password: "SecurePass456"
  },
  {
    email: "michael.scott@example.com",
    password: "DunderMifflin789"
  },
  {
    email: "pam.beesly@example.com",
    password: "ArtLover101"
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1d' });

    return res.status(200).json({ token });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
