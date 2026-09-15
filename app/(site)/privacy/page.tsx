export const metadata = {
  title: "Privacy Policy | MPAROMA",
};

export default function PrivacyPage() {
  return (
    <div>
      <div className="border-b border-gold/10 bg-ink-soft py-10 text-center">
        <h1 className="font-display text-3xl tracking-[0.1em] text-parchment sm:text-4xl">
          Privacy Policy
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 text-smoke md:px-10">
        <p className="leading-relaxed">
          At MPAROMA, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, and safeguard the information you provide when
          visiting our website or purchasing our products.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Information We Collect
        </h2>
        <p className="mt-3 leading-relaxed">We may collect the following information:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Shipping Address</li>
          <li>Billing Information</li>
          <li>Order Details</li>
          <li>Website Usage Data</li>
        </ul>
        <p className="mt-4 leading-relaxed">
          This information is collected when you place an order, contact us,
          subscribe to our newsletter, or interact with our website.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          How We Use Your Information
        </h2>
        <p className="mt-3 leading-relaxed">We use your information to:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Process and fulfill orders</li>
          <li>Provide customer support</li>
          <li>Improve our products and services</li>
          <li>Send order updates and notifications</li>
          <li>Respond to inquiries and requests</li>
          <li>Share promotional offers and updates (with your consent)</li>
          <li>Maintain website security and performance</li>
        </ul>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Payment Security
        </h2>
        <p className="mt-3 leading-relaxed">
          We take reasonable measures to protect your payment and personal
          information. All transactions are processed through secure payment
          gateways, and sensitive payment details are not stored on our
          servers.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">Cookies</h2>
        <p className="mt-3 leading-relaxed">
          Our website may use cookies to improve your browsing experience,
          analyze website traffic, and personalize content. You can choose to
          disable cookies through your browser settings.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Third-Party Services
        </h2>
        <p className="mt-3 leading-relaxed">
          We may use trusted third-party services for payment processing,
          shipping, analytics, and marketing. These providers only receive
          information necessary to perform their services and are required
          to keep your information secure.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Data Protection
        </h2>
        <p className="mt-3 leading-relaxed">
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, disclosure,
          alteration, or misuse.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Your Rights
        </h2>
        <p className="mt-3 leading-relaxed">You have the right to:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Access your personal information</li>
          <li>Request corrections to inaccurate data</li>
          <li>Request deletion of your information</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Children&apos;s Privacy
        </h2>
        <p className="mt-3 leading-relaxed">
          Our website is not intended for individuals under the age of 13. We
          do not knowingly collect personal information from children.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Changes to This Policy
        </h2>
        <p className="mt-3 leading-relaxed">
          MPAROMA reserves the right to update or modify this Privacy Policy
          at any time. Changes will be posted on this page with the updated
          effective date.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Contact Us
        </h2>
        <p className="mt-3 leading-relaxed">
          If you have any questions regarding this Privacy Policy, please
          contact us:
        </p>
        <p className="mt-2 leading-relaxed">
          Email:{" "}
          <a href="mailto:MPAromaM@gmail.com" className="text-gold underline">
            MPAromaM@gmail.com
          </a>
        </p>
        <p className="leading-relaxed">WhatsApp: +92 311 3288776</p>
      </div>
    </div>
  );
}