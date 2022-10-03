const nodeMailer = require('../config/nodemailer');

// Another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newcomment mailer');

    nodeMailer.transporter.sendMail({
        from: 'mnu202001@gmail.com',
        to: 'wkwk3942@gmail.com',
        subject: 'New Comment',
        html: <h1>Yup, your comment is published</h1>
    }, (err,info) => {
        if(err){
            console.log(`Error in sending mail ${err}`);
            return;
        }
        console.log('message Sent',info);
        return;
    })
}