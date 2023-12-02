const jwtMiddleware = require("../../../config/jwtMiddleware");
const likeProvider = require("../../app/Like/likeProvider");
const likeService = require("../../app/Like/likeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");

/*
 * API 멘토/맨티 Like 첫 입력
 */
//멘토 Like 멘티 첫 입력 API
exports.postMentorLike = async function(req, res){
    const insertMentorLikeParams = Object.values(req.body);
    const mentorLikeResult = await likeService.createMentorLike(insertMentorLikeParams);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);

    return res.send(response(baseResponse.SUCCESS, mentorLikeResult));
}

//멘티 Like 멘토 첫 입력 API
exports.postMenteeLike = async function(req, res){
    const insertMenteeLikeParams = Object.values(req.body);
    const menteeLikeResult = await likeService.createMenteeLike(insertMenteeLikeParams);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);

    return res.send(response(baseResponse.SUCCESS, menteeLikeResult));
}


/*
 * API 멘토/맨티 Like 삭제
 */
//멘토 Unlike 멘토 입력 API
exports.patchMentorUnlike = async function(req, res){
    const updateMentorParams = Object.values(req.body);
    console.log(updateMentorParams);

    const mentorUnlikeResult = likeService.editMentorUnlike(updateMentorParams);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorUnlikeResult));
}

//멘토 Unlike 멘티 입력 API
exports.patchMenteeUnlike = async function(req, res){
    const updateMenteeParams = Object.values(req.body);

    const menteeUnlikeResult = likeService.editMenteeUnlike(updateMenteeParams);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeUnlikeResult));

}

/*
 * API 멘토/맨티 Like 입력
 */
//멘토 Like 멘티 입력 API
exports.patchMentorLike = async function(req, res){
    const updateMentorParams = Object.values(req.body);

    const mentorLikeResult = likeService.editMentorLike(updateMentorParams);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorLikeResult));

}

//멘티 Like 멘토 입력 API
exports.patchMenteeLike = async function(req, res){
    const updateMenteeParams = Object.values(req.body);

    const menteeLikeResult = likeService.editMenteeLike(updateMenteeParams);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeLikeResult));

}

