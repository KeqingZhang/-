import React from 'react';

function DisplayData({ data }) {
  return (
    <div>
      <h2>Display Data</h2>
      <ul>
        {data && data.map((item, index) => (
          <li key={index}>{JSON.stringify(item, null, 2)}</li>
          ))}
      </ul>
    </div>
  );
}

export default DisplayData;
