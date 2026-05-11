import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, X, CheckCircle2, GraduationCap, Calculator, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: 'Selamat Datang',
    description: 'Prediksi biaya pendidikan masa depan buah hati Anda dengan EduCost Predictor.',
    icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
  },
  {
    title: 'Isi Data Biaya',
    description: 'Masukkan perkiraan biaya sekolah sekarang untuk jenjang SD, SMP, SMA, hingga Kuliah.',
    icon: <Calculator className="w-12 h-12 text-blue-500" />,
  },
  {
    title: 'Gunakan Inflasi',
    description: 'Aktifkan fitur inflasi untuk melihat nilai biaya di masa depan sesuai asumsi kenaikan tahunan.',
    icon: <TrendingUp className="w-12 h-12 text-blue-500" />,
  }
];

export default function OnboardingModal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      onClose();
    }
  };

  const back = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-0">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 pb-4 flex flex-col items-center text-center">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-blue-50 rounded-2xl"
          >
            {steps[currentStep].icon}
          </motion.div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {steps[currentStep].description}
          </p>
        </div>

        <div className="px-8 pb-8 flex flex-col gap-4">
          {/* Progress Dots */}
          <div className="flex justify-center gap-1.5 py-4">
            {steps.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-blue-500' : 'w-1.5 bg-slate-200'}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={back}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft size={16} />
                Kembali
              </button>
            )}
            <button
              onClick={next}
              className="flex-[2] py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              {currentStep === steps.length - 1 ? 'Mulai Sekarang' : 'Lanjut'}
              {currentStep === steps.length - 1 ? <CheckCircle2 size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
