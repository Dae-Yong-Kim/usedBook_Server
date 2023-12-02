const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const menteeDao = require("./menteeDao");
const mentorDao = require("../Mentor/mentorDao");


// 모든 멘티 조회 API
exports.retrieveMenteeAll = async function(mentorIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const menteeAllResult = await menteeDao.selectMenteeAll(connection);
    const menteeIsLikedResult = await menteeDao.selectMenteeIsLiked(connection, mentorIndex);
    // mentorIndex 만 리턴해줌.

    for(let menteeObject of menteeAllResult) {
        if(menteeIsLikedResult.includes(menteeObject.menteeIndex)) {
            menteeObject.isLiked = 1;
        }else {
            menteeObject.isLiked = 0;
        }
    }

    connection.release();
    return menteeAllResult;
}

// 멘티 상세 조회 API
exports.retrieveMenteeDetail = async function(menteeIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const menteeDetailResult = await menteeDao.selectMenteeDetail(connection, menteeIndex);

    connection.release();
    return menteeDetailResult;
}

// 멘티 필터 조회 API
exports.retrieveMenteeFilter = async function(category, gender) {
    //const connection = await pool.getConnection(async (conn) => conn);
    // const menteeFilterResult = await menteeDao.selectMenteeFilter(connection, [category, gender])

    // 카테고리 값에 따라 다른 다오 호출 -> 이게 나은 것 같음. 각 항목 별 다오 따로? ㅇㅇ. 디비 값이랑 비교하면 될듯.
    //  mysql 조건문 활용 when then


    //connection.release();
    //return menteeFilterResult;
}

// 멘티 닉네임 검색 조회
exports.retrieveMenteeListByNickname = async function(mentorIndex, nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const menteeIndexListByNicknameResult = await menteeDao.selectMenteeListByNickname(connection, nickname);

    let menteeList = [];
    for (let mentee of menteeIndexListByNicknameResult) {
        //console.log(mentorList.mentorIndex)
        const menteeResult = await menteeDao.selectMenteeByMenteeIndex(connection, mentee.menteeIndex);
        menteeList.push(menteeResult);
    }

    const menteeIsLikedResult = await menteeDao.selectMenteeIsLiked(connection, mentorIndex);

    for(let menteeObject of menteeList) {
        if(menteeIsLikedResult.includes(menteeObject.menteeIndex)) {
            menteeObject.isLiked = 1;
        }else {
            menteeObject.isLiked = 0;
        }
    }

    connection.release();
    return menteeList;

}