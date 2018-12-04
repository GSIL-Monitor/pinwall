const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {

  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息

  app.passport.verify(async (ctx, user) => {
    console.log(user.provider);
    console.log(user.username);
    console.log(user.password);

    const auth = await ctx.model.Authorization.findOne({
      uid: user.id,
      provider: user.provider,
    });
    const existsUser = await ctx.model.User.findOne({
      id: auth.user_id
    });

    if (existsUser) {
      return existsUser;
    } else {
      return {};
    }
  });

  app.passport.use('loginByWeixin', new WeixinStrategy({
    clientID: 'CLIENTID',
    clientSecret: 'CLIENT SECRET',
    callbackURL: 'CALLBACK URL',
    requireState: false,
    scope: 'snsapi_login'
  }, function(accessToken, refreshToken, profile, done) {
    app.passport.doVerify(req, profile, done);
  }));

  //微信客户端登录
  //微信官网文档：http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
  passport.use('loginByWeixinClient', new WeixinStrategy({
    clientID: 'CLIENTID',
    clientSecret: 'CLIENT SECRET',
    callbackURL: 'CALLBACK URL',
    requireState: false,
    authorizationURL: 'https://open.weixin.qq.com/connect/oauth2/authorize', //[公众平台-网页授权获取用户基本信息]的授权URL 不同于[开放平台-网站应用微信登录]的授权URL
    scope: 'snsapi_userinfo' //[公众平台-网页授权获取用户基本信息]的应用授权作用域 不同于[开放平台-网站应用微信登录]的授权URL
  }, function(accessToken, refreshToken, profile, done) {
      app.passport.doVerify(req, profile, done);
  }));

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    return user;
  });

};