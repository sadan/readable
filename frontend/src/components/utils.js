export const convertDate = (timestamp) => {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(timestamp).toLocaleDateString("en-US", options);
}