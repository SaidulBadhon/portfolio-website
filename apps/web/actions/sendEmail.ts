"use server";

import { Resend } from "resend";

const CONTACT_EMAIL = "Saidulbadhon@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SendEmailInput = {
  senderEmail: unknown;
  message: unknown;
};

/** Emails a contact form submission to the site owner via Resend. */
export async function sendEmail({
  senderEmail,
  message,
}: SendEmailInput): Promise<{ error?: string }> {
  if (
    typeof senderEmail !== "string" ||
    senderEmail.length > 500 ||
    !EMAIL_PATTERN.test(senderEmail.trim())
  ) {
    return { error: "Invalid sender email." };
  }
  if (
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 5000
  ) {
    return { error: "Invalid message." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; contact form emails can't be sent.");
    return { error: `Sending failed. Please email me at ${CONTACT_EMAIL}.` };
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: CONTACT_EMAIL,
    subject: "Message from contact form",
    replyTo: senderEmail.trim(),
    text: `${message.trim()}\n\n---\nSent from the portfolio contact form by ${senderEmail.trim()}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return { error: `Sending failed. Please email me at ${CONTACT_EMAIL}.` };
  }
  return {};
}
