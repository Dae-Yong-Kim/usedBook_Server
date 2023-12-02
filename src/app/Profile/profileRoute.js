module.exports = function(app){
    const profile = require('./profileController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //post는 맨 처음 한 번만 해야함
    // mentor 프로필 입력 API
    app.post('/app/mentor/profile', profile.postMentorProfile)
    app.post('/app/mentee/profile', profile.postMenteeProfile)


    // user 프로필 조회 API
    app.get('/app/mentor/profile', profile.getMentorProfile)
    app.get('/app/mentee/profile', profile.getMenteeProfile)


    // user 프로필 편집 API
    app.patch('/app/mentor/profile', profile.patchMentorProfile);
    app.patch('/app/mentee/profile', profile.patchMenteeProfile);


    //user 닉네임 조회 API
    app.get('/app/mentor/profile/nickname', profile.getMentorNickname)
    app.get('/app/mentee/profile/nickname', profile.getMenteeNickname)
};