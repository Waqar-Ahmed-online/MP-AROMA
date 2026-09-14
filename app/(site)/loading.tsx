export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink">
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Spinning gold ring */}
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-gold/15 border-t-gold" />
        {/* Logo — pulses gently while ring spins around it */}
        <img
          src="/images/logo.png"
          alt="MPAROMA"
          className="h-12 w-12 animate-pulse object-contain"
        />
      </div>
    </div>
  );
}   