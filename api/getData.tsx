export async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/all`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
