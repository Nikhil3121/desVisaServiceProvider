import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ProjectSystem() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [systemText, setSystemText] = useState('Rendering modules...');

  const projects = [
    {
      id: 1,
      name: "E-Commerce System",
      status: "Completed",
      modules: ["Product Engine", "Cart System", "Payment Gateway", "Admin Panel"],
      tech: ["React", "Node.js", "Stripe"],
      timeline: "3 weeks",
      description: "Scalable e-commerce platform with secure payments and inventory management."
    },
    {
      id: 2,
      name: "AI SaaS Dashboard",
      status: "In Progress",
      modules: ["AI Engine", "User Analytics", "Subscription System"],
      tech: ["React", "OpenAI API", "Firebase"],
      timeline: "Ongoing",
      description: "AI-powered SaaS platform with real-time analytics and predictive insights."
    },
    {
      id: 3,
      name: "Portfolio Generator",
      status: "Live",
      modules: ["CMS", "Template Engine", "Deployment System"],
      tech: ["Next.js", "Node.js"],
      timeline: "2 weeks",
      description: "Dynamic portfolio builder for creators with one-click deployment."
    }
  ];

  useEffect(() => {
    const texts = [
      'Rendering modules...',
      'System optimized...',
      'Deploying components...',
      'Connection stable...'
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setSystemText(texts[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 border-green-400/30 text-green-400 rounded-full';
      case 'In Progress':
        return 'bg-yellow-500/10 border-yellow-400/30 text-yellow-400 rounded-full';
      case 'Live':
        return 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400 rounded-full';
      default:
        return 'bg-cyan-500/10 border-cyan-400/30 text-cyan-400 rounded-full';
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden" id="projects">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(34, 211, 238, 0.5), inset 0 0 20px rgba(34, 211, 238, 0.2);
          }
        }

        @keyframes scan-lines {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: -1000px 0;
          }
          50% {
            background-position: 1000px 0;
          }
        }

        @keyframes border-glow {
          0%, 100% {
            border-color: rgba(34, 211, 238, 0.3);
            box-shadow: 0 0 15px rgba(34, 211, 238, 0.2);
          }
          50% {
            border-color: rgba(34, 211, 238, 0.8);
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.4);
          }
        }

        @keyframes fade-in-text {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }

        .float {
          animation: float 6s ease-in-out infinite;
        }

        .float-delay-1 {
          animation-delay: 0s;
        }

        .float-delay-2 {
          animation-delay: 2s;
        }

        .float-delay-3 {
          animation-delay: 4s;
        }

        .glow-border {
          animation: border-glow 3s ease-in-out infinite;
        }

        .scan-line {
          animation: scan-lines 8s linear infinite;
        }

        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .fade-text {
          animation: fade-in-text 3s ease-in-out infinite;
        }

        .grid-background {
          background-image:
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

      <div className="absolute inset-0 grid-background" />

      <div className="absolute inset-0 pointer-events-none scan-line opacity-20 border-b border-cyan-500/20" style={{ height: '2px' }} />

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-16">
        <div className="mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="text-xs font-mono text-green-400 tracking-widest fade-text uppercase">
              [SYSTEM ONLINE]
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide mb-2">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">LIVE PROJECT SYSTEM</span>
          </h1>

          <p className="text-cyan-300/70 text-sm md:text-base font-mono mb-6 drop-shadow-[0_0_4px_rgba(0,255,255,0.2)]">
            Real systems built with scalable architecture
          </p>

          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs font-mono text-cyan-400/70 fade-text">{systemText}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-mono uppercase">● System Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`float float-delay-${index + 1}`}
            >
              <button
                onClick={() => setSelectedProject(project)}
                className="
                  w-full relative group cursor-pointer
                  bg-black/40 backdrop-blur-xl border-2 rounded-xl overflow-hidden
                  transition-all duration-300 transform hover:scale-105 hover:-translate-y-2
                  glow-border
                "
                aria-label={`View ${project.name} details`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer-effect pointer-events-none" />

                <div className="relative p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] transition-all">
                        {project.name}
                      </h2>
                    </div>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-mono text-green-400">● System Active</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest">Modules</p>
                    <div className="flex flex-wrap gap-2">
                      {project.modules.map((module, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono hover:bg-cyan-500/20 transition-colors group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-cyan-500/20">
                    <p className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest mb-2">Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded font-mono group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]"
                        >
                          <span className="text-cyan-500">•</span> <span className="text-gray-400">{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-cyan-400/60 pt-2">
                    Timeline: <span className="text-cyan-400 font-medium drop-shadow-[0_0_6px_rgba(0,255,255,0.3)]">{project.timeline}</span>
                  </div>

                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-mono text-cyan-400 inline-flex items-center gap-1">
                      VIEW SYSTEM →
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs font-mono text-cyan-400/60">
            <span className="text-green-400">●</span> [3/3 SYSTEMS ONLINE] • Last sync: Now
          </p>
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full max-w-2xl max-h-[85vh] overflow-y-auto
              bg-black/60 backdrop-blur-2xl border-2 border-cyan-500/50 rounded-2xl
              p-8 space-y-6 glow-border
              animate-in fade-in zoom-in duration-300
            "
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-cyan-400" />
            </button>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400 uppercase tracking-widest">System Details</span>
              </div>

              <h2 className="text-3xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent tracking-wide mb-4">
                {selectedProject.name}
              </h2>

              <div className={`inline-block text-sm font-mono px-4 py-2 border ${getStatusColor(selectedProject.status)}`}>
                Status: {selectedProject.status}
              </div>
            </div>

            <div>
              <p className="text-cyan-100/80 leading-relaxed drop-shadow-[0_0_4px_rgba(0,255,255,0.2)]">
                {selectedProject.description}
              </p>
            </div>

            <div>
              <h3 className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest mb-4">Core Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProject.modules.map((module, idx) => (
                  <div
                    key={idx}
                    className="
                      p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30
                      flex items-center gap-3 group hover:bg-cyan-500/20 transition-colors
                    "
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                    <span className="text-cyan-300 font-mono text-sm group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]">{module}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="
                      px-4 py-2 rounded-lg
                      bg-blue-500/10 border border-blue-500/30
                      text-blue-300 font-mono text-sm
                      hover:bg-blue-500/20 hover:border-blue-400/50 transition-colors
                      hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/20">
              <h3 className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest mb-2">Timeline</h3>
              <p className="text-lg text-cyan-400 font-mono font-medium drop-shadow-[0_0_6px_rgba(0,255,255,0.3)]">{selectedProject.timeline}</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="
                  w-full py-3 rounded-lg
                  bg-cyan-500/20 border border-cyan-500/50
                  text-cyan-300 font-mono text-sm uppercase tracking-widest
                  hover:bg-cyan-500/30 hover:border-cyan-400/70
                  transition-all duration-300
                "
              >
                Close System Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}