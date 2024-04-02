import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres";
import Email from "@/react-email/emails";
import type { Snake } from "@/app/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const queryResult = await sql`SELECT * FROM snakes ORDER BY id ASC`;
    const snakes = queryResult.rows as Snake[];

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["carlosavilu11@gmail.com"],
      subject: "Feed your snakes",
      react: Email({ snakes }),
    });

    return NextResponse.json(data);
  } catch (e) {
    NextResponse.json({ error: e });
  }
}
