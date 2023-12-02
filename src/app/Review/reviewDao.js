
// 멘토 리뷰 조회 API - 상단 정보
async function selectMentorReviewUpper(connection, mentorIndex) {
    const selectMentorReviewUpperQuery = `
        SELECT COUNT(mentorIndex) AS reviewCnt, ROUND(AVG(stars), 2) as starAvg
        FROM Review
        WHERE mentorIndex = ?;
    `

    const mentorReviewUpper = await connection.query(selectMentorReviewUpperQuery, mentorIndex);
    return mentorReviewUpper[0][0];
}

// 멘토 리뷰 조회 API - 리뷰 리스트
async function selectMentorReviewList(connection, mentorIndex) {
    const selectMentorReviewListQuery = `
        SELECT r.reviewIndex, m.menteeNickname, r.category, r.stars, r.reviewText, r.createdAt
        FROM Review AS r
                 LEFT JOIN Mentee AS m ON r.menteeIndex = m.menteeIndex
        WHERE mentorIndex = ?;
    `
    const [mentorReviewList] = await connection.query(selectMentorReviewListQuery, mentorIndex);
    return mentorReviewList;
}

// 멘티 리뷰 작성 API
async function insertReview(connection, menteeIndex, mentorIndex, category, stars, reviewText) {

    const insertReviewQuery = `
    INSERT INTO Review(menteeIndex, mentorIndex, category, stars, reviewText)
    VALUES (?, ?, ?, ?, ?);
    `
    const insertReview = await connection.query(insertReviewQuery, [menteeIndex, mentorIndex, category, stars, reviewText]);
    return insertReview;
}




module.exports = {
    selectMentorReviewUpper,
    selectMentorReviewList,
    insertReview

};