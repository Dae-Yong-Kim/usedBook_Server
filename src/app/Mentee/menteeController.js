const jwtMiddleware = require("../../../config/jwtMiddleware");
const menteeProvider = require("../../app/Mentee/menteeProvider");
const menteeService = require("../../app/Mentee/menteeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");
const mentorProvider = require("../Mentor/mentorProvider");
const userProvider = require("../User/userProvider");


/**
 * API 모든 멘토 조회
 * [GET] /app/mentee/all
 */

exports.getMenteeAll = async function (req, res) {

    //const mentorIndex = req.body.mentorIndex;
    const mentorIndex = req.params.mentorIndex;

    const menteeAllResult = await menteeProvider.retrieveMenteeAll(mentorIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeAllResult));
}


/**
 * API 멘티 상세 조회
 * [GET] /app/mentee/detail/:menteeIndex
 * Path Variable: menteeIndex
 */

exports.getMenteeDetail = async function(req, res) {

    const menteeIndex = req.params.menteeIndex;

    const menteeEachResult = await menteeProvider.retrieveMenteeDetail(menteeIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeEachResult));
}

/**
 * API 멘티 필터 조회
 * [GET] /app/mentee/filter
 * Body:
 */
exports.getMenteeFilter = async function(req, res) {

    const {category, gender} = req.body;
    //category: 0선택x, 1수능, 2편입, 3공무원, 4어학, 5유학, 6자격증, 7대학전공, 8기타
    //gender: 2모두, 남성 0, 여성 1

    //category, gender 값이 비어있거나 정해진 값 이외의 값이 담겼을 때에 대한 예외처리 필요

    const menteeFilterResult = await menteeProvider.retrieveMenteeFilter(category, gender);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeFilterResult));

}


/**
 * API 멘티 닉네임 검색 조회
 * [GET] /app/mentee
 * Query String으로 닉네임 검색
 */
exports.getMenteeByNickname = async function(req, res) {
    const mentorIndex = req.body.mentorIndex;
    const nickname = req.body.nickname;

    if(!nickname){
        // error
    } else {

        const menteeListByNickname = await menteeProvider.retrieveMenteeListByNickname(mentorIndex, nickname);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
        return res.send(response(baseResponse.SUCCESS, menteeListByNickname));
    }
}