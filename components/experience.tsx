"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid #9ca3af"
                    : "0.4rem solid rgba(255, 255, 255, 0.5)",
              }}
              date={item.date}
              icon={
                <img
                  src={item.companyLogo}
                  alt={`${item.company} logo`}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = item.company.charAt(0);
                      parent.style.display = "flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      parent.style.fontSize = "1.5rem";
                      parent.style.fontWeight = "bold";
                    }
                  }}
                />
              }
              iconStyle={{
                background:
                  theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)",
              }}
            >
              <h3 className="text-xl font-bold !mt-0 text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="!mt-1 !text-sm font-semibold text-gray-800 dark:text-gray-300">
                <span>{item.company}</span>

                <span className="px-2">•</span>

                <span className="!mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {item.location}
                </span>
              </p>
              {/* <p className="!mt-1 text-base font-semibold text-gray-800 dark:text-gray-300">
                {item.company}
              </p>
              <p className="!mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                {item.location}
              </p> */}
              <p className="!mt-2 text-xs leading-relaxed text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
