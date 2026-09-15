export const metadata = {
  title: "Return & Refund Policy | MPAROMA",
};

export default function ReturnRefundPage() {
  return (
    <div>
      <div className="border-b border-gold/10 bg-ink-soft py-10 text-center">
        <h1 className="font-display text-3xl tracking-[0.1em] text-parchment sm:text-4xl">
          Refund Policy
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 text-smoke md:px-10">
        <p className="leading-relaxed">
          At MPAROMA, customer satisfaction is our top priority. We take
          great care in ensuring that every fragrance is delivered in perfect
          condition. Please review our Return &amp; Refund Policy below.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">Returns</h2>
        <p className="mt-3 leading-relaxed">
          Due to the nature of fragrance products and hygiene considerations,
          we do not accept returns on opened or used perfumes.
        </p>
        <p className="mt-3 leading-relaxed">Returns may only be accepted if:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>The product was damaged during shipping.</li>
          <li>You received the wrong item.</li>
          <li>The product arrived defective or leaking.</li>
        </ul>
        <p className="mt-4 leading-relaxed">
          To request a return, please contact us within 48 hours of receiving
          your order and provide clear photos of the product and packaging.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">Refunds</h2>
        <p className="mt-3 leading-relaxed">
          Once your claim has been reviewed and approved, we will process
          your refund within 5–7 business days.
        </p>
        <p className="mt-3 leading-relaxed">Refunds will only be issued for:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Damaged products received upon delivery.</li>
          <li>Incorrect items sent by our team.</li>
          <li>Verified defective products.</li>
        </ul>
        <p className="mt-4 leading-relaxed">
          Shipping charges are non-refundable unless the issue was caused by
          our error.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Exchanges
        </h2>
        <p className="mt-3 leading-relaxed">
          We offer replacements for eligible damaged, defective, or incorrect
          items. If a replacement product is unavailable, a full refund will
          be issued.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Order Cancellation
        </h2>
        <p className="mt-3 leading-relaxed">
          Orders may be canceled before they are processed and shipped. Once
          an order has been dispatched, it cannot be canceled.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Contact Us
        </h2>
        <p className="mt-3 leading-relaxed">
          If you have any questions regarding returns, refunds, or exchanges,
          please contact our support team:
        </p>
        <p className="mt-2 leading-relaxed">
          Email:{" "}
          <a href="mailto:mparomam@gmail.com" className="text-gold underline">
            mparomam@gmail.com
          </a>
        </p>
        <p className="leading-relaxed">WhatsApp: +92 311 3288776</p>
        <p className="mt-4 leading-relaxed">
          We are committed to providing a smooth and satisfactory shopping
          experience for every MPAROMA customer.
        </p>
      </div>
    </div>
  );
}