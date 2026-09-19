import nodemailer from "nodemailer";

// Order confirmation emails ke liye SMTP setup.
// .env.local mein yeh values set karein (see .env.local.example):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL, MAIL_FROM

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP_HOST, SMTP_USER and SMTP_PASS must be set in .env.local to send order emails."
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports (STARTTLS)
    auth: { user, pass },
  });

  return transporter;
}

export interface OrderEmailItem {
  name: string;
  quantity: number;
  priceRs: number;
}

export interface OrderEmailDetails {
  orderId: string;
  items: OrderEmailItem[];
  subtotal: number;
  shippingLabel: string;
  shippingCost: number;
  total: number;
    discountCode?: string | null;     
  discountPercent?: number;         
  discountAmount?: number; 
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    postalCode?: string;
  };
  note?: string;
}

function buildOrderHtml(order: OrderEmailDetails) {
  const rows = order.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">${i.name}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">Rs. ${(
            i.priceRs * i.quantity
          ).toLocaleString()}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <h2 style="margin-bottom:4px;">New Order — MPAROMA</h2>
      <p style="margin-top:0;color:#666;">Order ID: ${order.orderId}</p>

      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #ccc;">Item</th>
            <th style="text-align:center;padding:6px 10px;border-bottom:2px solid #ccc;">Qty</th>
            <th style="text-align:right;padding:6px 10px;border-bottom:2px solid #ccc;">Amount</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

     <p>Subtotal: Rs. ${order.subtotal.toLocaleString()}<br/>
${
  order.discountCode
    ? `Voucher Applied: <strong>${order.discountCode}</strong> (${order.discountPercent}% OFF) — you saved Rs. ${(order.discountAmount || 0).toLocaleString()}<br/>`
    : ""
}
Shipping (${order.shippingLabel}): Rs. ${order.shippingCost.toLocaleString()}<br/>
<strong>Total: Rs. ${order.total.toLocaleString()}</strong></p>

      <h3>Delivery Details</h3>
      <p>
        ${order.customer.firstName} ${order.customer.lastName}<br/>
        ${order.customer.address}${
    order.customer.apartment ? ", " + order.customer.apartment : ""
  }<br/>
        ${order.customer.city}${
    order.customer.postalCode ? " - " + order.customer.postalCode : ""
  }<br/>
        Phone: ${order.customer.phone}<br/>
        Email: ${order.customer.email}
      </p>

      ${
        order.note
          ? `<h3>Note</h3><p>${order.note}</p>`
          : ""
      }

      <p style="color:#666;font-size:12px;margin-top:24px;">Payment: Cash on Delivery</p>
    </div>
  `;
}

function buildCustomerHtml(order: OrderEmailDetails) {
  const rows = order.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">${i.name}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;">Rs. ${(
            i.priceRs * i.quantity
          ).toLocaleString()}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <h2 style="margin-bottom:4px;">Thank you for your order, ${order.customer.firstName}!</h2>
      <p style="margin-top:0;color:#666;">
        Your MPAROMA order has been received. Order ID: ${order.orderId}
      </p>

      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 10px;border-bottom:2px solid #ccc;">Item</th>
            <th style="text-align:center;padding:6px 10px;border-bottom:2px solid #ccc;">Qty</th>
            <th style="text-align:right;padding:6px 10px;border-bottom:2px solid #ccc;">Amount</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

    <p>Subtotal: Rs. ${order.subtotal.toLocaleString()}<br/>
${
  order.discountCode
    ? `Voucher Applied: <strong>${order.discountCode}</strong> (${order.discountPercent}% OFF) — you saved Rs. ${(order.discountAmount || 0).toLocaleString()}<br/>`
    : ""
}
Shipping (${order.shippingLabel}): Rs. ${order.shippingCost.toLocaleString()}<br/>
<strong>Total: Rs. ${order.total.toLocaleString()}</strong></p>

      <h3>Delivery Address</h3>
      <p>
        ${order.customer.firstName} ${order.customer.lastName}<br/>
        ${order.customer.address}${
    order.customer.apartment ? ", " + order.customer.apartment : ""
  }<br/>
        ${order.customer.city}${
    order.customer.postalCode ? " - " + order.customer.postalCode : ""
  }<br/>
        Phone: ${order.customer.phone}
      </p>

      <p style="color:#666;font-size:12px;margin-top:24px;">
        Payment: Cash on Delivery. We will contact you shortly to confirm delivery.
      </p>
    </div>
  `;
}

export async function sendAdminOrderEmail(order: OrderEmailDetails) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not set in .env.local.");
  }

  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const t = getTransporter();

  await t.sendMail({
    from,
    to: adminEmail,
    subject: `New Order #${order.orderId} — MPAROMA`,
    html: buildOrderHtml(order),
  });
}

export async function sendCustomerOrderEmail(order: OrderEmailDetails) {
  if (!order.customer.email) {
    throw new Error("Customer email missing — cannot send confirmation.");
  }

  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const t = getTransporter();

  await t.sendMail({
    from,
    to: order.customer.email,
    subject: `Order Confirmed #${order.orderId} — MPAROMA`,
    html: buildCustomerHtml(order),
  });
}
export async function sendNewsletterAdminEmail(subscriberEmail: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return; // silently skip agar set nahi hai

  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const t = getTransporter();

  await t.sendMail({
    from,
    to: adminEmail,
    subject: "New Newsletter Subscriber — MPAROMA",
    html: `<p>New email subscribed to the newsletter: <strong>${subscriberEmail}</strong></p>`,
  });
}
export async function sendContactAdminEmail(data: { name: string; email: string; message: string }) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  const t = getTransporter();

  await t.sendMail({
    from,
    to: adminEmail,
    replyTo: data.email,
    subject: `New Contact Form Message — MPAROMA`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;">
        <h2>New message from Contact Us page</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      </div>
    `,
  });
}