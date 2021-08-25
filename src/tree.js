const origin = {
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

const setNestedKey = (obj, path, value) => {
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


const parseArrayToTree = (floatTreeArray, map = [floatTreeArray[0]]) => {
  let [leftBranch, rightBranch] = getTreeElemsForEl(floatTreeArray, map[map.length -1])
  if(leftBranch !== undefined && rightBranch !== undefined) {
    leftBranch = leftBranch === false ? leftBranch + '1' : leftBranch
    rightBranch = rightBranch === false ? rightBranch + '2' : rightBranch
    const leftMap = [...map, leftBranch]
    const rightMap = [...map, rightBranch]
    return {[leftBranch] : parseArrayToTree(floatTreeArray, leftMap), [rightBranch] : parseArrayToTree(floatTreeArray, rightMap)}
  } else {
    return false
  }
}

const getArrayByTreeInDeep = (tree) => {
  const array = []
  const traversTree = (object) => {
    if(!object) {
      return
    }

    for(let key in object){
      array.push(key)
      traversTree(object[key])
    }
  }
  traversTree(tree)
  return array.filter(f => f !== 'false1' && f !== 'false2')
}


const hashArray = [5, 2, 6, 1, 9, '#', 8, '#', '#', '#', '#', 4, '#']
const array = hashArray.map(el => {
  if(el === "#"){
    return false
  }

  return el
})

const tree = {[array[0]]: parseArrayToTree(array)}
console.log(getArrayByTreeInDeep(tree))

