import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export default function InflationToggle({
  isEnabled,
  rate,
  onToggle,
  onRateChange
}) {
  return (
    <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div
          className={`p-2.5 rounded-xl transition-colors mt-0.5 ${isEnabled ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"}`}
        >
          <TrendingUp size={20} />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-none">Asumsi Inflasi</h3>
            <p className="text-xs text-slate-500 mt-1">Kenaikan biaya tahunan</p>
          </div>
          {isEnabled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit"
            >
              <input
                type="number"
                value={rate}
                onChange={(e) => onRateChange(Number(e.target.value))}
                className="w-10 bg-transparent text-sm font-bold text-slate-700 outline-none text-center"
              />
              <span className="text-xs font-bold text-slate-400 font-mono">%</span>
            </motion.div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={onToggle}
          className={`w-12 h-6 rounded-full p-1 transition-colors relative ${isEnabled ? "bg-blue-600" : "bg-slate-200"}`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transition-transform ${isEnabled ? "translate-x-6" : "translate-x-0"} shadow-md`}
          />
        </button>
      </div>
    </section>
  );
}
