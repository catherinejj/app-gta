import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  AuthTokenPayload,
  AuthTokens,
  TokenServicePort,
} from '../../application/ports/token-service.port';

interface JwtPayload extends AuthTokenPayload {
  iat: number;
  exp: number;
  type: 'access' | 'refresh';
}

@Injectable()
export class JwtTokenService implements TokenServicePort {
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET ?? 'access-secret-dev';
  private readonly refreshSecret =
    process.env.JWT_REFRESH_SECRET ?? 'refresh-secret-dev';
  private readonly accessTtlSeconds = this.parseDuration(
    process.env.JWT_ACCESS_TTL ?? '15m',
  );
  private readonly refreshTtlSeconds = this.parseDuration(
    process.env.JWT_REFRESH_TTL ?? '7d',
  );

  issueTokens(payload: AuthTokenPayload): AuthTokens {
    const accessToken = this.signToken(
      { ...payload, type: 'access' },
      this.accessSecret,
      this.accessTtlSeconds,
    );

    const refreshToken = this.signToken(
      { ...payload, type: 'refresh' },
      this.refreshSecret,
      this.refreshTtlSeconds,
    );

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string): AuthTokenPayload {
    const payload = this.verifyToken(token, this.accessSecret);

    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }

  verifyRefreshToken(token: string): AuthTokenPayload {
    const payload = this.verifyToken(token, this.refreshSecret);

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }

  private signToken(
    payload: AuthTokenPayload & { type: 'access' | 'refresh' },
    secret: string,
    ttlSeconds: number,
  ): string {
    const now = Math.floor(Date.now() / 1000);

    const tokenPayload: JwtPayload = {
      ...payload,
      iat: now,
      exp: now + ttlSeconds,
    };

    const header = this.toBase64Url({ alg: 'HS256', typ: 'JWT' });
    const body = this.toBase64Url(tokenPayload);
    const signature = this.signPart(`${header}.${body}`, secret);

    return `${header}.${body}.${signature}`;
  }

  private verifyToken(token: string, secret: string): JwtPayload {
    const [header, body, signature] = token.split('.');

    if (!header || !body || !signature) {
      throw new Error('Invalid token format');
    }

    const expectedSignature = this.signPart(`${header}.${body}`, secret);

    if (!this.safeEqual(signature, expectedSignature)) {
      throw new Error('Invalid token signature');
    }

    const payload = this.fromBase64Url<JwtPayload>(body);
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp <= now) {
      throw new Error('Token expired');
    }

    return payload;
  }

  private signPart(value: string, secret: string): string {
    return createHmac('sha256', secret).update(value).digest('base64url');
  }

  private toBase64Url(value: unknown): string {
    return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');
  }

  private fromBase64Url<T>(value: string): T {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T;
  }

  private safeEqual(left: string, right: string): boolean {
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);

    if (leftBuffer.length !== rightBuffer.length) {
      return false;
    }

    return timingSafeEqual(leftBuffer, rightBuffer);
  }

  private parseDuration(value: string): number {
    const trimmed = value.trim();
    const match = trimmed.match(/^(\d+)([smhd])?$/i);

    if (!match) {
      throw new Error(`Invalid duration format: ${value}`);
    }

    const amount = Number(match[1]);
    const unit = (match[2] ?? 's').toLowerCase();

    switch (unit) {
      case 's':
        return amount;
      case 'm':
        return amount * 60;
      case 'h':
        return amount * 60 * 60;
      case 'd':
        return amount * 60 * 60 * 24;
      default:
        throw new Error(`Unsupported duration unit: ${unit}`);
    }
  }
}
