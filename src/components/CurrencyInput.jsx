import { maskNumber, parseRawNumber } from '../utils/utils';

export default function CurrencyInput({ label, value, onChange, placeholder, id }) {
  const handleChange = (e) => {
    const raw = parseRawNumber(e.target.value);
    onChange(raw);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rp</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={maskNumber(value)}
          onChange={handleChange}
          placeholder={placeholder || '0'}
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        />
      </div>
    </div>
  );
}
