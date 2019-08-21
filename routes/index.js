const adminRouterProtected = require('./adminRouterProtected');
const adminRouterUnprotected = require('./adminRouterUnprotected');
const userRouter = require('./userRouter');
const blogpostRouter = require('./blogpostRouter');
const postRouter = require('./postRouter');
const likeRouter = require('./likeRouter');
const videoRouter = require('./videoRouter');
const podcastRouter = require('./podcastRouter');
const factRouter = require('./factRouter');
const annoucementRouter = require('./annoucementRouter');
const commentRouter = require('./commentRouter');
const historapicksRouter = require('./historapicksRouter');
const favoriteRouter = require('./favoriteRouter,');
const booksMediaRouter = require('./booksMediaRouter');
const podcastsMediaRouter = require('./podcastsMediaRouter');
const videosMediaRouter = require('./videosMediaRouter');
const paperMediaRouter = require('./paperMediaRouter');
const biographyRouter = require('./biographyRouter');

module.exports = {
    adminRouterProtected,
    adminRouterUnprotected,
    blogpostRouter,
    userRouter,
    postRouter,
    likeRouter,
    videoRouter,
    podcastRouter,
    factRouter,
    annoucementRouter,
    commentRouter,
    historapicksRouter,
    favoriteRouter,
    podcastsMediaRouter,
    booksMediaRouter,
    paperMediaRouter,
    videosMediaRouter,
    biographyRouter
}