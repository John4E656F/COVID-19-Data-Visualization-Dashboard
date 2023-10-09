export async function getDataByCountry(country: string) {
  const res = await fetch(`https://covid-api.com/api/reports/total?iso=${country}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
