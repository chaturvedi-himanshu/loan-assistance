import nodemailer from "nodemailer";

export interface ChatbotLeadEmail {
  name: string;
  phone: string;
  email: string;
  query: string;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST ?? "smtp-mail.outlook.com";
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const to = process.env.SMTP_TO?.trim() || user;

  if (!user || !pass || !to) {
    return null;
  }

  return { host, port, user, pass, to };
}

export function isSmtpConfigured() {
  return getSmtpConfig() !== null;
}

export async function sendChatbotLeadEmail(lead: ChatbotLeadEmail) {
  const config = getSmtpConfig();
  if (!config) {
    console.warn("[mail] SMTP not configured — skipping chatbot lead email");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const submittedAt = new Date().toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = [
    "New chatbot enquiry",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email || "Not provided"}`,
    `Query: ${lead.query || "Not provided"}`,
    `Submitted: ${submittedAt}`,
  ].join("\n");

  const html = `
    <h2 style="margin:0 0 16px;color:#1a1a2e;">New chatbot enquiry</h2>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      <tr><td style="padding:6px 12px 6px 0;font-weight:600;">Name</td><td style="padding:6px 0;">${escapeHtml(lead.name)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600;">Phone</td><td style="padding:6px 0;">${escapeHtml(lead.phone)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600;">Email</td><td style="padding:6px 0;">${escapeHtml(lead.email || "Not provided")}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;">Query</td><td style="padding:6px 0;">${escapeHtml(lead.query || "Not provided")}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600;">Submitted</td><td style="padding:6px 0;">${escapeHtml(submittedAt)}</td></tr>
    </table>
  `;

  try {
    await transporter.sendMail({
      from: `"Smart Loans Chatbot" <${config.user}>`,
      to: config.to,
      replyTo: lead.email || undefined,
      subject: `New chatbot enquiry from ${lead.name}`,
      text,
      html,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("SmtpClientAuthentication is disabled")) {
      throw new Error(
        "Microsoft 365 has SMTP AUTH disabled for your tenant. " +
          "Ask your M365 admin to enable 'Authenticated SMTP' for your mailbox " +
          "(Users → Active users → Mail → Manage email apps), or use a personal @outlook.com account. " +
          "See https://aka.ms/smtp_auth_disabled",
      );
    }
    throw error;
  }

  return true;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
