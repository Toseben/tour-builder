// REDUCER
const initialState = {
  vrMode: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MODE':
      return {
        vrMode: !state.vrMode
      }
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
