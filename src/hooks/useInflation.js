import { useState } from 'react';

export function useInflation() {
  const [inflationEnabled, setInflationEnabled] = useState(false);
  const [inflationRate, setInflationRate] = useState(10);

  const toggleInflation = () => setInflationEnabled(!inflationEnabled);

  return { inflationEnabled, inflationRate, setInflationRate, toggleInflation };
}
