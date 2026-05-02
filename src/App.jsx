import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HumanSection from "./components/HumanSection";
import Vision from "./components/Vision";
import Footer from "./components/Footer";
import { AIAssistant } from "./components/AIPannel";
import { AIAssistantButton } from "./components/AIAssistantButton";
import LiveBuild from "./components/LiveBuild";
import { useAIAssistant } from "./hooks/useAIassistant";
import ProjectSystem from "./components/ProjectSystem";
import BuildProcess from "./components/BuildProcess";
import FinalCTA from "./components/FinalCTA";
import StartProject from "./components/Startproject";
import Contact from "./components/Contact"; 

const Home = ({
  isOpen,
  isMinimized,
  openAssistant,
  closeAssistant,
  toggleMinimize,
  hasNewMessage,
}) => {
  return (
    <>
      <Hero />

      <AIAssistant
        isOpen={isOpen}
        isMinimized={isMinimized}
        onClose={closeAssistant}
        onMinimize={toggleMinimize}
      />

      <AIAssistantButton
        onClick={openAssistant}
        hasNotification={hasNewMessage}
      />

      <LiveBuild />
      <ProjectSystem />
      <BuildProcess />
      <Services />
      <HumanSection />
      <Vision />
      <FinalCTA />
      <Footer />
    </>
  );
};

function App() {
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const {
    isOpen,
    isMinimized,
    openAssistant,
    closeAssistant,
    toggleMinimize,
  } = useAIAssistant();

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />

      <Routes>
        {/* ✅ Home Route */}
        <Route
          path="/"
          element={
            <Home
              isOpen={isOpen}
              isMinimized={isMinimized}
              openAssistant={openAssistant}
              closeAssistant={closeAssistant}
              toggleMinimize={toggleMinimize}
              hasNewMessage={hasNewMessage}
            />
          }
        />

        {/* ✅ Start Project Page */}
        <Route path="/start-project" element={<StartProject />} />

        {/* ✅ Contact Page */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;