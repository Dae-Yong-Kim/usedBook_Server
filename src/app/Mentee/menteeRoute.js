const mentor = require("../Mentor/mentorController");
module.exports = function(app){
    const mentee = require('./menteeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 멘티 전체 조회 API
    //app.get('/app/mentee/all', mentee.getMenteeAll)
    app.get('/app/mentee/all/:mentorIndex', mentee.getMenteeAll)

    // 멘티 상세 조회 API
    app.get('/app/mentee/detail/:menteeIndex', mentee.getMenteeDetail)

    // 멘토 필터링 조회 API
    app.get('/app/mentee/filter', mentee.getMenteeFilter)

    // 멘티 닉네임 검색 조회 API - Query String
    app.get('/app/mentee', mentee.getMenteeByNickname)

};

