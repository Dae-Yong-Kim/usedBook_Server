const jwtMiddleware = require("../../../config/jwtMiddleware");
const profileProvider = require("../../app/Profile/profileProvider");
const profileService = require("../../app/Profile/profileService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");


/*
 * API 멘토/맨티 프로필 입력
 */

exports.postMentorProfile = async function(req, res){
    const userIndex = req.body.userIndex;

    const insertMentorProfileParams = Object.values(req.body);
    const updateUserProfileParams = [0, userIndex];

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    const mentorProfileResult = await profileService.createMentorProfile(insertMentorProfileParams);
    const mentorOrMenteeResult = await profileService.editUserProfile(updateUserProfileParams);
    const totalResult = [mentorProfileResult, mentorOrMenteeResult];

    return res.send(response(baseResponse.SUCCESS, totalResult));
}


exports.postMenteeProfile = async function(req, res){
    const userIndex = req.body.userIndex;

    const insertMenteeProfileParams = Object.values(req.body);
    const updateUserProfileParams = [1, userIndex];

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    const menteeProfileResult = await profileService.createMenteeProfile(insertMenteeProfileParams);
    const mentorOrMenteeResult = await profileService.editUserProfile(updateUserProfileParams);
    const totalResult = [menteeProfileResult, mentorOrMenteeResult];

    return res.send(response(baseResponse.SUCCESS, totalResult));
}


/*
 * API 멘토/맨티 프로필 조회
 */

exports.getMentorProfile = async function(req, res){

    const userIndex = req.body.userIndex;
    const mentorProfileResult = await profileProvider.retrieveMentorProfile(userIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorProfileResult));
}

exports.getMenteeProfile = async function(req, res){

    const userIndex = req.body.userIndex;
    const menteeProfileResult = await profileProvider.retrieveMenteeProfile(userIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeProfileResult));
}


/*
 * API 멘토/맨티 프로필 수정
 */

exports.patchMentorProfile = async function(req, res){

    const userIndex = req.body.userIndex;

    const bodyLength = Object.keys(req.body).length;
    const bodyKeys = Object.keys(req.body);
    const bodyValues = Object.values(req.body);

    var updateMentorParams = [];

    for(var i = 0; i < bodyLength; i++){
        if(isNaN(bodyValues[i])){
            updateMentorParams[i] = bodyKeys[i] + ' = "' + bodyValues[i] + '"';
        }else{
            updateMentorParams[i] = bodyKeys[i] + ' = ' + bodyValues[i];
        }
    }

    const mentorProfileResult = await profileService.editMentorProfile(updateMentorParams, userIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorProfileResult));
}

exports.patchMenteeProfile = async function(req, res){

    const userIndex = req.body.userIndex;

    const bodyLength = Object.keys(req.body).length;
    const bodyKeys = Object.keys(req.body);
    const bodyValues = Object.values(req.body);

    var updateMenteeParams = [];

    for(var i = 0; i < bodyLength; i++){
        if(isNaN(bodyValues[i])){
            updateMenteeParams[i] = bodyKeys[i] + ' = "' + bodyValues[i] + '"';
        }else{
            updateMenteeParams[i] = bodyKeys[i] + ' = ' + bodyValues[i];
        }
    }


    const menteeProfileResult = await profileService.editMenteeProfile(updateMenteeParams, userIndex);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeProfileResult));
}


/*
 * API 멘토/맨티 닉네임 조회
 */

exports.getMentorNickname = async function(req, res){

    const mentorNickname = req.body.mentorNickname;
    const mentorNicknameResult = await profileProvider.retrieveMentorNickname(mentorNickname);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, mentorNicknameResult));
}

exports.getMenteeNickname = async function(req, res){

    const menteeNickname = req.body.menteeNickname;
    const menteeNicknameResult = await profileProvider.retrieveMenteeNickname(menteeNickname);

    logger.info(`App - client IP: ${requestIp.getClientIp(req)} \n`);
    return res.send(response(baseResponse.SUCCESS, menteeNicknameResult));
}