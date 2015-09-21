/* (c) 2015 Ari Porad (@ariporad) <ari@ariporad.com>. MIT Licensed */
const actionType = type => `birding/BirdingView/${`${type}`.toUpperCase()}`;
const SHOW_BIRD       = actionType('SHOW_BIRD');
const HIDE_BIRD       = actionType('HIDE_BIRD');
const SHOW_BINOCULARS = actionType('SHOW_BINOCULARS');
const HIDE_BINOCULARS = actionType('HIDE_BINOCULARS');

const birds = require.context('../img', false, /^\.\/bird[0-9]+\.(png|jpe?g)$/);

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBird() {
  const birdname = randomItem(birds.keys());
  return { img: birds(birdname), name: birdname.match(/\.\/(.+)\.(?:png|jpe?g)/i)[1] };
}

export default function reducer(state = { bird: null, birdname: null, binoculars: false }, action) {
  switch (action.type) {
    case SHOW_BIRD:
      const bird = randomBird();
      return { ...state, bird: bird.img, birdname: bird.name };
    case HIDE_BIRD:
      return { ...state, bird: null, birdname: null };
    case SHOW_BINOCULARS:
      return { ...state, binoculars: true };
    case HIDE_BINOCULARS:
      return { ...state, binoculars: false };
    default: return state;
  }
}

export function showBird() {
  return { type: SHOW_BIRD };
}

export function hideBird() {
  return { type: HIDE_BIRD };
}

export function showBinoculars() {
  return { type: SHOW_BINOCULARS };
}

export function hideBinoculars() {
  return { type: HIDE_BINOCULARS };
}
