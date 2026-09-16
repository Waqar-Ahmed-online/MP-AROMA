export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-ink px-5 py-10 text-parchment">
      <h1 className="font-display text-2xl tracking-[0.1em]">ADMIN DASHBOARD</h1>
      <p className="mt-2 text-sm text-smoke">
        Yahan se products, hero, scent categories waghera manage honge — agla step.
      </p>
    </div>
  );
}