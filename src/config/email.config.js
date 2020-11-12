const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'esaudtest@gmail.com', // user_Email for nodemail provider
                    pass: 'uR64JhObSqU0', // Password of Nodemail provider
                },
              });

module.exports = transporter;