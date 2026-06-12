import { connectDB } from "@/lib/mongodb";
import { Application, FormField, FORM_FIELD_SEEDS } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

async function seedFormFieldsIfEmpty() {
  const count = await FormField.countDocuments();
  if (count === 0) {
    await FormField.insertMany(FORM_FIELD_SEEDS);
  }
}

function getMissingRequiredFields(
  body: Record<string, unknown>,
  fields: { key: string; type: string; required: boolean }[],
) {
  return fields
    .filter((field) => field.required)
    .filter((field) => {
      const value = body[field.key];
      if (field.type === "number") {
        return !Number(value);
      }
      return !value?.toString().trim();
    })
    .map((field) => field.key);
}

export async function GET() {
  try {
    await connectDB();
    const docs = await Application.find().sort({ order: 1, createdAt: -1 }).lean();
    return ok(docs);
  } catch (e) {
    return err(String(e), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    await seedFormFieldsIfEmpty();
    const body = await req.json();
    const enabledFields = await FormField.find({ enabled: true }).lean();
    const missing = getMissingRequiredFields(body, enabledFields);
    if (missing.length) {
      return err(`Required fields missing: ${missing.join(", ")}`, 400);
    }
    const doc = await Application.create({
      ...body,
      amount: Number(body.amount) || 0,
      income: Number(body.income) || 0,
      loanType: body.loanType || body.purpose || "Personal Loan",
    });
    return ok(doc, 201);
  } catch (e) {
    return err(String(e), 500);
  }
}
