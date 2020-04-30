const jwt = require('jsonwebtoken');
const config = require('../config');

// models
const userModel = require('../models/users');
const userInfoModel = require('../models/userInfo');

module.exports = {
  // 登陆
  async signIn(ctx) {
    const formData = ctx.request.body;
    if (!formData.username || !formData.password) ctx.throw(400, 'missing required params');

    const result = await userModel.getOneByUsernameAndPassword(formData)
    if (!result) ctx.throw(403, '用户不存在或密码错误');

    const token = jwt.sign(
      { id: result.id },
      config.jwt.secret,
      config.jwt.options
    );
    ctx.send({ token });
  },

  // 注册
  async signUp(ctx) {
    const formData = ctx.request.body;
    if (!formData.username || !formData.password || !formData.nickname || !formData.sex) {
      return ctx.throw(400, 'missing required params');
    }

    const result = userModel.getOneByUsername(formData.username);
    if (result) return ctx.throw(403, '该账号已注册');

    const values1 = {
      username: formData.username,
      password: formData.password,
    }
    await userModel.create(values1);

    const user = userModel.getOneByUsername(formData.username);
    const values2 = {
      userId: user.id,
      nickname: formData.nickname,
      sex: formData.sex,
    }
    await userInfoModel.create(values2);
    ctx.send();
  },

  // 修改密码
  async updatePassword(ctx) {
    const formData = ctx.request.body;
    const opts = {
      username: formData.username,
      password: formData.originPass,
    };
    const result = await userModel.updatePassword(opts, formData.newPass);
    ctx.send();
  },

  // 获取用户信息
  async getUserInfo(ctx) {
    const userId = ctx.state.user.id;
    const result = await userInfoModel.getOneByUserId(userId);
    ctx.send(result);
  },

  // 更新用户信息
  async updateUserInfo(ctx) {
    const userId = ctx.state.user.id;
    const result = await userInfoModel.updateInfoByUserId(userId);
    ctx.send();
  },
}
