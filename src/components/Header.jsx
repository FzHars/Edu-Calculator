import { motion } from 'motion/react';
import { GraduationCap, HelpCircle } from 'lucide-react';

export default function Header({ onHelpClick }) {
  return (
    <header className="w-full max-w-[480px] pt-12 px-6 mb-8 text-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
          <GraduationCap className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">EduCost Predictor</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Perencana Biaya Pendidikan Masa Depan
          </p>
        </div>
        <button
          onClick={onHelpClick}
          className="mt-2 py-2 px-5 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
        >
          <HelpCircle size={16} className="text-blue-500" />
          Cara Pakai
          <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full text-[10px] flex items-center justify-center">
            💡
          </span>
        </button>
      </motion.div>
    </header>
  );
}
