// REDUCER
const initialState = {
  vrMode: true,
  sceneLoaded: false,
  activeSphere: 1,
  isMouseDown: false,
  rotation: 0
}

let camera, rotation;

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_MODE':
      return Object.assign({}, state, {
        vrMode: !state.vrMode,
        sceneLoaded: false
      })

    case 'SET_MOUSEDOWN':
      return Object.assign({}, state, {
        isMouseDown: true
      })

    case 'SET_MOUSEUP':
      return Object.assign({}, state, {
        isMouseDown: false
      })

    case 'SET_LOADED':
      camera = document.getElementById('camera');
      return Object.assign({}, state, {
        sceneLoaded: true,
        rotation: 0
      })

    case 'SET_ACTIVE':
      return Object.assign({}, state, {
        activeSphere: action.id
      })

    case 'SET_ROTATION':
      if (camera) {
        rotation = camera.getAttribute('rotation').y;
      }
      return Object.assign({}, state, {
        rotation: rotation
      })

    default:
      return state
  }
}

// TEST
// const toggleMode = (mode) => {
//   return {
//     vrMode: !mode.vrMode
//   }
// }
// import expect from 'expect'
// import deepFreeze from 'deep-freeze'
//
// const testModeToggle = () => {
//   const modeBefore = {
//     vrMode: false
//   }
//   const modeAfter = {
//     vrMode: true
//   }
//
//   deepFreeze(modeBefore)
//
//   expect(
//     toggleMode(modeBefore)
//   ).toEqual(modeAfter)
// }
//
// testModeToggle();
// console.log('All tests passed!')
