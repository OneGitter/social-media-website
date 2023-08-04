const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'secret',
    db: 'codenchat_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: 'mnu202001@gmail.com',
            pass: ''
        }
    },
    google_client_id: "1075885633654-uu0nu4vm0nid5jno6qsphtatdj4d1k5a.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://codenchat.live/users/auth/google/callback",
    jwt_key: 'codenchat',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }
}


const production = {
    name: process.env.codenchat_environment,
    asset_path: process.env.codenchat_asset_path,
    session_cookie_key: process.env.codenchat_session_cookie_key,
    db: process.env.codenchat_db,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
            user: process.env.codenchat_smtp_user,
            pass: process.env.codenchat_smtp_password
        }
    },
    google_client_id: process.env.codenchat_google_client_id,
    google_client_secret: process.env.codenchat_google_client_secret,
    // remember to change call back after deployment
    google_callback_url: process.env.codenchat_google_callback,
    jwt_key: process.env.codenchat_jwt_key,
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogStream
        }
    }

}

module.exports = eval(process.env.codenchat_environment) == undefined ? development : eval(process.env.codenchat_environment);