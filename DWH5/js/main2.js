/**
 * Created by licheng on 16/8/2.
 */


(function(){
    document.addEventListener('touchmove',function (e) {
        e.preventDefault()
    })
    document.addEventListener('touchstart',function (e) {
        e.preventDefault()
    })

    function Page(layoutCode, projectCode, imgs, template) {
        this.dict = {one: '49%', two: '38%', three: '71%', four: '17%'}
        this.pass = false
        this.imgLoaded = 0
        var pageDom = template.cloneNode(true)
        pageDom.classList.add(layoutCode)
        this.self = pageDom
        var ele = this.self
        this.input = document.getElementById(projectCode)
        this.output = ele.getElementsByClassName('output')[0]
        this.letters = ele.getElementsByClassName('keyboard')[0].getElementsByClassName('key')
        this.contain = document.getElementById('container')
        this.imgs = imgs
        this.codeScroll = ele.getElementsByClassName('codescroll')[0]
        this.codeRun = ele.getElementsByClassName('code')[0]
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
            that.codeRun.classList.add('codeRun')
        })
        this.contain.dispatchEvent(new Event('pagechange'))

        var typing = new Typing({
            source: that.input,
            output: that.output,
            delay: 60,
            done: function () {
                clearInterval(that.handle)
                setTimeout(function(){
                    if (that.imgCount == that.imgLoaded) {
                        that.pageChange()
                    } else {
                        that.pass = true
                    }
                },1200)
            } //打字结束调用callback
        });

        typing.start()
        codeScroll = this.codeScroll

        setTimeout(function () {
            codeScroll.style.height = that.codeHeight
            that.handle = that.randomKey(that.letters)
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
            self.style.display = 'none'
            pngs[i].style.display = 'block'
            setTimeout(function transLoop() {
                i++
                if (i < len) {
                    pngs[i - 1].style.display = 'none'
                    pngs[i].style.display = 'block'
                    setTimeout(transLoop, fps)
                } else {
                    pngs[i - 1].style.display = 'none'
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
        this.transpng = pageTrans
        document.getElementById('container').appendChild(pagedom)


    }


    Page.prototype.ending = function () {
        var logo = document.getElementById('ending')
        var ending = document.getElementById('ending-glow')
        var self = this.self
        self.classList.remove('screenRotate')
        /*  this.contain.style.transform  = 'rotateY(90deg)'
         this.contain.style.webkitTransform = 'rotateY(90deg)'*/
        this.contain.classList.add('endingRotate')
        this.contain.addEventListener('animationend',function(){
            ending.style.display = 'block'
            ending.classList.add('flash')
            this.style.display = 'none'
            logo.style.opacity = 1
        })
        this.contain.addEventListener('webkitAnimationEnd',function(){
            ending.style.display = 'block'
            ending.classList.add('flash')
            this.style.display = 'none'
            logo.style.opacity = 1
        })
    }



    var template = document.getElementsByClassName('page')[0]

    var shImgs = {
        main: 'http://mat1.gtimg.com/finance/cj/dw//SH.gif',
        trans: ['http://mat1.gtimg.com/finance/cj/dw/SH-1.png', 'http://mat1.gtimg.com/finance/cj/dw/SH-2.png', 'http://mat1.gtimg.com/finance/cj/dw/WL-2.png', 'http://mat1.gtimg.com/finance/cj/dw/WL-1.png']
    }
    var wlImgs = {
        main: 'http://mat1.gtimg.com/finance/cj/dw//WL.gif',
        trans: ['http://mat1.gtimg.com/finance/cj/dw/WL-1.png', 'http://mat1.gtimg.com/finance/cj/dw/WL-2.png', 'http://mat1.gtimg.com/finance/cj/dw/SW-2.png', 'http://mat1.gtimg.com/finance/cj/dw/SW-1.png']
    }

    var swImgs = {
        main: 'http://mat1.gtimg.com/finance/cj/dw/SW.gif',
        trans: ['http://mat1.gtimg.com/finance/cj/dw/SW-1.png', 'http://mat1.gtimg.com/finance/cj/dw/SW-2.png', 'http://mat1.gtimg.com/finance/cj/dw/GA-2.png', 'http://mat1.gtimg.com/finance/cj/dw/GA-1.png']
    }
    var dpImgs = {
        main: 'http://mat1.gtimg.com/finance/cj/dw//DP.gif',
        trans: ['http://mat1.gtimg.com/finance/cj/dw/DP-1.png']
    }
    var gaImgs = {
        main: 'http://mat1.gtimg.com/finance/cj/dw//GA.gif',
        trans: ['http://mat1.gtimg.com/finance/cj/dw/GA-1.png', 'http://mat1.gtimg.com/finance/cj/dw/GA-2.png', 'http://mat1.gtimg.com/finance/cj/dw/BD-2.png', 'http://mat1.gtimg.com/finance/cj/dw/BD-1.png']
    }
    var bdImgs = {
        main: 'http://mat1.gtimg.com/finance/cj/dw/BD.gif',
        trans: ['http://mat1.gtimg.com/finance/cj/dw/BD-1.png', 'http://mat1.gtimg.com/finance/cj/dw/BD-2.png', 'http://mat1.gtimg.com/finance/cj/dw/TT-2.png', 'http://mat1.gtimg.com/finance/cj/dw/TT-1.png']
    }
    var ttImgs = {
        main: 'http://mat1.gtimg.com/finance/cj/dw//TT.gif',
        trans: ['http://mat1.gtimg.com/finance/cj/dw/TT-1.png','http://mat1.gtimg.com/finance/cj/dw/TT-2.png', 'http://mat1.gtimg.com/finance/cj/dw/DP-2.png', 'http://mat1.gtimg.com/finance/cj/dw/DP-1.png']
    }

    var sh = new Page('one', 'SH', shImgs, template)
    var wl = new Page('two', 'WL', wlImgs, template)
    var sw = new Page('three', 'SW', swImgs, template)

    var ga = new Page('one', 'GA', gaImgs, template)
    var bd = new Page('two', 'BD', bdImgs, template)
    var tt = new Page('three', 'TT', ttImgs, template)
    var dp = new Page('one', 'DP', dpImgs, template)


    function Loader(pageArr,imgSrcArr){
        this.firstPage = null
        this.pageQueue = pageArr
        this.imgSrcArr = imgSrcArr
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
    }

    Loader.prototype.go = function(){
        var imglen = this.imgsCount
        var loadque = []
        var imgSrcArr = this.imgSrcArr
        var that = this

        for(j= 0 ; j < imglen ; j++){
            loadque[j] = new Image()
            loadque[j].src = imgSrcArr[j]
            function start() {
                console.log(that)
                that.firstPage.getReady()
                setTimeout(function () {
                    var first = that.firstPage
                    that.loader.style.display = 'none'
                    that.wrap.style.display = 'block'
                    first.contain.classList.add('showPage')
                    first.contain.style.transform ='rotateY(0deg)'
                    first.start()
                }, 3000)
            }
            loadque[j].onload = function(){
                that.loaded++
                if(that.loaded === that.imgsCount){
                    if(window.orientation){
                        if( window.orientation === 0 ||  window.orientation === 180){
                            start()
                        }
                        else{
                            /*do nothing*/
                        }
                    }else{
                        start()
                    }
                }
            }
        }
    }

    Loader.prototype.uaJudge = function (uaRegArr,redirectUrl) {
        var userAgent = navigator.userAgent.toLowerCase()
        var len = uaRegArr.length
        for(var i =0 ; i < len ; i++ ){
            if(uaRegArr[i].test(userAgent)){
                console.log(uaRegArr[i])
                return
            }
        }
        window.location.href = redirectUrl
    }



    var imgUrl = ['http://mat1.gtimg.com/finance/cj/dw/bottom-glow.png','http://mat1.gtimg.com/finance/cj/dw/bg-bottom.png','http://mat1.gtimg.com/finance/cj/dw/screen.png','http://mat1.gtimg.com/finance/cj/dw/gif-frame-wl.png',
        'http://mat1.gtimg.com/finance/cj/dw/bg.jpg',"http://mat1.gtimg.com/finance/cj/dw/gif-frame.png","http://mat1.gtimg.com/finance/cj/dw//SH.gif"]
    var myload = new Loader([sh,wl,sw,ga,bd,tt,dp],imgUrl)
    myload.uaJudge([/micromessenger/,/qqnews/i],'http://finance.qq.com/zt2016/Dreamwriter/redirect.htm')
    myload.go()

}())





/*  |xGv00|d3a98bbd2ce0f81c8288e67a2d990bb0 */