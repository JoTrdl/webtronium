import { createDuck } from 'redux-duck'

import { isServer } from '../../utils'

const ORIENTATIONS = [
  { name: 'portrait', query: '(orientation: portrait)' },
  { name: 'landscape', query: '(orientation: landscape)' }
]

const BREAKPOINTS = [
  { name: 'xxs', query: '(min-width: 20em)' }, // smartphones, portrait iPhone, portrait 480x320 phones (Android)
  { name: 'xs', query: '(min-width: 30em)' }, // smartphones, Android phones, landscape iPhone
  { name: 'sm', query: '(min-width: 37.5em)' }, // portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android)
  { name: 'md', query: '(min-width: 50em)' }, // tablet, landscape iPad, lo-res laptops ands desktops
  { name: 'lg', query: '(min-width: 64em)' }, // big landscape tablets, laptops, and desktops
  { name: 'xl', query: '(min-width: 80em)' }, // standard laptops and desktops
  { name: 'xxl', query: '(min-width: 90em)' } // hi-res laptops and desktops
]

const viewport = createDuck('viewport')

// Initial state
const initialState = {
  orientation: undefined,
  breakpoint: undefined
}

// Types
const SET_VIEWPORT = viewport.defineType('SET_VIEWPORT')

// Reducer
export default viewport.createReducer({
  [SET_VIEWPORT]: (state, action) => ({ ...state, ...action.payload })
}, initialState)

/**
 * Initialize the viewport breakpoint watcher
 */
export function initViewport () {
  if (isServer) {
    return () => {}
  }

  return dispatch => {
    function checkMediaQueries (queries, type) {
      let matched

      queries.forEach((breakpoint, i) => {
        const mql = window.matchMedia(breakpoint.query)
        if (mql.matches) {
          matched = queries[i]
        }

        // Auto update on change
        mql.addListener(mediaQueryList => {
          const index = (mediaQueryList.matches) ? i : i - 1
          const payload = {}
          payload[type] = queries[index] && queries[index].name
          dispatch({ type: SET_VIEWPORT, payload })
        })
      })

      return matched.name
    }

    // Check/install breakpoints
    const breakpoint = checkMediaQueries(BREAKPOINTS, 'breakpoint')

    // Check/install orientation
    const orientation = checkMediaQueries(ORIENTATIONS, 'orientation')

    dispatch({
      type: SET_VIEWPORT,
      payload: {
        breakpoint,
        orientation
      }
    })
  }
}
