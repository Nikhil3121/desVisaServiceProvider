import { useEffect, useState } from "react";

const CursorLight = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const glowStyle = {
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0, 229, 255, 0.27) 0%, rgba(0,229,255,0.05) 40%, transparent 70%)",
    filter: "blur(40px)",
    transform: "translate(-50%, -50%)",
  };

  const containerStyle = {
    transform: `translate(${pos.x}px, ${pos.y}px)`,
  };

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50"
      style={containerStyle}
      aria-hidden="true"
    >
      <div style={glowStyle} />
    </div>
  );
};

export default CursorLight;