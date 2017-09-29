'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/* import HomeComponent from '../../client/views/Home' */

function index(ctx) {
  ctx.status = 200;
  ctx.cache.control = 'public';
  /* ctx.state.view.component = HomeComponent */
  ctx.state.view.component = require('../../client/views/Home').default;
  ctx.state.view.props = {
    alt: true
  };
}

exports.default = { index };