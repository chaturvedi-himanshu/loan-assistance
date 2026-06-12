import { connectDB } from "@/lib/mongodb";
import { ChatLead } from "@/lib/models";
import { sendChatbotLeadEmail } from "@/lib/mail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, query } = await req.json();
    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Name and phone required" }, { status: 400 });
    }

    const lead = {
      name: name.trim(),
      phone: phone.trim(),
      email: (email ?? "").trim(),
      query: (query ?? "").trim(),
    };

    await connectDB();
    await ChatLead.create(lead);

    try {
      await sendChatbotLeadEmail(lead);
    } catch (mailError) {
      console.error("[chatbot/lead] Failed to send notification email:", mailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
