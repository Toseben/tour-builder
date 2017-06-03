// ACTIONS
export function setMode() {
  return { type: 'SET_MODE'}
}

export function setModeTrue() {
  return { type: 'SET_MODE_TRUE'}
}

export function setModeFalse() {
  return { type: 'SET_MODE_FALSE'}
}

export function setModal(url) {
  return { type: 'SET_MODAL',
    url: url
  }
}

export function setMobile() {
  return { type: 'SET_MOBILE'}
}

export function setMouseDown() {
  return { type: 'SET_MOUSEDOWN'}
}

export function setMouseUp() {
  return { type: 'SET_MOUSEUP'}
}

export function setActive(id) {
  return { type: 'SET_ACTIVE',
    id: id
  }
}

export function setLoaded() {
  return { type: 'SET_LOADED'}
}

export function setRotation() {
  return { type: 'SET_ROTATION'}
}
