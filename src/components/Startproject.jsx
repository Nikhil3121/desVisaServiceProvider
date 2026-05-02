import React, { useState, useEffect, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const SERVICES_ENDPOINT = `${API_URL}/api/services/`;
const CREATE_ORDER_ENDPOINT = `${API_URL}/api/payments/create-order/`;
const VERIFY_PAYMENT_ENDPOINT = `${API_URL}/api/payments/verify-payment/`;

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-900/20 border-red-500/50" : "bg-green-900/20 border-green-500/50";
  const textColor = type === "error" ? "text-red-400" : "text-green-400";

  return (
    <div className={`fixed top-4 right-4 border rounded-lg p-4 ${bgColor} ${textColor} z-50`} role="alert">
      {message}
    </div>
  );
};

const StartProject = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const fetchServices = async () => {
      try {
        const response = await fetch(SERVICES_ENDPOINT, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load services");
        }

        const data = await response.json();

        if (abortControllerRef.current.signal.aborted) return;

        const servicesList = Array.isArray(data) ? data : data.results || [];
        setServices(servicesList);
      } catch (err) {
        if (err.name !== "AbortError") {
          setNotification({ type: "error", message: err.message || "Unable to load services" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handlePayment = async (serviceId) => {
    if (paymentLoading) return;
    setPaymentLoading(true);

    try {
      if (!window.Razorpay) {
        throw new Error("Payment system not available. Please refresh the page.");
      }

      const orderResponse = await fetch(CREATE_ORDER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: serviceId }),
      });

      const orderData = await orderResponse.json().catch(() => ({}));

      if (!orderResponse.ok || !orderData.order_id) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const razorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "DesVisa",
        description: `Payment for ${selectedService?.title || "Service"}`,
        order_id: orderData.order_id,
        handler: async (response) => {
          await verifyPayment(response);
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          },
        },
        theme: { color: "#00e5ff" },
      };

      const razorpay = new window.Razorpay(razorpayOptions);

      razorpay.on("payment.failed", (response) => {
        setNotification({
          type: "error",
          message: response.error?.description || "Payment failed. Please try again.",
        });
        setPaymentLoading(false);
      });

      razorpay.open();
    } catch (err) {
      setNotification({
        type: "error",
        message: err.message || "An error occurred. Please try again.",
      });
      setPaymentLoading(false);
    }
  };

  const verifyPayment = async (response) => {
    try {
      const verifyResponse = await fetch(VERIFY_PAYMENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        }),
      });

      const verifyData = await verifyResponse.json().catch(() => ({}));

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || "Payment verification failed");
      }

      setNotification({
        type: "success",
        message: "Payment successful! We'll contact you shortly.",
      });

      setTimeout(() => setSelectedService(null), 2000);
    } catch (err) {
      setNotification({
        type: "error",
        message: err.message || "Payment verification failed",
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-400" aria-live="polite">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500"></div>
        </div>
        <p className="mt-4">Loading services...</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black text-white" id="start-project">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl text-center mb-10 neon-text">Start Your Project</h1>

        {!selectedService ? (
          services.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <article
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedService(service);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="border border-cyan-500/30 p-6 rounded-xl hover:bg-gray-900/50 cursor-pointer transition transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  aria-label={`Select ${service.title} service`}
                >
                  <h3 className="text-xl mb-2 text-cyan-300">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                  <p className="text-cyan-400 text-sm mt-4 font-mono">
                    {service.price_range || "Custom Pricing"}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500" role="status">
              No services available at the moment
            </div>
          )
        ) : (
          <article className="bg-gray-900/50 border border-cyan-500/20 p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="mb-6 text-sm text-gray-400 hover:text-cyan-400 transition focus-visible:outline-none focus-visible:underline"
              aria-label="Back to services"
            >
              ← Back
            </button>

            <h2 className="text-3xl mb-4 text-cyan-300">{selectedService.title}</h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {selectedService.description}
            </p>

            {Array.isArray(selectedService.features) && selectedService.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-widest">
                  Features
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-cyan-500/20 pt-6 mb-6">
              <p className="text-2xl font-semibold text-cyan-400">
                {selectedService.price_range || "Custom Pricing"}
              </p>
            </div>

            <button
              disabled={paymentLoading}
              onClick={() => handlePayment(selectedService.id)}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
              aria-label={`Purchase ${selectedService.title}`}
              aria-busy={paymentLoading}
            >
              {paymentLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Processing Payment...
                </span>
              ) : (
                "🚀 Purchase Service"
              )}
            </button>
          </article>
        )}
      </div>
    </section>
  );
};

export default StartProject;