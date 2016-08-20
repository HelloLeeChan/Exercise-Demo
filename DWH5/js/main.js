/**
 * Created by licheng on 16/8/2.
 */
console.log(document.documentElement.clientHeight)
console.log(screen.width)


document.addEventListener('touchmove',function(e){
    e.preventDefault()
},false)


function Page(layoutCode, projectCode, imgs, template) {
    this.dict = {one: '49%', two: '38%', three: '71%', four: '18%'}
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
    //console.log(this.codeRun)
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

    var typing = new Typing({
        source: that.input,
        output: that.output,
        delay: 60,
        done: function () {
            setTimeout(function(){
                clearInterval(that.handle)
                console.log(that.imgLoaded)
                if (that.imgCount == that.imgLoaded) {
                    // that.self.style.display = 'none'
                    that.pageChange()
                } else {
                    that.pass = true
                }
            },2000)
        } //完成打印后的回调事件
    });

    typing.start()
    codeScroll = this.codeScroll


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
    this.contain.classList.remove('showPage')

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
        toggleKey(letters[parseInt(Math.random() * 74, 10)])
        toggleKey(letters[parseInt(Math.random() * 74, 10)])
        toggleKey(letters[parseInt(Math.random() * 74, 10)])

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
        logo.style.opacity = 1
    })
}

var template = document.getElementsByClassName('page')[0]

var shImgs = {
    main: 'http://mat1.gtimg.com/finance/cj/dw//SH.gif',
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
var dp = new Page('one', 'DP', dpImgs, template)
var ga = new Page('three', 'GA', gaImgs, template)
var bd = new Page('two', 'BD', bdImgs, template)
var tt = new Page('three', 'TT', ttImgs, template)




function Loader(pageArr,imgSrcArr){
    this.firstPage = null
    this.pageQueue = pageArr
    this.imgsCount = imgSrcArr.length
    this.loaded = 0
    this.loader = document.getElementById('loadwrap')
    this.wrap = document.getElementsByClassName('wrap')[0]

    var que = this.pageQueue

    if(que.length > 0 ){
        this.firstPage  = que.shift()
        var qlen = que.length
        var cur = this.firstPage
        while(qlen > 0){
            cur.next = que.shift()
            cur = cur.next
            qlen--
        }
    }
    var imglen = this.imgsCount
    var loadque = []
    var that = this

    for(j= 0 ; j < imglen ; j++){
         loadque[j] = new Image()
         loadque[j].src = imgSrcArr[j]
         loadque[j].onload = function(e){
             that.loaded++
             if(that.loaded === that.imgsCount){
                 if(window.orientation){
                     if( window.orientation === 0 ||  window.orientation === 180){
                         that.go()
                     }
                     else{
                         /*do nothing*/
                     }
                 }else{
                     that.go()
                 }

             }
         }
    }
}

Loader.prototype.go = function(){
    var that = this
    that.firstPage.getReady()
        setTimeout(function () {
            var first = that.firstPage
            //loader.style.display = 'none'
            that.loader.style.display = 'none'
            //wrap.style.display = 'block'
            that.wrap.style.display = 'block'
            first.contain.classList.add('showPage')
            //page1.contain.classList.add('showPage')
            first.contain.style.transform ='rotateY(0deg)'
            first.start()
        }, 3000)
    }

var imgUrl = ['http://mat1.gtimg.com/finance/cj/dw/bottom-glow.png','http://mat1.gtimg.com/finance/cj/dw/screen.png',
'http://mat1.gtimg.com/finance/cj/dw/bg.jpg',"http://mat1.gtimg.com/finance/cj/dw/gif-frame.png","http://mat1.gtimg.com/finance/cj/dw//SH.gif"]

var myload = new Loader([sh,wl,sw,dp,ga,bd,tt],imgUrl)







