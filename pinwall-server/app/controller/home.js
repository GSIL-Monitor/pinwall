'use strict';

const Controller = require('egg').Controller;
const BaseController = require('./BaseController');

class HomeController extends BaseController {
  async index() {
    const ctx = this.ctx;
    await ctx.render('index.html',{
        user:ctx.user
    });
  }

  async logout(){
    const ctx = this.ctx;
    ctx.logout();
    await ctx.render('index.html');
  }

  async login() {
    const ctx = this.ctx;
    await ctx.render('login.html', {

    });
  }

  async relogin(){
    const ctx = this.ctx;
    await ctx.render('login.html', {
      message:'用户名或者密码错误!'
    });
  }

  async upload() {
    const ctx = this.ctx;
    if (ctx.isAuthenticated()){
      await ctx.render('upload.html', {

      });
    }
    else{
      ctx.session.returnTo = ctx.path;
      await ctx.render('login.html', {

      });
    }
  }

  async uploadWork(){
    const ctx = this.ctx;
    await ctx.render('uploadWork.html',{
        user:ctx.user
    });
  }

  async project(){
    const ctx = this.ctx;
    try{
      const data = await ctx.service.artifacts.find(ctx.helper.parseInt(ctx.params.id));
      await ctx.render('projects.html',{data:data});
    }
    catch(e){
      super.failure(e.message);
    }

  }

  async topics(){
    const ctx = this.ctx;
    await ctx.render('topics.html',{
        user:ctx.user
    });
  }

  async topicsAbout(){
    const ctx = this.ctx;
    console.log(ctx.user);
    await ctx.render('topicsAbout.html', {
        user:ctx.user
    });
  }

  async users(){
    const ctx = this.ctx;
    try{
      await ctx.render('users.html');
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async workFolder(){
    const ctx = this.ctx;
    await ctx.render('workFolder.html');
  }

  async userManager(){
    const ctx = this.ctx;
    await ctx.render('userManager.html');
  }

  async workManager(){
    const ctx = this.ctx;
    await ctx.render('workManager.html');
  }

  async commentManager(){
    const ctx = this.ctx;
    await ctx.render('commentManager.html');
  }

  async topicsUpdate(){
    const ctx = this.ctx;
    await ctx.render('topicsUpdate.html');
  }

  async children(){
    const ctx = this.ctx;
    await ctx.render('children.html');
  }

  async search(){
    const ctx = this.ctx;
    await ctx.render('search.html');
  }

  async resetInfo(){
    const ctx = this.ctx;
    await ctx.render('resetInfo.html');
  }

  async createTopics(){
    const ctx = this.ctx;
    await ctx.render('createTopics.html');
  }

  async forgetPwd(){
    const ctx = this.ctx;
    await ctx.render('forgetPwd.html');
  }

  async register(){
    const ctx = this.ctx;
    await ctx.render('register.html');
  }
}

module.exports = HomeController;
