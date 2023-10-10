interface DataParams {
  days: string;
}

export async function getHistory({ days }: DataParams) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/historical/all?lastdays=${days}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
