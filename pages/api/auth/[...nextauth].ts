import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import authOptions from '@/lib/authOptions'

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export default handler;
