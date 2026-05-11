import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, BookOpen } from 'lucide-react';

export default function DocumentationAccordion({ isActive, onToggle }) {
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
            <BookOpen size={20} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 leading-none">
            Dokumentasi & Referensi
          </h3>
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
            <div className="px-6 pb-6 pt-2 space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Rumus Inflasi
                </p>
                <code className="text-sm font-mono font-bold text-blue-600 block">
                  FV = PV * (1 + i)^n
                </code>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed italic">
                  *FV: Future Value, PV: Present Value, i: Laju Inflasi, n: Jarak Tahun
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                  Referensi Inflasi Pendidikan
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Laju inflasi biaya pendidikan di Indonesia secara historis diestimasikan
                  mencapai <span className="text-blue-600 font-bold">10% - 15%</span> per tahun
                  (Sumber: OJK & Data Riset Keuangan).
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
