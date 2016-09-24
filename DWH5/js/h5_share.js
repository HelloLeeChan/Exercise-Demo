/**
 * Created by licheng on 16/8/21.
 */




var UA = function(){
    var userAgent = navigator.userAgent.toLowerCase();
    return {
        ipad: /ipad/.test(userAgent),
        iphone: /iphone/.test(userAgent),
        android: /android/.test(userAgent),
        qqnews: /qqnews/.test(userAgent),
        weixin: /micromessenger/.test(userAgent),
        qqnews_version: userAgent.match(/qqnews/i) == "qqnews" ? userAgent.split('qqnews/')[1] : ''
    };
};
function compareVersions(v1, comparator, v2) {
    comparator = comparator == '=' ? '==' : comparator;
    var v1parts = v1.split('.'), v2parts = v2.split('.');
    var maxLen = Math.max(v1parts.length, v2parts.length);
    var part1, part2;
    var cmp = 0;
    for(var i = 0; i < maxLen && !cmp; i++) {
        part1 = parseInt(v1parts[i], 10) || 0;
        part2 = parseInt(v2parts[i], 10) || 0;
        if(part1 < part2)
            cmp = 1;
        if(part1 > part2)
            cmp = -1;
    }
    return eval('0' + comparator + cmp);
}
function shareQQNews() {
    var ua = UA();
    switch(true){
        case ua.qqnews:
            if(window.TencentNews && window.TencentNews.setShareArticleInfo){
                window.TencentNews.setShareArticleInfo(shareData.title, shareData.desc, shareData.desc, shareData.link, shareData.img);
            }
            if(window.TencentNews && window.TencentNews.showShareMenu) {
                window.TencentNews.showShareMenu(shareData.link, shareData.title, shareData.desc, shareData.img,"news_news_wc");
            }else{
                window.TencentNews.shareFromWebView(shareData.title, shareData.desc, shareData.img);
            }
            break;
        case ua.weixin:
            var weixinLayout=document.querySelector(".weixin_layout");
            weixinLayout.style.display="block";
            weixinLayout.addEventListener("click",function(){
                weixinLayout.style.display="none";
            });
            break;
        default:
            window.location = "http://share.v.t.qq.com/index.php?c=share&a=index&appkey=801378464&url="
                + shareData.link + "&title="
                + shareData.desc +"&pic="
                + shareData.img + "&des="
                + shareData.title;
            break;
    };
}

function onBridgeReady() {
    //转发朋友圈
    WeixinJSBridge.on("menu:share:timeline", function(e) {
        var data = {
            img_width: "120",
            img_height: "120",
            img_url: shareData.img,
            link: shareData.link,   //desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
            desc: shareData.title,
            title: shareData.desc
        };
        WeixinJSBridge.invoke("shareTimeline", data, function(res) {
            WeixinJSBridge.log(res.err_msg)
        });
    });
    //同步到微博
    WeixinJSBridge.on("menu:share:weibo", function() {
        WeixinJSBridge.invoke("shareWeibo", {
            "content": shareData.desc,
            "url": shareData.link
        }, function(res) {
            WeixinJSBridge.log(res.err_msg);
        });
    });
    //分享给朋友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke("sendAppMessage", {
            img_width: "120",
            img_height: "120",
            img_url: shareData.img,
            link: shareData.link,
            desc: shareData.desc,
            title: shareData.title
        }, function(res) {
            WeixinJSBridge.log(res.err_msg)
        });
    });
};
//执行
document.addEventListener('WeixinJSBridgeReady', function() {
    onBridgeReady();
});

function androidQQNewsShare(){
    var head= document.getElementsByTagName('body')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= 'http://mat1.gtimg.com/www/js/newsapp/jsapi/news.js?_tsid=1';
    head.appendChild(script);
}
androidQQNewsShare();/*  |xGv00|ac9ff24be2196f930a96db2c16ed1a34 */