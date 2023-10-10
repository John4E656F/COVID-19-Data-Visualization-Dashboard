export async function getDataByCountry(country: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/countries/${country}?strict=true`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
