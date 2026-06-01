# Smart Loans chatbot — full portable specification

Use this document in another Next.js (App Router) project to recreate **the same UI, API contracts, MongoDB models, and behavior** as `next-app-loan`.

**Source-of-truth repo paths (this project):**

- UI: `components/ChatbotWidget.tsx`
- APIs: `app/api/chatbot/faqs/route.ts`, `app/api/chatbot/lead/route.ts`
- DB: `lib/mongodb.ts`, chatbot section of `lib/models.ts`
- Mount: `app/layout.tsx` (`<ChatbotWidget />` inside `<body>`)

---

## 1. Agent checklist (order of work)

1. Install **mongoose** (this repo uses `^9.5.0`; same major is fine).
2. Add **`MONGODB_URI`** to `.env.local` (connection string for MongoDB).
3. Create **`lib/mongodb.ts`** — copy from section 4 below (exact).
4. Create or extend **`lib/models.ts`** — append **only** the chatbot `Schema` exports from section 5 if you already have models; otherwise use section 5 as the **entire** `lib/models.ts` for a minimal app.
5. Create **`app/api/chatbot/faqs/route.ts`** and **`app/api/chatbot/lead/route.ts`** — copy from sections 6–7 (exact).
6. Create **`components/ChatbotWidget.tsx`** — copy from section 8 (exact).
7. In **`app/layout.tsx`**, add `import ChatbotWidget from "@/components/ChatbotWidget";` and render `<ChatbotWidget />` as a sibling after `{children}` inside `<body>` (see section 9).
8. Ensure **`tsconfig.json`** has `"paths": { "@/*": ["./*"] }` (or `["./src/*"]` if using `src/` — then place files under `src/` accordingly).
9. Add a route **`/application-form`** (or edit the widget): the “Apply Now” quick reply navigates to `/application-form` (hardcoded in the widget).

---

## 2. HTTP contracts (must not change for identical behavior)

### `GET /api/chatbot/faqs`

- **Success:** `{ "success": true, "data": <array of FAQ documents> }`
- **Failure:** `{ "success": false, "data": [] }`
- Each FAQ document fields used by the UI: `_id`, `question`, `answer`, `keywords` (string array), `isQuickReply` (boolean), `order` (number).

### `POST /api/chatbot/lead`

- **Body (JSON):** `{ "name": string, "phone": string, "query"?: string }`
- **400:** missing name or phone — `{ "success": false, "error": "Name and phone required" }`
- **200:** `{ "success": true }`
- **500:** `{ "success": false, "error": "Server error" }`

### Widget `fetch` URLs (fixed paths)

- `GET` **`/api/chatbot/faqs`**
- `POST` **`/api/chatbot/lead`**

---

## 3. Dependencies

```json
"mongoose": "^9.5.0"
```

Also: `next`, `react`, `react-dom` (App Router + `"use client"`). No CSS framework required for the widget (all inline styles + injected `<style>` keyframes).

---

## 4. `lib/mongodb.ts` (exact copy)

```ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache;
}

const cache: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
};
global._mongooseCache = cache;

export async function connectDB() {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
```

---

## 5. `lib/models.ts` — chatbot-only minimal file

If the target app **already** has `lib/models.ts`, merge the two schemas and exports below into that file (and keep the same `import mongoose, { Schema } from "mongoose"` at the top).

If there is **no** existing models file, create **`lib/models.ts`** with **only** this content:

```ts
import mongoose, { Schema } from "mongoose";

// ── Chatbot Q&A ───────────────────────────────────────────
const chatbotQASchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    keywords: { type: [String], default: [] },
    isQuickReply: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Chat Lead (name + phone collected via chatbot) ────────
const chatLeadSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    query: { type: String, default: "" },
  },
  { timestamps: true },
);

export const ChatbotQA =
  mongoose.models.ChatbotQA ?? mongoose.model("ChatbotQA", chatbotQASchema);

export const ChatLead =
  mongoose.models.ChatLead ?? mongoose.model("ChatLead", chatLeadSchema);
```

MongoDB collection names will default to Mongoose pluralized/lowercased forms (`chatbotqas`, `chatleads`) unless overridden — matching a fresh Mongoose app.

