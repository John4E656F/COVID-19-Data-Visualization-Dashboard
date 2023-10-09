import Image from 'next/image';
import { HeaderCard } from '@/components';

async function getData() {
  const res = await fetch('https://covid-api.com/api/reports/total');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const { data } = await getData();
  console.log(data);

  return (
    <main className='w-full  flex items-center justify-center'>
      <div className='flex flex-col container justify-center items-center py-4 md:py-16 '>
        <Image src='/logo.svg' alt='Covid19Visualizer' width={100} height={24} priority />
        <div className='flex gap-3'>
          <HeaderCard title='Infected' count={data.confirmed} date={data.date} />
          <HeaderCard title='Recovered' count={data.recovered} date={data.date} />
          <HeaderCard title='Deaths' count={data.deaths} date={data.date} />
        </div>
      </div>
    </main>
  );
}
