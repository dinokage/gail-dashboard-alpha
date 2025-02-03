import { prisma } from './prisma';
import { SHA256 as sha256 } from "crypto-js";

interface SignUpData {
    email: string;
    password: string;
}

export async function createUser(data: SignUpData) {
    const { email, password } = data;

    // Check if user already exists in the database
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const passwordHash = sha256(password).toString();

    // Create a new user in the database
    const newUser = await prisma.user.create({
        data: {
            email,
            password: passwordHash,
        },
    });

    return {
        message: 'User created successfully',
        user: newUser,
    };
}