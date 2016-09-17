import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "moonhouse.android@gmail.com",
        pass: "eYbabrfwbz44#"
    }
});


export default transporter;
