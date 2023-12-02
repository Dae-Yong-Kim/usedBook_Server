const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");

const profileProvider = require("./profileProvider");
const profileDao = require("./profileDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");


/*
 * API 멘토/맨티 프로필 입력
 */

//멘토 프로필 입력 API
exports.createMentorProfile = async function(insertMentorProfileParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertMentorProfileResult = await profileDao.insertMentorProfile(connection, insertMentorProfileParams);

    connection.release();
    return insertMentorProfileResult;
}

//멘티 프로필 입력 API
exports.createMenteeProfile = async function(insertMenteeProfileParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertMenteeProfileResult = await profileDao.insertMenteeProfile(connection, insertMenteeProfileParams);

    connection.release();
    return insertMenteeProfileResult;
}


/*
 * API 멘토/맨티 유저 테이블에 입력
 */

 exports.editUserProfile = async function(updateUserProfileParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const updateUserProfileResult = await profileDao.updateUserProfile(connection, updateUserProfileParams);

    connection.release();
    return updateUserProfileResult;
 }


 /*
  * API 멘토/맨티 프로필 수정
  */

 //멘토 프로필 수정 API
 exports.editMentorProfile = async function(updateMentorProfileParams, userIndex) {
     const connection = await pool.getConnection(async (conn) => conn);
     const updateMentorProfileResult = await profileDao.updateMentorProfile(connection, updateMentorProfileParams, userIndex);

     connection.release();
     return updateMentorProfileResult;
 }

 //멘티 프로필 수정 API
 exports.editMenteeProfile = async function(updateMenteeProfileParams, userIndex) {
     const connection = await pool.getConnection(async (conn) => conn);
     const updateMenteeProfileResult = await profileDao.updateMenteeProfile(connection, updateMenteeProfileParams, userIndex);

     connection.release();
     return updateMenteeProfileResult;
 }