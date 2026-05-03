import React, { useRef, useEffect, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://desvisabackend.onrender.com";
const SERVICES_ENDPOINT = `${API_URL}/api/services/`;

const ServiceCard = ({ service, number, delay }) => {
  const panelRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const handleMouseMove = (e) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        panel.style.background = `
          radial-gradient(circle at ${x}px ${y}px, rgba(0, 229, 255, 0.15), rgba(255,255,255,0.02))
        `;
      });
    };

    const handleMouseLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      panel.style.background = "rgba(255,255,255,0.05)";
    };

    panel.addEventListener("mousemove", handleMouseMove);
    panel.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      panel.removeEventListener("mousemove", handleMouseMove);
      panel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <article
      ref={panelRef}
      className="glass-panel p-6 rounded-2xl transition-all"
      style={{ animationDelay: delay }}
    >
      <div className="text-cyan-300 text-xs mb-4 uppercase tracking-widest">
        Service {number}
      </div>

      <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>

      <p className="text-gray-300 text-sm mb-4">{service.description}</p>

      {Array.isArray(service.features) && service.features.length > 0 && (
        <ul className="text-gray-400 text-xs space-y-1">
          {service.features.map((feature, idx) => (
            <li key={idx}>• {feature}</li>
          ))}
        </ul>
      )}
    </article>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const fetchServices = async () => {
      try {
        const response = await fetch(SERVICES_ENDPOINT, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.statusText}`);
        }

        const data = await response.json();

        if (abortControllerRef.current.signal.aborted) return;

        const servicesList = Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : [];
        setServices(servicesList);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err.message || "Failed to load services");
        setLoading(false);
      }
    };

    fetchServices();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-400" aria-live="polite">
        Loading services...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-500" role="alert" aria-live="assertive">
        Error: {error}
      </section>
    );
  }

  return (
    <section
      className="min-h-screen flex items-center justify-center relative py-20"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-8 w-full">
        <h1 className="text-4xl font-light mb-4 text-center">
          <span className="neon-text">What We</span> Build
        </h1>

        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          We design and develop scalable digital products tailored to your idea
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.length > 0 ? (
            services.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                number={`0${idx + 1}`}
                delay={`${idx * 0.1}s`}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No services available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;