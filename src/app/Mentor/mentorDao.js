
// 모든 멘토 조회 API
async function selectMentorAll(connection) {
    const selectMentorAllQuery = `
        SELECT m.mentorIndex, m.mentorNickname, m.mentorGender, m.mentorAge, m.mentorField, m.mentorSchool, m.mentorImg, COUNT(c.menteeIndex) AS menteeCnt, round(AVG(r.stars), 2) AS starAvg
        FROM Mentor AS m
                 LEFT JOIN Matching AS c ON m.mentorIndex = c.mentorIndex
                 LEFT JOIN Review AS r ON m.mentorIndex = r.mentorIndex
        GROUP BY m.mentorIndex;
    `
    const [mentorAllRows] = await connection.query(selectMentorAllQuery);
    return mentorAllRows;
}

// 모든 멘토 조회 API - 좋아요 눌린 멘토 리스트 조회
async function selectMentorIsLiked(connection, menteeIndex) {
    const selectMentorIsLikedQuery = `
        SELECT mentorIndex
        FROM MenteeLike
        WHERE menteeIndex = ? AND isLike = 1;
    `
    const mentorIsLikedRow = await connection.query(selectMentorIsLikedQuery, menteeIndex);
    const mentorIsLikedIndexList = mentorIsLikedRow[0].map(row => row.mentorIndex);
    return mentorIsLikedIndexList;
}

// 멘토 상세 조회 API
async function selectMentorDetail(connection, mentorIndex) {
    const selectMentorDetailQuery = `
        SELECT mentorIndex, mentorIntro, mentorSchedule, mentorTeaching, mentorCurriculum, mentorProfField
        FROM Mentor
        WHERE mentorIndex = ?;
    `

    const mentorDetailRow = await connection.query(selectMentorDetailQuery, mentorIndex);
    return mentorDetailRow[0];
}

// 멘토 필터 조회 API
async function selectMentorFilter(connection, mentorFilterParams) {
    const selectMentorFilterQuery = `
        SELECT 
    `
}

// 멘토 닉네임 검색 조회 API - nickname 가진 mentorIndex list 조회
async function selectMentorListByNickname(connection, nickname) {
    const selectMentorListByNicknameQuery = `
        SELECT mentorIndex 
        FROM Mentor 
        WHERE mentorNickname like concat('%', ?, '%');
    `

    const [mentorListByNicknameRows] = await connection.query(selectMentorListByNicknameQuery, nickname);
    return mentorListByNicknameRows;
}

// 멘토 닉네임 검색 조회 API - mentorIndex로 해당 멘토 정보 조회
async function selectMentorByMentorIndex(connection, mentorIndex) {
    const selectMentorByMentorIndexQuery = `
        SELECT m.mentorIndex, m.mentorNickname, m.mentorGender, m.mentorAge, m.mentorField, m.mentorSchool, m.mentorImg, COUNT(c.menteeIndex) AS menteeCnt, round(AVG(r.stars), 2) AS starAvg
        FROM Mentor AS m
                 LEFT JOIN Matching AS c ON m.mentorIndex = c.mentorIndex
                 LEFT JOIN Review AS r ON c.menteeIndex = r.menteeIndex
        WHERE m.mentorIndex = ?;
    `

    const [mentorByMentorIndexRow] = await connection.query(selectMentorByMentorIndexQuery, mentorIndex);
    return mentorByMentorIndexRow[0];
}



module.exports = {
    selectMentorAll,
    selectMentorIsLiked,
    selectMentorDetail,
    selectMentorFilter,
    selectMentorListByNickname,
    selectMentorByMentorIndex,
};