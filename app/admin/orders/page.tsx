import { getDb } from "@/lib/mongodb";
import OrderStatusControl from "@/components/admin/OrderStatusControl";
export const dynamic = "force-dynamic";   // 👈 yeh line add karo
export const revalidate = 0;  
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  priceRs: number;
}

interface Order {
  id: string;
  items: OrderItem[];
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
  status: string;
  createdAt: string;
}

export default async function AdminOrdersPage() {
  let orders: Order[] = [];

  try {
    const db = await getDb();
    const docs = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    orders = docs.map(({ _id, ...rest }) => ({
      id: String(_id),
      ...rest,
    })) as Order[];
  } catch {
    orders = [];
  }

  return (
    <div>
      <h1 className="font-display text-2xl tracking-[0.1em] text-parchment">
        ORDERS
      </h1>
      <p className="mt-2 text-sm text-smoke">
        Customers ke place kiye hue orders yahan dikhenge.
      </p>

      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-smoke">Abhi tak koi order nahi hai.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-sm border border-gold/15 bg-ink-soft/50 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/10 pb-3">
                <div>
                  <p className="font-display text-sm text-gold">
                    Order #{order.id}
                  </p>
                  <p className="text-xs text-smoke">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <OrderStatusControl id={order.id} status={order.status} />
              </div>

              <div className="mt-3 flex flex-col gap-1">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-parchment/85">
                    {item.name} x{item.quantity} — Rs.{" "}
                    {(item.priceRs * item.quantity).toLocaleString()}
                  </p>
                ))}
              </div>

              <p className="mt-3 text-sm text-parchment">
                Total: <span className="text-gold">Rs. {order.total.toLocaleString()}</span>{" "}
                <span className="text-smoke">
                  (Shipping: {order.shippingLabel} — Rs. {order.shippingCost})
                </span>
              </p>
              {order.discountCode ? (
  <p className="mt-1 text-xs text-green-300">
    Voucher used: <span className="font-semibold">{order.discountCode}</span>{" "}
    ({order.discountPercent}% off — Rs. {order.discountAmount?.toLocaleString()} discount)
  </p>
) : (
  <p className="mt-1 text-xs text-smoke">No voucher used</p>
)}

              <div className="mt-3 border-t border-gold/10 pt-3 text-sm text-parchment/85">
                <p>
                  {order.customer.firstName} {order.customer.lastName} —{" "}
                  {order.customer.phone}
                </p>
                <p>{order.customer.email}</p>
                <p>
                  {order.customer.address}
                  {order.customer.apartment ? `, ${order.customer.apartment}` : ""}
                  , {order.customer.city}
                  {order.customer.postalCode ? ` - ${order.customer.postalCode}` : ""}
                </p>
                {order.note && (
                  <p className="mt-1 text-smoke">Note: {order.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}