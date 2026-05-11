import { LEVEL_PROGRESSION } from '../constants';

export const calculateLevelTotal = (level) => {
  const annualSPP = level.spp * 12;
  const annualTransport = level.transport * 12;
  const annualJajan = level.jajan * 12;
  const annualTotal = annualSPP + annualTransport + annualJajan;

  return {
    annualTotal,
    totalPV:
      level.pangkal +
      annualTotal * level.years +
      level.extra.books +
      level.extra.courses +
      level.extra.competitions
  };
};

export const calculateLevelFutureValue = (pv, inflationRate, levelId, inflationEnabled) => {
  const yearsFromNow = LEVEL_PROGRESSION[levelId];
  const rate = inflationEnabled ? inflationRate : 0;
  
  if (rate === 0) return pv;
  return pv * Math.pow(1 + rate / 100, yearsFromNow);
};

export const calculateTotals = (levels, inflationEnabled, inflationRate) => {
  let totalPV = 0;
  let totalFV = 0;

  const calculatedLevels = levels.map((level) => {
    const { totalPV: levelPV } = calculateLevelTotal(level);
    const levelFV = calculateLevelFutureValue(levelPV, inflationRate, level.id, inflationEnabled);

    return { id: level.id, pv: levelPV, fv: levelFV };
  });

  totalPV = calculatedLevels.reduce((sum, item) => sum + item.pv, 0);
  totalFV = calculatedLevels.reduce((sum, item) => sum + item.fv, 0);

  return { totalPV, totalFV };
};
