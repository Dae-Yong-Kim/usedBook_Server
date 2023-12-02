const jwtMiddleware = require("../../../config/jwtMiddleware");
const mentorProvider = require("../../app/Mentor/mentorProvider");
const mentorService = require("../../app/Mentor/mentorService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");
const userProvider = require("../../app/User/userProvider");


/**
 * API 모든 멘토 조회
 * [GET] /app/mentor/all
 */

exports.getMentorAll = async function (req, res) {

    //const menteeIndex = req.body.menteeIndex;
    const menteeIndex = req.params.menteeIndex;

    const mentorAllResult = await mentorProvider.retrieveMentorAll(menteeIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorAllResult));
}

/**
 * API 멘토 상세 조회
 * [GET] /app/mentor/:mentorIndex
 * Path Variable: mentorIndex
 */

exports.getMentorDetail = async function(req, res) {

    const mentorIndex = req.params.mentorIndex;

    const mentorEachResult = await mentorProvider.retrieveMentorDetail(mentorIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorEachResult));
}

/**
 * API 멘토 필터 조회
 * [GET] /app/mentor/filter
 * Body:
 */
exports.getMentorFilter = async function(req, res) {

    let filterCategory = req.body.category;   // 0선택x, 1수능, 2편입, 3공무원, 4어학, 5유학, 6자격증, 7대학전공, 8기타 ( 복수선택?)
    let filterAge = req.body.age;         // 2모두, 0만24세 미만, 1만24세 이상
    let filterGender = req.body.gender;   // 2모두, 남성 0, 여성 1

    // 값을 선택하지 않았을 경우, 디폴트값: 모두
    if(!filterCategory)
        filterCategory = 0
    if(!filterAge)
        filterAge = 0
    if(!filterGender)
        filterGender = 0


    const mentorFilterResult = await mentorProvider.retrieveMentorFilter(filterCategory, filterAge, filterGender);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorFilterResult));

}


/**
 * API 멘토 닉네임 검색 조회
 * [GET] /app/mentor
 */
exports.getMentorByNickname = async function(req, res) {
    const menteeIndex = req.body.menteeIndex;
    const nickname = req.body.nickname;

    if(!nickname){
        // error
    } else {

        const mentorListByNickname = await mentorProvider.retrieveMentorListByNickname(menteeIndex, nickname);

        logger.info(`App - client IP: ${requestIp.getClientIp(req)}} \n`);
        return res.send(response(baseResponse.SUCCESS, mentorListByNickname));
    }
}



/**
 * API 멘토 리뷰 조회
 * [GET] /app/mentor/reviews/:mentorIndex
 */