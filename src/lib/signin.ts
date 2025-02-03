import { prisma } from './prisma';
import { SHA256 as sha256 } from "crypto-js";
import jwt from 'jsonwebtoken';

interface SignInData {
    email: string;
    password: string;
}

export async function signIn(data: SignInData) {
    const { email, password } = data;

    // Check if user exists in the database
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('User not found');
    }

    // Check if the password is correct
    const passwordHash = sha256(password).toString();
    const isPasswordValid = passwordHash === user.password;
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });

    return {
        message: 'Authentication successful',
        token,
    };
}