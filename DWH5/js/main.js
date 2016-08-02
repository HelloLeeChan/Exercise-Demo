/**
 * Created by licheng on 16/8/2.
 */


function Page(ele){
        var input = ele.getElementsByClassName('word')[0]
            output = ele.getElementsByClassName('output')[0]
            letters =  ele.getElementsByClassName('keyboard')[0].getElementsByClassName('key')
            contain =  document.getElementsByClassName('container')[0]
            this.self = ele
            this.codeScroll = ele.getElementsByClassName('codescroll')[0]


    function ranKey(letters){
        function toggleKey(key){
            key.classList.add('key-down')
            setTimeout(function(){
                key.classList.remove('key-down')
            },300)
        }
        var typeAni= setInterval(function(){
            toggleKey(letters[parseInt(Math.random()*74,10)+1])
            toggleKey(letters[parseInt(Math.random()*74,10)+1])
            toggleKey(letters[parseInt(Math.random()*74,10)+1])

        },200)
        return typeAni

    }

        var keyAni = ranKey(letters)




        var    typing = new Typing({
                source: input,
                output: output,
                delay: 40,
                done: function() {
                    clearInterval(keyAni)

                    contain.style.transform = 'rotateY('+String(Number((/\d+/.exec(contain.style.transform))[0]) +180)+'deg)'
                } //完成打印后的回调事件
            });

        this.typing = typing

}

Page.prototype.start = function(){
    this.typing.start()
    that = this.codeScroll
    that.addEventListener('transitionend',function(e){
        e.stopPropagation()
    })

    setTimeout(function(){
        that.classList.add('showCode')
    },70)
}
Page.prototype.clear =function(){
    this.self.style.display = 'none'
}
Page.prototype.show = function(){
    this.self.style.display = 'block'
}





function PageSwap(pages){

        var pagesObj = [], len = pages.length
        for(var i = 0 ; i < len ; i++){
            pagesObj.push(new Page(pages[i]))
        }
        console.log(pagesObj)
        pagesObj[0].start()

        var  container = document.getElementsByClassName('container')[0],
             j = 1

                 container.addEventListener('transitionend',function(e){
                     if(j < pagesObj.length ){
                         console.log(j)
                         console.log(e)
                         pagesObj[j].start()
                         if(j < pagesObj.length -1){
                             pagesObj[j+1].show()
                         }

                         pagesObj[j-1].clear()

                         j++

                     }

                 })
}

var pages = new PageSwap(document.getElementsByClassName('page'))





/*window.onload = function(){



       console.log(document.getElementsByClassName('word')[0])
     var typing = new Typing({
     startFun:  function(){
         var mask = document.getElementsByClassName('codescroll')[0]
         mask.classList.add('showCode')
        typeAni =  ranKey(document.getElementsByClassName('key'))
     },
     source: document.getElementsByClassName('word')[0],
     output: document.getElementsByClassName('output')[0],
     delay: 80,
     done: function() {

         var con = document.getElementsByClassName('container')[0]
         con.style.transform = 'rotateY('+String(Number((/\d+/.exec(con.style.transform))[0]) +180)+'deg)'

     } //完成打印后的回调事件
     });
     typing.start();
    var page2 =  document.getElementsByClassName('container')[0]
    console.log(page2)
    page2.addEventListener('transitionend',function(e){
        console.log(e)
    })







    function ranKey(letters){

        var letters
        function toggleKey(key){
            key.classList.add('key-down')
            setTimeout(function(){
                key.classList.remove('key-down')
            },300)
        }
        var typeAni= setInterval(function(){
            toggleKey(letters[parseInt(Math.random()*74,10)+1])
            toggleKey(letters[parseInt(Math.random()*74,10)+1])
            toggleKey(letters[parseInt(Math.random()*74,10)+1])

        },200)
        return typeAni

    }


    setTimeout(function(){
        var mask = document.getElementsByClassName('codescroll')[0]
        mask.classList.add('showCode')
        code1 = document.getElementsByClassName('code1')[0]
        code2 = document.getElementsByClassName('code2')[0]
        mask.addEventListener('transitionend',function(e){
            code1.classList.add('codeRun')
        })
    },100)
    setInterval(function(){

        var con = document.getElementsByClassName('container')[0]
        con.style.transform = 'rotateY('+String(Number((/\d+/.exec(con.style.transform))[0]) +180)+'deg)'
        console.log((/\d+/.exec(con.style.transform))[0])
    },2000)



}*/



