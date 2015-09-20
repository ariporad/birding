/* (c) 2015 Ari Porad (@ariporad) <ari@ariporad.com>. MIT Licensed */
import forest from '../img/forest.jpg';

const actionType = type => `birding/BirdingView/${`${type}`.toUpperCase()}`;
const SET_IMG   = actionType('SET_IMG');

export default function reducer(state = { img: forest }, action) {
  switch (action.type) {
    case SET_IMG:
      state = { ...state };
      state.img = action.payload;
      return state;
    default: return state;
  }
}

export function setImage(img) {
  return { type: SET_IMG, payload: img };
}


