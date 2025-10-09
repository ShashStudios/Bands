import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment variables (optional)
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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
    if (resend) {
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

      const { error } = await resend.emails.send({
        from: "Bands Waitlist <onboarding@resend.dev>",
        to: ["eliotshytaj05@gmail.com"],
        subject: `New Waitlist Signup: ${name}`,
        html: emailContent,
        replyTo: email,
      });

      if (error) {
        console.error("❌ Resend error:", error);
        // Don't fail the request - just log the error
      } else {
        console.log("✅ Email sent successfully to eliotshytaj05@gmail.com");
      }
    } else {
      console.warn("⚠️  RESEND_API_KEY not configured - email not sent");
      console.log("💡 Add RESEND_API_KEY to .env.local to enable email notifications");
    }

    // Store in database (optional - add your database logic here)
    // await db.waitlist.create({ name, email, company, role, message });

    return NextResponse.json(
      {
        message: "Successfully joined waitlist",
        data: { name, email },
        emailSent: resend !== null,
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
