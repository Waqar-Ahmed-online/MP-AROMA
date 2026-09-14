export default function AnnouncementBar() {
  const message = (
    <span className="mx-6 inline-block">
      Free Shipping on Orders Above Rs.2000 &nbsp;•&nbsp; Rs.300/- Advance
      Required For Order Confirmation
    </span>
  );

  return (
    <div className="w-full overflow-hidden bg-gold/90 py-2 font-body text-[0.68rem] tracking-[0.18em] text-ink">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {message}
        {message}
        {message}
      </div>
    </div>
  );
}