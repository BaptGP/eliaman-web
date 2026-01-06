import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const data = await resend.emails.send({
      from: "noreply@eliaman.com",
      to: "contact@eliaman.com",
      reply_to: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                line-height: 1.6;
                color: #111111;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #1CB5E0 0%, #000851 50%, #6A1B9A 100%);
                padding: 40px 20px;
                text-align: center;
                color: white;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
              }
              .content {
                padding: 40px;
              }
              .info-block {
                margin-bottom: 30px;
              }
              .info-label {
                font-size: 12px;
                font-weight: 600;
                color: #1CB5E0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
              }
              .info-value {
                font-size: 16px;
                color: #111111;
                margin: 0;
              }
              .message-block {
                background-color: #f9f9f9;
                border-left: 4px solid #1CB5E0;
                padding: 20px;
                border-radius: 4px;
                margin-top: 20px;
              }
              .message-text {
                font-size: 15px;
                color: #555555;
                margin: 0;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                background-color: #f5f5f5;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #e0e0e0;
                font-size: 12px;
                color: #888888;
              }
              .divider {
                height: 1px;
                background-color: #e0e0e0;
                margin: 30px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✉️ Nouveau message de contact</h1>
              </div>
              <div class="content">
                <div class="info-block">
                  <div class="info-label">Nom</div>
                  <p class="info-value">${name}</p>
                </div>
                
                <div class="info-block">
                  <div class="info-label">Email</div>
                  <p class="info-value"><a href="mailto:${email}" style="color: #1CB5E0; text-decoration: none;">${email}</a></p>
                </div>
                
                <div class="divider"></div>
                
                <div class="info-block">
                  <div class="info-label">Message</div>
                  <div class="message-block">
                    <p class="message-text">${message
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")}</p>
                  </div>
                </div>
              </div>
              <div class="footer">
                <p>Message reçu depuis le formulaire de contact Eliaman</p>
                <p style="margin-top: 15px;">
                  <a href="mailto:${email}?subject=Re: Nouveau message de contact" style="color: #1CB5E0; text-decoration: none; font-weight: 600;">
                    Répondre à ${name}
                  </a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
