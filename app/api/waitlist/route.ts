import { NextRequest, NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: unknown = body?.email;

    if (typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const normalised = email.trim().toLowerCase();

    // TODO: Uncomment when Supabase is configured
    // const { data, error } = await supabase
    //   .from('waitlist')
    //   .insert({ email: normalised, created_at: new Date().toISOString() });
    // if (error) throw error;

    console.log(`[waitlist] New signup: ${normalised}`);

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
