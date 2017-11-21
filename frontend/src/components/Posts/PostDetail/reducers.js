import { initialState } from "../../../initialState/initialState";
import { POST_DETAIL_RECEIVED, POST_COMMENTS_RECEIVED } from "./constants";

const postDetailreducer = (state = initialState.postDetail, action) => {
  switch(action.type) {
    case POST_DETAIL_RECEIVED:
      return Object.assign({}, state, {detail: action.post});

    case POST_COMMENTS_RECEIVED:
      return Object.assign({}, state, {comments: action.comments});
    
    default:
      return state;
  }
};

export default postDetailreducer;