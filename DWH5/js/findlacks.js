/**
 * Created by licheng on 16/9/16.
 */
function findlacks(arr){
    if(Array.isArray(arr)){
        var numbers = arr.concat()
        var sortedArr = numbers.sort(function(a,b){
            return a - b
        })
    }else{
        console.log('error args')
        return
    }
    var toFind =  sortedArr[sortedArr.length -1] -(sortedArr.length)
    var foundArr = []

    find(sortedArr)
    console.log('last:  '+foundArr.sort(function(a,b){
            return a - b
        }) + '  num : '+ toFind)

    function find(arr){
        var len = arr.length
            console.log(arr)
        if(len > 2 && toFind > 0 ) {
            var ir = arr[0]
            var il = arr[len - 1]
            var midLen =  Math.floor(len / 2)
            var corNum = arr[0] + midLen


            if (arr[midLen] !== corNum) {
                find(arr.slice(0, midLen))
                find(arr.slice(midLen))
                find([arr[midLen-1],arr[midLen]])
            } else if (arr[midLen] === corNum) {
                find(arr.slice(midLen))
            }
        } else if(len === 2 && toFind > 0){
            var first = arr[0]
            var delta = arr[1] - first
                if(delta === 1){
                    return
                }
                for(var i = 1 ; i < delta  ; i++){
                    if(foundArr.indexOf(++first) === -1){
                        foundArr.push(first)
                        toFind --
                    }
                }
            }else if(len === 1 && toFind > 0){
                var tempArr1 = [arr[0]].concat(sortedArr[sortedArr.indexOf(arr[0]) + 1])
                var tempArr2 = [sortedArr[sortedArr.indexOf(arr[0]) - 1]].concat([arr[0]])
                console.log('ss:'+tempArr1+'   ' +tempArr2)
                find(tempArr1)
                find(tempArr2)
            }
    }
}
var start = new Date()
findlacks([2,3,4,1,5,7,8,10,13,14,16,15,19,17,20,22,23,24,25,26,27,28,30,31,33,37,50,51,53])
console.log('timelapse:' +( new  Date() - start))