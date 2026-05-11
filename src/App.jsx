import { useMemo } from "react";
import { AnimatePresence } from "motion/react";

// Hooks
import { useEducationLevels } from "./hooks/useEducationLevels";
import { useInflation } from "./hooks/useInflation";
import { useUIState } from "./hooks/useUIState";

// Components
import Header from "./components/Header";
import LevelAccordion from "./components/LevelAccordion";
import InflationToggle from "./components/InflationToggle";
import DocumentationAccordion from "./components/DocumentationAccordion";
import ResultBar from "./components/ResultBar";
import Footer from "./components/Footer";
import OnboardingModal from "./components/OnBoardingModal";

// Utils & Constants
import { calculateTotals } from "./utils/calculationUtils";
import { INITIAL_LEVELS } from "./constants";
import "./App.css";

export default function App() {
  // State Management
  const { levels, updateLevel, updateExtra } = useEducationLevels();
  const { inflationEnabled, inflationRate, setInflationRate, toggleInflation } = useInflation();
  const { showOnboarding, setShowOnboarding, activeAccordion, toggleAccordion } = useUIState();

  // Calculate totals
  const totals = useMemo(() => {
    return calculateTotals(levels, inflationEnabled, inflationRate);
  }, [levels, inflationEnabled, inflationRate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-32">
      <AnimatePresence>
        {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      </AnimatePresence>

      {/* Header */}
      <Header onHelpClick={() => setShowOnboarding(true)} />

      {/* Main Content */}
      <main className="w-full max-w-[480px] px-6 space-y-4">
        {/* Education Accordions */}
        <div className="space-y-3">
          {levels.map((level) => (
            <LevelAccordion
              key={level.id}
              level={level}
              isActive={activeAccordion === level.id}
              onToggle={() => toggleAccordion(level.id)}
              onUpdateLevel={updateLevel}
              onUpdateExtra={updateExtra}
            />
          ))}
        </div>

        <hr className="border-slate-200 my-6" />

        {/* Inflation Toggle */}
        <InflationToggle
          isEnabled={inflationEnabled}
          rate={inflationRate}
          onToggle={toggleInflation}
          onRateChange={setInflationRate}
        />

        <hr className="border-slate-200 my-6" />

        {/* Documentation */}
        <DocumentationAccordion
          isActive={activeAccordion === "docs"}
          onToggle={() => toggleAccordion("docs")}
        />

        {/* Footer */}
        <Footer />
      </main>

      {/* Sticky Result Bar */}
      <ResultBar
        totalPV={totals.totalPV}
        totalFV={totals.totalFV}
        inflationEnabled={inflationEnabled}
      />
    </div>
  );
}
