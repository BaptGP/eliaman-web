import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "contact@eliaman.com",
      to: "contact@eliaman.com",
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #1CB5E0 0%, #0088cc 100%);
                color: white;
                padding: 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                padding: 30px;
              }
              .field {
                margin-bottom: 20px;
              }
              .field-label {
                font-weight: 600;
                color: #1CB5E0;
                margin-bottom: 5px;
                font-size: 14px;
                text-transform: uppercase;
              }
              .field-value {
                color: #555;
                word-break: break-word;
              }
              .message-box {
                background-color: #f9f9f9;
                border-left: 4px solid #1CB5E0;
                padding: 15px;
                border-radius: 4px;
                margin-top: 10px;
              }
              .footer {
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #999;
                border-top: 1px solid #eee;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 Nouveau message de contact</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Nom</div>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Message</div>
                  <div class="message-box field-value">${message.replace(
                    /\n/g,
                    "<br>"
                  )}</div>
                </div>
              </div>
              <div class="footer">
                <p>Message envoyé depuis le formulaire de contact de eliaman.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
