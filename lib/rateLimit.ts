interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory store for rate limiting
const ipRequestMap = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipRequestMap.entries()) {
      if (now > record.resetAt) {
        ipRequestMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  /** Maximum allowed requests within the time window */
  limit?: number;
  /** Window size in seconds */
  windowSeconds?: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks and updates rate limit for a given client IP.
 * Uses a sliding/fixed window with automatic expiry cleanup.
 */
export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const limit = options.limit ?? 10; // 10 PDF exports
  const windowMs = (options.windowSeconds ?? 60) * 1000; // per 60 seconds
  const now = Date.now();

  const record = ipRequestMap.get(ip);

  if (!record || now > record.resetAt) {
    // New or expired window
    ipRequestMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  // Active window
  if (record.count >= limit) {
    const resetSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return {
      success: false,
      limit,
      remaining: 0,
      resetSeconds,
    };
  }

  record.count += 1;
  const resetSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));

  return {
    success: true,
    limit,
    remaining: limit - record.count,
    resetSeconds,
  };
}

/**
 * Extracts client IP from standard reverse-proxy headers
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',');
    return ips[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  return '127.0.0.1';
}
