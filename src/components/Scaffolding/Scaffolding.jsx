
import React from 'react';

import './Scaffolding.scss';

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
} from 'react-instantsearch-dom';


 const searchClient = algoliasearch(
    'OFCNCOG2CU',
    '77db8c6516725ef60b8a60223155f7ad'
  );

  function htmlDecode(input){
    //eslint-disable-next-line
    return input.replace(/[^a-z0-9\s]/gi, '').replace(/(gt)/gi, '')
  }
  const Hit = ({ hit }) => {
    console.log(hit)
  
    return (
      <article className="hit-card">
        <div className="product-wrapper">
          <div className="product-summary">
            <div className="product-title">
            {hit.repository && hit.repository.url ? (<a href={hit.repository.url}><h3>{hit.name}</h3></a>) : (<h3>{hit.name}</h3>)} 
            </div>
            <div className="product-avatar">
              <img src={hit.owner.avatar} height="40" width="40"/>
            </div>
          </div>
          <div className="product-name">
          <h3>{hit.owner.name}</h3>
          </div>
          
          <div className="product-desc">
            <p>{htmlDecode(hit.description)}</p>
          </div>

        </div>
      </article>
    );
  };

export default class Scaffolding extends React.Component {
  render() {
     return (
        <div>
        <div>
          <InstantSearch searchClient={searchClient} indexName="npm-search">
            <Configure filters="computedKeywords:webpack-scaffold" hitsPerPage={16} />
            <div className="search-wrapper">
              <SearchBox />
            </div>
            <div className="hits-wrapper">
               <Hits hitComponent={Hit} />
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}
