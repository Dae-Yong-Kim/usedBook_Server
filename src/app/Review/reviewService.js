const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");

const reviewProvider = require("./reviewProvider");
const reviewDao = require("./reviewDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// 멘티 리뷰 작성 API
exports.createReview = async function(menteeIndex, mentorIndex, category, stars, reviewText) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        //transaction
        await connection.beginTransaction();

        const createMentorResult = await reviewDao.insertReview(connection, menteeIndex, mentorIndex, category, stars, reviewText);

        await connection.commit();
        return response(baseResponse.SUCCESS, createMentorResult);
    }catch(err){
        await connection.rollback();

        logger.error(`App - createFolder Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally {
        connection.release();
    }
}