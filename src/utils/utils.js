export const formatIDR = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const parseRawNumber = (str) => {
  return Number(str.replace(/[^\d]/g, '')) || 0;
};

export const maskNumber = (val) => {
  const num = typeof val === 'string' ? parseRawNumber(val) : val;
  if (num === 0) return '';
  return new Intl.NumberFormat('id-ID').format(num);
};

export const calculateFutureValue = (pv, rate, yearsFromNow) => {
  if (rate === 0) return pv;
  return pv * Math.pow(1 + rate / 100, yearsFromNow);
};
