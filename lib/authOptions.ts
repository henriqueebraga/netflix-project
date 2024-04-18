import { NextAuthOptions } from 'next-auth';
import Credentials, { CredentialsConfig } from 'next-auth/providers/credentials';
import prismadb from '@/lib/prismadb';
import { compare } from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required')
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user.hashedPassword) {
                    throw new Error('No user found')
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

                if (!isCorrectPassword) {
                    throw new Error('Invalid password')
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
