import { initialState } from "../../../initialState/initialState";
import { 
  POST_DETAIL_RECEIVED,
  POST_VOTE_SUCCESS
} from '../../../utils/constants';

const postDetailreducer = (state = initialState.postDetail, action) => {
  switch(action.type) {
    case POST_DETAIL_RECEIVED:
      return {
        ...state,
        ...action.post
      };

    case POST_VOTE_SUCCESS:
      return {
        ...state,
        voteScore: action.score
      };
    
    default:
      return state;
  }
};

export default postDetailreducer;