import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { formatIDR } from '../utils/utils';

export default function ResultBar({ totalPV, totalFV, inflationEnabled }) {
  return (
    <AnimatePresence>
      {totalPV > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-8 pt-4 flex justify-center bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pointer-events-none">
          <motion.div
            layout
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="w-full max-w-[440px] bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 flex items-center justify-between pointer-events-auto border border-slate-800"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5 flex items-center gap-1.5">
                Total Biaya Pendidikan
                {inflationEnabled && (
                  <span className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-sm text-[8px] border border-blue-500/20">
                    FV
                  </span>
                )}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-white text-xl font-black tracking-tight leading-none">
                  {formatIDR(inflationEnabled ? totalFV : totalPV)}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/40">
                <GraduationCap className="text-white" size={24} />
              </div>
            </div>
          </motion.div>
        </footer>
      )}
    </AnimatePresence>
  );
}
