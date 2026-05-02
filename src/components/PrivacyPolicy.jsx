import React from "react";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-3 tracking-wide">
      {title}
    </h2>
    <div className="text-gray-400 leading-relaxed space-y-2 text-sm md:text-base">
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a33_1px,transparent_1px),linear-gradient(to_bottom,#0f172a33_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500 opacity-10 blur-[120px] rounded-full" />

      <div className="relative z-10 px-6 md:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">
            Your data security and privacy are important to us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.08)]">
          <Section title="1. Introduction">
            <p>
              At <span className="text-cyan-400">[Your Company Name]</span>, we value your privacy.
              This policy explains how we collect, use, and protect your information.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <ul className="list-disc ml-5 space-y-1">
              <li>Personal details (name, email, phone number)</li>
              <li>Technical data (IP address, browser, device)</li>
              <li>Usage data (pages visited, interaction data)</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc ml-5 space-y-1">
              <li>To deliver and improve our services</li>
              <li>To communicate with you</li>
              <li>For analytics and performance monitoring</li>
            </ul>
          </Section>

          <Section title="4. Payment Information">
            <p>
              Payments are securely processed through Razorpay. We do not store
              your card or banking details on our servers.
            </p>
          </Section>

          <Section title="5. Data Sharing">
            <p>
              We may share data with trusted third-party services such as hosting providers,
              analytics tools, and payment gateways only as necessary.
            </p>
          </Section>

          <Section title="6. Data Security">
            <p>
              We implement industry-standard security measures to protect your data
              from unauthorized access or disclosure.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Our website uses cookies to enhance user experience and analyze traffic.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <ul className="list-disc ml-5 space-y-1">
              <li>Access your data</li>
              <li>Request correction or deletion</li>
              <li>Opt-out of communications</li>
            </ul>
          </Section>

          <Section title="9. Data Retention">
            <p>
              We retain your information only as long as necessary to provide services
              or comply with legal obligations.
            </p>
          </Section>

          <Section title="10. Changes to Policy">
            <p>
              We may update this policy from time to time. Updates will be posted on this page.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Email: <span className="text-cyan-400">[your@email.com]</span>
            </p>
          </Section>
        </div>

        <div className="text-center mt-10 text-gray-500 text-sm">
          © {currentYear} [Your Company Name]. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;