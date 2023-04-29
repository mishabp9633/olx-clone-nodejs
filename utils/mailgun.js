import FormData from 'form-data';
import mailgun from 'mailgun.js';

export default function sendMail(email, resetLink){
    const mailClient = new mailgun(FormData);
    const mg = mailClient.client({
        username: process.env.MAILGUN_USERNAME,
        key: process.env.MAIGUN_KEY,
    });
    
    const htmlTemplate = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h1 {
                        color: #2196F3;
                        font-size: 24px;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.4em;
                    }
                    .button {
                        display: inline-block;
                        background-color: #2196F3;
                        color: #fff;
                        padding: 12px 20px;
                        border-radius: 5px;
                        text-decoration: none;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <h1>Reset Password Request</h1>
                <p>Hello,</p>
                <p>We received a request to reset your password. Please click on the button below to reset it:</p>
                <a href=${resetLink} class="button">Reset Password</a>
                <p>If you did not make this request, you can ignore this email and your password will not be changed.</p>
                <p>Thank you,</p>
                <p>PreeLoved</p>
            </body>
        </html>
    `;
    
    mg.messages
        .create("sandbox0c6e90fdd0c64dcf99f798919bd6d91f.mailgun.org", {
            from: "Mailgun Sandbox <postmaster@sandbox0c6e90fdd0c64dcf99f798919bd6d91f.mailgun.org>",
            to: [`${email}`],
            subject: "Reset Password Request",
            html: htmlTemplate
        })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)) // logs any error
    
    
    
    // You can see a record of this email in your logs: https://app.mailgun.com/app/logs.
    
    // You can send up to 300 emails/day from this sandbox server.
    // Next, you should add your own domain so you can send 10000 emails/month for free.
}
