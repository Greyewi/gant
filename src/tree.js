const tree = {
  5: {
    2: {
      1: {
        false: null,
        false: null
      },
      9: {
        false: null,
        false: null
      }
    },
    6: {
      false: null,
      8: {
        4: null,
        false: null
      }
    },
  },
}


export const setNestedKey = (obj, path, value) => {
  if (path.length === 1) {
    obj[path] = value
    return
  }
  return setNestedKey(obj[path[0]], path.slice(1), value)
}

const getTreeElemsForEl = (arr, elem) => {
  let elems = []
  for(let i = 0, j = 1; i < arr.length; i++){
    if(arr[i] === elem) {
      elems[0] = arr[j]
      elems[1] = arr[j + 1]
    }
    if(arr[i]){
      j = j + 2
    }
  }
  return elems
}


const parseArrayToTree = (floatTreeArray, nextEl, currentArray) => {

  if(nextEl < floatTreeArray.length){
    const newLeaves = getTreeElemsForEl(floatTreeArray, floatTreeArray[nextEl])
    return parseArrayToTree(floatTreeArray, ++nextEl, currentArray.concat(newLeaves))
  } else {
    return currentArray.filter(f => f)
  }
}

const array = [5, 2, 6, 1, 9, false, 8, false, false, false, false, 4, false]
console.log(parseArrayToTree(array, 0, []))
