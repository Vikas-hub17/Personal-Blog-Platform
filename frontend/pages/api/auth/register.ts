import { NextApiRequest, NextApiResponse } from 'next';

// Dummy in-memory users (You would replace this with a database)
const users = [
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "Password123" // Use bcrypt to hash before storing
  },
  {
    "username": "jane_smith",
    "email": "jane.smith@example.com",
    "password": "SecurePass456"
  },
  {
    "username": "michael_scott",
    "email": "michael.scott@example.com",
    "password": "DunderMifflin789"
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    // Here you would hash the password and save the user in a real app

    const newUser = { username, email, password };
    users.push(newUser);

    return res.status(200).json({ message: 'User registered successfully!' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
