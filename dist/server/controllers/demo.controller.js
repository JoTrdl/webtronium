'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// possible to import the component
// but in this case, should restart the 
// node process. Good for perfs in production
// mode, but not very developer friendly
/*
import DemoComponent from '../../client/views/Demo'
*/

function index(ctx) {
  ctx.status = 200;
  ctx.cache.control = 'public';
  /* ctx.state.view.component = DemoComponent */
  ctx.state.view.component = require('../../client/views/Demo').default;
}

function counter(ctx) {
  ctx.status = 200;
  ctx.cache.control = 'public';
  /* ctx.state.view.component = DemoComponent */
  ctx.state.view.component = require('../../client/views/Demo').default;
  ctx.state.view.props = {
    counter: parseInt(ctx.query.value) || 0
  };
}

function redirect(ctx) {
  ctx.status = 301;
  ctx.redirect('/demos?redirected');
}

function error(ctx) {
  throw new Error('Ooops! Something bad happened');
}

exports.default = { index, counter, redirect, error };