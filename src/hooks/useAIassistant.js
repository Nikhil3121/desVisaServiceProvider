import { useState } from "react";

export const useAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const openAssistant = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const closeAssistant = () => {
    setIsOpen(false);
  };

  const toggleMinimize = (value) => {
    setIsMinimized(value);
  };

  return {
    isOpen,
    isMinimized,
    openAssistant,
    closeAssistant,
    toggleMinimize,
  };
};