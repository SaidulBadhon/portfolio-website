"use client";

import React from "react";
import Image, { type StaticImageData } from "next/image";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { experiences } from "@/content/experience";

function CompanyIcon({
  company,
  logo,
}: {
  company: string;
  logo?: StaticImageData;
}) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={`${company} logo`}
        width={60}
        height={60}
        className="w-full h-full rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-xl font-bold">
      {company.charAt(0)}
    </div>
  );
}

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiences.map((item, index) => (
          <React.Fragment key={`${item.company}-${item.title}-${index}`}>
            <VerticalTimelineElement
              contentStyle={{
                background: "var(--timeline-card-bg)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight: "0.4rem solid var(--timeline-arrow-color)",
              }}
              date={item.date}
              icon={<CompanyIcon company={item.company} logo={item.logo} />}
              iconStyle={{
                background: "var(--timeline-icon-bg)",
                boxShadow:
                  "0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)",
              }}
            >
              <h3 className="text-xl font-bold mt-0! text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-1! text-sm! font-semibold text-gray-800 dark:text-gray-300">
                <span>{item.company}</span>

                <span className="px-2">•</span>

                <span className="mt-1! text-sm font-normal text-gray-500 dark:text-gray-400">
                  {item.location}
                </span>
              </p>
              <p className="mt-2! text-xs leading-relaxed text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
