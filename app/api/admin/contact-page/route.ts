import { connectDB } from "@/lib/mongodb";
import { ContactPage } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    await connectDB();
    let doc = await ContactPage.findOne().lean();
    if (!doc) doc = await ContactPage.create({});
    return ok(doc);
  } catch (e) {
    return err(String(e), 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const doc = await ContactPage.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return ok(doc);
  } catch (e) {
    return err(String(e), 500);
  }
}
