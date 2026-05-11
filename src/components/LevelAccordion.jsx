import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, BookOpen, Users, History, GraduationCap } from 'lucide-react';
import CurrencyInput from './CurrencyInput';

const LEVEL_ICONS = {
  sd: BookOpen,
  smp: Users,
  sma: History,
  s1: GraduationCap
};

export default function LevelAccordion({
  level,
  isActive,
  onToggle,
  onUpdateLevel,
  onUpdateExtra
}) {
  const IconComponent = LEVEL_ICONS[level.id];

  return (
    <div
      className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${isActive ? "border-blue-200 shadow-xl shadow-blue-500/5 ring-1 ring-blue-100" : "border-slate-100 shadow-sm"}`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-400"}`}
          >
            <IconComponent size={20} />
          </div>
          <div>
            <h2
              className={`text-sm font-bold ${isActive ? "text-slate-900" : "text-slate-600"}`}
            >
              {level.name}
            </h2>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">
              {level.years} TAHUN MASA STUDI
            </p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-slate-300 transition-transform duration-300 ${isActive ? "rotate-180 text-blue-500" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 space-y-6">
              {/* Lama Studi Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Lama Studi
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={level.years}
                    onChange={(e) => onUpdateLevel(level.id, 'years', Number(e.target.value))}
                    className="flex-1 bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  />
                  <span className="text-xs font-medium text-slate-400">tahun</span>
                </div>
              </div>

              {/* Pangkal Input */}
              <CurrencyInput
                id={`${level.id}-pangkal`}
                label="Biaya Pangkal / Pendaftaran"
                value={level.pangkal}
                onChange={(v) => onUpdateLevel(level.id, 'pangkal', v)}
              />

              {/* Monthly Expenses */}
              <div className="space-y-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Biaya Bulanan
                </p>
                <div className="space-y-4">
                  <CurrencyInput
                    id={`${level.id}-spp`}
                    label="SPP per Bulan"
                    value={level.spp}
                    onChange={(v) => onUpdateLevel(level.id, 'spp', v)}
                  />
                  <CurrencyInput
                    id={`${level.id}-transport`}
                    label="Transport per Bulan"
                    value={level.transport}
                    onChange={(v) => onUpdateLevel(level.id, 'transport', v)}
                  />
                  <CurrencyInput
                    id={`${level.id}-jajan`}
                    label="Jajan per Bulan"
                    value={level.jajan}
                    onChange={(v) => onUpdateLevel(level.id, 'jajan', v)}
                  />
                </div>
              </div>

              {/* Extra Costs */}
              <div className="space-y-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Biaya Tambahan
                </p>
                <div className="space-y-4">
                  <CurrencyInput
                    id={`${level.id}-books`}
                    label="Buku & Alat Tulis"
                    value={level.extra.books}
                    onChange={(v) => onUpdateExtra(level.id, 'books', v)}
                  />
                  <CurrencyInput
                    id={`${level.id}-courses`}
                    label="Kursus / Les Tambahan"
                    value={level.extra.courses}
                    onChange={(v) => onUpdateExtra(level.id, 'courses', v)}
                  />
                  <CurrencyInput
                    id={`${level.id}-competitions`}
                    label="Kompetisi / Lomba"
                    value={level.extra.competitions}
                    onChange={(v) => onUpdateExtra(level.id, 'competitions', v)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
