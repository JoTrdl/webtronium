"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Helper to create an action
 * 
 * @param {any} type 
 * @returns 
 */
function createAction(type) {
  return args => ({
    type,
    payload: args
  });
}

exports.createAction = createAction;