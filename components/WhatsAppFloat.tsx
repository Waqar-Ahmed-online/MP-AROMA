"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  const [showBubble, setShowBubble] = useState(true);

  // scroll ke sath fixed rehta hai (position: fixed), koi extra scroll-listener
  // ki zaroorat nahi — CSS hi kaam karti hai
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const link = buildWhatsAppLink("Hi! Mujhe MP Aroma products ke baare mein jaankari chahiye.");

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {showBubble && (
        <div className="relative flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
          <span className="text-sm font-medium text-gray-800">Message us 👋</span>
          <button
            onClick={() => setShowBubble(false)}
            aria-label="Close"
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 hover:bg-gray-300"
          >
            ✕
          </button>
        </div>
      )}

      
       <a href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-8 w-8 fill-white">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.744 5.5 2.05 7.813L0 32l8.395-2.02A15.9 15.9 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.61 0-5.03-.735-7.09-2.01l-.508-.302-4.98 1.198 1.223-4.85-.33-.5A13.28 13.28 0 0 1 2.667 16C2.667 8.64 8.64 2.667 16 2.667S29.333 8.64 29.333 16 23.36 29.333 16 29.333zm7.29-9.953c-.4-.2-2.36-1.166-2.726-1.3-.366-.133-.633-.2-.9.2-.266.4-1.033 1.3-1.266 1.567-.233.266-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.987-1.19-1.062-1.993-2.373-2.226-2.773-.233-.4-.025-.617.175-.817.18-.18.4-.466.6-.7.2-.233.266-.4.4-.667.133-.266.066-.5-.034-.7-.1-.2-.9-2.166-1.233-2.966-.325-.783-.655-.677-.9-.69-.233-.01-.5-.013-.767-.013-.266 0-.7.1-1.066.5-.366.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.82 4.307 6.834 6.037.955.412 1.7.658 2.28.842.958.305 1.83.262 2.518.159.768-.114 2.36-.966 2.694-1.898.333-.933.333-1.733.233-1.9-.1-.166-.366-.266-.766-.466z"/>
        </svg>
      </a>
    </div>
  );
}