import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  HelpCircle,
  ChevronDown,
  BookOpen,
  Users,
  Trophy,
  TrendingUp,
  Info,
  History,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { formatIDR, calculateFutureValue } from "./utils/utils.js";
import CurrencyInput from "./components/CurrencyInput.jsx";
import OnboardingModal from "./components/OnBoardingModal.jsx";
import "./App.css";

const INITIAL_LEVELS = [
  { 
    id: 'sd', 
    name: 'Sekolah Dasar (SD)', 
    defaultYears: 6, 
    years: 6, 
    pangkal: 0, spp: 0, transport: 0, jajan: 0, 
    extra: { books: 0, courses: 0, competitions: 0 } 
  },
  { 
    id: 'smp', 
    name: 'SMP', 
    defaultYears: 3, 
    years: 3, 
    pangkal: 0, spp: 0, transport: 0, jajan: 0, 
    extra: { books: 0, courses: 0, competitions: 0 } 
  },
  { 
    id: 'sma', 
    name: 'SMA', 
    defaultYears: 3, 
    years: 3, 
    pangkal: 0, spp: 0, transport: 0, jajan: 0, 
    extra: { books: 0, courses: 0, competitions: 0 } 
  },
  { 
    id: 's1', 
    name: 'Kuliah (S1)', 
    defaultYears: 4, 
    years: 4, 
    pangkal: 0, spp: 0, transport: 0, jajan: 0, 
    extra: { books: 0, courses: 0, competitions: 0 } 
  }
];

