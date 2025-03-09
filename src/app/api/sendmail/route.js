import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { userEmail, userName } = await req.json(); // Extract user details

        // Configure Nodemailer SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail", // Or use 'smtp.mailgun.org' for Mailgun, 'smtp.sendgrid.net' for SendGrid
            auth: {
                user: process.env.EMAIL_USERNAME, // Your email
                pass: process.env.EMAIL_PASSWORD  // Your email app password
            }
        });

        // Define email details
        let mailOptions = {
            from: `"Your Website" <your-email@gmail.com>`, 
            to: userEmail, // Send email to the user
            subject: "Login Notification - Your Website",
            text: `Hello ${userName},\n\nYou have successfully logged into your account.\n\nIf this wasn't you, please secure your account immediately.`,
            html: `<p>Hello <strong>${userName}</strong>,</p>
                   <p>You have successfully logged into your account.</p>
                   <p>If this wasn't you, please secure your account immediately.</p>`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return Response.json({ message: "Email sent successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Email sending error:", error);
        return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
}
