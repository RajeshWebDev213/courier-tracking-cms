/* Shared styles + header used by the home sections.
   Colors: bg #FAFAFC, card #FFF, border #E8E8F0, ink #111827,
   text #5B5F6B, accent #6D3EF0 -> #4F46E5, radius 24px */

import React from "react";

export const card =
  "rounded-3xl border border-[#E8E8F0] bg-white shadow-[0_8px_30px_rgba(79,70,229,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#D6D0F7] hover:shadow-[0_16px_40px_rgba(79,70,229,0.12)]";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6D3EF0] to-[#4F46E5] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(109,62,240,0.35)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D3EF0]";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E8F0] bg-white px-7 py-3.5 text-sm font-semibold text-[#111827] transition hover:border-[#6D3EF0] hover:text-[#6D3EF0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D3EF0]";

export const SectionHeader = ({ title, text, action }) => (
  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[#5B5F6B] sm:text-lg">
        {text}
      </p>
    </div>
    {action}
  </div>
);