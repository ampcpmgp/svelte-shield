export function getUrlForTweet(title, hashTags) {
  // https://stackoverflow.com/questions/6627648/how-can-i-submit-a-hash-key-in-an-url-parameter
  return `https://twitter.com/share?ref_src=twsrc%5Etfw&text=${title}&hashtags=${hashTags.join(
    ','
  )}&url=${location.href.replace(/#/g, '%23')}`
}
