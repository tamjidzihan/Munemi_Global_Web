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


async function sendMail(to, subject, bookingData) {
    try {
        // Read the HTML template
        const templatePath = path.join(__dirname, '../templates/bookingConfirmation.html');
        const html = await fs.readFile(templatePath, 'utf-8');

        // Replace placeholders with actual data
        const emailHtml = html
            .replace('${fullName}', bookingData.fullName)
            .replace('${tripType}', bookingData.tripType)
            .replace('${origin}', bookingData.origin)
            .replace('${destination}', bookingData.destination)
            .replace('${startDate}', bookingData.startDate)
            .replace('${endDate}', bookingData.endDate)
            .replace('${adult}', bookingData.adult)
            .replace('${children}', bookingData.children || '0')
            .replace('${infants}', bookingData.infants || '0');

        const mailText = `Thank you for your booking with Munemi Global. Here are your trip details:
            Name: ${bookingData.fullName}
            Trip Type: ${bookingData.tripType}
            From: ${bookingData.origin}
            To: ${bookingData.destination}
            Start Date: ${bookingData.startDate}
            End Date: ${bookingData.endDate}
            Passengers: ${bookingData.adult} Adult(s), ${bookingData.children || 0} Child(ren), ${bookingData.infants || 0} Infant(s)`

        console.log(emailHtml)

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


module.exports = { sendMail }


// async..await is not allowed in global scope, must use a wrapper
// async function sendMail(to, subject, text, html) {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: '"Munemi Global" <service@munemiglobal.com>', // sender address
//         to, // list of receivers
//         subject, // Subject line
//         text, // plain text body
//         html, // html body
//     });

// }