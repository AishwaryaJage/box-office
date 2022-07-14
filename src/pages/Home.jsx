import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

function Home() {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onInputChange = ev => {
    setInput(ev.target.value);
  };
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  const renderResults = () => {
    if (results && results.length === 0) {
      return <div> No Result Found</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  return (
    <div>
      {' '}
      <MainPageLayout>
        <input
          type="text"
          onChange={onInputChange}
          placeholder="Search for something..."
          value={input}
          onKeyDown={onKeyDown}
        />
        <div>
          <label htmlFor="shows-search">
            Shows
            <input
              type="radio"
              id="shows-search"
              value="shows"
              checked={isShowsSearch}
              onChange={onRadioChange}
            />
          </label>
          <label htmlFor="actors-search">
            Actors
            <input
              type="radio"
              id="actors-search"
              value="people"
              checked={!isShowsSearch}
              onChange={onRadioChange}
            />
          </label>
        </div>
        <button type="button" onClick={onSearch}>
          {' '}
          Search{' '}
        </button>
        {renderResults()}
      </MainPageLayout>{' '}
    </div>
  );
}

export default Home;
