"use clinet"
import React from 'react';

const HammingCodesDisplay = ({ hammingCodes }) => {
  return (
    <div>
      {hammingCodes.map((code, index) => (
        <div key={index}>
          <p>{code.symbol}: {code.hammingCode}</p>
        </div>
      ))}
    </div>
  );
};

export default HammingCodesDisplay;
