"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────

interface QA {
  _id: string;
  question: string;
  answer: string;
  keywords: string[];
  isQuickReply: boolean;
  order: number;
}

interface SiteSettings {
  siteName: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  workingHours: string;
}

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  time: Date;
  quickReplies?: string[];
  isTyping?: boolean;
}

type FlowState = "chat" | "ask-name" | "ask-phone" | "ask-email" | "done";

// ── Helpers ───────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2);

const botMsg = (text: string, quickReplies?: string[]): Message => ({
  id: uid(),
  role: "bot",
  text,
  time: new Date(),
  quickReplies,
});

const userMsg = (text: string): Message => ({
  id: uid(),
  role: "user",
  text,
  time: new Date(),
});

function matchQA(input: string, list: QA[]): QA | null {
  const lower = input.toLowerCase();
  let best: QA | null = null;
  let bestScore = 0;
  for (const qa of list) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (lower.includes(kw.toLowerCase())) score += kw.length;
    }
    if (
      qa.question
        .toLowerCase()
        .split(" ")
        .some((w) => lower.includes(w) && w.length > 3)
    )
      score += 2;
    if (score > bestScore) {
      bestScore = score;
      best = qa;
    }
  }
  return bestScore > 0 ? best : null;
}

const fmtTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ── Main Component ────────────────────────────────────────────────────────────

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [qaList, setQaList] = useState<QA[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [flow, setFlow] = useState<FlowState>("chat");
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadQuery, setLeadQuery] = useState("");
  const [unread, setUnread] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const greetedRef = useRef(false);

  // Fetch QAs and settings once
  useEffect(() => {
    fetch("/api/chatbot/faqs")
      .then((r) => r.json())
      .then((d) => setQaList(d.data ?? []))
      .catch(() => {});

    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.data ?? null))
      .catch(() => {});
  }, []);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addBotMessage = useCallback((text: string, quickReplies?: string[]) => {
    setMessages((prev) => [...prev, botMsg(text, quickReplies)]);
  }, []);

  const simulateTypingThenReply = useCallback(
    (text: string, quickReplies?: string[]) => {
      setIsTyping(true);
      const delay = Math.min(600 + text.length * 10, 1800);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, botMsg(text, quickReplies)]);
      }, delay);
    },
    [],
  );

  // Greet on open — use ref to avoid setState-in-effect
  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 300);
    if (greetedRef.current) return;
    greetedRef.current = true;
    const quickReplies = qaList
      .filter((q) => q.isQuickReply)
      .map((q) => q.question)
      .slice(0, 5);
    const defaults = [
      "Owner Occupied",
      "Investment",
      "Business Loan",
      "Car Loan",
      "Apply Now",
    ];
    const t = setTimeout(() => {
      addBotMessage(
        "👋 Hi there! I'm the **Smart LC Assistant**. I'm here to help you with all your Smart Loans queries.\n\nHow can I help you today?",
        quickReplies.length ? quickReplies : defaults,
      );
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Build dynamic contact info message from settings
  const buildContactMessage = useCallback((s: SiteSettings | null) => {
    if (!s) return "📞 Please visit our website for contact details.";
    return (
      `📬 **Get in Touch with ${s.siteName}**\n\n` +
      `📞 Phone: **${s.phone1}**\n` +
      (s.phone2 ? `📱 Alternate: **${s.phone2}**\n` : "") +
      `✉️ Email: **${s.email}**\n` +
      `🕐 Working Hours: **${s.workingHours}**\n` +
      `📍 Address: **${s.address}**\n\n` +
      `Would you like us to call you back? I can schedule that right now! 📱`
    );
  }, []);

  const handleSend = useCallback(
    (text?: string) => {
      const val = (text ?? input).trim();
      if (!val) return;
      setInput("");
      setMessages((prev) => [...prev, userMsg(val)]);

      // ── Flow states ────────────────────────────────────────
      if (flow === "ask-name") {
        setLeadName(val);
        setFlow("ask-phone");
        simulateTypingThenReply(
          `Nice to meet you, **${val}**! 😊\n\nWhat's your phone number so we can reach you?`,
        );
        return;
      }

      if (flow === "ask-phone") {
        setLeadPhone(val);
        setFlow("ask-email");
        simulateTypingThenReply(
          `Got it! 📞\n\nCould you also share your **email address**? We'll send you loan details and updates.`,
        );
        return;
      }

      if (flow === "ask-email") {
        // Save lead with email
        fetch("/api/chatbot/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadName,
            phone: leadPhone,
            email: val,
            query: leadQuery,
          }),
        });
        setFlow("done");
        simulateTypingThenReply(
          `✅ **Perfect!** We've saved your details.\n\nOur team will call **${leadName}** at **${leadPhone}** within 2 hours and send updates to **${val}**!\n\nIs there anything else I can help you with?`,
          ["Yes, I have more questions", "No, thanks!"],
        );
        return;
      }

      if (flow === "done" && val.toLowerCase().includes("no")) {
        simulateTypingThenReply(
          "Great! Have a wonderful day! 😊\n\nFeel free to chat anytime. We're always here for you. 🌟",
        );
        return;
      }

      if (flow === "done") {
        setFlow("chat");
      }

      // ── Q&A Matching ───────────────────────────────────────
      const lowerVal = val.toLowerCase();

      // Contact info intent
      const contactKeywords = [
        "contact",
        "phone",
        "email",
        "address",
        "reach",
        "hours",
        "working hours",
        "location",
      ];
      if (contactKeywords.some((k) => lowerVal.includes(k))) {
        simulateTypingThenReply(buildContactMessage(settings), [
          "Call me back",
          "Apply Now",
          "Ask me anything else",
        ]);
        return;
      }

      // Callback intent
      const callbackKeywords = [
        "callback",
        "call me",
        "contact me",
        "call back",
        "reach me",
        "call",
        "speak",
      ];
      if (callbackKeywords.some((k) => lowerVal.includes(k))) {
        setLeadQuery(val);
        setFlow("ask-name");
        simulateTypingThenReply(
          "Sure! I'd love to have our loan expert call you back. 📞\n\nCould you please share your **name**?",
        );
        return;
      }

      const match = matchQA(val, qaList);
      if (match) {
        setLeadQuery(val);
        simulateTypingThenReply(match.answer, [
          "Want to know more?",
          "Ask me anything else",
          "Get a callback",
        ]);
        return;
      }

      // Apply intent
      if (
        lowerVal.includes("apply") ||
        lowerVal.includes("start") ||
        lowerVal.includes("get loan")
      ) {
        simulateTypingThenReply(
          "🚀 Great choice! You can apply right now and get a decision in 24 hours.\n\n**Click below to start your application:**",
          ["Apply Now →", "Talk to an advisor", "Learn about loan types"],
        );
        return;
      }

      // Fallback
      setLeadQuery(val);
      simulateTypingThenReply(
        "I didn't quite catch that. 🤔 Let me connect you with our expert!\n\nWould you like a **callback** from our loan advisor?",
        ["Yes, call me back!", "No thanks", "See loan options"],
      );
    },
    [
      flow,
      input,
      leadName,
      leadPhone,
      leadQuery,
      qaList,
      settings,
      simulateTypingThenReply,
      buildContactMessage,
    ],
  );

  const handleQuickReply = (qr: string) => {
    if (qr === "Apply Now →" || qr === "Apply Now") {
      router.push("/application-form");
      return;
    }
    if (
      [
        "Yes, call me back!",
        "Get a callback",
        "Talk to an advisor",
        "Call me back",
      ].includes(qr)
    ) {
      setMessages((prev) => [...prev, userMsg(qr)]);
      setLeadQuery(qr);
      setFlow("ask-name");
      simulateTypingThenReply("Sure! Could you please share your **name**? 😊");
      return;
    }
    if (qr === "No, thanks!" || qr === "No thanks") {
      setMessages((prev) => [...prev, userMsg(qr)]);
      simulateTypingThenReply(
        "No problem! Feel free to chat anytime. Have a great day! 🌟",
      );
      return;
    }
    handleSend(qr);
  };

  // Increment unread when closed and bot messages arrive
  const prevMsgLen = useRef(0);
  useEffect(() => {
    if (!isOpen && messages.length > prevMsgLen.current) {
      const newBotMsgs = messages
        .slice(prevMsgLen.current)
        .filter((m) => m.role === "bot" && !m.isTyping).length;
      if (newBotMsgs > 0) setUnread((u) => u + newBotMsgs);
    }
    prevMsgLen.current = messages.length;
  }, [messages, isOpen]);

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**") && p.endsWith("**") ? (
        <strong key={i}>{p.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{p}</span>
      ),
    );
  };

  const inputPlaceholder =
    flow === "ask-name"
      ? "Enter your name…"
      : flow === "ask-phone"
        ? "Enter your phone number…"
        : flow === "ask-email"
          ? "Enter your email address…"
          : "Type a message…";

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() =>
          setIsOpen((o) => {
            if (!o) setUnread(0);
            return !o;
          })
        }
        aria-label="Open chat"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 9999,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: isOpen
            ? "linear-gradient(135deg, #f0734a 0%, #e05528 100%)"
            : "linear-gradient(135deg, #2cbbdf 0%, #21a8c8 100%)",
          boxShadow: "0 8px 32px rgba(44,187,223,0.50)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
          transform: isOpen ? "rotate(45deg) scale(1.05)" : "scale(1)",
        }}
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!isOpen && unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: "#f0734a",
              color: "#fff",
              width: 20,
              height: 20,
              borderRadius: "50%",
              fontSize: 11,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #fff",
            }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* Pulse ring */}
      {!isOpen && (
        <span
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 9998,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(44,187,223,0.25)",
            animation: "chatPulse 2s ease-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Chat Window ── */}
      <div
        style={{
          position: "fixed",
          bottom: 102,
          right: 28,
          zIndex: 9999,
          width: 380,
          maxWidth: "calc(100vw - 40px)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.20)",
          background: "#fff",
          transform: isOpen
            ? "scale(1) translateY(0)"
            : "scale(0.92) translateY(20px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
          transformOrigin: "bottom right",
          display: "flex",
          flexDirection: "column",
          maxHeight: "78vh",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #2cbbdf 0%, #21a8c8 50%, #1a95b2 100%)",
            padding: "18px 20px",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
            viewBox="0 0 380 80"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="340" cy="-10" r="70" fill="rgba(255,255,255,0.07)" />
            <circle cx="20" cy="80" r="50" fill="rgba(255,255,255,0.05)" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <circle
                key={i}
                cx={30 + i * 50}
                cy={10}
                r="2"
                fill="rgba(255,255,255,0.12)"
              />
            ))}
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.3)",
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#fff" />
                <path
                  d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="18" cy="8" r="3" fill="rgba(240,115,74,0.9)" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 16,
                  lineHeight: 1.2,
                }}
              >
                Smart LC Assistant
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "inline-block",
                  }}
                ></span>
                <span style={{ color: "rgba(255,255,255,0.80)", fontSize: 12 }}>
                  Online · Replies instantly
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 30,
                height: 30,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              { icon: "⚡", text: "Fast Approval" },
              { icon: "🔒", text: "100% Secure" },
              { icon: "💰", text: "Low Rates" },
            ].map((b) => (
              <div
                key={b.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "rgba(255,255,255,0.12)",
                  padding: "3px 10px",
                  borderRadius: 20,
                }}
              >
                <span style={{ fontSize: 11 }}>{b.icon}</span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.90)",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {b.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Messages ── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 14px",
            background: "linear-gradient(180deg, #f8f8ff 0%, #fff 100%)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            scrollbarWidth: "thin",
            scrollbarColor: "#cceffa transparent",
          }}
        >
          {messages.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px 16px" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>💬</div>
              <div style={{ fontSize: 14, color: "#bbb" }}>
                Start the conversation!
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: 8,
                marginBottom: 2,
              }}
            >
              {msg.role === "bot" && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#2cbbdf,#21a8c8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="#fff" />
                    <path
                      d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
              <div
                style={{
                  maxWidth: "78%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {msg.isTyping ? (
                  <div
                    style={{
                      background: "#fff",
                      border: "1.5px solid #f0f0f8",
                      padding: "12px 16px",
                      borderRadius: "18px 18px 18px 4px",
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "#2cbbdf",
                          display: "inline-block",
                          animation: `chatBounce 1.2s ${i * 0.2}s ease-in-out infinite`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius:
                        msg.role === "user"
                          ? "18px 18px 4px 18px"
                          : "18px 18px 18px 4px",
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #2cbbdf 0%, #21a8c8 100%)"
                          : "#fff",
                      color: msg.role === "user" ? "#fff" : "#333",
                      fontSize: 14,
                      lineHeight: 1.6,
                      border:
                        msg.role === "bot" ? "1.5px solid #f0f0f8" : "none",
                      boxShadow:
                        msg.role === "bot"
                          ? "0 2px 8px rgba(0,0,0,0.05)"
                          : "0 2px 12px rgba(44,187,223,0.30)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {renderText(msg.text)}
                  </div>
                )}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    {msg.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => handleQuickReply(qr)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          border: "1.5px solid #2cbbdf",
                          background: "transparent",
                          color: "#2cbbdf",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "#2cbbdf";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#2cbbdf";
                        }}
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
                {!msg.isTyping && (
                  <span
                    style={{
                      fontSize: 10,
                      color: "#ccc",
                      textAlign: msg.role === "user" ? "right" : "left",
                      paddingRight: 4,
                    }}
                  >
                    {fmtTime(msg.time)}
                  </span>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#2cbbdf,#21a8c8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="#fff" />
                  <path
                    d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1.5px solid #f0f0f8",
                  padding: "12px 16px",
                  borderRadius: "18px 18px 18px 4px",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#2cbbdf",
                      display: "inline-block",
                      animation: `chatBounce 1.2s ${i * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ── */}
        <div
          style={{
            borderTop: "1px solid #f0f0f8",
            background: "#fff",
            padding: "10px 14px",
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={inputPlaceholder}
            type={flow === "ask-email" ? "email" : "text"}
            style={{
              flex: 1,
              border: "1.5px solid #e8e8f5",
              borderRadius: 24,
              padding: "10px 16px",
              fontSize: 14,
              outline: "none",
              background: "#fafafe",
              transition: "border-color 0.2s",
              color: "#333",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#2cbbdf")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e8e8f5")}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "none",
              background: input.trim()
                ? "linear-gradient(135deg, #2cbbdf 0%, #21a8c8 100%)"
                : "#e8e8f5",
              cursor: input.trim() ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              flexShrink: 0,
              boxShadow: input.trim()
                ? "0 4px 14px rgba(44,187,223,0.35)"
                : "none",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={input.trim() ? "#fff" : "#bbb"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <div
          style={{
            background: "#fafafe",
            borderTop: "1px solid #f5f5ff",
            padding: "6px 14px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 10, color: "#ccc" }}>Powered by </span>
          <span style={{ fontSize: 10, color: "#2cbbdf", fontWeight: 700 }}>
            Smart LC Assistant
          </span>
          <span style={{ fontSize: 10, color: "#ccc" }}>
            {" "}
            · 256-bit encrypted
          </span>
        </div>
      </div>

      <style>{`
        @keyframes chatPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.7); opacity: 0;   }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
