"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const WHATSAPP_NUMBER = "+8801716200358";
const MESSENGER_USERNAME = "drtasrifahmed";

export default function FloatingChat() {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3"
    >
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.chat.whatsapp}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 transition duration-300 hover:scale-110 hover:shadow-emerald-500/50"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
          {t.chat.whatsapp}
        </span>
      </a>
      <a
        href={`https://m.me/${MESSENGER_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.chat.messenger}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00B2FF] to-[#006AFF] text-white shadow-lg shadow-blue-500/30 transition duration-300 hover:scale-110 hover:shadow-blue-500/50"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
          <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.973 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
        </svg>
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
          {t.chat.messenger}
        </span>
      </a>
    </motion.div>
  );
}
