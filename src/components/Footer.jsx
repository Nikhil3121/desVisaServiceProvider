import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-cyan-500/20 py-12 bg-black/80">
      <div className="max-w-7xl mx-auto px-8 text-center text-gray-400 text-sm">
        <p>©{currentYear} Desvisa. Simplifying immigration. Empowering futures.</p>
      </div>
    </footer>
  );
};

export default Footer;