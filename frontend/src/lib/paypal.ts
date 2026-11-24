export function getPayPalConfig() {
  const clientId =
    process.env.PAYPAL_CLIENT_ID ||
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    'sb';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
  const env = process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox';
  const apiBase =
    env === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

  const hasServerCredentials =
    clientId !== 'sb' && Boolean(clientId) && Boolean(clientSecret);

  return {
    clientId,
    clientSecret,
    env,
    apiBase,
    hasServerCredentials,
  };
}

export async function getPayPalAccessToken(): Promise<string> {
  const { clientId, clientSecret, apiBase, hasServerCredentials } =
    getPayPalConfig();

  if (!hasServerCredentials) {
    throw new Error('Credenciales de servidor PayPal no configuradas');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  );

  const response = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error OAuth PayPal (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}
