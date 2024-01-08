"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
      Armed with a degree in Computer Science and Engineering, I embarked on a self-directed journey into full-stack web development. Over the course of nine years, my expertise has grown to encompass a diverse range of technologies, including PHP, Python, Java, and C#. Specializing in React JS, React Native, and Node JS, I have honed my skills as a MERN stack engineer.
     My passion for both Web3 and Web2 technologies is evident in my self-guided exploration and mastery of blockchain integration into my core stack. Through relentless self-learning, I have cultivated the ability to seamlessly blend traditional and decentralized approaches, resulting in the creation of robust, user-centric web solutions.
  </p>   <p className="mb-3">
Staying at the forefront of industry trends, my commitment to innovation remains unwavering. My journey, marked by self-driven learning and hands-on experience, underscores my dedication to delivering cutting-edge solutions that meet the evolving demands of the ever-changing landscape of web development.
</p>

  
    </motion.section>
  );
}
