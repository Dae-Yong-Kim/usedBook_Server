module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // // 1. 카카오 로그인 API
    // app.post('/app/kakao/signin', user.signInKakao);


    // // 2. 로그아웃 API
    // app.get('/app/user/logout', jwtMiddleware, user.logoutUser);


};
