/**
 * Created by licheng on 16/8/2.
 */


function Page(layoutCode, projectCode, imgs, template) {
    this.dict = {one: '49%', two: '38%', three: '71%', four: '17%'}
    this.pass = false
    this.imgLoaded = 0
    var pageDom = template.cloneNode(true)
    pageDom.classList.add(layoutCode)
    this.self = pageDom
    var ele = this.self
    this.input = document.getElementById(projectCode)
    //  console.log(codeStr)
    /*this.input = '北京时间7月19日，2016年里约奥运会女子10米气步枪决赛落下帷幕。'+
     '奥运会“四朝元老”杜丽以总成绩'*/
    this.output = ele.getElementsByClassName('output')[0]
    this.letters = ele.getElementsByClassName('keyboard')[0].getElementsByClassName('key')
    this.contain = document.getElementById('container')
    this.imgs = imgs
    this.codeScroll = ele.getElementsByClassName('codescroll')[0]
    //this.transpng = transPng?transPng:document.getElementsByClassName('sh2wl')[0].getElementsByTagName('img')
    this.codeRun = ele.getElementsByClassName('code')[0]
    console.log(this.codeRun)
    this.transpng = null
    this.codeHeight = this.dict[layoutCode]
    //this.next = nextObj ? nextObj : null
    this.next = null
    this.self.addEventListener('transitionend', function (e) {
        e.stopPropagation()
    })

}

Page.prototype.start = function () {

    var that = this
    var contain = this.contain
    that.show()
    if (that.next) {
        that.next.getReady()
    }


    this.codeScroll.addEventListener('transitionend', function (e) {
        console.log('codeRun........')
        that.codeRun.classList.add('codeRun')
    })
    this.contain.dispatchEvent(new Event('pagechange'))

    //this.self.classList.add('screenfloat')

    var typing = new Typing({
        source: that.input,
        output: that.output,
        delay: 60,
        done: function () {
            clearInterval(that.handle)
            console.log(that.imgLoaded)
            if (that.imgCount == that.imgLoaded) {
               // that.self.style.display = 'none'
                that.pageChange()
            } else {
                that.pass = true
            }


        } //完成打印后的回调事件
    });

    typing.start()
    codeScroll = this.codeScroll
    /* codeScroll.addEventListener('transitionend',function(e){
     e.stopPropagation()
     })*/


    setTimeout(function () {
        codeScroll.style.height = that.codeHeight
        console.log(that)
        that.handle = that.randomKey(that.letters)
        //console.log(that.handle)
    }, 70)
}

Page.prototype.clear = function () {
    this.self.style.display = 'none'
}

Page.prototype.show = function () {
    this.self.style.display = 'block'

}

Page.prototype.pageChange = function () {
    var pngs = this.transpng
    var i = 0
    var fps = 50
    var len = pngs.length
    var self = this.self
    var next = this.next
    var that = this


    if(next !== null){
        pngs[i].style.display = 'block'
        setTimeout(function transLoop() {
            i++
            if (i < len) {
                pngs[i - 1].style.display = 'none'
                pngs[i].style.display = 'block'
                console.log('trans')
                setTimeout(transLoop, fps)
            } else {
                pngs[i - 1].style.display = 'none'
                    self.style.display = 'none'
                    next.start()
            }
        }, fps)
    }else{
        that.ending()
    }


}

Page.prototype.randomKey = function (letters) {
    function toggleKey(key) {
        key.classList.add('key-down')
        setTimeout(function () {
            key.classList.remove('key-down')
        }, 300)
    }

    return setInterval(function () {
        toggleKey(letters[parseInt(Math.random() * 74, 10) + 1])
        toggleKey(letters[parseInt(Math.random() * 74, 10) + 1])
        toggleKey(letters[parseInt(Math.random() * 74, 10) + 1])

    }, 200)


}

Page.prototype.getReady = function () {
    var imgLoaded = this.imgLoaded
    var page = this

    function _countLoad() {
        // console.log(imgLoaded)
        //console.log(page)
        page.imgLoaded++
        if (page.imgLoaded == page.imgCount && page.pass === true) {
            page.pageChange()
        }

    }

    var pagedom = this.self
    var imgs = this.imgs
    var mainGif = new Image()
    mainGif.src = imgs.main
    mainGif.onload = _countLoad
    pagedom.getElementsByClassName('gif-frame')[0].appendChild(mainGif)
    var pageTrans = [],
        trans = imgs.trans
    len = trans.length
    transBox = document.getElementsByClassName('trans')[0]
    this.imgCount = len + 1
    for (var i = 0; i < len; i++) {
        var temp = new Image()
        temp.style.display = 'none'
        temp.src = trans[i]
        temp.onload = _countLoad
        pageTrans.push(temp)
        transBox.appendChild(temp)

    }
    console.log(pageTrans)
    this.transpng = pageTrans
    document.getElementById('container').appendChild(pagedom)


}

