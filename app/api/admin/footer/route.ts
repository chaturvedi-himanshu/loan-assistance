import { connectDB } from "@/lib/mongodb";
import { FooterContent } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    await connectDB();
    let doc = await FooterContent.findOne().lean();
    if (!doc) doc = await FooterContent.create({});
    return ok(doc);
  } catch (e) {
    return err(String(e), 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const doc = await FooterContent.findOneAndUpdate({}, body, { new: true, upsert: true });
    return ok(doc);
  } catch (e) {
    return err(String(e), 500);
  }
}
