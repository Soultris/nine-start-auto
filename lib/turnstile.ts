export async function verifyTurnstileToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not defined');
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
}
