export function swap(arr: Array<any>, x: number, y: number) {
  const length = arr.length
  if (x < 0 || x >= length) {
    return
  }

  if (y < 0 || y >= length) {
    return
  }

  if (x === y) {
    return
  }

  const temp = arr[x]
  arr[x] = arr[y]
  arr[y]= temp
}

export function genArrayWithIndex(length: number) {
  const arr: number[] = []
  for (let i = 0; i < length; i++) {
    arr[i] = i
  }

  return arr
}