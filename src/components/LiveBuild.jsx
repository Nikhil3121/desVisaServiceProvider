import { useState, useEffect, useRef } from "react";

const steps = [
  "Analyzing Requirements...",
  "Designing UI System...",
  "Setting Up Backend...",
  "Integrating AI Modules...",
  "Deploying System..."
];

const LiveBuild = () => {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startBuild = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setActive(true);
    setStepIndex(0);
    setProgress(0);

    let i = 0;

    intervalRef.current = setInterval(() => {
      i++;
      setStepIndex(i);
      setProgress((i / (steps.length - 1)) * 100);

      if (i >= steps.length - 1) {
        clearInterval(intervalRef.current);
      }
    }, 1200);
  };

  return (
    <section className="relative mt-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 blur-3xl" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl mb-3 neon-text">
          Live Build System
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Experience how your idea transforms into a real system
        </p>

        <button
          onClick={startBuild}
          className="btn-primary mb-10"
          aria-label="Initiate Build Sequence"
        >
          Initiate Build Sequence
        </button>

        {active && (
          <div className="glass-premium p-6 space-y-5 text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 blur-xl animate-pulse pointer-events-none" />

            <div className="flex justify-between text-xs text-gray-400 relative z-10">
              <span className="text-cyan-400">SYSTEM ACTIVE</span>
              <span>{progress.toFixed(0)}%</span>
            </div>

            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative z-10">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              />
            </div>

            <div className="space-y-2 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-sm transition-all duration-500 ${
                    index <= stepIndex
                      ? "text-cyan-400"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-xs" aria-hidden="true">
                    {index < stepIndex ? "✔" : index === stepIndex ? "⏳" : "○"}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-500 mt-3 relative z-10">
              {stepIndex < steps.length - 1
                ? "Building modules..."
                : "System deployed successfully."}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveBuild;