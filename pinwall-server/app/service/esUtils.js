'use strict';

const Service = require('egg').Service;

class esUtils extends Service {

  async createObject(id, searchObject){
    const ctx = this.ctx;
    await ctx.app.elasticsearch.create({
      index: ctx.app.es_index,
      type: ctx.app.es_type,
      id: id,
      body: searchObject
    });
  }

  async deleteObjectById(id){
    const ctx = this.ctx;
    await ctx.app.elasticsearch.delete({
      index: ctx.app.es_index,
      type: ctx.app.es_type,
      id: id
    });
  }

  async updateobject(id, updateObject){

    const response = await ctx.app.elasticsearch.update({
      index: ctx.app.es_index,
      type: ctx.app.es_type,
      id: id,
      body: {
        doc: updateObject
      }
    })
  }

  async batchCreateObject(batchObject){
    const ctx = this.ctx;
    for (let object of batchObject){
      await ctx.app.elasticsearch.create({
        index: ctx.app.es_index,
        type: ctx.app.es_type,
        id: object.Id,
        body: object
      });
    }
  }

}

module.exports = esUtils;
