'use strict';

require('regenerator/runtime');

import CONFIG from './config';
import _ from 'lodash';

export default class DotsExpress {
  constructor() {
    this.API_BASE_URL = CONFIG.EXPRESS.localUrl
  }

  async getUpcomingEvents() {
    return await this._fetch({
      method: 'GET',
      url: '/dots-api/events/upcoming'
    })
    .then((response) => {
      var  res = JSON.parse(response._bodyInit);
      if ((response.status === 200 || response.status === 201)) {
        return res;
      }
    })
    .catch((error) => {
      throw(error);
    });
  }

  async _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts);

    var reqOpts = {
      method: opts.method,
      headers: {
      }
    };
    
    if (this._sessionToken) {
      reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken;
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json';
      reqOpts.headers['Content-Type'] = 'application/json';
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }

    return await fetch(this.API_BASE_URL + opts.url, reqOpts);
  }
}