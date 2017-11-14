export function spliceIfExist (arr, item) {
  if (Array.isArray(arr)) {
    const index = arr.indexOf(item)
    if (index >= 0) {
      arr.splice(index, 1)
    }
  }
}
