import nodemailer from 'nodemailer';

const senderEmail = process.env.ADMIN_EMAIL;
const senderPass = process.env.ADMIN_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: senderEmail,
        pass: senderPass,
    },
});

export const sendGrievanceResolvedEmail = async (grievance, author, feedback) => {
    const mailOptions = {
        from: "aditya.pandey.1018@gmail.com", // sender
        to: author.email, // receiver
        subject: 'Your Grievance Has Been Resolved',
        text: `Dear ${author.name},

        Your grievance has been resolved.

        Grievance Details:
        ${grievance.grievance}

        Resolved At: ${new Date()}

        Admin Feedback:
        ${feedback || 'No feedback provided.'}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

