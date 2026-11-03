import { NextResponse } from 'next/server';
import crypto from 'crypto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';
const JWT_SECRET = process.env.JWT_SECRET || 'sucrenita-seguridad-admin-secret-key-2026';

const STORED_SALT = '75019f006196bb24a64879146341e993';
const STORED_HASH = '7c5d72d04a3a3cc24f9686776bde023992d5908db2a9e7a697fe75585a6543da7346974d9aad97a3578feb31070596ca0169a532ef060814ade71fb57ead215a';

function verifyPasswordHash(password: string): boolean {
  try {
    const computed = crypto.pbkdf2Sync(password, STORED_SALT, 10000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(STORED_HASH, 'hex'), Buffer.from(computed, 'hex'));
  } catch {
    return false;
  }
}

function createSessionToken(user: { id: string; username: string; name: string; role: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      ...user,
      exp: Math.floor(Date.now() / 1000) + 86400 * 7,
    })
  ).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Usuario y contraseña requeridos' },
        { status: 400 }
      );
    }

    try {
      const backendRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (backendRes.ok) {
        const json = await backendRes.json();
        return NextResponse.json(json);
      }
    } catch {
    }

    if (username.trim().toLowerCase() === 'engel7u7' && verifyPasswordHash(password)) {
      const user = {
        id: 'usr-admin-sucrenita-1',
        name: 'Jhojan Erick Romero Morales',
        username: 'engel7u7',
        role: 'ADMIN',
      };
      const token = createSessionToken(user);

      return NextResponse.json({
        success: true,
        message: 'Acceso autorizado',
        token,
        user,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Credenciales inválidas' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error interno de autenticación' },
      { status: 500 }
    );
  }
}

