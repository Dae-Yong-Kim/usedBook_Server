const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");

const likeProvider = require("./likeProvider");
const likeDao = require("./likeDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

/*
 * API 멘토/맨티 Like 첫 입력
 */

//멘토 Like 멘티 첫 입력 API
exports.createMentorLike = async function(insertMentorLikeParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertMentorLikeResult = await likeDao.insertMentorLike(connection, insertMentorLikeParams);

    connection.release();
    return insertMentorLikeResult;
}

//멘티 Like 멘토 첫 입력 API
exports.createMenteeLike = async function(insertMenteeLikeParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertMenteeLikeResult = await likeDao.insertMenteeLike(connection, insertMenteeLikeParams);

    connection.release();
    return insertMenteeLikeResult;
}


/*
 * API 멘토/맨티 Like 삭제
 */
//멘토 Unlike 멘토 입력 API
exports.editMentorUnlike = async function(updateMentorUnlikeParams) {
     const connection = await pool.getConnection(async (conn) => conn);
     const updateMentorUnlikeResult = await likeDao.updateMentorUnlike(connection, updateMentorUnlikeParams);

     connection.release();
     return updateMentorUnlikeResult;
 }

//멘티 Unlike 멘토 입력 API
exports.editMenteeUnlike = async function(updateMenteeUnlikeParams) {
     const connection = await pool.getConnection(async (conn) => conn);
     const updateMenteeUnlikeResult = await likeDao.updateMenteeUnlike(connection, updateMenteeUnlikeParams);

     connection.release();
     return updateMenteeUnlikeResult;
 }


/*
 * API 멘토/맨티 Like 입력
 */
//멘토 Like 멘티 입력 API
exports.editMentorLike = async function(updateMentorLikeParams) {
     const connection = await pool.getConnection(async (conn) => conn);
     const updateMentorLikeResult = await likeDao.updateMentorLike(connection, updateMentorLikeParams);

     connection.release();
     return updateMentorLikeResult;
 }

//멘티 Like 멘티 입력 API
exports.editMenteeLike = async function(updateMenteeLikeParams) {
     const connection = await pool.getConnection(async (conn) => conn);
     const updateMenteeLikeResult = await likeDao.updateMenteeLike(connection, updateMenteeLikeParams);

     connection.release();
     return updateMenteeLikeResult;
 }