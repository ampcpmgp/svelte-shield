// https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
export function getOffsetTop(elem) {
  let offsetTop = 0
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop
    }
  } while ((elem = elem.offsetParent))
  return offsetTop
}
