'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getData, getDataByCountry, getHistory } from '@/api';
import { HeaderCard, SearchBar, LineChart } from '@/components';

interface Country {
  name: string;
}

interface DataProps {
  date: string;
  confirmed: number;
  recovered: number;
  deaths: number;
}

interface HistoryData {
  [key: string]: {
    [date: string]: number;
  };
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [data, setData] = useState<DataProps | null>(null);
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = selectedCountry ? getDataByCountry(selectedCountry.name) : getData();

    fetchData
      .then((data) => {
        const transformedData: DataProps = {
          date: new Date(data.updated).toLocaleDateString(),
          confirmed: data.cases,
          recovered: data.recovered,
          deaths: data.deaths,
        };
        setData(transformedData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCountry]);

  useEffect(() => {
    getHistory({ days: 'all' }).then((data) => {
      setHistoryData(data);
    });
  }, []);

  const handleCountrySelect = async (country: Country) => {
    setSelectedCountry(country);
  };

  console.log(historyData);

  return (
    <main className='w-full flex items-center justify-center'>
      <div className='flex flex-col container justify-center items-center py-4 md:py-16 gap-8'>
        <Image src='/logo.svg' alt='Covid19Visualizer' width={250} height={250} priority />
        <h1>{selectedCountry ? selectedCountry.name : 'Global'}</h1>
        {loading ? (
          <div>Loading...</div>
        ) : data ? (
          <div className='flex gap-3'>
            <HeaderCard title='Infected' count={data.confirmed} date={data.date} />
            <HeaderCard title='Recovered' count={data.recovered} date={data.date} />
            <HeaderCard title='Deaths' count={data.deaths} date={data.date} />
          </div>
        ) : null}
        <SearchBar onCountrySelect={handleCountrySelect} />
        <div className='w-96 h-96'>{historyData && <LineChart data={historyData} />}</div>
      </div>
    </main>
  );
}
