const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const passportInit = require('./config/passportConfig')
const session = require('express-session');
const socketio = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const db = require('./db');
const Routes = require('./routes');

const validateToken = require('./middleware/validateToken');

/* const limit = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests'
}); */

//const certOptions = {
//    key: fs.readFileSync(path.resolve('certs/server.key')),
//    cert: fs.readFileSync(path.resolve('certs/server.crt'))
//}
//const server = https.createServer(certOptions, app)
//app.use('/api', limit)
app.set('PORT', process.env.PORT || 5000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '10kb' }));
app.use(passport.initialize());
require('./config/passportConfig')(passport);
//passportInit();
app.use(cors());
app.use(helmet());
app.use(require('morgan')('dev'));
app.use(mongoSanitize());
app.use(xss());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//const io = socketio(app);
//app.set('io', io);

/* app.use(
    cors({
        allowedHeaders: ['sessionId', 'Content-Type', 'master-token'],
        exposedHeaders: ['sessionId'],
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    }),
) */

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const options = {
    explorer: true
};

app.use('/documentation', swaggerUi.serve)
app.get('/documentation', swaggerUi.setup(swaggerDocument, options));

app.use('/api', Routes.adminRouterProtected);
app.use('/api', Routes.adminRouterUnprotected);
app.use('/api', Routes.userRouter);
app.use('/api', Routes.blogpostRouter);
app.use('/api', Routes.postRouter);
app.use('/api', Routes.likeRouter);
app.use('/api', Routes.videoRouter);
app.use('/api', Routes.podcastRouter);
app.use('/api', Routes.factRouter);
app.use('/api', Routes.annoucementRouter);
app.use('/api', Routes.commentRouter);
app.use('/api', Routes.historapicksRouter);
app.use('/api', Routes.favoriteRouter);
app.use('/api', Routes.booksMediaRouter);
app.use('/api', Routes.paperMediaRouter);
app.use('/api', Routes.videosMediaRouter);
app.use('/api', Routes.podcastsMediaRouter);
app.use('/api', Routes.biographyRouter);

app.listen(app.get('PORT'), () => 
    console.log(`Server running on port ${app.get('PORT')}`),
)