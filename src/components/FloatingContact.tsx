"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

// Contact details (same number shown in the Footer)
const PHONE = "+919811238092";
const PHONE_DISPLAY = "+91 98112 38092";
const WHATSAPP_URL =
  "https://wa.me/919811238092?text=" +
  encodeURIComponent("Hi RealVibe, I'd like to know more about your services.");

export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Appear once the user has scrolled past (most of) the hero section.
    const getThreshold = () => Math.min(window.innerHeight * 0.8, 700);

    const onScroll = () => {
      const shouldShow = window.scrollY > getThreshold();
      // Only re-render when the state actually flips (keeps scrolling cheap).
      setVisible((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-5 md:right-6 md:bottom-6 z-40 flex flex-col items-end gap-3 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-900/30 hover:scale-110 active:scale-95 transition-transform"
      >
        {/* Soft pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping [animation-duration:2.5s]" />
        <svg viewBox="0 0 24 24" className="relative w-6 h-6 md:w-7 md:h-7 fill-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {/* Hover label (desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden md:block whitespace-nowrap rounded-lg bg-black/85 border border-white/10 px-3 py-1.5 text-xs font-semibold text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call */}
      <a
        href={`tel:${PHONE}`}
        aria-label={`Call us at ${PHONE_DISPLAY}`}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-900/30 hover:scale-110 active:scale-95 transition-transform"
      >
        <Phone className="relative w-5 h-5 md:w-6 md:h-6 text-white" />
        <span className="pointer-events-none absolute right-full mr-3 hidden md:block whitespace-nowrap rounded-lg bg-black/85 border border-white/10 px-3 py-1.5 text-xs font-semibold text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          Call {PHONE_DISPLAY}
        </span>
      </a>
    </div>
  );
}
