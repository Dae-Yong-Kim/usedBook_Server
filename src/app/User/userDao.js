

// 멘토 or 멘티 체크
async function selectMentorOrMentee(connection, userIndex) {
    const selectMentorOrMenteeQuery = `
        SELECT mentorOrMentee
        FROM User
        WHERE userIndex = ?;
    `
    const mentorOrMentee = await connection.query(selectMentorOrMenteeQuery, userIndex);
    return mentorOrMentee[0];
}

// 멘토인덱스값 가져오기
async function selectMentorIndex(connection, userIndex) {
    const selectMentorIndexQuery = `
    SELECT mentorIndex
    FROM Mentor
    WHERE userIndex = ?;   
    `
    const mentorIndex = await connection.query(selectMentorIndexQuery, userIndex);
    return mentorIndex[0];
}

// 멘티인덱스값 가져오기
async function selectMenteeIndex(connection, userIndex) {
    const selectMenteeIndexQuery = `
    SELECT menteeIndex
    FROM Mentee
    WHERE userIndex = ?;   
    `
    const menteeIndex = await connection.query(selectMenteeIndexQuery, userIndex);
    return menteeIndex[0];
}


// =========================

// // 유저 테이블에 있는 유저인지 email 값으로 조회
// async function getUserIndexByKakaoId(connection, kakaoId) {
//     const getUserIndexByKakaoIdQuery = `
//         SELECT userIndex
//         FROM User
//         WHERE kakaoID = ?;
//     `
//     const userIndex = await connection.query(getUserIndexByKakaoIdQuery, kakaoId);
//     return userIndex[0];
// }

// // 유저테이블에 없는 유저일 경우 회원가입
// async function signUp(connection, signUpParams) {
//     const signUpQuery = `
//         INSERT INTO User(userName, kakaoID)
//         VALUES (?, ?);
//     `
//     const signUpResult = await connection.query(signUpQuery, signUpParams);
//     return signUpResult;
// }


// // 2. 로그아웃, 3. 회원탈퇴 - 토큰 삭제
// async function eraseUserToken(connection, userIdx) {
//     const eraseUserTokenQuery = `
//         UPDATE User
//         SET token = NULL
//         WHERE userIdx = ?;
//     `;
//     const eraseUserTokenRows = await connection.query(eraseUserTokenQuery, userIdx);
//     return eraseUserTokenRows;
//   }

module.exports = {
    selectMentorOrMentee,
    selectMentorIndex,
    selectMenteeIndex,
};

