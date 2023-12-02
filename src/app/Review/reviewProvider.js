const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reviewDao = require("./reviewDao");
const mentorDao = require("../Mentor/mentorDao");


// 멘토 리뷰 조회 API
exports.retrieveMentorReview = async function(mentorIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorReviewUpper = await reviewDao.selectMentorReviewUpper(connection, mentorIndex);
    const mentorReviewList = await reviewDao.selectMentorReviewList(connection, mentorIndex);

    let reviewCnt = mentorReviewUpper.reviewCnt;
    let starAvg = mentorReviewUpper.starAvg;

    connection.release();
    return {reviewCnt, starAvg, mentorReviewList};
}