"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontalEnd,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { fadeUp, stagger } from "@/lib/motion";
import Modal from "./Modal";

const IMAGES = [
  "/images/hospital-visit-workshop.jpg",
  "/images/gallery-workshop.png",
  "/images/gallery-scholarship.png",
  "/images/gallery-conference.png",
];

type GalleryItem = {
  id: string;
  title: { en: string; bn: string };
  meta: { en: string; bn: string };
  desc: { en: string; bn: string };
  full: { en: string; bn: string };
  imageUrl: string;
};

export default function Gallery({
  items: publishedItems,
}: {
  items?: GalleryItem[];
}) {
  const { t, lang } = useI18n();
  const scroller = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const items =
    publishedItems ??
    t.gallery.items.map((item, index) => ({
      id: `example-${index}`,
      title: { en: item.title, bn: item.title },
      meta: { en: item.meta, bn: item.meta },
      desc: { en: item.desc, bn: item.desc },
      full: { en: item.full, bn: item.full },
      imageUrl: IMAGES[index],
    }));
  const localizedItems = items.map((item) => ({
    id: item.id,
    title: item.title[lang],
    meta: item.meta[lang],
    desc: item.desc[lang],
    full: item.full[lang],
    imageUrl: item.imageUrl,
  }));
  const localizedActive = selected !== null ? localizedItems[selected] : null;
  if (publishedItems?.length === 0) return null;

  const scroll = (dir: number) => {
    const element = scroller.current;
    element?.scrollBy({ left: dir * element.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-sky-100/60 py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br from-sky-200/50 to-teal-200/40 blur-3xl"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="container-x"
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <span className="section-label">
            <GalleryHorizontalEnd className="h-3.5 w-3.5" />
            {t.gallery.label}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {t.gallery.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {t.gallery.sub}
          </p>
        </motion.div>

        {localizedItems.length > 2 && (
          <div className="mt-8 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous gallery items"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next gallery items"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        <div
          ref={scroller}
          className={`no-scrollbar flex snap-x gap-6 overflow-x-auto pb-4 ${
            localizedItems.length > 2 ? "mt-4" : "mt-12"
          }`}
        >
          {localizedItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              variants={fadeUp}
              onClick={() => setSelected(index)}
              className="group w-[calc((100%_-_1.5rem)_/_2)] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/70 bg-white/70 text-left shadow-soft backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:shadow-glass lg:w-[calc((100%_-_3rem)_/_3)]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600">
                  {item.meta}
                </p>
                <h3 className="mt-1.5 text-sm font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 transition group-hover:text-teal-600">
                  {t.gallery.viewDetails}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={localizedActive?.title ?? ""}
        wide
      >
        {localizedActive && (
          <div>
            <Image
              src={localizedActive.imageUrl}
              alt={localizedActive.title}
              width={1024}
              height={768}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-teal-600">
              {localizedActive.meta}
            </p>
            <h3 className="mt-1.5 text-xl font-extrabold text-navy">
              {localizedActive.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {localizedActive.full}
            </p>
            {localizedActive.id.startsWith("example-") && (
              <p className="mt-4 text-[11px] italic text-slate-400">
                {t.gallery.placeholderNote}
              </p>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
