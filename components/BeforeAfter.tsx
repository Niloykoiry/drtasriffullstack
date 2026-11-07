"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  MoveHorizontal,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { fadeUp, stagger } from "@/lib/motion";

const PAIRS = [
  {
    before: "/images/ba-jaw-before.png",
    after: "/images/ba-jaw-after.png",
  },
  {
    before: "/images/ba-profile-before.png",
    after: "/images/ba-profile-after.png",
  },
  {
    before: "/images/Screenshot_408.png",
    after: "/images/Screenshot_409.png",
  },
  {
    before: "/images/Screenshot_410.png",
    after: "/images/Screenshot_411.png",
  },
];

type BeforeAfterCase = {
  id: string;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  beforeImage: string;
  afterImage: string;
};

function CompareCard({
  before,
  after,
  title,
  desc,
  note,
  labels,
  className,
}: {
  before: string;
  after: string;
  title: string;
  desc: string;
  note: string;
  className: string;
  labels: { before: string; after: string; drag: string };
}) {
  const [pos, setPos] = useState(50);

  return (
    <motion.article
      variants={fadeUp}
      className={`${className} glass overflow-hidden rounded-3xl bg-white/70 p-3 shadow-soft`}
    >
      <div className="relative aspect-[4/3] select-none overflow-hidden rounded-2xl">
        <Image
          src={after}
          alt={`${title} after surgery`}
          width={1024}
          height={768}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${title} before surgery`}
            width={1024}
            height={768}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%` }}
        >
          <div className="h-full w-0.5 -translate-x-1/2 bg-white/90 shadow" />
          <span className="absolute left-0 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-blue-700 shadow-glass">
            <MoveHorizontal className="h-4 w-4" />
          </span>
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-navy/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
          {labels.before}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-teal-500/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
          {labels.after}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={labels.drag}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold text-navy">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">{desc}</p>
        <p className="mt-2 text-[10px] italic text-slate-400">{note}</p>
      </div>
    </motion.article>
  );
}

export default function BeforeAfter({
  cases: publishedCases,
}: {
  cases?: BeforeAfterCase[];
}) {
  const { t, lang } = useI18n();
  const scroller = useRef<HTMLDivElement>(null);
  if (publishedCases?.length === 0) return null;

  const allCases = publishedCases
    ? publishedCases.map((item) => ({
        id: item.id,
        before: item.beforeImage,
        after: item.afterImage,
        title: item.title[lang],
        desc: item.description[lang],
      }))
    : t.beforeAfter.cases.slice(0, PAIRS.length).map((item, index) => ({
        id: `example-${index}`,
        before: PAIRS[index].before,
        after: PAIRS[index].after,
        title: item.title,
        desc: item.desc,
      }));
  const scroll = (dir: number) => {
    const element = scroller.current;
    element?.scrollBy({ left: dir * element.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="before-after" className="bg-white py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="container-x"
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <span className="section-label">
            <Images className="h-3.5 w-3.5" />
            {t.beforeAfter.label}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {t.beforeAfter.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            {t.beforeAfter.sub}
          </p>
        </motion.div>
        {allCases.length > 2 && (
          <div className="mt-8 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous before and after cases"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next before and after cases"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm transition hover:bg-blue-600 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        <div
          ref={scroller}
          className={`no-scrollbar flex snap-x gap-8 overflow-x-auto pb-4 ${
            allCases.length > 2 ? "mt-4" : "mt-12"
          }`}
        >
          {allCases.map((caseItem) => (
            <CompareCard
              key={caseItem.id}
              before={caseItem.before}
              after={caseItem.after}
              title={caseItem.title}
              desc={caseItem.desc}
              note={t.beforeAfter.note}
              className="w-[85%] shrink-0 snap-start md:w-[calc((100%_-_2rem)_/_2)]"
              labels={{
                before: t.beforeAfter.before,
                after: t.beforeAfter.after,
                drag: t.beforeAfter.drag,
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
