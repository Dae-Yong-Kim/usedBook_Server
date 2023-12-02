const jwtMiddleware = require("../../../config/jwtMiddleware");
const reviewProvider = require("../../app/Review/reviewProvider");
const reviewService = require("../../app/Review/reviewService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');
const mentorProvider = require("../Mentor/mentorProvider");


/**
 * API 멘토 리뷰 조회
 * [GET] /app/mentor/review/:mentorIndex
 * Path Variable: mentorIndex
 */

exports.getMentorReview = async function(req, res) {

    const mentorIndex = req.params.mentorIndex;

    const mentorReviewResult = await reviewProvider.retrieveMentorReview(mentorIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorReviewResult));
}

/**
 * API 멘티 리뷰 작성
 * [POST] /app/mentee/review/new
 */

exports.postMenteeReview = async function(req, res) {
    const {menteeIndex, mentorIndex, category, stars, reviewText} = req.body;


    const createReview = await reviewService.createReview(menteeIndex, mentorIndex, category, stars, reviewText);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS));
}