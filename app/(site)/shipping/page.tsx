export const metadata = {
  title: "Shipping Policy | MPAROMA",
};

export default function ShippingPage() {
  return (
    <div>
      <div className="border-b border-gold/10 bg-ink-soft py-10 text-center">
        <h1 className="font-display text-3xl tracking-[0.1em] text-parchment sm:text-4xl">
          Shipping Policy
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 text-smoke md:px-10">
        <p className="leading-relaxed">
          At MPAROMA, we are committed to delivering your favorite fragrances
          quickly, safely, and efficiently. Please review our shipping policy
          below for details regarding order processing and delivery.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Order Processing
        </h2>
        <p className="mt-3 leading-relaxed">
          All orders are processed within 2–3 business days after
          confirmation. Orders placed on weekends or public holidays will be
          processed on the next working day.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Delivery Time
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Standard Delivery: 4–5 business days</li>
          <li>Remote Areas: Delivery may take additional time depending on location</li>
        </ul>
        <p className="mt-4 leading-relaxed">
          Delivery times are estimates and may vary during peak seasons or
          unforeseen circumstances.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Shipping Charges
        </h2>
        <p className="mt-3 leading-relaxed">
          Shipping charges are calculated at checkout based on your location
          and order details. Any applicable delivery fees will be displayed
          before completing your purchase.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Order Tracking
        </h2>
        <p className="mt-3 leading-relaxed">
          Once your order has been shipped, you will receive a confirmation
          message with tracking details so you can monitor your package&apos;s
          journey.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Delivery Issues
        </h2>
        <p className="mt-3 leading-relaxed">
          If your order is delayed, damaged, or lost during transit, please
          contact our support team. We will work with our shipping partners
          to resolve the issue as quickly as possible.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Incorrect Address
        </h2>
        <p className="mt-3 leading-relaxed">
          Customers are responsible for providing accurate shipping
          information. MPAROMA is not responsible for delays or failed
          deliveries caused by incorrect or incomplete addresses.
        </p>

        <h2 className="mt-10 font-display text-xl text-parchment">
          Contact Us
        </h2>
        <p className="mt-3 leading-relaxed">
          If you have any questions regarding shipping or delivery, please
          contact us:
        </p>
        <p className="mt-2 leading-relaxed">
          Email:{" "}
          <a href="mailto:MPAromaM@gmail.com" className="text-gold underline">
            MPAromaM@gmail.com
          </a>
        </p>
        <p className="leading-relaxed">WhatsApp: +92 311 3288776</p>
        <p className="mt-4 leading-relaxed">
          Thank you for choosing MPAROMA. We appreciate your trust and look
          forward to delivering luxury fragrances to your doorstep.
        </p>
      </div>
    </div>
  );
}