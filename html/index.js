export const AddmissionTemplate = (applicantName, yourName, emailAddress, phoneNumber, instituteWebsite, admissionNumber) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="text-align: center;">
            <img src="http://res.cloudinary.com/cooldeveloper/raw/upload/v1716370107/backup_1716370107047"
                alt="Bashar Institute of Computers Logo" style="max-width: 200px; margin-bottom: 20px;">
        </div>
        <p>Dear ${applicantName},</p>
        
        <p>Thank you for your application to the Bashar Institute of Computers.</p>
        
        <p>We are pleased to inform you that your application is currently under process. Upon confirmation of your payment, you will be able to search for your admission ID on our official website.</p>
        
        <p>Your Admission ID: ${admissionNumber}</p>
        
        <p>Please follow the steps below to check your admission ID:</p>
        <ol>
            <li>Visit <a href="https://bict.org.in" target="_blank">https://bict.org.in</a></li>
            <li>Navigate to the "Admission ID Search" section</li>
            <li>Enter your  admission number</li>
            <li>Your admission status will be displayed</li>
        </ol>
        
        <p>If you have any questions or need further assistance, please do not hesitate to contact our support team at ${emailAddress} or ${phoneNumber}.</p>
        
        <p>Thank you for choosing the Bashar Institute of Computers. We look forward to welcoming you to our community.</p>
        
        <p>Best regards,</p>
        
        <p>${yourName}<br>
        Admissions Office<br>
        Bashar Institute of Computers<br>
        ${emailAddress}<br>
        ${phoneNumber}<br>
        <a href="${instituteWebsite}" target="_blank">${instituteWebsite}</a></p>
    </body>
    </html>
    `;
};
