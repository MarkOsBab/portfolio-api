export const contactTemplate = (contactName: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Contact Request Notification</title>
        <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f6f6f6;
            }

            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }

            .header {
              background-color: navy;
              padding: 20px;
              color: #fff;
              text-align: center;
            }

            h1 {
              font-size: 28px;
              margin-bottom: 20px;
              color: #fff;
            }

            p {
              margin-bottom: 10px;
              color: #555;
            }

            .message {
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            .signature {
              font-style: italic;
              color: #777;
            }

            .footer {
              margin-top: 20px;
              text-align: center;
              background-color: navy;
              padding: 10px;
            }

            .footer p {
              color: #fff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Contact Request</h1>
            </div>
            <div class="message">
                <h1>Hello ${contactName},</h1>
                <p>Thank you for contacting us!</p>
                <p>We have received your contact request and assure you that we will review your message as soon as possible.</p>
                <p>We will contact you through the provided email address, so keep an eye on your inbox.</p>
                <p>Best regards,</p>
                <p class="signature">MarkOsBab Developer</p>
            </div>
            <div class="footer">
              <p>Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
