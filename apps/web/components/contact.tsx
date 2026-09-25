"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "motion/react";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [isPending, startTransition] = React.useTransition();

  // Handled in onSubmit rather than a form action: React resets a form after
  // its action finishes, which would wipe the message when sending fails.
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const senderEmail = String(formData.get("senderEmail") ?? "");
    const message = String(formData.get("message") ?? "");

    startTransition(async () => {
      const { error } = await sendEmail({ senderEmail, message }).catch(() => ({
        error: "Failed to send message.",
      }));
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Message sent successfully!");
      form.reset();
    });
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:Saidulbadhon@gmail.com">
        Saidulbadhon@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        onSubmit={handleSubmit}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white/80 dark:focus:bg-white transition-all dark:outline-hidden"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white/80 dark:focus:bg-white transition-all dark:outline-hidden"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn pending={isPending} />
      </form>
    </motion.section>
  );
}
