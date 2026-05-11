import { useState } from 'react';

export function useUIState() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return { showOnboarding, setShowOnboarding, activeAccordion, toggleAccordion };
}
