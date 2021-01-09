import crypto from 'crypto';

export function generateRandomString(size: number = 16): string {
	return crypto.randomBytes(size).toString('hex');
}
