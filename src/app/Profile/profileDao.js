/*
 * API 멘토/맨티 프로필 입력
 */

//멘토 프로필 입력 API
async function insertMentorProfile(connection, insertMentorProfileParams) {
    const insertMentorProfileQuery = `
    INSERT INTO Mentor VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, default, default, default);
    `;

    const insertMentorProfileRow = await connection.query(insertMentorProfileQuery, insertMentorProfileParams);
    return insertMentorProfileRow;
}

//멘티 프로필 입력 API
async function insertMenteeProfile(connection, insertMenteeProfileParams) {
    const insertMenteeProfileQuery = `
    INSERT INTO Mentee VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, default, default, default);
    `;

    const insertMenteeProfileRow = await connection.query(insertMenteeProfileQuery, insertMenteeProfileParams);
    return insertMenteeProfileRow;
}


/*
 * API 멘토/맨티 유저 테이블에 입력
 */

async function updateUserProfile(connection, updateUserProfileParams) {
    const updateUserProfileQuery = `
    UPDATE User
    SET mentorOrMentee = ?
    WHERE userIndex = ?;
    `;

    const updateUserProfileRow = await connection.query(updateUserProfileQuery, updateUserProfileParams);
    return updateUserProfileRow;
}


/*
 * API 멘토/맨티 프로필 조회
 */

//멘토 프로필 조회 API
async function selectMentorProfile(connection, userIndex){
    const selectMentorProfileQuery = `
    SELECT * FROM Mentor Where userIndex = ?
    `;

    const selectMentorProfileRow = await connection.query(selectMentorProfileQuery, userIndex);
    return selectMentorProfileRow;
}

//멘티 프로필 조회 API
async function selectMenteeProfile(connection, userIndex){
    const selectMenteeProfileQuery = `
    SELECT * FROM Mentee Where userIndex = ?
    `;

    const selectMenteeProfileRow = await connection.query(selectMenteeProfileQuery, userIndex);
    return selectMenteeProfileRow;
}


/*
 * userIdx로 멘토인지 멘티인지 가져오기
 */

async function selectMentorOrMentee(connection, userIndex){
    const selectMentorOrMenteeQuery = `
    SELECT mentorOrMentee FROM User Where userIndex = ?
    `;

    const selectMentorOrMenteeResult = await connection.query(selectMentorOrMenteeQuery, userIndex);
    return selectMentorOrMenteeResult[0][0].mentorOrMentee;
}


/*
 * API 멘토/맨티 프로필 수정
 */

//멘토 프로필 수정 API
async function updateMentorProfile(connection, updateMentorProfileParams, userIndex){
    const updateMentorProfileQuery = `
    UPDATE Mentor
    SET ${updateMentorProfileParams.join(', ')}
    WHERE userIndex = ?
    `;

    const updateMentorProfileRow = await connection.query(updateMentorProfileQuery, userIndex);
    return updateMentorProfileRow;
}

//멘티 프로필 수정 API
async function updateMenteeProfile(connection, updateMenteeProfileParams, userIndex){
    const updateMenteeProfileQuery = `
    UPDATE Mentee
    SET  ${updateMenteeProfileParams.join(', ')}
    WHERE userIndex = ?
    `;

    const updateMenteeProfileRow = await connection.query(updateMenteeProfileQuery, userIndex);
    return updateMenteeProfileRow;
}


/*
 * API 멘토/맨티 닉네임 조회
 */

//멘토 닉네임 조회 API
async function selectMentorNickname(connection, mentorNickname){
    const selectMentorNicknameQuery = `
    SELECT * FROM Mentor Where mentorNickname = ?
    `;

    const selectMentorNicknameRow = await connection.query(selectMentorNicknameQuery, mentorNickname);
    return selectMentorNicknameRow;
}

//멘티 닉네임 조회 API
async function selectMenteeNickname(connection, menteeNickname){
    const selectMenteeNicknameQuery = `
    SELECT * FROM Mentee Where menteeNickname = ?
    `;

    const selectMenteeNicknameRow = await connection.query(selectMenteeNicknameQuery, menteeNickname);
    return selectMenteeNicknameRow;
}


module.exports = {
    insertMentorProfile,
    insertMenteeProfile,
    updateUserProfile,
    selectMentorProfile,
    selectMenteeProfile,
    selectMentorOrMentee,
    updateMentorProfile,
    updateMenteeProfile,
    selectMentorNickname,
    selectMenteeNickname
};