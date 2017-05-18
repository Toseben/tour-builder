// REDUCER
const initialState = {
  vrMode: true,
  isMouseDown: false,
  rotation: 0
}

let camera, rotation;

// FIX THIS
setTimeout(function() {
  camera = document.getElementById('camera');
}, 1000);

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_MODE':
      return Object.assign({}, state, {
        vrMode: !state.vrMode
      })

    case 'SET_MOUSEDOWN':
      return Object.assign({}, state, {
        isMouseDown: true
      })

    case 'SET_MOUSEUP':
      return Object.assign({}, state, {
        isMouseDown: false
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
