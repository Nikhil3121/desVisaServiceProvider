import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const contactMethods = [
    {
      id: "email",
      icon: "✉️",
      label: "Email Support",
      value: "Fast Response ⚡",
      action: () => (window.location.href = "mailto:Infonik3121@gmail.com"),
    },
    {
      id: "phone",
      icon: "📞",
      label: "Talk to an Expert",
      value: "Available 9AM–8PM",
      action: () => (window.location.href = "tel:+919142735101"),
    },
    {
      id: "whatsapp",
      icon: "💬",
      label: "WhatsApp Support",
      value: "Available 24/7",
      action: () => window.open("https://wa.me/919142735101"),
    },
    {
      id: "linkedin",
      icon: "🔗",
      label: "LinkedIn",
      value: "Desvisa Tech",
      action: () =>
        window.open("https://www.linkedin.com/in/desvisa-tech-14a310407"),
    },
    {
      id: "instagram",
      icon: "📷",
      label: "Instagram",
      value: "Desvisa.tech",
      action: () =>
        window.open(
          "https://www.instagram.com/desvisa.tech?igsh=NjB0MnFlYmliY2Z1&utm_source=qr",
        ),
    },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We will respond within 24 hours.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      className="relative min-h-screen w-full bg-black overflow-hidden py-20"
      id="contact"
    >
      <style>{`
        .contact-grid-bg {
          background-image:
            linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        @keyframes contact-float-glow {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-40px);
            opacity: 0.5;
          }
        }

        .contact-float-glow {
          animation: contact-float-glow 8s ease-in-out infinite;
        }

        @keyframes card-lift {
          from {
            transform: translateY(0px);
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
          }
          to {
            transform: translateY(-8px);
            box-shadow: 0 0 40px rgba(0, 229, 255, 0.4);
          }
        }

        .contact-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .contact-card:hover {
          animation: card-lift 0.3s ease forwards;
          background: rgba(0, 229, 255, 0.1);
        }

        @keyframes input-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.1), inset 0 0 0 1px rgba(0, 229, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 20px 0 rgba(0, 229, 255, 0.2), inset 0 0 10px 0 rgba(0, 229, 255, 0.1);
          }
        }

        .contact-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 229, 255, 0.3);
          color: #fff;
          transition: all 0.3s ease;
        }

        .contact-input:focus {
          outline: none;
          background: rgba(0, 229, 255, 0.08);
          border-color: rgba(0, 229, 255, 0.6);
          animation: input-glow 2s ease infinite;
        }

        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        @keyframes button-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 229, 255, 0.6);
          }
        }

        .contact-button {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%);
          border: 2px solid rgba(0, 229, 255, 0.5);
          color: #00e5ff;
          transition: all 0.3s ease;
        }

        .contact-button:hover {
          transform: scale(1.03);
          animation: button-pulse 2s ease infinite;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%);
        }

        @keyframes content-fade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-content {
          animation: content-fade 0.8s ease-out 0.2s both;
        }

        .contact-card-item {
          animation: content-fade 0.6s ease-out forwards;
        }

        .contact-card-item:nth-child(1) { animation-delay: 0.3s; }
        .contact-card-item:nth-child(2) { animation-delay: 0.4s; }
        .contact-card-item:nth-child(3) { animation-delay: 0.5s; }
        .contact-card-item:nth-child(4) { animation-delay: 0.6s; }
        .contact-card-item:nth-child(5) { animation-delay: 0.7s; }
      `}</style>

      <div className="absolute inset-0 contact-grid-bg pointer-events-none" />

      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-30 contact-float-glow pointer-events-none" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ animation: "contact-float-glow 10s ease-in-out infinite" }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="contact-content text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-mono text-green-400 tracking-widest uppercase">
              [COMMUNICATION NODE ACTIVE]
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-light mb-4">
            Get In <span className="neon-text font-bold">Touch</span>
          </h1>

          <p className="text-gray-300 text-lg mb-3 max-w-2xl mx-auto">
            Let's discuss your idea and turn it into a real product.
          </p>

          <p className="text-cyan-400/60 text-sm font-mono">
            ✔ Response within 24 hours
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            {contactMethods.map((method) => (
              <div key={method.id} className="contact-card-item">
                <div
                  onClick={method.action}
                  onMouseEnter={() => setHoveredCard(method.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      method.action();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Contact via ${method.label}: ${method.value}`}
                  className="contact-card p-6 rounded-xl backdrop-blur-xl border-2 border-cyan-500/30 bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0" aria-hidden="true">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-1">
                        {method.label}
                      </h2>
                      <p className="text-white font-semibold text-lg">
                        {method.value}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 font-mono">
                        Click to connect →
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-content">
            <div className="p-8 rounded-xl backdrop-blur-xl border-2 border-cyan-500/30 bg-black/40">
              <h2 className="text-xl font-semibold text-white mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-300 mb-2 font-mono uppercase tracking-wide"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your name"
                    className="contact-input w-full px-4 py-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-300 mb-2 font-mono uppercase tracking-wide"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your@email.com"
                    className="contact-input w-full px-4 py-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-300 mb-2 font-mono uppercase tracking-wide"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us about your project..."
                    className="contact-input w-full px-4 py-3 rounded-lg resize-none"
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="contact-button w-full px-6 py-4 rounded-lg font-semibold uppercase tracking-widest transition-all duration-300"
                >
                  🚀 Send Message
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-6 font-mono">
                We'll get back to you within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-20" />
    </section>
  );
};

export default Contact;
