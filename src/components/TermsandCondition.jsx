import React from "react";

const Section = ({ title, number, children }) => (
  <section className="mb-10">
    <h2 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-3 tracking-wide">
      {title}
    </h2>
    <div className="text-gray-400 leading-relaxed space-y-2 text-sm md:text-base">
      {children}
    </div>
  </section>
);

const TermsAndConditions = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "[Your Company Name]";
  const contactEmail = "[your@email.com]";

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a33_1px,transparent_1px),linear-gradient(to_bottom,#0f172a33_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500 opacity-10 blur-[120px] rounded-full" />

      <div className="relative z-10 px-6 md:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-400">
            Please read these terms carefully before using our services.
          </p>
        </div>

        <article className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.08)]">
          <Section title="1. Introduction">
            <p>
              By accessing or using <span className="text-cyan-400">{companyName}</span>,
              you agree to comply with these Terms & Conditions.
            </p>
          </Section>

          <Section title="2. Services Scope">
            <p>
              We provide IT services including web development, app development,
              and AI solutions. Scope is limited to agreed deliverables.
            </p>
            <p>
              Any additional features or changes beyond agreed scope will be charged separately.
            </p>
          </Section>

          <Section title="3. Pricing & Payments">
            <ul className="list-disc ml-5 space-y-1">
              <li>All prices are in INR (₹)</li>
              <li>Advance payment is required to start work</li>
              <li>Payments processed securely via Razorpay</li>
              <li>Delays in payment may delay delivery</li>
            </ul>
          </Section>

          <Section title="4. Refund Policy">
            <p>
              All payments are non-refundable once the project has started.
            </p>
            <p>
              Refunds may be considered only if work has not been initiated.
            </p>
          </Section>

          <Section title="5. Project Timeline">
            <p>
              Estimated delivery timelines range from 7–21 days depending on project scope.
            </p>
            <p>
              Delays may occur if required inputs are not provided by the client.
            </p>
          </Section>

          <Section title="6. Client Responsibilities">
            <ul className="list-disc ml-5 space-y-1">
              <li>Provide content and assets on time</li>
              <li>Give timely approvals and feedback</li>
              <li>Maintain clear communication</li>
            </ul>
          </Section>

          <Section title="7. Revisions Policy">
            <p>
              We offer limited revisions (2–3 rounds). Additional revisions are chargeable.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              Ownership is transferred after full payment. We reserve the right
              to showcase work in our portfolio.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              We are not liable for any business losses, revenue loss, or indirect damages.
            </p>
          </Section>

          <Section title="10. Third-Party Services">
            <p>
              We are not responsible for issues caused by third-party tools,
              hosting providers, or payment gateways.
            </p>
          </Section>

          <Section title="11. Termination">
            <p>
              We reserve the right to terminate services in case of non-payment,
              abuse, or lack of cooperation.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p>
              These terms are governed by the laws of India.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              Email: <span className="text-cyan-400">{contactEmail}</span>
            </p>
          </Section>
        </article>

        <div className="text-center mt-10 text-gray-500 text-sm">
          © {currentYear} {companyName}. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;