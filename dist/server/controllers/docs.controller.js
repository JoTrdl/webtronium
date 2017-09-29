'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _capitalize = require('../helpers/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* import DocsComponent from '../../client/views/Docs' */

_marked2.default.setOptions({
  renderer: new _marked2.default.Renderer(),
  highlight: code => _highlight2.default.highlightAuto(code).value,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

const markedSection = {}; // markdowns cache
const stat = _util2.default.promisify(_fs2.default.stat);
const readFile = _util2.default.promisify(_fs2.default.readFile);

async function index(ctx, next) {
  const section = ctx.params.section || 'introduction';

  if (!_config2.default.get('docs.cache') || !markedSection[section]) {
    // read and compile the file if not cached
    // or cache is disabled (dev)
    const filepath = _path2.default.join(_config2.default.get('docs.path'), `${section}.md`);

    try {
      // check if file exist first
      await stat(filepath);
    } catch (e) {
      ctx.status = 404;
      return next();
    }

    const content = await readFile(filepath, { encoding: 'utf8' });
    markedSection[section] = (0, _marked2.default)(content);
  }

  // request status, cache
  ctx.status = 200;
  ctx.cache.control = 'public';

  // metadata title && component/props
  const sectionTitle = (0, _capitalize2.default)(section.replace(/-/g, ' '), true);
  ctx.state.metadata.title = `${sectionTitle} | Pure Server Router`;

  /* ctx.state.view.component = DocsComponent */
  ctx.state.view.component = require('../../client/views/Docs').default;
  ctx.state.view.props = {
    content: markedSection[section]
  };

  next();
}

exports.default = { index };