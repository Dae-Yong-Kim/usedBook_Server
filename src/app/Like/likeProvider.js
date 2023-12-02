const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const likeDao = require("./likeDao");

/*
 * API 멘토/맨티 Like 확인
 */
//멘토 Like 확인
exports.retrieveMentorLike = async function(selectMentorLikeParams){
    const connection = await pool.getConnection(async (conn) => conn);
    const selectMentorLikeResult = await likeDao.selectMentorLike(connection, selectMentorLikeParams);

    connection.release();
    return selectMentorLikeResult;
}

//멘티 Like 확인
exports.retrieveMenteeLike = async function(selectMenteeLikeParams){
    const connection = await pool.getConnection(async (conn) => conn);
    const selectMenteeLikeResult = await likeDao.selectMenteeLike(connection, selectMenteeLikeParams);

    connection.release();
    return selectMenteeLikeResult;
}