import { SET_WRITING_CONTEXT } from '../actions';

const defaultStatus = {
    context: {}
  };

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case SET_WRITING_CONTEXT:
              let context = {...state.context, ...action.payload.context}
        return {...state, context: context};
      default:
        return state;
    }
  }
}