const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs').promises;

const transporter = nodemailer.createTransport({
    host: "mail.munemiglobal.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "service@munemiglobal.com",
        pass: "munemiservice",
    },
});

async function sendMail(to, subject, bookingData, customHtml = null) {
    try {
        let emailHtml;
        let mailText;

        if (customHtml) {
            // Use the custom HTML if provided
            emailHtml = customHtml;
            mailText = `New Booking Details:
                Name: ${bookingData.fullName}
                Email: ${bookingData.email}
                Mobile: ${bookingData.mobile}
                Trip Type: ${bookingData.tripType}
                From: ${bookingData.origin}
                To: ${bookingData.destination}
                Start Date: ${bookingData.startDate}
                End Date: ${bookingData.endDate}
                Passengers: ${bookingData.adult} Adult(s), ${bookingData.children || 0} Child(ren), ${bookingData.infants || 0} Infant(s)`;
        } else {
            // Read the HTML template for the user confirmation email
            const templatePath = path.join(__dirname, '../templates/bookingConfirmation.html');
            const html = await fs.readFile(templatePath, 'utf-8');

            // Replace placeholders with actual data
            emailHtml = html
                .replace('${fullName}', bookingData.fullName)
                .replace('${tripType}', bookingData.tripType)
                .replace('${origin}', bookingData.origin)
                .replace('${destination}', bookingData.destination)
                .replace('${startDate}', bookingData.startDate)
                .replace('${endDate}', bookingData.endDate)
                .replace('${adult}', bookingData.adult)
                .replace('${children}', bookingData.children || '0')
                .replace('${infants}', bookingData.infants || '0');

            mailText = `Thank you for your booking with Munemi Global. Here are your trip details:
                Name: ${bookingData.fullName}
                Trip Type: ${bookingData.tripType}
                From: ${bookingData.origin}
                To: ${bookingData.destination}
                Start Date: ${bookingData.startDate}
                End Date: ${bookingData.endDate}
                Passengers: ${bookingData.adult} Adult(s), ${bookingData.children || 0} Child(ren), ${bookingData.infants || 0} Infant(s)`;
        }

        // Send the email
        const info = await transporter.sendMail({
            from: '"Munemi Global" <service@munemiglobal.com>',
            to,
            subject,
            text: mailText,
            html: emailHtml,
        });

        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendMail };
