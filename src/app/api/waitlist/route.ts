import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Configure Resend client using environment variables so the SDK can send emails.
const resendApiKey = process.env.RESEND_API_KEY;
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;
const waitlistRecipient =
  process.env.RESEND_WAITLIST_RECIPIENT ?? "eliotshytaj05@gmail.com";
const waitlistFromEmail =
  process.env.RESEND_WAITLIST_FROM ?? "Bands Waitlist <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log submission data (for testing without Resend)
    console.log("\n📧 New Waitlist Submission:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    if (company) console.log(`Company: ${company}`);
    if (role) console.log(`Role: ${role}`);
    if (message) console.log(`Message: ${message}`);
    console.log(`Submitted at: ${new Date().toLocaleString()}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    // Send email using Resend if API key is configured
    let emailSent = false;
    let sendError: string | null = null;

    if (resendClient) {
      const emailContent = `
        <h2>New Waitlist Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${role ? `<p><strong>Role:</strong> ${role}</p>` : ""}
        ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ""}
        <hr />
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `;

      try {
        const { error } = await resendClient.emails.send({
          from: waitlistFromEmail,
          to: [waitlistRecipient],
          subject: `New Waitlist Signup: ${name}`,
          html: emailContent,
          replyTo: email,
        });

        if (error) {
          console.error("❌ Resend error:", error);
          sendError =
            typeof error === "string"
              ? error
              : error?.message ?? "Resend returned an unknown error";
        } else {
          emailSent = true;
          console.log(
            `✅ Email sent successfully to ${waitlistRecipient}`
          );
        }
      } catch (error) {
        console.error("❌ Resend SDK threw an exception:", error);
        sendError =
          error instanceof Error
            ? error.message
            : "Resend client threw an unknown error";
      }
    } else {
      console.warn("⚠️  RESEND_API_KEY not configured - email not sent");
      console.log("💡 Add RESEND_API_KEY to .env.local to enable email notifications");
      sendError = "Email service is not configured";
    }

    // Store in database (optional - add your database logic here)
    // await db.waitlist.create({ name, email, company, role, message });

    if (sendError) {
      return NextResponse.json(
        { error: `Unable to send notification email: ${sendError}` },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully joined waitlist",
        data: { name, email },
        emailSent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve waitlist count or status
export async function GET() {
  return NextResponse.json(
    { message: "Waitlist API is running" },
    { status: 200 }
  );
}