export default function App() {
  const [levels, setLevels] = useState(INITIAL_LEVELS);
  const [inflationEnabled, setInflationEnabled] = useState(false);
  const [inflationRate, setInflationRate] = useState(10);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState();

  const updateLevel = (id, field, value) => {
    setLevels((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const updateExtra = (id, field, value) => {
    setLevels((prev) =>
      prev.map((l) => (l.id === id ? { ...l, extra: { ...l.extra, [field]: value } } : l)),
    );
  };

  const totals = useMemo(() => {
    let totalPV = 0;
    let totalFV = 0;

    const progression = { sd: 0, smp: 6, sma: 9, s1: 12 };

    const calculatedLevels = levels.map((level) => {
      const annualSPP = level.spp * 12;
      const annualTransport = level.transport * 12;
      const annualJajan = level.jajan * 12;
      const annualTotal = annualSPP + annualTransport + annualJajan;

      const totalPvLevel =
        level.pangkal +
        annualTotal * level.years +
        level.extra.books +
        level.extra.courses +
        level.extra.competitions;
      const yearsFromNow = progression[level.id];
      const totalFvLevel = calculateFutureValue(
        totalPvLevel,
        inflationEnabled ? inflationRate : 0,
        yearsFromNow,
      );

      return { id: level.id, pv: totalPvLevel, fv: totalFvLevel };
    });

    totalPV = calculatedLevels.reduce((sum, item) => sum + item.pv, 0);
    totalFV = calculatedLevels.reduce((sum, item) => sum + item.fv, 0);

    return { totalPV, totalFV };
  }, [levels, inflationEnabled, inflationRate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-32">
      <AnimatePresence>
        {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      </AnimatePresence>

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
            onClick={() => setShowOnboarding(true)}
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

      <main className="w-full max-w-[480px] px-6 space-y-4">
        {/* Education Accordions */}
        <div className="space-y-3">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${activeAccordion === level.id ? "border-blue-200 shadow-xl shadow-blue-500/5 ring-1 ring-blue-100" : "border-slate-100 shadow-sm"}`}
            >
              <button
                onClick={() => setActiveAccordion(activeAccordion === level.id ? null : level.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeAccordion === level.id ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-400"}`}
                  >
                    {level.id === "sd" && <BookOpen size={20} />}
                    {level.id === "smp" && <Users size={20} />}
                    {level.id === "sma" && <History size={20} />}
                    {level.id === "s1" && <GraduationCap size={20} />}
                  </div>
                  <div>
                    <h2
                      className={`text-sm font-bold ${activeAccordion === level.id ? "text-slate-900" : "text-slate-600"}`}
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
                  className={`text-slate-300 transition-transform duration-300 ${activeAccordion === level.id ? "rotate-180 text-blue-500" : ""}`}
                />
              </button>

              <AnimatePresence>
                {activeAccordion === level.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 space-y-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          Lama Studi
                          <Calendar size={12} className="text-slate-300" />
                        </label>
                        <input
                          type="number"
                          value={level.years}
                          onChange={(e) => updateLevel(level.id, "years", Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <CurrencyInput
                          id={`${level.id}-pangkal`}
                          label="Uang Pangkal"
                          value={level.pangkal}
                          onChange={(v) => updateLevel(level.id, "pangkal", v)}
                          placeholder="Misal: 15.000.000"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <CurrencyInput
                          id={`${level.id}-spp`}
                          label="SPP / Bulan"
                          value={level.spp}
                          onChange={(v) => updateLevel(level.id, "spp", v)}
                          placeholder="Misal: 1.500.000"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <CurrencyInput
                          id={`${level.id}-transport`}
                          label="Transport / Bln"
                          value={level.transport}
                          onChange={(v) => updateLevel(level.id, "transport", v)}
                        />
                        <CurrencyInput
                          id={`${level.id}-jajan`}
                          label="Uang Jajan / Bln"
                          value={level.jajan}
                          onChange={(v) => updateLevel(level.id, "jajan", v)}
                        />
                      </div>

                      <div className="pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-2 mb-4">
                          <Trophy size={14} className="text-amber-500" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Biaya Ekstra (Opsional)
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <CurrencyInput
                            id={`${level.id}-books`}
                            label="Buku & Seragam (Total)"
                            value={level.extra.books}
                            onChange={(v) => updateExtra(level.id, "books", v)}
                          />
                          <CurrencyInput
                            id={`${level.id}-courses`}
                            label="Les / Kursus (Total)"
                            value={level.extra.courses}
                            onChange={(v) => updateExtra(level.id, "courses", v)}
                          />
                          <CurrencyInput
                            id={`${level.id}-competitions`}
                            label="Lomba / Lainnya (Total)"
                            value={level.extra.competitions}
                            onChange={(v) => updateExtra(level.id, "competitions", v)}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <hr className="border-slate-200 my-6" />

        {/* Inflation Toggle Card */}
        <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`p-2.5 rounded-xl transition-colors mt-0.5 ${inflationEnabled ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"}`}
            >
              <TrendingUp size={20} />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-none">Asumsi Inflasi</h3>
                <p className="text-xs text-slate-500 mt-1">Kenaikan biaya tahunan</p>
              </div>
              {inflationEnabled && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit"
                >
                  <input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-10 bg-transparent text-sm font-bold text-slate-700 outline-none text-center"
                  />
                  <span className="text-xs font-bold text-slate-400 font-mono">%</span>
                </motion.div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setInflationEnabled(!inflationEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative ${inflationEnabled ? "bg-blue-600" : "bg-slate-200"}`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${inflationEnabled ? "translate-x-6" : "translate-x-0"} shadow-md`}
              />
            </button>
          </div>
        </section>

        <hr className="border-slate-200 my-6" />

        {/* Documentation Section */}
        <div
          className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${activeAccordion === "docs" ? "border-blue-200 shadow-xl shadow-blue-500/5 ring-1 ring-blue-100" : "border-slate-100 shadow-sm"}`}
        >
          <button
            onClick={() => setActiveAccordion(activeAccordion === "docs" ? null : "docs")}
            className="w-full px-6 py-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeAccordion === "docs" ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-400"}`}
              >
                <BookOpen size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-none">
                Dokumentasi & Referensi
              </h3>
            </div>
            <ChevronDown
              size={20}
              className={`text-slate-300 transition-transform duration-300 ${activeAccordion === "docs" ? "rotate-180 text-blue-500" : ""}`}
            />
          </button>

          <AnimatePresence>
            {activeAccordion === "docs" && (
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

        <footer className="w-full py-12 mt-8 border-t border-slate-200">
          <div className="flex flex-col gap-8 text-center px-2">
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <AlertCircle size={14} />
                <p className="text-[10px] font-bold uppercase tracking-widest">
                  Disclaimer Penting
                </p>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-[320px] mx-auto font-medium">
                Hasil perhitungan ini adalah simulasi dan estimasi. Biaya riil bergantung pada
                kebijakan masing-masing instansi pendidikan serta fluktuasi ekonomi di masa depan.
              </p>
            </div>

            <div className="pt-4 flex flex-col items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center grayscale opacity-50">
                <GraduationCap size={20} className="text-slate-900" />
              </div>
              <p className="text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">
                EduCost Predictor
              </p>
              <p className="text-[10px] text-slate-400">
                © 2026 EduCost Predictor | Simulasi Biaya Pendidikan
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Sticky Result Bar */}
      <AnimatePresence>
        {totals.totalPV > 0 && (
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
                    {formatIDR(inflationEnabled ? totals.totalFV : totals.totalPV)}
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
    </div>
  );
}
