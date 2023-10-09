'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getData, getDataByCountry } from '@/api';
import { HeaderCard, SearchBar } from '@/components';

interface Country {
  iso: string;
  name: string;
}

interface DataProps {
  date: string;
  confirmed: number;
  recovered: number;
  deaths: number;
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [data, setData] = useState<DataProps | null>(null);

  useEffect(() => {
    if (selectedCountry) {
      getDataByCountry(selectedCountry.iso).then((response) => {
        setData(response.data);
      });
    } else {
      getData().then((response) => {
        setData(response.data);
      });
    }
  }, [selectedCountry]);
  console.log(data);

  return (
    <main className='w-full  flex items-center justify-center'>
      <div className='flex flex-col container justify-center items-center py-4 md:py-16 '>
        <Image src='/logo.svg' alt='Covid19Visualizer' width={250} height={250} priority />
        {data && (
          <div className='flex gap-3'>
            <HeaderCard title='Infected' count={data.confirmed} date={data.date} />
            <HeaderCard title='Recovered' count={data.recovered} date={data.date} />
            <HeaderCard title='Deaths' count={data.deaths} date={data.date} />
          </div>
        )}
        <SearchBar onCountrySelect={setSelectedCountry} />
      </div>
    </main>
  );
}
