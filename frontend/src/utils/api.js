const BASE_URL = process.env.REACT_APP_BASE_URL
const AUTHORIZATION = process.env.REACT_APP_AUTHORIZATION

const headers = new Headers()
headers.append('Authorization', AUTHORIZATION);
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

export const fetchCategories = () => {
  let url = `${BASE_URL}/categories`

  return(
    fetch(url, {headers: headers})
      .then(res => res.json())
      .then(data => data.categories)
      .catch(err => console.log(err))
  )
}

export const fetchPosts = () => {
  let url = `${BASE_URL}/posts`;

  return (
    fetch(url, {headers: headers})
      .then(res => res.json())
      .then(posts => {
        return posts.map(
          post => fetchPostComments(post.id)
            .then(comments => ({
              commentsCount: comments.length, 
              ...post
            }))
        )
      })
  )
}

export const fetchPostDetail = (postId) => {
  let url = `${BASE_URL}/posts/${postId}`;
  
  return (
    fetch(url, {headers: headers})
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  );
};

export const fetchPostComments = (postId) => {
  let url = `${BASE_URL}/posts/${postId}/comments`

  return (
    fetch(url, {headers: headers})
      .then(res => res.json())
      .then(data => data)
  )
}

export const postVote = (postId, vote) => {
  let url = `${BASE_URL}/posts/${postId}/`;

  return (
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: vote})
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  );
}

export const createEditPost = (params, update) => {
  let url = !update ? `${BASE_URL}/posts` : `${BASE_URL}/posts/${params.id}`;
  let method = !update ? 'POST' : 'PUT';
  let body = params;

  if(update) {
    body = {
      title: params.title,
      body: params.body
    };
  }

  return (
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err))
  );
}

export const deletePost = (postId) => {
  let url = `${BASE_URL}/posts/${postId}`;

  return (
    fetch(url, {
      method: 'DELETE',
      headers: headers
    })
      .then(res => res.json())
      .then(data => data.deleted)
      .catch(err => console.log(err))
  )
}

export const createUpdateComment = (params, update) => {
  let url = !update ? `${BASE_URL}/comments` : `${BASE_URL}/comments/${params.id}`;
  let method = !update ? 'POST' : 'PUT';
  let body = params;

  if(update) {
    body = {
      timestamp: params.timestamp,
      body: params.body
    };
  }

  return (
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err))
  );
}

export const commentVote = (commentId, vote) => {
  let url = `${BASE_URL}/comments/${commentId}/`

  return (
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: vote})
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err))
  );
}

export const deleteComment = (commentId) => {
  let url = `${BASE_URL}/comments/${commentId}/`

  return (
    fetch(url, {
      method: 'DELETE',
      headers: headers
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err))
  );
}