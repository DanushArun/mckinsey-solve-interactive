import { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
    } else if (value === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-mckinsey-blue text-white px-6 py-3 rounded-full shadow-lg hover:bg-opacity-90 z-50"
      >
        Calculator
      </button>
    );
  }

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-2xl border-2 border-gray-300 z-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">Calculator</span>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
      </div>

      <input
        type="text"
        value={display}
        readOnly
        className="w-full p-2 mb-2 text-right border-2 border-gray-300 rounded font-mono text-lg"
      />

      <div className="grid grid-cols-4 gap-2">
        {buttons.map(btn => (
          <button
            key={btn}
            onClick={() => handleButton(btn)}
            className={`
              p-3 rounded font-semibold
              ${isNaN(Number(btn)) && btn !== '.' ? 'bg-mckinsey-blue text-white' : 'bg-gray-200'}
              hover:opacity-80
            `}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={() => handleButton('C')}
          className="col-span-4 p-3 rounded font-semibold bg-red-500 text-white hover:opacity-80"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
