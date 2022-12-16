import bcrypt from 'bcrypt';

export async function verifyPassword(password:any, hashPassword:any) {
    return await bcrypt.compare(password, hashPassword);
}