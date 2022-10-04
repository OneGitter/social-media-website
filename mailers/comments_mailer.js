const nodeMailer = require('../config/nodemailer');

// Another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newcomment mailer');

    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'mnu202001@gmail.com',
        //change to comment.user.email later
        to: 'wkwk3942@gmail.com',
        subject: 'New Comment',
        html: htmlString
    }, (err,info) => {
        if(err){
            console.log(`Error in sending mail ${err}`);
            return;
        }
        console.log('message Sent',info);
        return;
    })
}