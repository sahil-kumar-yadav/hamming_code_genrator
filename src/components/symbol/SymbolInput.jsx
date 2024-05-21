import React from 'react';

const SymbolInput = ({ symbols, probabilities, onAddSymbol, onSymbolChange, onProbabilityChange, onConvert, converted }) => {
  const handleConvert = () => {
    onConvert();
  };

  return (
    <div className="w-full">
  {symbols.map((symbol, index) => (
    <div className="flex flex-col gap-4 mb-4 md:flex-row" key={index}>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Symbol</label>
        <input
          className="bg-gray-100 border-rose-500 border-b-4 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full "
          type="text"
          value={symbol}
          onChange={(e) => onSymbolChange(index, e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Probability</label>
        <input
          className="bg-gray-100 border-blue-700 border-b-4 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full "
          type="number"
          value={probabilities[index]}
          onChange={(e) => onProbabilityChange(index, e.target.value)}
        />
      </div>
    </div>
  ))}
  <div className="flex flex-col md:flex-row gap-4">
    <button className="bg-green-700 text-white py-2 px-4 rounded-md w-full md:w-auto" onClick={onAddSymbol}>
      Add Symbol
    </button>
    <button className="bg-red-700 text-white py-2 px-4 rounded-md w-full md:w-auto" onClick={handleConvert}>
      Convert
    </button>
  </div>
  {converted && <p className="mt-4 text-center">Conversion complete!</p>}
</div>

  
  );
};

export default SymbolInput;
