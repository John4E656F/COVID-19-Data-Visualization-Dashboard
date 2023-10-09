import React, { useState, ChangeEvent, useEffect, KeyboardEvent } from 'react';

interface Country {
  iso: string;
  name: string;
}

interface SearchBarProps {
  onCountrySelect: (country: Country) => Promise<void>;
}

export function SearchBar({ onCountrySelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  // Fetch the countries when the component mounts
  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch('https://covid-api.com/api/regions');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      setCountries(data.data);
    }

    fetchCountries();
  }, []);

  // Update the search results whenever the searchTerm changes
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
    setSearchTerm(country.name); // Display the selected country in the input box
    await onCountrySelect(country); // Call the onCountrySelect prop with the selected country
    setResults([]); // Clear the search results after the fetch operation is completed
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      if (results.length === 1) {
        // If there is only one suggested item, select it
        handleCountrySelect(results[0]);
      } else {
        // Start the search
        setResults([]);
      }
    }
  };

  const handleSearchButtonClick = () => {
    if (results.length === 1) {
      // If there is only one suggested item, select it
      handleCountrySelect(results[0]);
    } else {
      // Start the search
      setResults([]);
    }
  };

  return (
    <div>
      <input type='text' value={searchTerm} onChange={handleSearchTermChange} onKeyDown={handleKeyDown} />
      <button onClick={handleSearchButtonClick}>Search</button>
      {searchTerm &&
        results.map((country) => (
          <div key={country.iso} onClick={() => handleCountrySelect(country)}>
            {country.name}
          </div>
        ))}
    </div>
  );
}
