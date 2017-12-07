export const convertDate = (timestamp) => {
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(timestamp).toLocaleDateString("en-US", options);
};

export const sortByDate = (a, b) => {
  return (new Date(b.timestamp) - new Date(a.timestamp));
};

export const sortByScore = (a, b) => {
  return b.voteScore - a.voteScore;
};

export const defaultHeaders = () => {
  let headers = new Headers()
  headers.append('Authorization', process.env.REACT_APP_AUTHORIZATION);
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  return headers
}
