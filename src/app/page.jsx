'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
import BeforeAfterStudio from '../components/BeforeAfterStudio';
import ProcessSection from '../components/ProcessSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import CredentialsSection from '../components/CredentialsSection';
import EstimatorSection from '../components/EstimatorSection';
import TenderModal from '../components/TenderModal';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function Home() {
  const [currency, setCurrency] = useState('ETB');
  const [isTenderModalOpen, setIsTenderModalOpen] = useState(false);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'ETB' ? 'USD' : 'ETB'));
  };

  return (
    <>
      <Header
        currency={currency}
        onToggleCurrency={toggleCurrency}
        onOpenTenderModal={() => setIsTenderModalOpen(true)}
      />

      <main id="main-content">
        <Hero currency={currency} />
        <ProofStrip />
        <BeforeAfterStudio currency={currency} />
        <ProcessSection />
        <CapabilitiesSection />
        <CredentialsSection onOpenTenderModal={() => setIsTenderModalOpen(true)} />
        <EstimatorSection currency={currency} />
      </main>

      <TenderModal
        isOpen={isTenderModalOpen}
        onClose={() => setIsTenderModalOpen(false)}
      />

      <Footer />
      <FloatingActions />
    </>
  );
}
