import React from 'react';
import Container from '../Container/Container';
import packages from './packages.json';

export default () => {
  return (
    <Container className="page__content">
      <h1>Ecosystem compatibility</h1>
      <div className="table">
        <div className="table-wrap">
          <div className="table-header">
            <div className="table-tr">
              <div className="table-th">Package</div>
              <div className="table-th">Compatibility</div>
            </div>
          </div>
          <div className="table-body">
            {packages.map(({ name, peerDependencies: { webpack } = { webpack: '' } }) => (
              <div className="table-tr">
                <div className="table-td">
                  <div className="table-td-title">Package</div>
                  <div className="table-td-content">{name}</div>
                </div>
                <div className="table-td">
                  <div className="table-td-title">Compatibility</div>
                  <div className="table-td-content">{webpack}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
