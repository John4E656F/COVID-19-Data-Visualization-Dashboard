import React, { useState, ChangeEvent, useEffect, KeyboardEvent } from 'react';
import countriesData from '@/utils/countries.json'; // Import the JSON data

interface Country {
  name: string;
}

interface SearchBarProps {
  onCountrySelect: (country: Country) => Promise<void>;
}

export function SearchBar({ onCountrySelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>(countriesData); // Use the imported data

  useEffect(() => {
    if (searchTerm === '') {
      setResults([]);
    } else {
      const newResults = countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setResults(newResults);
    }
  }, [searchTerm, countries]);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCountrySelect = async (country: Country) => {
    setSearchTerm(country.name);
    await onCountrySelect(country);
    setResults([]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (results.length > 0) {
        handleCountrySelect(results[0]);
      }
    }
  };

  const handleSearchButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (results.length > 0) {
      handleCountrySelect(results[0]);
    }
  };

  return (
    <form className='w-full max-w-xs'>
      <label htmlFor='search country' className='mb-2 text-sm font-medium text-gray-900 sr-only'>
        Search
      </label>
      <div className='relative flex w-full'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchTermChange}
          onKeyDown={handleKeyDown}
          className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Search a country'
        />
        <button
          onClick={handleSearchButtonClick}
          type='submit'
          className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
        >
          Search
        </button>
      </div>
      <div id='dropdown' className='z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow '>
        {searchTerm && results.length > 0 && (
          <ul className='py-2 text-sm text-gray-700'>
            {results.map((country) => (
              <li key={country.name}>
                <button onClick={() => handleCountrySelect(country)} className='inline-flex w-full px-4 py-2 hover:bg-gray-100'>
                  {country.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
