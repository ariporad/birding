/* (c) 2015 Ari Porad (@ariporad) <ari@ariporad.com>. MIT Licensed */
const actionType = type => `birding/BirdingView/${`${type}`.toUpperCase()}`;
const SHOW_BIRD       = actionType('SHOW_BIRD');
const HIDE_BIRD       = actionType('HIDE_BIRD');

import forest from '../img/forest.jpg';
const birds = require.context('../img', false, /^\.\/bird[0-9]+\.(png|jpe?g)$/);

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBird() {
  const birdname = randomItem(birds.keys());
  return { img: birds(birdname), name: birdname.match(/\.\/(.+)\.(?:png|jpe?g)/i)[1] };
}

export default function reducer(state = { img: forest, bird: null }, action) {
  switch (action.type) {
    case SHOW_BIRD:
      const bird = randomBird();
      return { ...state, img: bird.img, bird: bird.name };
    case HIDE_BIRD:
      return { ...state, img: forest, bird: null };
    default: return state;
  }
}

export function showBird() {
  return { type: SHOW_BIRD };
}

export function hideBird() {
  return { type: HIDE_BIRD };
}
