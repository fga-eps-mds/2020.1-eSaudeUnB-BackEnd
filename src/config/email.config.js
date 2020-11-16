const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'esaudtest@gmail.com',
        pass: 'uR64JhObSqU0',
    },
});

module.exports = transporter;
