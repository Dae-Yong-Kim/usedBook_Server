module.exports = function(app){
    const mentor = require('./mentorController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 멘토 전체 조회 API
    //app.get('/app/mentor/all', mentor.getMentorAll)
    app.get('/app/mentor/all/:menteeIndex', mentor.getMentorAll)

    // 멘토 상세 조회 API
    app.get('/app/mentor/detail/:mentorIndex', mentor.getMentorDetail)

    // 멘토 필터링 조회 API
    app.get('/app/mentor/filter', mentor.getMentorFilter)

    // 멘토 닉네임 검색 조회 API - Query String
    app.get('/app/mentor', mentor.getMentorByNickname)
};

