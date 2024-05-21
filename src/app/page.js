"use client"

import React, { useState } from 'react';
import SymbolInput from '@/components/symbol/SymbolInput';
import HammingCodesDisplay from '@/components/display/HammingCodesDisplay';
import { convertToHammingCodes } from '@/utils/convertToHammingCodes/conversion';

const Home = () => {
  const [symbols, setSymbols] = useState([]);
  const [probabilities, setProbabilities] = useState([]);
  const [hammingCodes, setHammingCodes] = useState([]);
  const [converted, setConverted] = useState(false);

  const handleAddSymbol = () => {
    setSymbols([...symbols, '']);
    setProbabilities([...probabilities, '']);
  };

  const handleSymbolChange = (index, value) => {
    const newSymbols = [...symbols];
    newSymbols[index] = value;
    setSymbols(newSymbols);
  };

  const handleProbabilityChange = (index, value) => {
    const newProbabilities = [...probabilities];
    newProbabilities[index] = value;
    setProbabilities(newProbabilities);
  };

  const handleConvert = () => {
    // Call conversion logic here
    const convertedHammingCodes = convertToHammingCodes(symbols, probabilities);
    setHammingCodes(convertedHammingCodes);
    setConverted(true);
  };

  return (
    <>
      <div className="container mx-auto p-2 flex flex-col gap-2 min-h-screen items-center">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-900 text-center">Hamming Code Generator</h1>
        <p className=" text-2xl text-gray-600 mb-4 text-center">
          Project under guidance of <span className=' text-red-800 font-serif'>Dr. Trilochan Panigrahi</span>
        </p>

        <div className="flex flex-col space-y-4 w-full md:w-3/4 lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold text-center md:text-left">Enter Symbols and Probabilities</h2>
            <SymbolInput
              symbols={symbols}
              probabilities={probabilities}
              onAddSymbol={handleAddSymbol}
              onSymbolChange={handleSymbolChange}
              onProbabilityChange={handleProbabilityChange}
              onConvert={handleConvert}
              converted={converted}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold text-center md:text-left">Generated Hamming Codes</h2>
            <HammingCodesDisplay hammingCodes={hammingCodes} />
          </div>
        </div>
      </div>


    </>
  );
};

export default Home;
