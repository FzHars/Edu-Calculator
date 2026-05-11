import { useState } from 'react';
import { INITIAL_LEVELS } from '../constants';

export function useEducationLevels() {
  const [levels, setLevels] = useState(INITIAL_LEVELS);

  const updateLevel = (id, field, value) => {
    setLevels((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const updateExtra = (id, field, value) => {
    setLevels((prev) =>
      prev.map((l) => (l.id === id ? { ...l, extra: { ...l.extra, [field]: value } } : l))
    );
  };

  return { levels, updateLevel, updateExtra };
}
