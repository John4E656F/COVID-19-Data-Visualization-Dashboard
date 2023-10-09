import React from 'react';
import { Card } from '..';
import { formatCount, formatDate } from '@/utils';
interface HeaderCardProps {
  title: string;
  count: number;
  date: string;
}

export const HeaderCard: React.FC<HeaderCardProps> = ({ title, count, date }) => {
  return (
    <Card
      className={`flex flex-col gap-2 bg-white p-5 min-w-min py-10 border-b-8 ${
        title == 'Infected' ? 'border-violet-400' : title == 'Deaths' ? 'border-red-400' : 'border-green-400'
      }`}
    >
      <h2 className='text-lg text-gray-700'>{title}</h2>
      <h3 className='text-2xl font-semibold'>{formatCount(count)}</h3>
      <h4 className='text-sm text-gray-500'>{formatDate(date)}</h4>
      <p className='text-sm'>Number of {title == 'Infected' ? 'active cases' : title == 'Deaths' ? 'deaths caused' : 'recoveries'} of COVID-19</p>
    </Card>
  );
};
