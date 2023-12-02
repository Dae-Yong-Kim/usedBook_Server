/*
 * API 멘토/맨티 Like 첫 입력
 */

//멘토 Like 멘티 첫 입력 API
async function insertMentorLike(connection, insertMentorLikeParams){
    const insertMentorLikeQuery = `
        INSERT INTO MentorLike VALUES (null, ?, ?, default, default, default, 1);
    `;

    const insertMentorLikeRow = await connection.query(insertMentorLikeQuery, insertMentorLikeParams);
    return insertMentorLikeRow;
}

//멘티 Like 멘토 첫 입력 API
async function insertMenteeLike(connection, insertMenteeLikeParams){
    const insertMenteeLikeQuery = `
        INSERT INTO MenteeLike VALUES (null, ?, ?, default, default, default, 1);
    `;

    const insertMenteeLikeRow = await connection.query(insertMenteeLikeQuery, insertMenteeLikeParams);
    return insertMenteeLikeRow;
}


/*
 * API 멘토/맨티 Like 삭제
 */
//멘토 Unlike 멘토 입력 API
async function updateMentorUnlike(connection, updateMentorUnlikeParams){
    const updateMentorUnlikeQuery = `
    UPDATE MentorLike
    SET isLike = 0
    WHERE mentorIndex = ? AND menteeIndex = ?;
    `;

    const updateMentorUnlikeRow = await connection.query(updateMentorUnlikeQuery, updateMentorUnlikeParams);
    return updateMentorUnlikeRow;
}

//멘티 Unlike 멘토 입력 API
async function updateMenteeUnlike(connection, updateMenteeUnlikeParams){
    const updateMenteeUnlikeQuery = `
    UPDATE MenteeLike
    SET isLike = 0
    WHERE mentorIndex = ? AND menteeIndex = ?;
    `;

    const updateMenteeUnlikeRow = await connection.query(updateMenteeUnlikeQuery, updateMenteeUnlikeParams);
    return updateMenteeUnlikeRow;
}


/*
 * API 멘토/맨티 Like 입력
 */
//멘토 Like 멘티 입력 API
async function updateMentorLike(connection, updateMentorLikeParams){
    const updateMentorLikeQuery = `
    UPDATE MentorLike
    SET isLike = 1
    WHERE mentorIndex = ? AND menteeIndex = ?;
    `;

    const updateMentorLikeRow = await connection.query(updateMentorLikeQuery, updateMentorLikeParams);
    return updateMentorLikeRow;
}

//멘티 Like 멘티 입력 API
async function updateMenteeLike(connection, updateMenteeLikeParams){
    const updateMenteeLikeQuery = `
    UPDATE MenteeLike
    SET isLike = 1
    WHERE mentorIndex = ? AND menteeIndex = ?;
    `;

    const updateMenteeLikeRow = await connection.query(updateMenteeLikeQuery, updateMenteeLikeParams);
    return updateMenteeLikeRow;
}



/*
 * API 멘토/맨티 Like 확인
 */
//멘토 Like 확인
/*async function selectMentorLike(connection, selectMentorLikeParams){
    const selectMentorLikeQuery = `
    SELECT mentorLikeIndex FROM MentorLike WHERE mentorIndex = ? AND menteeIndex = ?
    `;

    const selectMentorLikeResult = await connection.query(selectMentorLikeQuery, selectMentorLikeParams);
    return selectMentorLikeResult[0][0].mentorLikeIndex;
}

//멘티 Like 확인
async function selectMenteeLike(connection, selectMenteeLikeParams){
    const selectMenteeLikeQuery = `
    SELECT menteeLikeIndex FROM MenteeLike WHERE menteeIndex = ? AND mentorIndex = ?
    `;

    const selectMenteeLikeResult = await connection.query(selectMenteeLikeQuery, selectMenteeLikeParams);
    return selectMenteeLikeResult[0][0].menteeLikeIndex;
}*/


module.exports = {
    insertMentorLike,
    insertMenteeLike,
    updateMentorUnlike,
    updateMenteeUnlike,
    updateMentorLike,
    updateMenteeLike
};