module.exports = function(app){
    const like = require('./likeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //멘토/멘티 Like 첫 입력 API
    app.post('/app/mentor/like', like.postMentorLike)
    app.post('/app/mentee/like', like.postMenteeLike)

    //멘토/멘티 Like 입력 API
    app.patch('/app/mentor/like', like.patchMentorLike)
    app.patch('/app/mentee/like', like.patchMenteeLike)

    //멘토/멘티 Unlike 입력 API
    app.patch('/app/mentor/unlike', like.patchMentorUnlike)
    app.patch('/app/mentee/unlike', like.patchMenteeUnlike)

};

