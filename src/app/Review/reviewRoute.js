const mentor = require("../Mentor/mentorController");
module.exports = function(app) {
    const review = require("../Review/reviewController");
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 멘토 리뷰 조회 API
    app.get('/app/mentor/review/:mentorIndex', review.getMentorReview);

    // 멘티 리뷰 작성 API
    app.post('/app/mentee/review/new', review.postMenteeReview);
}

