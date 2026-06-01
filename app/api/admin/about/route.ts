import { connectDB } from "@/lib/mongodb";
import { AboutPage } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const doc = (await AboutPage.findOne().lean()) as Record<string, unknown> | null;
        if (!doc) return ok({});

        // Back-compat: migrate legacy history1/2/3 fields into the new
        // dynamic `historyItems` array so existing documents render in the
        // new card-based admin UI without requiring a manual migration.
        const existing = Array.isArray(doc.historyItems) ? doc.historyItems : [];
        if (existing.length === 0) {
            const migrated: Array<Record<string, unknown>> = [];
            for (const i of [1, 2, 3] as const) {
                const period = doc[`history${i}Period`];
                if (typeof period === "string" && period.length > 0) {
                    migrated.push({
                        period,
                        frontDesc1: doc[`history${i}FrontDesc1`] ?? "",
                        frontDesc2: doc[`history${i}FrontDesc2`] ?? "",
                        backDesc1: doc[`history${i}BackDesc1`] ?? "",
                        backDesc2: doc[`history${i}BackDesc2`] ?? "",
                        order: i - 1,
                    });
                }
            }
            if (migrated.length > 0) doc.historyItems = migrated;
        }

        return ok(doc);
    } catch (e) {
        return err(String(e), 500);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const doc = await AboutPage.findOneAndUpdate({}, body, { new: true, upsert: true });
        return ok(doc);
    } catch (e) {
        return err(String(e), 500);
    }
}
