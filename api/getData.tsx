export async function getData() {
  const res = await fetch(`https://covid-api.com/api/reports/total`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
