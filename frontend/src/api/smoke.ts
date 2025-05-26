export async function getSmoke(): Promise<string> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/smoke`);

  if (!res.ok) {
    throw new Error(`API call failed: ${res.status}`);
  }

  return res.text();
}
