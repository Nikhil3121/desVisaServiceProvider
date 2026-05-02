import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
};

export const AIAssistant = ({ isOpen, isMinimized, onMinimize, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState("full");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
  });
  const [followUpExpanded, setFollowUpExpanded] = useState(null);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isPortrait, setIsPortrait] = useState(
    () => window.innerHeight > window.innerWidth
  );
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const mousePosition = useMousePosition();

  // Handle resize and orientation
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    const handleFocus = () => setKeyboardVisible(true);
    const handleBlur = () => setKeyboardVisible(false);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    inputRef.current?.addEventListener("focus", handleFocus);
    inputRef.current?.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      inputRef.current?.removeEventListener("focus", handleFocus);
      inputRef.current?.removeEventListener("blur", handleBlur);
    };
  }, []);

  const suggestions = [
    "Ecommerce Platform",
    "AI SaaS Tool",
    "Portfolio Website",
    "Mobile App",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage]);

  useEffect(() => {
    if (!response || loading) return;

    let aiText = "";

    if (analysisType === "full") {
      aiText = response?.full?.features?.join?.(", ") || "";
    } else if (analysisType === "timeline") {
      aiText = response?.timeline?.phases?.map((p) => p.phase).join(", ") || "";
    } else {
      aiText = "Analysis complete";
    }

    if (!aiText) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Analysis complete",
          analysis: response,
          analysisType: analysisType,
          id: Date.now(),
        },
      ]);
      setTypingMessage("");
      setResponse(null);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index <= aiText.length) {
        setTypingMessage(aiText.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: aiText,
            analysis: response,
            analysisType: analysisType,
            id: Date.now(),
          },
        ]);
        setTypingMessage("");
        setResponse(null);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [response, loading, analysisType]);

  useEffect(() => {
    if (input !== "") {
      setFollowUpExpanded(null);
      setExpandedMessageId(null);
    }
  }, [messages]);

  if (!isOpen) return null;

  const analyzeProject = (projectIdea) => {
    const text = projectIdea.toLowerCase();
    const analyses = {
      ecommerce: {
        full: {
          idea: projectIdea,
          features: [
            "Product Listing",
            "Cart System",
            "Payment Gateway",
            "Inventory Management",
            "Order Tracking",
          ],
          tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
          cost: "$2000 - $5000",
          timeline: "8-12 weeks",
          team: ["1 Full-Stack Dev", "1 Frontend Dev", "1 DevOps Engineer"],
        },
        timeline: {
          phases: [
            {
              phase: "Setup & Design",
              duration: "2 weeks",
              tasks: "DB schema, API design, UI mockups",
            },
            {
              phase: "Core Features",
              duration: "4 weeks",
              tasks: "Products, cart, checkout",
            },
            {
              phase: "Payments & Admin",
              duration: "2 weeks",
              tasks: "Stripe integration, dashboard",
            },
            {
              phase: "Optimization & Launch",
              duration: "2 weeks",
              tasks: "Performance tuning, deployment",
            },
          ],
        },
        risks: {
          critical: ["Payment security", "Data loss"],
          high: ["Scalability", "Cart abandonment"],
          medium: ["Third-party integration failures", "UX complexity"],
        },
        team: {
          roles: [
            "Full-Stack Developer",
            "Frontend Developer",
            "DevOps Engineer",
            "QA Tester",
          ],
          estimatedHours: "2000-3000",
        },
      },
      ai: {
        full: {
          idea: projectIdea,
          features: [
            "AI Chat Interface",
            "Real-time Processing",
            "Data Analytics",
            "User Learning",
            "API Integration",
          ],
          tech: [
            "React",
            "Python",
            "OpenAI API",
            "FastAPI",
            "PostgreSQL",
            "Redis",
          ],
          cost: "$3000 - $7000",
          timeline: "10-14 weeks",
          team: ["1 ML Engineer", "1 Full-Stack Dev", "1 Frontend Dev"],
        },
        timeline: {
          phases: [
            {
              phase: "Infrastructure Setup",
              duration: "1 week",
              tasks: "Backend, API design, vector DB",
            },
            {
              phase: "AI Integration",
              duration: "3 weeks",
              tasks: "LLM setup, prompt engineering",
            },
            {
              phase: "Frontend & UI",
              duration: "3 weeks",
              tasks: "Chat interface, streaming",
            },
            {
              phase: "Testing & Optimization",
              duration: "2 weeks",
              tasks: "Cost optimization, performance",
            },
          ],
        },
        risks: {
          critical: ["Hallucinations", "Cost overruns"],
          high: ["Rate limiting", "Context window limits"],
          medium: ["User data privacy", "Model reliability"],
        },
        team: {
          roles: [
            "ML Engineer",
            "Backend Developer",
            "Frontend Developer",
            "DevOps",
          ],
          estimatedHours: "2500-3500",
        },
      },
      portfolio: {
        full: {
          idea: projectIdea,
          features: [
            "Landing Page",
            "Projects Showcase",
            "Blog Section",
            "Contact Form",
            "Analytics",
          ],
          tech: ["React", "Next.js", "Tailwind CSS", "Vercel"],
          cost: "$500 - $1500",
          timeline: "3-4 weeks",
          team: ["1 Full-Stack Dev", "1 Designer"],
        },
        timeline: {
          phases: [
            {
              phase: "Design & Planning",
              duration: "1 week",
              tasks: "Wireframes, content structure",
            },
            {
              phase: "Development",
              duration: "2 weeks",
              tasks: "Components, pages, styling",
            },
            {
              phase: "Polish & Deploy",
              duration: "1 week",
              tasks: "SEO, testing, deployment",
            },
          ],
        },
        risks: {
          critical: [],
          high: ["Mobile responsiveness", "SEO ranking"],
          medium: ["Image optimization", "Load times"],
        },
        team: {
          roles: ["Frontend Developer", "Designer"],
          estimatedHours: "400-600",
        },
      },
      default: {
        full: {
          idea: projectIdea,
          features: [
            "User Dashboard",
            "Authentication",
            "Analytics",
            "API Layer",
            "Admin Panel",
          ],
          tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
          cost: "$1200 - $3000",
          timeline: "6-8 weeks",
          team: ["1 Full-Stack Dev", "1 Backend Dev"],
        },
        timeline: {
          phases: [
            {
              phase: "Backend Foundation",
              duration: "2 weeks",
              tasks: "API, DB, authentication",
            },
            {
              phase: "Frontend Development",
              duration: "2 weeks",
              tasks: "UI components, state",
            },
            {
              phase: "Integration & Testing",
              duration: "1 week",
              tasks: "E2E tests, debugging",
            },
            {
              phase: "Deployment",
              duration: "1 week",
              tasks: "CI/CD, monitoring",
            },
          ],
        },
        risks: {
          critical: ["Authentication security", "Data breach"],
          high: ["API performance", "Concurrent users"],
          medium: ["Third-party integrations", "Database optimization"],
        },
        team: {
          roles: ["Full-Stack Developer", "Backend Developer", "QA Engineer"],
          estimatedHours: "1500-2500",
        },
      },
    };

    let category = "default";
    if (text.includes("ecommerce") || text.includes("shop"))
      category = "ecommerce";
    else if (text.includes("ai") || text.includes("chat")) category = "ai";
    else if (text.includes("portfolio") || text.includes("personal"))
      category = "portfolio";
    return analyses[category];
  };

  const handleChatSubmit = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setResponse(null);

    setTimeout(() => {
      const analysis = analyzeProject(input);
      setResponse(analysis);
      setLoading(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => {
      const userMsg = { role: "user", text: suggestion };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);
      setResponse(null);

      setTimeout(() => {
        const analysis = analyzeProject(suggestion);
        setResponse(analysis);
        setLoading(false);
      }, 1200);
    }, 100);
  };

  const handleClear = () => {
    setMessages([]);
    setInput("");
    setResponse(null);
    setTypingMessage("");
    setShowForm(false);
    setSuccessMessage(false);
    setAnalysisType("full");
    setFollowUpExpanded(null);
    setExpandedMessageId(null);
  };

  const handleLeadFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.budget) {
      alert("Please fill all fields");
      return;
    }
    setSuccessMessage(true);
    setFormData({ name: "", email: "", budget: "" });
    setTimeout(() => {
      setShowForm(false);
      setSuccessMessage(false);
    }, 3000);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetFullPlan = (msgId) => {
    setExpandedMessageId(msgId);
    setFollowUpExpanded("fullPlan");
    scrollToBottom();
  };

  const handleEstimateCost = (msgId) => {
    setExpandedMessageId(msgId);
    setFollowUpExpanded("cost");
    scrollToBottom();
  };

  const handleTalkToExpert = () => {
    setShowForm(true);
    scrollToBottom();
  };

  const lastMessage = messages[messages.length - 1];
  const isLastMessageAI = lastMessage?.role === "ai";
  const isResponseComplete = !typingMessage && !loading;
  const shouldShowFollowUp =
    isLastMessageAI && isResponseComplete && lastMessage?.analysis;

  if (isMinimized) {
    return (
      <div
        onClick={() => onMinimize(false)}
        className="fixed bottom-16 right-4 sm:right-8 z-[9999] w-14 h-14 flex items-center justify-center"
      >
        <span className="text-2xl animate-pulse">🤖</span>
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-75" />
      </div>
    );
  }

  const parallaxOffset = isMobile
    ? { x: 0, y: 0 }
    : {
        x: mousePosition.x * 5,
        y: mousePosition.y * 5,
      };

  const panelWidth = isMobile ? "100%" : isPortrait ? "95%" : "450px";
  const panelHeight = isMobile
    ? keyboardVisible
      ? "50vh"
      : "100vh"
    : isPortrait
      ? "80vh"
      : "85vh";

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 backdrop-blur-sm z-[998] pointer-events-auto"
      />

      <div
        ref={panelRef}
        style={{
          position: "fixed",
          right: isMobile ? "8px" : "24px",
          bottom: isMobile ? "8px" : "100px",
          width: panelWidth,
          height: panelHeight,
          maxHeight: "100vh",
          zIndex: 999999,
          transform: isOpen
            ? "translateY(0) scale(1)"
            : "translateY(60px) scale(0.95)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          visibility: isOpen ? "visible" : "hidden",
          transition: "all 300ms ease-out",
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-2xl opacity-60 pointer-events-none"
          style={{
            transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
          }}
        />

        {!isMobile && (
          <div
            className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-radial from-cyan-500/30 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none animate-light-drift"
            style={{
              transform: `translate3d(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px, 0)`,
            }}
          />
        )}

        <div
          className="relative h-full rounded-3xl sm:rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/25 overflow-hidden bg-black/80 backdrop-blur-xl flex flex-col hover:shadow-cyan-500/40 hover:border-cyan-500/50 transition-all duration-300"
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none rounded-3xl sm:rounded-2xl" />

          {/* Header */}
          <div className="flex-shrink-0 border-b border-cyan-500/10 bg-black/50 backdrop-blur-sm relative z-10 px-3 sm:px-5 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/30">
                    ⚡
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-emerald-300 animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-white font-semibold tracking-tight text-sm truncate">
                    Deshvisa CTO
                  </h1>
                  <p className="text-xs text-cyan-400/70 truncate">
                    Advanced Project Analysis
                  </p>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={handleClear}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-gray-400 hover:text-white active:scale-95 hidden sm:block touch-none"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  ⟲
                </button>
                <button
                  onClick={() => onMinimize(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-gray-400 hover:text-white active:scale-95 touch-none"
                  aria-label="Minimize"
                >
                  −
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-gray-400 hover:text-white active:scale-95 touch-none"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-0 sm:px-0 py-2 bg-black/30 border-t border-cyan-500/5 flex items-center gap-2 text-xs text-cyan-400/60 font-medium mt-3">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="truncate">
                System Ready • AI Analysis Mode Active
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-black/40 px-4 sm:px-5 py-4 relative z-10 scroll-smooth"
          >
            {messages.length === 0 && !loading && !typingMessage && (
              <div className="flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] text-center gap-3 sm:gap-4 py-8">
                <div className="text-5xl sm:text-6xl">🚀</div>
                <h2 className="text-base sm:text-lg font-light text-gray-200 tracking-wide px-2">
                  Ready to analyze your project
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed px-2">
                  Describe your idea and get comprehensive analysis including
                  timeline, risks, and team
                </p>

                <div className="pt-4 w-full px-2">
                  <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest font-medium">
                    Try these:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-2 sm:py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 active:scale-95 touch-none"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4 py-2">
              {messages.map((msg, idx) => (
                <div key={idx}>
                  <div
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-300 text-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none"
                          : "bg-white/5 border border-cyan-500/20 text-gray-200 rounded-bl-none"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="leading-relaxed">{msg.text}</p>
                      ) : (
                        <div className="space-y-2 sm:space-y-3">
                          {msg?.analysis && (
                            <>
                              <div>
                                <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                                  📊 Analysis
                                </p>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                  {msg.text}
                                </p>
                              </div>

                              {msg?.analysisType === "full" &&
                                msg?.analysis?.full && (
                                  <>
                                    {Array.isArray(msg.analysis.full.tech) &&
                                      msg.analysis.full.tech.length > 0 && (
                                        <div>
                                          <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                                            ⚙️ Tech Stack
                                          </p>
                                          <div className="flex flex-wrap gap-1.5">
                                            {msg.analysis.full.tech.map(
                                              (tech, i) => (
                                                <span
                                                  key={i}
                                                  className="px-2 py-0.5 rounded text-xs bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 whitespace-nowrap"
                                                >
                                                  {tech}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      )}

                                    {msg.analysis.full.cost && (
                                      <div>
                                        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
                                          💰 Budget
                                        </p>
                                        <p className="text-sm font-semibold text-emerald-300">
                                          {msg.analysis.full.cost}
                                        </p>
                                      </div>
                                    )}

                                    {typeof msg.analysis.full.timeline ===
                                      "string" && (
                                      <div>
                                        <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-1">
                                          ⏱️ Timeline
                                        </p>
                                        <p className="text-sm text-gray-300">
                                          {msg.analysis.full.timeline}
                                        </p>
                                      </div>
                                    )}

                                    <button
                                      onClick={() => setShowForm(true)}
                                      className="w-full px-3 py-2.5 sm:py-2 mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-xs sm:text-sm transition-all duration-300 active:scale-95 touch-none"
                                    >
                                      🚀 Start This Project
                                    </button>
                                  </>
                                )}

                              {msg?.analysisType === "timeline" &&
                                Array.isArray(
                                  msg.analysis?.timeline?.phases,
                                ) && (
                                  <div className="mt-2 sm:mt-3">
                                    <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                                      ⏱️ Timeline Breakdown
                                    </p>

                                    <ul className="space-y-1 text-xs sm:text-sm text-gray-300">
                                      {msg.analysis.timeline.phases.map(
                                        (p, i) => (
                                          <li key={i}>
                                            <strong className="text-white">
                                              {p.phase}:
                                            </strong>{" "}
                                            {p.duration}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {shouldShowFollowUp && msg.id === lastMessage?.id && (
                    <div className="mt-3 sm:mt-4 animate-follow-up-fade">
                      <div className="flex justify-start mb-3">
                        <div className="max-w-xs sm:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-bl-none bg-gradient-to-r from-purple-500/20 to-blue-500/10 border border-purple-500/30 text-gray-300 text-xs sm:text-sm">
                          <p className="text-xs uppercase tracking-widest text-purple-300 font-semibold mb-1">
                            💡 Next Steps
                          </p>
                          <p>
                            Would you like a detailed roadmap or cost breakdown?
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-start">
                        <button
                          onClick={() => handleGetFullPlan(msg.id)}
                          className="px-3 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/30 to-cyan-500/10 border border-cyan-500/50 text-cyan-300 hover:from-cyan-500/50 hover:to-cyan-500/30 hover:border-cyan-400/80 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 active:scale-95 touch-none animate-button-stagger-1"
                        >
                          ✨ Get Full Plan
                        </button>

                        <button
                          onClick={() => handleEstimateCost(msg.id)}
                          className="px-3 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500/30 to-emerald-500/10 border border-emerald-500/50 text-emerald-300 hover:from-emerald-500/50 hover:to-emerald-500/30 hover:border-emerald-400/80 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 active:scale-95 touch-none animate-button-stagger-2"
                        >
                          💰 Estimate Cost
                        </button>

                        <button
                          onClick={() => handleTalkToExpert()}
                          className="px-3 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/30 to-blue-500/10 border border-blue-500/50 text-blue-300 hover:from-blue-500/50 hover:to-blue-500/30 hover:border-blue-400/80 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 active:scale-95 touch-none animate-button-stagger-3"
                        >
                          👤 Talk to Expert
                        </button>
                      </div>

                      {followUpExpanded === "fullPlan" &&
                        expandedMessageId === msg.id && (
                          <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 animate-expand-content space-y-2 sm:space-y-3">
                            {msg.analysis?.full && (
                              <>
                                <div>
                                  <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                                    ✨ Core Features
                                  </p>
                                  <ul className="text-xs text-gray-300 space-y-1">
                                    {Array.isArray(
                                      msg.analysis.full.features,
                                    ) &&
                                      msg.analysis.full.features.map(
                                        (feature, i) => (
                                          <li key={i} className="flex gap-2">
                                            <span className="text-cyan-400 flex-shrink-0">
                                              →
                                            </span>
                                            <span>{feature}</span>
                                          </li>
                                        )
                                      )}
                                  </ul>
                                </div>

                                {msg.analysis?.full?.risks && (
                                  <div>
                                    <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">
                                      ⚠️ Key Risks
                                    </p>
                                    <ul className="text-xs text-gray-300 space-y-1">
                                      {(() => {
                                        const criticalRisks =
                                          msg.analysis.full.risks.critical ||
                                          [];
                                        const highRisks =
                                          msg.analysis.full.risks.high || [];
                                        const allRisks = [
                                          ...criticalRisks,
                                          ...highRisks,
                                        ];
                                        return allRisks
                                          .slice(0, 4)
                                          .map((risk, i) => (
                                            <li key={i} className="flex gap-2">
                                              <span className="text-orange-400 flex-shrink-0">
                                                ⚡
                                              </span>
                                              <span>{risk}</span>
                                            </li>
                                          ));
                                      })()}
                                    </ul>
                                  </div>
                                )}

                                {msg.analysis.full.team && (
                                  <div>
                                    <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
                                      👥 Recommended Team
                                    </p>
                                    <ul className="text-xs text-gray-300 space-y-1">
                                      {Array.isArray(msg.analysis.full.team) &&
                                        msg.analysis.full.team.map(
                                          (member, i) => (
                                            <li key={i} className="flex gap-2">
                                              <span className="text-purple-400 flex-shrink-0">
                                                👤
                                              </span>
                                              <span>{member}</span>
                                            </li>
                                          )
                                        )}
                                    </ul>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}

                      {followUpExpanded === "cost" &&
                        expandedMessageId === msg.id && (
                          <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 animate-expand-content space-y-2 sm:space-y-3">
                            <div>
                              <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
                                💰 Cost Breakdown
                              </p>
                              <div className="space-y-2 text-xs text-gray-300">
                                <div className="flex justify-between pb-2 border-b border-emerald-500/20">
                                  <span>Development (60%)</span>
                                  <span className="text-emerald-300 font-semibold">
                                    {msg.analysis?.full?.cost}
                                  </span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-emerald-500/20">
                                  <span>Infrastructure (20%)</span>
                                  <span className="text-emerald-300 font-semibold">
                                    TBD
                                  </span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-emerald-500/20">
                                  <span>Testing & QA (15%)</span>
                                  <span className="text-emerald-300 font-semibold">
                                    TBD
                                  </span>
                                </div>
                                <div className="flex justify-between pt-2">
                                  <span className="font-semibold">
                                    Total Estimate
                                  </span>
                                  <span className="text-emerald-300 font-bold">
                                    {msg.analysis?.full?.cost}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-3 pt-3 border-t border-emerald-500/20">
                                <p className="text-xs text-emerald-300 font-semibold mb-1">
                                  ✅ What's Included:
                                </p>
                                <ul className="text-xs text-gray-400 space-y-1">
                                  <li>• Full architecture & database design</li>
                                  <li>• UI/UX development & testing</li>
                                  <li>• API & backend integration</li>
                                  <li>• Deployment & monitoring setup</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              ))}

              {typingMessage && (
                <div className="flex justify-start">
                  <div className="max-w-xs sm:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-bl-none bg-white/5 border border-cyan-500/20 text-gray-200 text-sm">
                    <p className="leading-relaxed">
                      {typingMessage}
                      <span className="animate-pulse text-cyan-400">▌</span>
                    </p>
                  </div>
                </div>
              )}

              {loading && !typingMessage && (
                <div className="flex justify-start">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-bl-none bg-white/5 border border-cyan-500/20">
                    <div className="flex gap-1.5 h-6 items-center">
                      <div
                        className="w-1 h-4 bg-cyan-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="w-1 h-5 bg-cyan-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-1 h-4 bg-cyan-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {showForm && !successMessage && (
                <div className="flex justify-start">
                  <form
                    onSubmit={handleLeadFormSubmit}
                    className="w-full max-w-xs sm:max-w-md space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-2xl rounded-bl-none bg-purple-500/10 border border-purple-500/20"
                  >
                    <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-widest">
                      Get Your Roadmap
                    </h3>

                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Your Name"
                        className="w-full px-3 sm:px-3 py-3 rounded-lg bg-white/5 border border-cyan-500/20 focus:border-cyan-500/50 outline-none text-white placeholder-gray-500 transition-all text-sm touch-none"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Your Email"
                        className="w-full px-3 sm:px-3 py-3 rounded-lg bg-white/5 border border-cyan-500/20 focus:border-cyan-500/50 outline-none text-white placeholder-gray-500 transition-all text-sm touch-none"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleFormChange}
                        className="w-full px-3 sm:px-3 py-3 rounded-lg bg-white/5 border border-cyan-500/20 focus:border-cyan-500/50 outline-none text-white text-sm appearance-none cursor-pointer touch-none"
                      >
                        <option value="">Select budget...</option>
                        <option value="under-1k">Under $1,000</option>
                        <option value="1-5k">$1,000 - $5,000</option>
                        <option value="5-10k">$5,000 - $10,000</option>
                        <option value="10-25k">$10,000 - $25,000</option>
                        <option value="25k-plus">$25,000+</option>
                      </select>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={
                          !formData.name || !formData.email || !formData.budget
                        }
                        className="flex-1 px-3 py-3 sm:py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm transition-all touch-none"
                      >
                        Send
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-3 py-3 sm:py-2 rounded-lg bg-white/5 border border-cyan-500/20 text-gray-300 text-xs sm:text-sm transition-all touch-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {successMessage && (
                <div className="flex justify-start">
                  <div className="px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-bl-none bg-emerald-500/20 border border-emerald-500/40">
                    <p className="text-xs sm:text-sm font-semibold text-emerald-300">
                      ✅ Request received. We'll contact you soon.
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 border-t border-cyan-500/10 bg-black/50 backdrop-blur-sm relative z-10 px-4 sm:px-5 py-3 space-y-2 sm:space-y-2">
            <div className="relative group">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleChatSubmit()
                }
                placeholder="Describe your project idea..."
                className="w-full px-3 sm:px-3.5 py-3 sm:py-2.5 pr-10 rounded-xl bg-white/5 backdrop-blur-md border border-cyan-500/20 group-hover:border-cyan-500/40 focus:border-cyan-500/60 focus:shadow-lg focus:shadow-cyan-500/20 outline-none text-white placeholder-gray-500 transition-all duration-300 text-sm touch-none"
                autoComplete="off"
              />
              <button
                onClick={handleChatSubmit}
                disabled={loading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 disabled:opacity-30 transition-all duration-300 text-lg touch-none active:scale-90"
                aria-label="Send"
              >
                →
              </button>
            </div>

            <button
              onClick={handleChatSubmit}
              disabled={loading || !input.trim()}
              className="w-full px-3 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-white font-semibold tracking-wide hover:bg-cyan-500/30 hover:border-cyan-300/80 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 text-sm touch-none"
            >
              {loading ? "Analyzing..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes light-drift {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -30px);
          }
        }

        @keyframes follow-up-fade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes button-stagger-1 {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes button-stagger-2 {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes button-stagger-3 {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand-content {
          from {
            opacity: 0;
            max-height: 0;
            overflow: hidden;
          }
          to {
            opacity: 1;
            max-height: 500px;
            overflow: visible;
          }
        }

        .animate-light-drift {
          animation: light-drift 6s ease-in-out infinite;
        }

        .animate-follow-up-fade {
          animation: follow-up-fade 400ms ease-out forwards;
        }

        .animate-button-stagger-1 {
          animation: button-stagger-1 300ms ease-out forwards;
        }

        .animate-button-stagger-2 {
          animation: button-stagger-2 300ms ease-out forwards 100ms;
        }

        .animate-button-stagger-3 {
          animation: button-stagger-3 300ms ease-out forwards 200ms;
        }

        .animate-expand-content {
          animation: expand-content 350ms ease-out forwards;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 229, 255, 0.15);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 229, 255, 0.3);
        }

        @supports (background: radial-gradient(circle, red, blue)) {
          .bg-gradient-radial {
            background: radial-gradient(circle at center, var(--tw-gradient-stops));
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          input, button, select {
            font-size: 16px !important;
            min-height: 44px;
          }

          button {
            min-height: 44px;
          }
        }

        /* Prevent zoom on input focus */
        input, select, textarea {
          font-size: 16px;
        }

        /* Smooth scrolling */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* Safe area support */
        @supports (padding: max(0px)) {
          @media (orientation: landscape) {
            .safe-area-bottom {
              padding-bottom: max(8px, env(safe-area-inset-bottom));
            }
          }
        }
      `}</style>
    </>,
    document.body
  );
};