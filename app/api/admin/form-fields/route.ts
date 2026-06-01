import { connectDB } from "@/lib/mongodb";
import { FormField, FORM_FIELD_SEEDS } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

async function seedIfEmpty() {
  const count = await FormField.countDocuments();
  if (count === 0) {
    await FormField.insertMany(FORM_FIELD_SEEDS);
  }
}

export async function GET() {
  try {
    await connectDB();
    await seedIfEmpty();
    const fields = await FormField.find().sort({ order: 1 }).lean();
    return ok(fields);
  } catch (e) {
    return err(String(e), 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const fields: Array<{
      _id: string;
      enabled: boolean;
      required: boolean;
      label: string;
      placeholder: string;
      order: number;
      options?: string[];
    }> = await req.json();

    await Promise.all(
      fields.map((f) =>
        FormField.findByIdAndUpdate(f._id, {
          enabled: f.enabled,
          required: f.required,
          label: f.label,
          placeholder: f.placeholder,
          order: f.order,
          ...(Array.isArray(f.options) ? { options: f.options } : {}),
        }),
      ),
    );

    const updated = await FormField.find().sort({ order: 1 }).lean();
    return ok(updated);
  } catch (e) {
    return err(String(e), 500);
  }
}
