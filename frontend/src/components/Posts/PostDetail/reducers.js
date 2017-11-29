import { initialState } from "../../../initialState/initialState";
import { 
  POST_DETAIL_RECEIVED,
  POST_VOTE_SUCCESS
} from "./constants";

const postDetailreducer = (state = initialState.postDetail, action) => {
  switch(action.type) {
    case POST_DETAIL_RECEIVED:
      return Object.assign({}, state, action.post);

    case POST_VOTE_SUCCESS:
      return Object.assign({}, state, {
        ...state.detail,
        voteScore: action.score
      })
    
    default:
      return state;
  }
};

export default postDetailreducer;