const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const mentorDao = require("./mentorDao");



// 모든 멘토 조회 API
exports.retrieveMentorAll = async function(menteeIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorAllResult = await mentorDao.selectMentorAll(connection);
    const mentorIsLikedResult = await mentorDao.selectMentorIsLiked(connection, menteeIndex);
    // mentorIndex 만 리턴해줌.

    for(let mentorObject of mentorAllResult) {
        if(mentorIsLikedResult.includes(mentorObject.mentorIndex)) {
            mentorObject.isLiked = 1;
        }else {
            mentorObject.isLiked = 0;
        }
    }

    connection.release();
    return mentorAllResult;
}

// 멘토 상세 조회 API
exports.retrieveMentorDetail = async function(mentorIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorDetailResult = await mentorDao.selectMentorDetail(connection, mentorIndex);

    connection.release();
    return mentorDetailResult;
}

// 멘토 필터 조회 API
exports.retrieveMentorFilter = async function(filterCategory, filterAge, filterGender) {
    const connection = await pool.getConnection(async (conn) => conn);
    // const mentorFilterResult = await mentorDao.selectMentorFilter(connection, [filterCategory, filterAge, filterGender])

    // 카테고리 값에 따라 다른 다오 호출 -> 이게 나은 것 같음. 각 항목 별 다오 따로? ㅇㅇ. 디비 값이랑 비교하면 될듯.
    //  mysql 조건문 활용 when then

    //


    //대용님 다오문 참고 - 이런식으로 다오에서도 값 수정 가능 -> 부등호랑 이런거 이렇게 concat해서 해도 되지않을까?
    // UPDATE Mentee
    // SET ${updateMenteeProfileParams.join(', ')}
    // WHERE userINdex = ?



    connection.release();
    return mentorFilterResult;
}



// 멘토 닉네임 검색 조회
exports.retrieveMentorListByNickname = async function(menteeIndex, nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorIndexListsByNicknameResult = await mentorDao.selectMentorListByNickname(connection, nickname);

    let mentorList = [];
    for (let mentor of mentorIndexListsByNicknameResult) {
        //console.log(mentorList.mentorIndex)
        const mentorResult = await mentorDao.selectMentorByMentorIndex(connection, mentor.mentorIndex);
        mentorList.push(mentorResult);
    }

    const mentorIsLikedResult = await mentorDao.selectMentorIsLiked(connection, menteeIndex);
    // mentorIndex 만 리턴해줌.

    for(let mentorObject of mentorList) {
        if(mentorIsLikedResult.includes(mentorObject.mentorIndex)) {
            mentorObject.isLiked = 1;
        }else {
            mentorObject.isLiked = 0;
        }
    }


    connection.release();
    return mentorList;

}