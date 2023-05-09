import * as nodemailer from 'nodemailer';

export const sendEmail = (payload: any) => {
    console.log('payload')
    console.log(payload)
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'test.assesment@outlook.com',
            pass: 'QQqq99!!'
        }
    });

    const mailOptions = {
        from: 'test.assesment@outlook.com',
        to: 'test.assesment@outlook.com',
        subject: 'Account Creation',
        text: `Hi dear, a new account has been created at ${payload.created_at} by this user: ${payload.currentUser.email}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}