Page.prototype.ending = function () {
    var logo = document.getElementById('ending')
    var ending = document.getElementById('ending-glow')
    var self = this.self
    console.log(self)
    self.classList.remove('screenRotate')
    console.log(this.contain)
    this.contain.style.transform  = 'rotateY(90deg)'
    this.contain.addEventListener('transitionend',function(){
        ending.style.display = 'block'
        ending.classList.add('flash')
        this.style.display = 'none'
        logo.style.opacity = 10
    })
}

var template = document.getElementsByClassName('page')[0]

var shImgs = {
    main: 'imgs/SH.gif',
    trans: ['imgs/d/d1.png', 'imgs/d/d2.png', 'imgs/d/d3.png', 'imgs/d/d4.png', 'imgs/d/d5.png']
}
var wlImgs = {
    main: 'imgs/WL.gif',
    trans: ['imgs/c/c1.png', 'imgs/c/c2.png', 'imgs/c/c3.png', 'imgs/c/c4.png', 'imgs/c/c5.png']
}
var swImgs = {
    main: 'imgs/SW.gif',
    trans: ['imgs/b/b1.png', 'imgs/b/b2.png', 'imgs/b/b3.png', 'imgs/b/b4.png', 'imgs/b/b5.png']
}
var dpImgs = {
    main: 'imgs/DP.gif',
    trans: ['imgs/b/b1.png', 'imgs/b/b2.png', 'imgs/b/b3.png', 'imgs/b/b4.png', 'imgs/b/b5.png']
}
var gaImgs = {
    main: 'imgs/GA.gif',
    trans: ['imgs/d/d1.png', 'imgs/d/d2.png', 'imgs/d/d3.png', 'imgs/d/d4.png', 'imgs/d/d5.png']
}
var bdImgs = {
    main: 'imgs/BD.gif',
    trans: ['imgs/c/c1.png', 'imgs/c/c2.png', 'imgs/c/c3.png', 'imgs/c/c4.png', 'imgs/c/c5.png']
}
var ttImgs = {
    main: 'imgs/TT.gif',
    trans: ['imgs/b/b1.png', 'imgs/b/b2.png', 'imgs/b/b3.png', 'imgs/b/b4.png', 'imgs/b/b5.png']
}

var sh = new Page('one', 'SH', shImgs, template)
var wl = new Page('two', 'WL', wlImgs, template)
var sw = new Page('three', 'SW', swImgs, template)
var dp = new Page('four', 'DP', dpImgs, template)
var ga = new Page('one', 'GA', gaImgs, template)
var bd = new Page('two', 'BD', bdImgs, template)
var tt = new Page('three', 'TT', ttImgs, template)

sh.next = wl
wl.next = sw
sw.next = dp
dp.next = ga
ga.next = bd
bd.next = tt


function loader(page1) {
    var loader = document.getElementById('loadwrap')
    var wrap = document.getElementsByClassName('wrap')[0]
    var page1 = page1
    page1.getReady()
    window.onload = function () {
        setTimeout(function () {
            loader.style.display = 'none'
            wrap.style.display = 'block'
            page1.start()
        }, 400)

    }
}
loader(sh)


/*var sh2wl = document.getElementsByClassName('sh2wl')[0].getElementsByTagName('img')
 var wl2sw = document.getElementsByClassName('wl2sw')[0].getElementsByTagName('img')


 //var  sw = new Page(document.getElementsByClassName('sw')[0],'68%')

 var sh = new Page(document.getElementsByClassName('sh')[0],'49%',sh2wl)

 var wl = new Page(document.getElementsByClassName('wl')[0],'38%')

 sh.next = wl
 //wl.next = sw
 sh.start()
 lazyloader(sh)


 function lazyloader(page){
 var template = document.getElementsByClassName('wl')[0].cloneNode(true)
 template.classList.remove('wl')
 template.classList.add('sw')
 var sw = new Page(template,'68%')
 console.log(sw)
 var changeCount = 0
 var conatianer = page.contain
 conatianer.addEventListener('pagechange',function(){
 changeCount++
 if (changeCount%2 !== 0){
 conatianer.appendChild(template)
 page.next.next = sw
 }
 })
 }*/


/*function PageSwap(pagesObj){

 var  container = document.getElementsByClassName('container')[0],
 j = 1

 container.addEventListener('pagechange',function(e){
 console.log(e.target)
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
 // container.dispatchEvent(new Event('pagechange'))

 }

 var pages = new PageSwap(document.getElementsByClassName('page'))*/





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



