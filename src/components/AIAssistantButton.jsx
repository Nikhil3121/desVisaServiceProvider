import { createPortal } from "react-dom";

export const AIAssistantButton = ({ onClick, hasNotification = false }) => {
  return createPortal(
    <>
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] group flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/60 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.05] active:scale-95 hover:shadow-xl hover:shadow-cyan-500/20"
        aria-label="Open AI Assistant chat"
      >
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/0 group-hover:bg-cyan-500/5 blur-lg transition-all duration-300 pointer-events-none" />

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 group-hover:from-cyan-500/10 group-hover:to-blue-500/8 transition-all duration-300 pointer-events-none" />

        <div className="relative flex items-center justify-center w-5 h-5">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-glow-pulse -z-10" />
          <span className="text-lg animate-float-rotate" aria-hidden="true">
            ⚡
          </span>
        </div>

        <span className="relative bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 bg-clip-text text-transparent group-hover:from-cyan-100 group-hover:via-cyan-50 group-hover:to-blue-100 transition-all duration-300 animate-text-shimmer">
          Ask AI
        </span>

        {hasNotification && (
          <>
            <div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 border-2 border-white/80 shadow-lg shadow-red-500/50 animate-badge-pulse"
              aria-label="New notification"
            />
            <div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-red-500/50 animate-badge-ring"
              aria-hidden="true"
            />
          </>
        )}

        <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 group-hover:border-cyan-400/40 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300 pointer-events-none" />

        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-md border border-cyan-500/40 rounded-lg text-xs text-cyan-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg shadow-black/50 before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:translate-y-full before:border-4 before:border-transparent before:border-t-black/90">
          Ask AI about your project
        </div>
      </button>

      <style>{`
        @keyframes float-rotate {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-4px) rotate(2deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes text-shimmer {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.4;
            filter: blur(8px);
          }
          50% {
            opacity: 0.7;
            filter: blur(12px);
          }
        }

        @keyframes badge-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        @keyframes badge-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-float-rotate {
          animation: float-rotate 4s ease-in-out infinite;
        }

        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2.5s ease-in-out infinite;
        }

        .animate-badge-pulse {
          animation: badge-pulse 1.5s ease-in-out infinite;
        }

        .animate-badge-ring {
          animation: badge-ring 1.5s ease-out infinite;
        }

        .group {
          will-change: transform;
        }
      `}</style>
    </>,
    document.body,
  );
};