---

## 6. `app/api/chatbot/faqs/route.ts` (exact copy)

```ts
import { connectDB } from "@/lib/mongodb";
import { ChatbotQA } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const faqs = await ChatbotQA.find().sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ success: true, data: faqs });
  } catch {
    return NextResponse.json({ success: false, data: [] });
  }
}
```

---

## 7. `app/api/chatbot/lead/route.ts` (exact copy)

```ts
import { connectDB } from "@/lib/mongodb";
import { ChatLead } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, query } = await req.json();
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone required" },
        { status: 400 },
      );
    }
    await connectDB();
    await ChatLead.create({
      name: name.trim(),
      phone: phone.trim(),
      query: query ?? "",
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
```

---

## 8. `components/ChatbotWidget.tsx` (exact copy)

```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface QA {
  _id: string;
  question: string;
  answer: string;
  keywords: string[];
  isQuickReply: boolean;
  order: number;
}

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  time: Date;
  quickReplies?: string[];
  isTyping?: boolean;
}

type FlowState = "chat" | "ask-name" | "ask-phone" | "done";

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

const typingMsg = (): Message => ({
  id: "typing",
  role: "bot",
  text: "",
  time: new Date(),
  isTyping: true,
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
  const [flow, setFlow] = useState<FlowState>("chat");
  const [leadName, setLeadName] = useState("");
  const [leadQuery, setLeadQuery] = useState("");
  const [unread, setUnread] = useState(0);
  const [greeted, setGreeted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch QAs once
  useEffect(() => {
    fetch("/api/chatbot/faqs")
      .then((r) => r.json())
      .then((d) => setQaList(d.data ?? []))
      .catch(() => {});
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Greet on open
  useEffect(() => {
    if (isOpen && !greeted) {
      setGreeted(true);
      setUnread(0);
      const quickReplies = qaList
        .filter((q) => q.isQuickReply)
        .map((q) => q.question)
        .slice(0, 5);
      const defaults = [
        "Personal Loan",
        "Business Loan",
        "Interest Rates",
        "Apply Now",
        "Contact Us",
      ];
      setTimeout(() => {
        addBotMessage(
          "👋 Hi there! I'm **Smart Loans Assistant**. I'm here to help you with all your loan queries.\n\nHow can I help you today?",
          quickReplies.length ? quickReplies : defaults,
        );
      }, 400);
    }
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, greeted, qaList]);

  const addBotMessage = useCallback((text: string, quickReplies?: string[]) => {
    const msg = botMsg(text, quickReplies);
    setMessages((prev) => [...prev, msg]);
  }, []);

  const simulateTypingThenReply = useCallback(
    (text: string, quickReplies?: string[]) => {
      setIsTyping(true);
      const delay = Math.min(600 + text.length * 10, 1800);
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage(text, quickReplies);
      }, delay);
    },
    [addBotMessage],
  );

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
        // Save lead
        fetch("/api/chatbot/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadName,
            phone: val,
            query: leadQuery,
          }),
        });
        setFlow("done");
        simulateTypingThenReply(
          `✅ **Perfect!** We've saved your details.\n\nOur team will call **${leadName}** at **${val}** within 2 hours!\n\nIs there anything else I can help you with?`,
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

      // Check for callback/contact intent
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
        const followup = [
          "Want to know more?",
          "Ask me anything else",
          "Get a callback",
        ];
        simulateTypingThenReply(match.answer, followup);
        return;
      }

      // Apply / start application
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
    [flow, input, leadName, leadQuery, qaList, simulateTypingThenReply],
  );

  const handleQuickReply = (qr: string) => {
    if (qr === "Apply Now →" || qr === "Apply Now") {
      window.location.href = "/application-form";
      return;
    }
    if (
      qr === "Yes, call me back!" ||
      qr === "Get a callback" ||
      qr === "Talk to an advisor"
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

  const handleOpen = () => {
    setIsOpen((o) => !o);
  };

  // Increment unread when closed and bot messages come
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

  // Render bold markdown **text**
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

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={handleOpen}
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
            : "linear-gradient(135deg, #8180e0 0%, #6c6bcc 100%)",
          boxShadow: "0 8px 32px rgba(129,128,224,0.50)",
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
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
            background: "rgba(129,128,224,0.25)",
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
              "linear-gradient(135deg, #8180e0 0%, #6c6bcc 50%, #5e5dc0 100%)",
            padding: "18px 20px",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* Header SVG decoration */}
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
            {/* Avatar */}
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
                <path
                  d="M17.5 8 l0.8-1 M18.5 8 l0.8 1"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
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
                Smart Loans Assistant
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
                    boxShadow: "0 0 0 2px rgba(74,222,128,0.3)",
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

          {/* Sub-bar */}
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
              { icon: "⚡", text: "24hr Approval" },
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
            scrollbarColor: "#e0e0f0 transparent",
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "32px 16px",
                color: "#aaa",
              }}
            >
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
              {/* Bot avatar dot */}
              {msg.role === "bot" && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#8180e0,#6c6bcc)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginBottom: 2,
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
                  /* Typing indicator */
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
                          background: "#8180e0",
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
                          ? "linear-gradient(135deg, #8180e0 0%, #6c6bcc 100%)"
                          : "#fff",
                      color: msg.role === "user" ? "#fff" : "#333",
                      fontSize: 14,
                      lineHeight: 1.6,
                      border:
                        msg.role === "bot" ? "1.5px solid #f0f0f8" : "none",
                      boxShadow:
                        msg.role === "bot"
                          ? "0 2px 8px rgba(0,0,0,0.05)"
                          : "0 2px 12px rgba(129,128,224,0.30)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {renderText(msg.text)}
                  </div>
                )}

                {/* Quick replies */}
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
                          border: "1.5px solid #8180e0",
                          background: "transparent",
                          color: "#8180e0",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "#8180e0";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#8180e0";
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

          {/* Live typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#8180e0,#6c6bcc)",
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
                      background: "#8180e0",
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
            placeholder={
              flow === "ask-name"
                ? "Enter your name…"
                : flow === "ask-phone"
                  ? "Enter your phone number…"
                  : "Type a message…"
            }
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
            onFocus={(e) => (e.currentTarget.style.borderColor = "#8180e0")}
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
                ? "linear-gradient(135deg, #8180e0 0%, #6c6bcc 100%)"
                : "#e8e8f5",
              cursor: input.trim() ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              flexShrink: 0,
              boxShadow: input.trim()
                ? "0 4px 14px rgba(129,128,224,0.35)"
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

        {/* Powered-by bar */}
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
          <span style={{ fontSize: 10, color: "#8180e0", fontWeight: 700 }}>
            Smart Loans Assistant
          </span>
          <span style={{ fontSize: 10, color: "#ccc" }}>
            {" "}
            · 256-bit encrypted
          </span>
        </div>
      </div>

      {/* ── CSS Keyframes ── */}
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
```

---

## 9. Root layout integration (pattern from this repo)

Inside `app/layout.tsx` (or `src/app/layout.tsx`):

```tsx
import ChatbotWidget from "@/components/ChatbotWidget";

// ... inside <body>:
<>
  {children}
  <ChatbotWidget />
</>;
```

Use a fragment or a single parent; the important part is **`ChatbotWidget` after `children`** so it overlays every page.

---

## 10. Optional: seed data in this repo

FAQ documents can be populated with `node scripts/seed-chatbot.mjs` in **this** project (not duplicated here — file is large). For an identical knowledge base, copy that script from the source repo or export/import the `chatbotqas` collection from MongoDB.

---

## 11. Optional: admin CRUD (not required for the widget)

The floating widget does **not** depend on admin routes. For parity with the full app, see:

- `app/api/admin/chatbot-qa/route.ts`
- `app/api/admin/chatbot-qa/[id]/route.ts`
- `app/admin/chatbot/page.tsx`

---

## 12. Version note (snapshot)

This spec was generated from **`next-app-loan`** using Next **16.2.4**, React **19.2.4**, mongoose **^9.5.0**. The chatbot code is plain React/TS and should run on other supported Next/React versions; keep `mongoose` compatible with your runtime.

---

**End of specification.** Paste this entire file into the other project’s chat and ask the agent to implement sections 1–9 verbatim for a matching chatbot.
