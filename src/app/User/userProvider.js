const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const axios = require("axios")

const userDao = require("./userDao");
const userService = require("./userService")

// Provider: Read 비즈니스 로직 처리


// 멘토 or 멘티 체크
exports.retrieveMentorOrMentee = async function(userIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const mentorOrMenteeResult = await userDao.selectMentorOrMentee(connection, userIndex);
    const mentorOrMentee = mentorOrMenteeResult[0].mentorOrMentee

    let result = [mentorOrMentee];

    if(mentorOrMentee == 0) {     // Mentor
        const mentorIndexResult = await userDao.selectMentorIndex(connection, userIndex);
        result.push(mentorIndexResult[0].mentorIndex)
    }else if(mentorOrMentee == 1) {   // Mentee
        const menteeIndexResult = await userDao.selectMenteeIndex(connection, userIndex);
        result.push(menteeIndexResult[0].menteeIndex)
    }else {
         // 에러 -> result에 다른 값 push()
    }

    connection.release();
    return result;
}












// 1. 로그인
exports.getKakaoInfo = async function (access_token) {
    var token = access_token;
    var header = "Bearer " + token; // Bearer 다음에 공백 추가
    var api_url = 'https://kapi.kakao.com/v2/user/me';
    var request = require('request');
    var options = {
      url: api_url,
      headers: { 'Authorization': header }
    };



    return new Promise(function(resolve, reject){
      request.get(options, async function(error, response, body){
        if(error) reject(error);
        else {
          if (!error && response.statusCode == 200) {
            const bodyparse = JSON.parse(body);
            const name = bodyparse.response.name;
            const email = bodyparse.response.email;
            if (!email) {
              //validation 필요
              console.log('No email Info');
            } else if (!name) {
              //validation 필요
              console.log('No name Info');
            } else {
              const connection = await pool.getConnection(async (conn) => conn);
              let emailCheckResult = await userDao.getUserInfo(connection, email);
  
              //결과값 없으면 DB에 저장, 있으면 jwt
              if (emailCheckResult == undefined) {
                const addUserResult = await userDao.insertUserInfo(connection, [name, email]);
                emailCheckResult = await userDao.getUserInfo(connection, email);
                const signUpUserIndex = emailCheckResult["userIndex"];
                const signUpToken = await userService.signUpToken(signUpUserIndex);
                connection.release();
                resolve(signUpToken);
              }
              else {
                const loginUserIndex = emailCheckResult["userIndex"];
                const loginToken = await userService.loginToken(loginUserIndex);
                connection.release();
                resolve(loginToken);
              }
            }
          } else if (response.statusCode == 401) {
            resolve('error');
          } else {
            console.log('error');
            if (response != null) {
              console.log('error = ' + response.statusCode);
            }
            resolve(null);
          }
        }
      })
    });
  }
  
  // jwtMiddleware - 올바른 접근(로그인 상태) 체크
  exports.checkValidAccess = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkValidAccessResult = await userDao.selectUserToken(connection, userIdx);
    connection.release();
  
    return checkValidAccessResult;
  };
  
  //0. userIdx 존재하는지 체크 validation
  exports.userIdxCheck = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
  
    const userIdxCheckResult = await userDao.selectUserIdx(connection, userIdx);
  
    connection.release();
  
    return userIdxCheckResult;
  }