
import React from 'react';
import HitBox from './HitBox';
import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Configure
  } from 'react-instantsearch-dom';

 const searchClient = algoliasearch(
    'OFCNCOG2CU',
    '77db8c6516725ef60b8a60223155f7ad'
  );

export default class Scaffolding extends React.Component {
  render() {
     return (
        <div>
        <div>
          <InstantSearch searchClient={searchClient} indexName="npm-search">
            <Configure filters="computedKeywords:webpack-scaffold" />
            <div>

              <div>
                <SearchBox className="searchbox" placeholder="" />
                <Hits hitComponent={(props) => <HitBox {...props}/>} />
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}
