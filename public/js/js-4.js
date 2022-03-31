/*
 * jQuery FlexSlider v2.1
 * http://www.woothemes.com/flexslider/
 *
 * Copyright 2012 WooThemes
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Contributing author: Tyler Smith (@mbmufffin)
 */
(function(d){d.flexslider=function(j,l){var a=d(j),c=d.extend({},d.flexslider.defaults,l),e=c.namespace,q="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,u=q?"touchend":"click",m="vertical"===c.direction,n=c.reverse,h=0<c.itemWidth,s="fade"===c.animation,t=""!==c.asNavFor,f={};d.data(j,"flexslider",a);f={init:function(){a.animating=!1;a.currentSlide=c.startAt;a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=c.selector.substr(0,
    c.selector.search(" "));a.slides=d(c.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(c.sync).length;"slide"===c.animation&&(c.animation="swing");a.prop=m?"top":"marginLeft";a.args={};a.manualPause=!1;var b=a,g;if(g=!c.video)if(g=!s)if(g=c.useCSS)a:{g=document.createElement("div");var p=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in p)if(void 0!==g.style[p[e]]){a.pfx=p[e].replace("Perspective","").toLowerCase();
    a.prop="-"+a.pfx+"-transform";g=!0;break a}g=!1}b.transitions=g;""!==c.controlsContainer&&(a.controlsContainer=0<d(c.controlsContainer).length&&d(c.controlsContainer));""!==c.manualControls&&(a.manualControls=0<d(c.manualControls).length&&d(c.manualControls));c.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();t&&f.asNav.setup();a.setup("init");c.controlNav&&f.controlNav.setup();c.directionNav&&f.directionNav.setup();c.keyboard&&
    (1===d(a.containerSelector).length||c.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;if(!a.animating&&(39===b||37===b))b=39===b?a.getTarget("next"):37===b?a.getTarget("prev"):!1,a.flexAnimate(b,c.pauseOnAction)});c.mousewheel&&a.bind("mousewheel",function(b,g){b.preventDefault();var d=0>g?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(d,c.pauseOnAction)});c.pausePlay&&f.pausePlay.setup();c.slideshow&&(c.pauseOnHover&&a.hover(function(){!a.manualPlay&&!a.manualPause&&a.pause()},
    function(){!a.manualPause&&!a.manualPlay&&a.play()}),0<c.initDelay?setTimeout(a.play,c.initDelay):a.play());q&&c.touch&&f.touch();(!s||s&&c.smoothHeight)&&d(window).bind("resize focus",f.resize);setTimeout(function(){c.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");a.slides.click(function(b){b.preventDefault();b=d(this);var g=b.index();
    !d(c.asNavFor).data("flexslider").animating&&!b.hasClass("active")&&(a.direction=a.currentItem<g?"next":"prev",a.flexAnimate(g,c.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var b=1,g;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===c.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var p=0;p<a.pagingCount;p++)g="thumbnails"===c.controlNav?
    '<img src="'+a.slides.eq(p).attr("data-thumb")+'"/>':"<a>"+b+"</a>",a.controlNavScaffold.append("<li>"+g+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold);f.controlNav.set();f.controlNav.active();a.controlNavScaffold.delegate("a, img",u,function(b){b.preventDefault();b=d(this);var g=a.controlNav.index(b);b.hasClass(e+"active")||(a.direction=g>a.currentSlide?"next":"prev",a.flexAnimate(g,c.pauseOnAction))});q&&a.controlNavScaffold.delegate("a",
    "click touchstart",function(a){a.preventDefault()})},setupManual:function(){a.controlNav=a.manualControls;f.controlNav.active();a.controlNav.live(u,function(b){b.preventDefault();b=d(this);var g=a.controlNav.index(b);b.hasClass(e+"active")||(g>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(g,c.pauseOnAction))});q&&a.controlNav.live("click touchstart",function(a){a.preventDefault()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===c.controlNav?"img":"a"),
    a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,c){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(c).closest("li").remove();f.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(c,b):f.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+
    e+'direction-nav"><li><a class="'+e+'prev" href="#">'+c.prevText+'</a></li><li><a class="'+e+'next" href="#">'+c.nextText+"</a></li></ul>");a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));f.directionNav.update();a.directionNav.bind(u,function(b){b.preventDefault();b=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,c.pauseOnAction)});
    q&&a.directionNav.bind("click touchstart",function(a){a.preventDefault()})},update:function(){var b=e+"disabled";1===a.pagingCount?a.directionNav.addClass(b):c.animationLoop?a.directionNav.removeClass(b):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b):a.directionNav.removeClass(b)}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
    (a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));f.pausePlay.update(c.slideshow?e+"pause":e+"play");a.pausePlay.bind(u,function(b){b.preventDefault();d(this).hasClass(e+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play())});q&&a.pausePlay.bind("click touchstart",function(a){a.preventDefault()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+"pause").addClass(e+
    "play").text(c.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").text(c.pauseText)}},touch:function(){function b(b){k=m?d-b.touches[0].pageY:d-b.touches[0].pageX;q=m?Math.abs(k)<Math.abs(b.touches[0].pageX-e):Math.abs(k)<Math.abs(b.touches[0].pageY-e);if(!q||500<Number(new Date)-l)b.preventDefault(),!s&&a.transitions&&(c.animationLoop||(k/=0===a.currentSlide&&0>k||a.currentSlide===a.last&&0<k?Math.abs(k)/r+2:1),a.setProps(f+k,"setTouch"))}function g(){j.removeEventListener("touchmove",
    b,!1);if(a.animatingTo===a.currentSlide&&!q&&null!==k){var h=n?-k:k,m=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(m)&&(550>Number(new Date)-l&&50<Math.abs(h)||Math.abs(h)>r/2)?a.flexAnimate(m,c.pauseOnAction):s||a.flexAnimate(a.currentSlide,c.pauseOnAction,!0)}j.removeEventListener("touchend",g,!1);f=k=e=d=null}var d,e,f,r,k,l,q=!1;j.addEventListener("touchstart",function(k){a.animating?k.preventDefault():1===k.touches.length&&(a.pause(),r=m?a.h:a.w,l=Number(new Date),f=h&&n&&a.animatingTo===
    a.last?0:h&&n?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+c.itemMargin)*a.move*a.currentSlide:n?(a.last-a.currentSlide+a.cloneOffset)*r:(a.currentSlide+a.cloneOffset)*r,d=m?k.touches[0].pageY:k.touches[0].pageX,e=m?k.touches[0].pageX:k.touches[0].pageY,j.addEventListener("touchmove",b,!1),j.addEventListener("touchend",g,!1))},!1)},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),s?f.smoothHeight():h?(a.slides.width(a.computedW),
    a.update(a.pagingCount),a.setProps()):m?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(c.smoothHeight&&f.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!m||s){var c=s?a:a.viewport;b?c.animate({height:a.slides.eq(a.animatingTo).height()},b):c.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var g=d(c.sync).data("flexslider"),e=a.animatingTo;switch(b){case "animate":g.flexAnimate(e,c.pauseOnAction,!1,!0);break;case "play":!g.playing&&
    !g.asNav&&g.play();break;case "pause":g.pause()}}};a.flexAnimate=function(b,g,p,j,l){t&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,l)||p)&&a.is(":visible")){if(t&&j)if(p=d(c.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,p.flexAnimate(b,!0,!1,!0,l),a.direction=a.currentItem<b?"next":"prev",p.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+
    "active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;c.before(a);g&&a.pause();a.syncExists&&!l&&f.sync("animate");c.controlNav&&f.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;c.directionNav&&f.directionNav.update();b===a.last&&(c.end(a),c.animationLoop||a.pause());if(s)q?(a.slides.eq(a.currentSlide).css({opacity:0,
    zIndex:1}),a.slides.eq(b).css({opacity:1,zIndex:2}),a.slides.unbind("webkitTransitionEnd transitionend"),a.slides.eq(a.currentSlide).bind("webkitTransitionEnd transitionend",function(){c.after(a)}),a.animating=!1,a.currentSlide=a.animatingTo):(a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed,c.easing),a.slides.eq(b).fadeIn(c.animationSpeed,c.easing,a.wrapup));else{var r=m?a.slides.filter(":first").height():a.computedW;h?(b=c.itemWidth>a.w?2*c.itemMargin:c.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,
    b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&c.animationLoop&&"next"!==a.direction?n?(a.count+a.cloneOffset)*r:0:a.currentSlide===a.last&&0===b&&c.animationLoop&&"prev"!==a.direction?n?0:(a.count+1)*r:n?(a.count-1-b+a.cloneOffset)*r:(b+a.cloneOffset)*r;a.setProps(b,"",c.animationSpeed);if(a.transitions){if(!c.animationLoop||!a.atEnd)a.animating=!1,a.currentSlide=a.animatingTo;a.container.unbind("webkitTransitionEnd transitionend");a.container.bind("webkitTransitionEnd transitionend",
    function(){a.wrapup(r)})}else a.container.animate(a.args,c.animationSpeed,c.easing,function(){a.wrapup(r)})}c.smoothHeight&&f.smoothHeight(c.animationSpeed)}};a.wrapup=function(b){!s&&!h&&(0===a.currentSlide&&a.animatingTo===a.last&&c.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===a.last&&(0===a.animatingTo&&c.animationLoop)&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;c.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=
    function(){clearInterval(a.animatedSlides);a.playing=!1;c.pausePlay&&f.pausePlay.update("play");a.syncExists&&f.sync("pause")};a.play=function(){a.animatedSlides=setInterval(a.animateSlides,c.slideshowSpeed);a.playing=!0;c.pausePlay&&f.pausePlay.update("pause");a.syncExists&&f.sync("play")};a.canAdvance=function(b,g){var d=t?a.pagingCount-1:a.last;return g?!0:t&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:t&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b===a.currentSlide&&
    !t?!1:c.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===d&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===d&&0===b&&"next"===a.direction?!1:!0};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1};a.setProps=function(b,g,d){var e,f=b?b:(a.itemW+c.itemMargin)*a.move*a.animatingTo;e=-1*function(){if(h)return"setTouch"===g?b:n&&a.animatingTo===a.last?0:n?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:a.animatingTo===
    a.last?a.limit:f;switch(g){case "setTotal":return n?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return n?b:a.count*b;case "jumpStart":return n?a.count*b:b;default:return b}}()+"px";a.transitions&&(e=m?"translate3d(0,"+e+",0)":"translate3d("+e+",0,0)",d=void 0!==d?d/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",d));a.args[a.prop]=e;(a.transitions||void 0===d)&&a.container.css(a.args)};a.setup=function(b){if(s)a.slides.css({width:"100%",
    "float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&(q?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+c.animationSpeed/1E3+"s ease",zIndex:1}).eq(a.currentSlide).css({opacity:1,zIndex:2}):a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed,c.easing)),c.smoothHeight&&f.smoothHeight();else{var g,p;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=
    0,n&&(p=d.makeArray(a.slides).reverse(),a.slides=d(p),a.container.empty().append(a.slides)));c.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));a.newSlides=d(c.selector,a);g=n?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;m&&!h?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),
    setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(g*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(g*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,"float":"left",display:"block"});c.smoothHeight&&f.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+"active-slide")};a.doMath=function(){var b=a.slides.first(),
    d=c.itemMargin,e=c.minItems,f=c.maxItems;a.w=a.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=c.itemWidth+d,a.minW=e?e*a.itemT:a.w,a.maxW=f?f*a.itemT:a.w,a.itemW=a.minW>a.w?(a.w-d*e)/e:a.maxW<a.w?(a.w-d*f)/f:c.itemWidth>a.w?a.w:c.itemWidth,a.visible=Math.floor(a.w/(a.itemW+d)),a.move=0<c.move&&c.move<a.visible?c.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:c.itemWidth>a.w?(a.itemW+2*d)*a.count-a.w-
    d:(a.itemW+d)*a.count-a.w-d):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(c.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)f.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),
    f.controlNav.update("remove",a.last);c.directionNav&&f.directionNav.update()};a.addSlide=function(b,e){var f=d(b);a.count+=1;a.last=a.count-1;m&&n?void 0!==e?a.slides.eq(a.count-e).after(f):a.container.prepend(f):void 0!==e?a.slides.eq(e).before(f):a.container.append(f);a.update(e,"add");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.added(a)};a.removeSlide=function(b){var e=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,a.slides).remove():m&&n?a.slides.eq(a.last).remove():
    a.slides.eq(b).remove();a.doMath();a.update(e,"remove");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.removed(a)};f.init()};d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",
    keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};d.fn.flexslider=function(j){void 0===j&&(j={});if("object"===typeof j)return this.each(function(){var a=d(this),c=a.find(j.selector?j.selector:".slides > li");1===c.length?(c.fadeIn(400),
    j.start&&j.start(a)):void 0==a.data("flexslider")&&new d.flexslider(this,j)});var l=d(this).data("flexslider");switch(j){case "play":l.play();break;case "pause":l.pause();break;case "next":l.flexAnimate(l.getTarget("next"),!0);break;case "prev":case "previous":l.flexAnimate(l.getTarget("prev"),!0);break;default:"number"===typeof j&&l.flexAnimate(j,!0)}}})(jQuery);;
    /*!
     * jCarousel - Riding carousels with jQuery
     *   http://sorgalla.com/jcarousel/
     *
     * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
     * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
     * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
     *
     * Built on top of the jQuery library
     *   http://jquery.com
     *
     * Inspired by the "Carousel Component" by Bill Scott
     *   http://billwscott.com/carousel/
     */
    
    (function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click", buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical? this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip= this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext= g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}); !this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display", "block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast= this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt, "0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this, c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0}, get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible): null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1): this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)), c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g): this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<= this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."); this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&& !this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)}; this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped= !1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&& this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext), this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev), c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState= a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst, this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!== null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")}, dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments, 1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);
    ;
    /*
     * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
     *
     * Uses the built in easing capabilities added In jQuery 1.1
     * to offer multiple easing options
     *
     * TERMS OF USE - jQuery Easing
     * 
     * Open source under the BSD License. 
     * 
     * Copyright A‚Â© 2008 George McGinley Smith
     * All rights reserved.
     * 
     * Redistribution and use in source and binary forms, with or without modification, 
     * are permitted provided that the following conditions are met:
     * 
     * Redistributions of source code must retain the above copyright notice, this list of 
     * conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright notice, this list 
     * of conditions and the following disclaimer in the documentation and/or other materials 
     * provided with the distribution.
     * 
     * Neither the name of the author nor the names of contributors may be used to endorse 
     * or promote products derived from this software without specific prior written permission.
     * 
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
     *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
     * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
     * OF THE POSSIBILITY OF SUCH DAMAGE. 
     *
    */
    
    // t: current time, b: begInnIng value, c: change In value, d: duration
    jQuery.easing['jswing'] = jQuery.easing['swing'];
    
    jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    });
    
    /*
     *
     * TERMS OF USE - EASING EQUATIONS
     * 
     * Open source under the BSD License. 
     * 
     * Copyright A‚Â© 2001 Robert Penner
     * All rights reserved.
     * 
     * Redistribution and use in source and binary forms, with or without modification, 
     * are permitted provided that the following conditions are met:
     * 
     * Redistributions of source code must retain the above copyright notice, this list of 
     * conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright notice, this list 
     * of conditions and the following disclaimer in the documentation and/or other materials 
     * provided with the distribution.
     * 
     * Neither the name of the author nor the names of contributors may be used to endorse 
     * or promote products derived from this software without specific prior written permission.
     * 
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
     * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
     *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
     * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
     * OF THE POSSIBILITY OF SUCH DAMAGE. 
     *
     */;
    // tipsy, facebook style tooltips for jquery
    // version 1.0.0a
    // (c) 2008-2010 jason frame [jason@onehackoranother.com]
    // released under the MIT license
    
    (function($) {
        
        function maybeCall(thing, ctx) {
            return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
        };
        
        function isElementInDOM(ele) {
          while (ele = ele.parentNode) {
            if (ele == document) return true;
          }
          return false;
        };
        
        function Tipsy(element, options) {
            this.$element = $(element);
            this.options = options;
            this.enabled = true;
            this.fixTitle();
        };
        
        Tipsy.prototype = {
            show: function() {
                var title = this.getTitle();
                if (title && this.enabled) {
                    var $tip = this.tip();
                    
                    $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                    $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                    $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);
                    
                    var pos = $.extend({}, this.$element.offset(), {
                        width: this.$element[0].offsetWidth,
                        height: this.$element[0].offsetHeight
                    });
                    
                    var actualWidth = $tip[0].offsetWidth,
                        actualHeight = $tip[0].offsetHeight,
                        gravity = maybeCall(this.options.gravity, this.$element[0]);
                    
                    var tp;
                    switch (gravity.charAt(0)) {
                        case 'n':
                            tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                            break;
                        case 's':
                            tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                            break;
                        case 'e':
                            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                            break;
                        case 'w':
                            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                            break;
                    }
                    
                    if (gravity.length == 2) {
                        if (gravity.charAt(1) == 'w') {
                            tp.left = pos.left + pos.width / 2 - 15;
                        } else {
                            tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                        }
                    }
                    
                    $tip.css(tp).addClass('tipsy-' + gravity);
                    $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                    if (this.options.className) {
                        $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                    }
                    
                    if (this.options.fade) {
                        $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                    } else {
                        $tip.css({visibility: 'visible', opacity: this.options.opacity});
                    }
                }
            },
            
            hide: function() {
                if (this.options.fade) {
                    this.tip().stop().fadeOut(function() { $(this).remove(); });
                } else {
                    this.tip().remove();
                }
            },
            
            fixTitle: function() {
                var $e = this.$element;
                if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                    $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
                }
            },
            
            getTitle: function() {
                var title, $e = this.$element, o = this.options;
                this.fixTitle();
                var title, o = this.options;
                if (typeof o.title == 'string') {
                    title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
                } else if (typeof o.title == 'function') {
                    title = o.title.call($e[0]);
                }
                title = ('' + title).replace(/(^\s*|\s*$)/, "");
                return title || o.fallback;
            },
            
            tip: function() {
                if (!this.$tip) {
                    this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
                    this.$tip.data('tipsy-pointee', this.$element[0]);
                }
                return this.$tip;
            },
            
            validate: function() {
                if (!this.$element[0].parentNode) {
                    this.hide();
                    this.$element = null;
                    this.options = null;
                }
            },
            
            enable: function() { this.enabled = true; },
            disable: function() { this.enabled = false; },
            toggleEnabled: function() { this.enabled = !this.enabled; }
        };
        
        $.fn.tipsy = function(options) {
            
            if (options === true) {
                return this.data('tipsy');
            } else if (typeof options == 'string') {
                var tipsy = this.data('tipsy');
                if (tipsy) tipsy[options]();
                return this;
            }
            
            options = $.extend({}, $.fn.tipsy.defaults, options);
            
            function get(ele) {
                var tipsy = $.data(ele, 'tipsy');
                if (!tipsy) {
                    tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                    $.data(ele, 'tipsy', tipsy);
                }
                return tipsy;
            }
            
            function enter() {
                var tipsy = get(this);
                tipsy.hoverState = 'in';
                if (options.delayIn == 0) {
                    tipsy.show();
                } else {
                    tipsy.fixTitle();
                    setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
                }
            };
            
            function leave() {
                var tipsy = get(this);
                tipsy.hoverState = 'out';
                if (options.delayOut == 0) {
                    tipsy.hide();
                } else {
                    setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, options.delayOut);
                }
            };
            
            if (!options.live) this.each(function() { get(this); });
            
            if (options.trigger != 'manual') {
                var binder   = options.live ? 'live' : 'bind',
                    eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                    eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
                this[binder](eventIn, enter)[binder](eventOut, leave);
            }
            
            return this;
            
        };
        
        $.fn.tipsy.defaults = {
            className: null,
            delayIn: 0,
            delayOut: 0,
            fade: false,
            fallback: '',
            gravity: 'n',
            html: false,
            live: false,
            offset: 0,
            opacity: 0.8,
            title: 'title',
            trigger: 'hover'
        };
        
        $.fn.tipsy.revalidate = function() {
          $('.tipsy').each(function() {
            var pointee = $.data(this, 'tipsy-pointee');
            if (!pointee || !isElementInDOM(pointee)) {
              $(this).remove();
            }
          });
        };
        
        // Overwrite this method to provide options on a per-element basis.
        // For example, you could store the gravity in a 'tipsy-gravity' attribute:
        // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
        // (remember - do not modify 'options' in place!)
        $.fn.tipsy.elementOptions = function(ele, options) {
            return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
        };
        
        $.fn.tipsy.autoNS = function() {
            return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
        };
        
        $.fn.tipsy.autoWE = function() {
            return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
        };
        
        /**
         * yields a closure of the supplied parameters, producing a function that takes
         * no arguments and is suitable for use as an autogravity function like so:
         *
         * @param margin (int) - distance from the viewable region edge that an
         *        element should be before setting its tooltip's gravity to be away
         *        from that edge.
         * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
         *        if there are no viewable region edges effecting the tooltip's
         *        gravity. It will try to vary from this minimally, for example,
         *        if 'sw' is preferred and an element is near the right viewable 
         *        region edge, but not the top edge, it will set the gravity for
         *        that element's tooltip to be 'se', preserving the southern
         *        component.
         */
         $.fn.tipsy.autoBounds = function(margin, prefer) {
            return function() {
                var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
                    boundTop = $(document).scrollTop() + margin,
                    boundLeft = $(document).scrollLeft() + margin,
                    $this = $(this);
    
                if ($this.offset().top < boundTop) dir.ns = 'n';
                if ($this.offset().left < boundLeft) dir.ew = 'w';
                if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
                if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';
    
                return dir.ns + (dir.ew ? dir.ew : '');
            }
        };
        
    })(jQuery);;
    /* ------------------------------------------------------------------------
        Class: prettyPhoto
        Use: Lightbox clone for jQuery
        Author: Stephane Caron (http://www.no-margin-for-errors.com)
        Version: 3.1.5
    ------------------------------------------------------------------------- */
    (function($) {
        $.prettyPhoto = {version: '3.1.5'};
        
        $.fn.prettyPhoto = function(pp_settings) {
            pp_settings = jQuery.extend({
                hook: 'rel', /* the attribute tag to use for prettyPhoto hooks. default: 'rel'. For HTML5, use "data-rel" or similar. */
                animation_speed: 'fast', /* fast/slow/normal */
                ajaxcallback: function() {},
                slideshow: 5000, /* false OR interval time in ms */
                autoplay_slideshow: false, /* true/false */
                opacity: 0.80, /* Value between 0 and 1 */
                show_title: true, /* true/false */
                allow_resize: true, /* Resize the photos bigger than viewport. true/false */
                allow_expand: true, /* Allow the user to expand a resized image. true/false */
                default_width: 500,
                default_height: 344,
                counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
                theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
                horizontal_padding: 20, /* The padding on each side of the picture */
                hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
                wmode: 'opaque', /* Set the flash wmode attribute */
                autoplay: true, /* Automatically start videos: True/False */
                modal: false, /* If set to true, only the close button will close the window */
                deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
                overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
                overlay_gallery_max: 30, /* Maximum number of pictures in the overlay gallery */
                keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
                changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
                callback: function(){}, /* Called when prettyPhoto is closed */
                ie6_fallback: true,
                markup: '<div class="pp_pic_holder"> \
                            <div class="ppt">&nbsp;</div> \
                            <div class="pp_top"> \
                                <div class="pp_left"></div> \
                                <div class="pp_middle"></div> \
                                <div class="pp_right"></div> \
                            </div> \
                            <div class="pp_content_container"> \
                                <div class="pp_left"> \
                                <div class="pp_right"> \
                                    <div class="pp_content"> \
                                        <div class="pp_loaderIcon"></div> \
                                        <div class="pp_fade"> \
                                            <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                                            <div class="pp_hoverContainer"> \
                                                <a class="pp_next" href="#">next</a> \
                                                <a class="pp_previous" href="#">previous</a> \
                                            </div> \
                                            <div id="pp_full_res"></div> \
                                            <div class="pp_details"> \
                                                <div class="pp_nav"> \
                                                    <a href="#" class="pp_arrow_previous">Previous</a> \
                                                    <p class="currentTextHolder">0/0</p> \
                                                    <a href="#" class="pp_arrow_next">Next</a> \
                                                </div> \
                                                <p class="pp_description"></p> \
                                                <div class="pp_social">{pp_social}</div> \
                                                <a class="pp_close" href="#">Close</a> \
                                            </div> \
                                        </div> \
                                    </div> \
                                </div> \
                                </div> \
                            </div> \
                            <div class="pp_bottom"> \
                                <div class="pp_left"></div> \
                                <div class="pp_middle"></div> \
                                <div class="pp_right"></div> \
                            </div> \
                        </div> \
                        <div class="pp_overlay"></div>',
                gallery_markup: '<div class="pp_gallery"> \
                                    <a href="#" class="pp_arrow_previous">Previous</a> \
                                    <div> \
                                        <ul> \
                                            {gallery} \
                                        </ul> \
                                    </div> \
                                    <a href="#" class="pp_arrow_next">Next</a> \
                                </div>',
                image_markup: '<img id="fullResImage" src="{path}" />',
                flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
                quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
                iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
                inline_markup: '<div class="pp_inline">{content}</div>',
                custom_markup: '',
                social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>' /* html or false to disable */
            }, pp_settings);
            
            // Global variables accessible only by prettyPhoto
            var matchedObjects = this, percentBased = false, pp_dimensions, pp_open,
            
            // prettyPhoto container specific
            pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containerWidth,
            
            // Window size
            windowHeight = $(window).height(), windowWidth = $(window).width(),
    
            // Global elements
            pp_slideshow;
            
            doresize = true, scroll_pos = _get_scroll();
        
            // Window/Keyboard events
            $(window).unbind('resize.prettyphoto').bind('resize.prettyphoto',function(){ _center_overlay(); _resize_overlay(); });
            
            if(pp_settings.keyboard_shortcuts) {
                $(document).unbind('keydown.prettyphoto').bind('keydown.prettyphoto',function(e){
                    if(typeof $pp_pic_holder != 'undefined'){
                        if($pp_pic_holder.is(':visible')){
                            switch(e.keyCode){
                                case 37:
                                    $.prettyPhoto.changePage('previous');
                                    e.preventDefault();
                                    break;
                                case 39:
                                    $.prettyPhoto.changePage('next');
                                    e.preventDefault();
                                    break;
                                case 27:
                                    if(!settings.modal)
                                    $.prettyPhoto.close();
                                    e.preventDefault();
                                    break;
                            };
                            // return false;
                        };
                    };
                });
            };
            
            /**
            * Initialize prettyPhoto.
            */
            $.prettyPhoto.initialize = function() {
                
                settings = pp_settings;
                
                if(settings.theme == 'pp_default') settings.horizontal_padding = 16;
                
                // Find out if the picture is part of a set
                theRel = $(this).attr(settings.hook);
                galleryRegExp = /\[(?:.*)\]/;
                isSet = (galleryRegExp.exec(theRel)) ? true : false;
                
                // Put the SRCs, TITLEs, ALTs into an array.
                pp_images = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).attr('href'); }) : $.makeArray($(this).attr('href'));
                pp_titles = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).find('img').attr('alt')) ? $(n).find('img').attr('alt') : ""; }) : $.makeArray($(this).find('img').attr('alt'));
                pp_descriptions = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).attr('title')) ? $(n).attr('title') : ""; }) : $.makeArray($(this).attr('title'));
                
                if(pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false;
                
                set_position = jQuery.inArray($(this).attr('href'), pp_images); // Define where in the array the clicked item is positionned
                rel_index = (isSet) ? set_position : $("a["+settings.hook+"^='"+theRel+"']").index($(this));
                
                _build_overlay(this); // Build the overlay {this} being the caller
                
                if(settings.allow_resize)
                    $(window).bind('scroll.prettyphoto',function(){ _center_overlay(); });
                
                
                $.prettyPhoto.open();
                
                return false;
            }
    
    
            /**
            * Opens the prettyPhoto modal box.
            * @param image {String,Array} Full path to the image to be open, can also be an array containing full images paths.
            * @param title {String,Array} The title to be displayed with the picture, can also be an array containing all the titles.
            * @param description {String,Array} The description to be displayed with the picture, can also be an array containing all the descriptions.
            */
            $.prettyPhoto.open = function(event) {
                if(typeof settings == "undefined"){ // Means it's an API call, need to manually get the settings and set the variables
                    settings = pp_settings;
                    pp_images = $.makeArray(arguments[0]);
                    pp_titles = (arguments[1]) ? $.makeArray(arguments[1]) : $.makeArray("");
                    pp_descriptions = (arguments[2]) ? $.makeArray(arguments[2]) : $.makeArray("");
                    isSet = (pp_images.length > 1) ? true : false;
                    set_position = (arguments[3])? arguments[3]: 0;
                    _build_overlay(event.target); // Build the overlay {this} being the caller
                }
                
                if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','hidden'); // Hide the flash
    
                _checkPosition($(pp_images).size()); // Hide the next/previous links if on first or last images.
            
                $('.pp_loaderIcon').show();
            
                if(settings.deeplinking)
                    setHashtag();
            
                // Rebuild Facebook Like Button with updated href
                if(settings.social_tools){
                    facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 
                    $pp_pic_holder.find('.pp_social').html(facebook_like_link);
                }
                
                // Fade the content in
                if($ppt.is(':hidden')) $ppt.css('opacity',0).show();
                $pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);
    
                // Display the current position
                $pp_pic_holder.find('.currentTextHolder').text((set_position+1) + settings.counter_separator_label + $(pp_images).size());
    
                // Set the description
                if(typeof pp_descriptions[set_position] != 'undefined' && pp_descriptions[set_position] != ""){
                    $pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));
                }else{
                    $pp_pic_holder.find('.pp_description').hide();
                }
                
                // Get the dimensions
                movie_width = ( parseFloat(getParam('width',pp_images[set_position])) ) ? getParam('width',pp_images[set_position]) : settings.default_width.toString();
                movie_height = ( parseFloat(getParam('height',pp_images[set_position])) ) ? getParam('height',pp_images[set_position]) : settings.default_height.toString();
                
                // If the size is % based, calculate according to window dimensions
                percentBased=false;
                if(movie_height.indexOf('%') != -1) { movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150); percentBased = true; }
                if(movie_width.indexOf('%') != -1) { movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150); percentBased = true; }
                
                // Fade the holder
                $pp_pic_holder.fadeIn(function(){
                    // Set the title
                    (settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');
                    
                    imgPreloader = "";
                    skipInjection = false;
                    
                    // Inject the proper content
                    switch(_getFileType(pp_images[set_position])){
                        case 'image':
                            imgPreloader = new Image();
    
                            // Preload the neighbour images
                            nextImage = new Image();
                            if(isSet && set_position < $(pp_images).size() -1) nextImage.src = pp_images[set_position + 1];
                            prevImage = new Image();
                            if(isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];
    
                            $pp_pic_holder.find('#pp_full_res')[0].innerHTML = settings.image_markup.replace(/{path}/g,pp_images[set_position]);
    
                            imgPreloader.onload = function(){
                                // Fit item to viewport
                                pp_dimensions = _fitToViewport(imgPreloader.width,imgPreloader.height);
    
                                _showContent();
                            };
    
                            imgPreloader.onerror = function(){
                                alert('Image cannot be loaded. Make sure the path is correct and image exist.');
                                $.prettyPhoto.close();
                            };
                        
                            imgPreloader.src = pp_images[set_position];
                        break;
                    
                        case 'youtube':
                            pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
                            
                            // Regular youtube link
                            movie_id = getParam('v',pp_images[set_position]);
                            
                            // youtu.be link
                            if(movie_id == ""){
                                movie_id = pp_images[set_position].split('youtu.be/');
                                movie_id = movie_id[1];
                                if(movie_id.indexOf('?') > 0)
                                    movie_id = movie_id.substr(0,movie_id.indexOf('?')); // Strip anything after the ?
    
                                if(movie_id.indexOf('&') > 0)
                                    movie_id = movie_id.substr(0,movie_id.indexOf('&')); // Strip anything after the &
                            }
    
                            movie = 'http://www.youtube.com/embed/'+movie_id;
                            (getParam('rel',pp_images[set_position])) ? movie+="?rel="+getParam('rel',pp_images[set_position]) : movie+="?rel=1";
                                
                            if(settings.autoplay) movie += "&autoplay=1";
                        
                            toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);
                        break;
                    
                        case 'vimeo':
                            pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
                        
                            movie_id = pp_images[set_position];
                            var regExp = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
                            var match = movie_id.match(regExp);
                            
                            movie = 'http://player.vimeo.com/video/'+ match[3] +'?title=0&amp;byline=0&amp;portrait=0';
                            if(settings.autoplay) movie += "&autoplay=1;";
                    
                            vimeo_width = pp_dimensions['width'] + '/embed/?moog_width='+ pp_dimensions['width'];
                    
                            toInject = settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,movie);
                        break;
                    
                        case 'quicktime':
                            pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
                            pp_dimensions['height']+=15; pp_dimensions['contentHeight']+=15; pp_dimensions['containerHeight']+=15; // Add space for the control bar
                    
                            toInject = settings.quicktime_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);
                        break;
                    
                        case 'flash':
                            pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
                        
                            flash_vars = pp_images[set_position];
                            flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10,pp_images[set_position].length);
    
                            filename = pp_images[set_position];
                            filename = filename.substring(0,filename.indexOf('?'));
                        
                            toInject =  settings.flash_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+'?'+flash_vars);
                        break;
                    
                        case 'iframe':
                            pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
                    
                            frame_url = pp_images[set_position];
                            frame_url = frame_url.substr(0,frame_url.indexOf('iframe')-1);
    
                            toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,frame_url);
                        break;
                        
                        case 'ajax':
                            doresize = false; // Make sure the dimensions are not resized.
                            pp_dimensions = _fitToViewport(movie_width,movie_height);
                            doresize = true; // Reset the dimensions
                        
                            skipInjection = true;
                            $.get(pp_images[set_position],function(responseHTML){
                                toInject = settings.inline_markup.replace(/{content}/g,responseHTML);
                                $pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
                                _showContent();
                            });
                            
                        break;
                        
                        case 'custom':
                            pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
                        
                            toInject = settings.custom_markup;
                        break;
                    
                        case 'inline':
                            // to get the item height clone it, apply default width, wrap it in the prettyPhoto containers , then delete
                            myClone = $(pp_images[set_position]).clone().append('<br clear="all" />').css({'width':settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();
                            doresize = false; // Make sure the dimensions are not resized.
                            pp_dimensions = _fitToViewport($(myClone).width(),$(myClone).height());
                            doresize = true; // Reset the dimensions
                            $(myClone).remove();
                            toInject = settings.inline_markup.replace(/{content}/g,$(pp_images[set_position]).html());
                        break;
                    };
    
                    if(!imgPreloader && !skipInjection){
                        $pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
                    
                        // Show content
                        _showContent();
                    };
                });
    
                return false;
            };
    
        
            /**
            * Change page in the prettyPhoto modal box
            * @param direction {String} Direction of the paging, previous or next.
            */
            $.prettyPhoto.changePage = function(direction){
                currentGalleryPage = 0;
                
                if(direction == 'previous') {
                    set_position--;
                    if (set_position < 0) set_position = $(pp_images).size()-1;
                }else if(direction == 'next'){
                    set_position++;
                    if(set_position > $(pp_images).size()-1) set_position = 0;
                }else{
                    set_position=direction;
                };
                
                rel_index = set_position;
    
                if(!doresize) doresize = true; // Allow the resizing of the images
                if(settings.allow_expand) {
                    $('.pp_contract').removeClass('pp_contract').addClass('pp_expand');
                }
    
                _hideContent(function(){ $.prettyPhoto.open(); });
            };
    
    
            /**
            * Change gallery page in the prettyPhoto modal box
            * @param direction {String} Direction of the paging, previous or next.
            */
            $.prettyPhoto.changeGalleryPage = function(direction){
                if(direction=='next'){
                    currentGalleryPage ++;
    
                    if(currentGalleryPage > totalPage) currentGalleryPage = 0;
                }else if(direction=='previous'){
                    currentGalleryPage --;
    
                    if(currentGalleryPage < 0) currentGalleryPage = totalPage;
                }else{
                    currentGalleryPage = direction;
                };
                
                slide_speed = (direction == 'next' || direction == 'previous') ? settings.animation_speed : 0;
    
                slide_to = currentGalleryPage * (itemsPerPage * itemWidth);
    
                $pp_gallery.find('ul').animate({left:-slide_to},slide_speed);
            };
    
    
            /**
            * Start the slideshow...
            */
            $.prettyPhoto.startSlideshow = function(){
                if(typeof pp_slideshow == 'undefined'){
                    $pp_pic_holder.find('.pp_play').unbind('click').removeClass('pp_play').addClass('pp_pause').click(function(){
                        $.prettyPhoto.stopSlideshow();
                        return false;
                    });
                    pp_slideshow = setInterval($.prettyPhoto.startSlideshow,settings.slideshow);
                }else{
                    $.prettyPhoto.changePage('next');	
                };
            }
    
    
            /**
            * Stop the slideshow...
            */
            $.prettyPhoto.stopSlideshow = function(){
                $pp_pic_holder.find('.pp_pause').unbind('click').removeClass('pp_pause').addClass('pp_play').click(function(){
                    $.prettyPhoto.startSlideshow();
                    return false;
                });
                clearInterval(pp_slideshow);
                pp_slideshow=undefined;
            }
    
    
            /**
            * Closes prettyPhoto.
            */
            $.prettyPhoto.close = function(){
                if($pp_overlay.is(":animated")) return;
                
                $.prettyPhoto.stopSlideshow();
                
                $pp_pic_holder.stop().find('object,embed').css('visibility','hidden');
                
                $('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animation_speed,function(){ $(this).remove(); });
                
                $pp_overlay.fadeOut(settings.animation_speed, function(){
                    
                    if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','visible'); // Show the flash
                    
                    $(this).remove(); // No more need for the prettyPhoto markup
                    
                    $(window).unbind('scroll.prettyphoto');
                    
                    clearHashtag();
                    
                    settings.callback();
                    
                    doresize = true;
                    
                    pp_open = false;
                    
                    delete settings;
                });
            };
        
            /**
            * Set the proper sizes on the containers and animate the content in.
            */
            function _showContent(){
                $('.pp_loaderIcon').hide();
    
                // Calculate the opened top position of the pic holder
                projectedTop = scroll_pos['scrollTop'] + ((windowHeight/2) - (pp_dimensions['containerHeight']/2));
                if(projectedTop < 0) projectedTop = 0;
    
                $ppt.fadeTo(settings.animation_speed,1);
    
                // Resize the content holder
                $pp_pic_holder.find('.pp_content')
                    .animate({
                        height:pp_dimensions['contentHeight'],
                        width:pp_dimensions['contentWidth']
                    },settings.animation_speed);
                
                // Resize picture the holder
                $pp_pic_holder.animate({
                    'top': projectedTop,
                    'left': ((windowWidth/2) - (pp_dimensions['containerWidth']/2) < 0) ? 0 : (windowWidth/2) - (pp_dimensions['containerWidth']/2),
                    width:pp_dimensions['containerWidth']
                },settings.animation_speed,function(){
                    $pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(pp_dimensions['height']).width(pp_dimensions['width']);
    
                    $pp_pic_holder.find('.pp_fade').fadeIn(settings.animation_speed); // Fade the new content
    
                    // Show the nav
                    if(isSet && _getFileType(pp_images[set_position])=="image") { $pp_pic_holder.find('.pp_hoverContainer').show(); }else{ $pp_pic_holder.find('.pp_hoverContainer').hide(); }
                
                    if(settings.allow_expand) {
                        if(pp_dimensions['resized']){ // Fade the resizing link if the image is resized
                            $('a.pp_expand,a.pp_contract').show();
                        }else{
                            $('a.pp_expand').hide();
                        }
                    }
                    
                    if(settings.autoplay_slideshow && !pp_slideshow && !pp_open) $.prettyPhoto.startSlideshow();
                    
                    settings.changepicturecallback(); // Callback!
                    
                    pp_open = true;
                });
                
                _insert_gallery();
                pp_settings.ajaxcallback();
            };
            
            /**
            * Hide the content...DUH!
            */
            function _hideContent(callback){
                // Fade out the current picture
                $pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility','hidden');
                $pp_pic_holder.find('.pp_fade').fadeOut(settings.animation_speed,function(){
                    $('.pp_loaderIcon').show();
                    
                    callback();
                });
            };
        
            /**
            * Check the item position in the gallery array, hide or show the navigation links
            * @param setCount {integer} The total number of items in the set
            */
            function _checkPosition(setCount){
                (setCount > 1) ? $('.pp_nav').show() : $('.pp_nav').hide(); // Hide the bottom nav if it's not a set.
            };
        
            /**
            * Resize the item dimensions if it's bigger than the viewport
            * @param width {integer} Width of the item to be opened
            * @param height {integer} Height of the item to be opened
            * @return An array containin the "fitted" dimensions
            */
            function _fitToViewport(width,height){
                resized = false;
    
                _getDimensions(width,height);
                
                // Define them in case there's no resize needed
                imageWidth = width, imageHeight = height;
    
                if( ((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allow_resize && !percentBased) {
                    resized = true, fitting = false;
                
                    while (!fitting){
                        if((pp_containerWidth > windowWidth)){
                            imageWidth = (windowWidth - 200);
                            imageHeight = (height/width) * imageWidth;
                        }else if((pp_containerHeight > windowHeight)){
                            imageHeight = (windowHeight - 200);
                            imageWidth = (width/height) * imageHeight;
                        }else{
                            fitting = true;
                        };
    
                        pp_containerHeight = imageHeight, pp_containerWidth = imageWidth;
                    };
                
    
                    
                    if((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)){
                        _fitToViewport(pp_containerWidth,pp_containerHeight)
                    };
                    
                    _getDimensions(imageWidth,imageHeight);
                };
                
                return {
                    width:Math.floor(imageWidth),
                    height:Math.floor(imageHeight),
                    containerHeight:Math.floor(pp_containerHeight),
                    containerWidth:Math.floor(pp_containerWidth) + (settings.horizontal_padding * 2),
                    contentHeight:Math.floor(pp_contentHeight),
                    contentWidth:Math.floor(pp_contentWidth),
                    resized:resized
                };
            };
            
            /**
            * Get the containers dimensions according to the item size
            * @param width {integer} Width of the item to be opened
            * @param height {integer} Height of the item to be opened
            */
            function _getDimensions(width,height){
                width = parseFloat(width);
                height = parseFloat(height);
                
                // Get the details height, to do so, I need to clone it since it's invisible
                $pp_details = $pp_pic_holder.find('.pp_details');
                $pp_details.width(width);
                detailsHeight = parseFloat($pp_details.css('marginTop')) + parseFloat($pp_details.css('marginBottom'));
                
                $pp_details = $pp_details.clone().addClass(settings.theme).width(width).appendTo($('body')).css({
                    'position':'absolute',
                    'top':-10000
                });
                detailsHeight += $pp_details.height();
                detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight; // Min-height for the details
                $pp_details.remove();
                
                // Get the titles height, to do so, I need to clone it since it's invisible
                $pp_title = $pp_pic_holder.find('.ppt');
                $pp_title.width(width);
                titleHeight = parseFloat($pp_title.css('marginTop')) + parseFloat($pp_title.css('marginBottom'));
                $pp_title = $pp_title.clone().appendTo($('body')).css({
                    'position':'absolute',
                    'top':-10000
                });
                titleHeight += $pp_title.height();
                $pp_title.remove();
                
                // Get the container size, to resize the holder to the right dimensions
                pp_contentHeight = height + detailsHeight;
                pp_contentWidth = width;
                pp_containerHeight = pp_contentHeight + titleHeight + $pp_pic_holder.find('.pp_top').height() + $pp_pic_holder.find('.pp_bottom').height();
                pp_containerWidth = width;
            }
        
            function _getFileType(itemSrc){
                if (itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i)) {
                    return 'youtube';
                }else if (itemSrc.match(/vimeo\.com/i)) {
                    return 'vimeo';
                }else if(itemSrc.match(/\b.mov\b/i)){ 
                    return 'quicktime';
                }else if(itemSrc.match(/\b.swf\b/i)){
                    return 'flash';
                }else if(itemSrc.match(/\biframe=true\b/i)){
                    return 'iframe';
                }else if(itemSrc.match(/\bajax=true\b/i)){
                    return 'ajax';
                }else if(itemSrc.match(/\bcustom=true\b/i)){
                    return 'custom';
                }else if(itemSrc.substr(0,1) == '#'){
                    return 'inline';
                }else{
                    return 'image';
                };
            };
        
            function _center_overlay(){
                if(doresize && typeof $pp_pic_holder != 'undefined') {
                    scroll_pos = _get_scroll();
                    contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();
    
                    projectedTop = (windowHeight/2) + scroll_pos['scrollTop'] - (contentHeight/2);
                    if(projectedTop < 0) projectedTop = 0;
                    
                    if(contentHeight > windowHeight)
                        return;
    
                    $pp_pic_holder.css({
                        'top': projectedTop,
                        'left': (windowWidth/2) + scroll_pos['scrollLeft'] - (contentwidth/2)
                    });
                };
            };
        
            function _get_scroll(){
                if (self.pageYOffset) {
                    return {scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset};
                } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
                    return {scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft};
                } else if (document.body) {// all other Explorers
                    return {scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft};
                };
            };
        
            function _resize_overlay() {
                windowHeight = $(window).height(), windowWidth = $(window).width();
                
                if(typeof $pp_overlay != "undefined") $pp_overlay.height($(document).height()).width(windowWidth);
            };
        
            function _insert_gallery(){
                if(isSet && settings.overlay_gallery && _getFileType(pp_images[set_position])=="image") {
                    itemWidth = 52+5; // 52 beign the thumb width, 5 being the right margin.
                    navWidth = (settings.theme == "facebook" || settings.theme == "pp_default") ? 50 : 30; // Define the arrow width depending on the theme
                    
                    itemsPerPage = Math.floor((pp_dimensions['containerWidth'] - 100 - navWidth) / itemWidth);
                    itemsPerPage = (itemsPerPage < pp_images.length) ? itemsPerPage : pp_images.length;
                    totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;
    
                    // Hide the nav in the case there's no need for links
                    if(totalPage == 0){
                        navWidth = 0; // No nav means no width!
                        $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide();
                    }else{
                        $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show();
                    };
    
                    galleryWidth = itemsPerPage * itemWidth;
                    fullGalleryWidth = pp_images.length * itemWidth;
                    
                    // Set the proper width to the gallery items
                    $pp_gallery
                        .css('margin-left',-((galleryWidth/2) + (navWidth/2)))
                        .find('div:first').width(galleryWidth+5)
                        .find('ul').width(fullGalleryWidth)
                        .find('li.selected').removeClass('selected');
                    
                    goToPage = (Math.floor(set_position/itemsPerPage) < totalPage) ? Math.floor(set_position/itemsPerPage) : totalPage;
    
                    $.prettyPhoto.changeGalleryPage(goToPage);
                    
                    $pp_gallery_li.filter(':eq('+set_position+')').addClass('selected');
                }else{
                    $pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');
                    // $pp_gallery.hide();
                }
            }
        
            function _build_overlay(caller){
                // Inject Social Tool markup into General markup
                if(settings.social_tools)
                    facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 
    
                settings.markup = settings.markup.replace('{pp_social}',''); 
                
                $('body').append(settings.markup); // Inject the markup
                
                $pp_pic_holder = $('.pp_pic_holder') , $ppt = $('.ppt'), $pp_overlay = $('div.pp_overlay'); // Set my global selectors
                
                // Inject the inline gallery!
                if(isSet && settings.overlay_gallery) {
                    currentGalleryPage = 0;
                    toInject = "";
                    for (var i=0; i < pp_images.length; i++) {
                        if(!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)){
                            classname = 'default';
                            img_src = '';
                        }else{
                            classname = '';
                            img_src = pp_images[i];
                        }
                        toInject += "<li class='"+classname+"'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
                    };
                    
                    toInject = settings.gallery_markup.replace(/{gallery}/g,toInject);
                    
                    $pp_pic_holder.find('#pp_full_res').after(toInject);
                    
                    $pp_gallery = $('.pp_pic_holder .pp_gallery'), $pp_gallery_li = $pp_gallery.find('li'); // Set the gallery selectors
                    
                    $pp_gallery.find('.pp_arrow_next').click(function(){
                        $.prettyPhoto.changeGalleryPage('next');
                        $.prettyPhoto.stopSlideshow();
                        return false;
                    });
                    
                    $pp_gallery.find('.pp_arrow_previous').click(function(){
                        $.prettyPhoto.changeGalleryPage('previous');
                        $.prettyPhoto.stopSlideshow();
                        return false;
                    });
                    
                    $pp_pic_holder.find('.pp_content').hover(
                        function(){
                            $pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();
                        },
                        function(){
                            $pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();
                        });
    
                    itemWidth = 52+5; // 52 beign the thumb width, 5 being the right margin.
                    $pp_gallery_li.each(function(i){
                        $(this)
                            .find('a')
                            .click(function(){
                                $.prettyPhoto.changePage(i);
                                $.prettyPhoto.stopSlideshow();
                                return false;
                            });
                    });
                };
                
                
                // Inject the play/pause if it's a slideshow
                if(settings.slideshow){
                    $pp_pic_holder.find('.pp_nav').prepend('<a href="#" class="pp_play">Play</a>')
                    $pp_pic_holder.find('.pp_nav .pp_play').click(function(){
                        $.prettyPhoto.startSlideshow();
                        return false;
                    });
                }
                
                $pp_pic_holder.attr('class','pp_pic_holder ' + settings.theme); // Set the proper theme
                
                $pp_overlay
                    .css({
                        'opacity':0,
                        'height':$(document).height(),
                        'width':$(window).width()
                        })
                    .bind('click',function(){
                        if(!settings.modal) $.prettyPhoto.close();
                    });
    
                $('a.pp_close').bind('click',function(){ $.prettyPhoto.close(); return false; });
    
    
                if(settings.allow_expand) {
                    $('a.pp_expand').bind('click',function(e){
                        // Expand the image
                        if($(this).hasClass('pp_expand')){
                            $(this).removeClass('pp_expand').addClass('pp_contract');
                            doresize = false;
                        }else{
                            $(this).removeClass('pp_contract').addClass('pp_expand');
                            doresize = true;
                        };
                    
                        _hideContent(function(){ $.prettyPhoto.open(); });
                
                        return false;
                    });
                }
            
                $pp_pic_holder.find('.pp_previous, .pp_nav .pp_arrow_previous').bind('click',function(){
                    $.prettyPhoto.changePage('previous');
                    $.prettyPhoto.stopSlideshow();
                    return false;
                });
            
                $pp_pic_holder.find('.pp_next, .pp_nav .pp_arrow_next').bind('click',function(){
                    $.prettyPhoto.changePage('next');
                    $.prettyPhoto.stopSlideshow();
                    return false;
                });
                
                _center_overlay(); // Center it
            };
    
            if(!pp_alreadyInitialized && getHashtag()){
                pp_alreadyInitialized = true;
                
                // Grab the rel index to trigger the click on the correct element
                hashIndex = getHashtag();
                hashRel = hashIndex;
                hashIndex = hashIndex.substring(hashIndex.indexOf('/')+1,hashIndex.length-1);
                hashRel = hashRel.substring(0,hashRel.indexOf('/'));
    
                // Little timeout to make sure all the prettyPhoto initialize scripts has been run.
                // Useful in the event the page contain several init scripts.
                setTimeout(function(){ $("a["+pp_settings.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger('click'); },50);
            }
            
            return this.unbind('click.prettyphoto').bind('click.prettyphoto',$.prettyPhoto.initialize); // Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
        };
        
        function getHashtag(){
            var url = location.href;
            hashtag = (url.indexOf('#prettyPhoto') !== -1) ? decodeURI(url.substring(url.indexOf('#prettyPhoto')+1,url.length)) : false;
    
            return hashtag;
        };
        
        function setHashtag(){
            if(typeof theRel == 'undefined') return; // theRel is set on normal calls, it's impossible to deeplink using the API
            location.hash = theRel + '/'+rel_index+'/';
        };
        
        function clearHashtag(){
            if ( location.href.indexOf('#prettyPhoto') !== -1 ) location.hash = "prettyPhoto";
        }
        
        function getParam(name,url){
          name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
          var regexS = "[\\?&]"+name+"=([^&#]*)";
          var regex = new RegExp( regexS );
          var results = regex.exec( url );
          return ( results == null ) ? "" : results[1];
        }
        
    })(jQuery);
    
    var pp_alreadyInitialized = false; // Used for the deep linking to make sure not to call the same function several times.
    ;
    (function(a){function f(a){document.location.href=a}function g(){return a(".mnav").length?!0:!1}function h(b){var c=!0;b.each(function(){if(!a(this).is("ul")&&!a(this).is("ol")){c=!1;}});return c}function i(){return a(window).width()<b.switchWidth}function j(b){return a.trim(b.clone().children("ul, ol").remove().end().text())}function k(b){return a.inArray(b,e)===-1?!0:!1}function l(b){b.find(" > li").each(function(){var c=a(this),d=c.find("a").attr("href"),f=function(){return c.parent().parent().is("li")?c.parent().parent().find("a").attr("href"):null};c.find(" ul, ol").length&&l(c.find("> ul, > ol"));c.find(" > ul li, > ol li").length||c.find("ul, ol").remove();!k(f(),e)&&k(d,e)?c.appendTo(b.closest("ul#mmnav").find("li:has(a[href="+f()+"]):first ul")):k(d)?e.push(d):c.remove()})}function m(){var b=a('<ul id="mmnav" />');c.each(function(){a(this).children().clone().appendTo(b)});l(b);return b}function n(b,c,d){d?a('<option value="'+b.find("a:first").attr("href")+'">'+d+"</option>").appendTo(c):a('<option value="'+b.find("a:first").attr("href")+'">'+a.trim(j(b))+"</option>").appendTo(c)}function o(c,d){var e=a('<optgroup label="'+a.trim(j(c))+'" />');n(c,e,b.groupPageText);c.children("ul, ol").each(function(){a(this).children("li").each(function(){n(a(this),e)})});e.appendTo(d)}function p(c){var e=a('<select id="mm'+d+'" class="mnav" />');d++;b.topOptionText&&n(a("<li>"+b.topOptionText+"</li>"),e);c.children("li").each(function(){var c=a(this);c.children("ul, ol").length&&b.nested?o(c,e):n(c,e)});e.change(function(){f(a(this).val())}).prependTo(b.prependTo)}function q(){if(i()&&!g())if(b.combine){var d=m();p(d)}else c.each(function(){p(a(this))});if(i()&&g()){a(".mnav").show();c.hide()}if(!i()&&g()){a(".mnav").hide();c.show()}}var b={combine:!0,groupPageText:"Main",nested:!0,prependTo:"body",switchWidth:480,topOptionText:"Select a page"},c,d=0,e=[];a.fn.mobileMenu=function(d){d&&a.extend(b,d);if(h(a(this))){c=a(this);q();a(window).resize(function(){q()})}else alert("mobileMenu only works with <ul>/<ol>")}})(jQuery);;
    /*
      @file
      Defines the simple modal behavior
    */
    (function ($) {
      Drupal.behaviors.event_popup = {
        attach: function(context, settings) {
          
            if ($("#event-popup-container").length == 0) {
            // Add a container to the end of the body tag to hold the dialog
            $('body').append('<div id="event-popup-container" style="display:none;"></div>');
            try {
              // Attempt to invoke the simple dialog
              $( "#event-popup-container").dialog({
                autoOpen: false,
                modal: true,
                close: function(event, ui) {
                  // Clear the dialog on close. Not necessary for your average use
                  // case, butis useful if you had a video that was playing in the
                  // dialog so that it clears when it closes
                  $('#event-popup-container').html('');
                }
              });
              var defaultOptions = Drupal.event_popup.explodeOptions(settings.event_popup.defaults);
              $('#event-popup-container').dialog('option', defaultOptions);
            }
            catch (err) {
              // Catch any errors and report
              Drupal.event_popup.log('[error] Event Dialog: ' + err);
            }
            }
            // Add support for custom classes if necessary
          var classes = '';
          if (settings.event_popup.classes) {
            classes = ', .' + settings.event_popup.classes;
          }
            $('a.event-popup' + classes, context).each(function(event) {
            if (!event.metaKey && !$(this).hasClass('simpleEventProcessed')) {
              // Add a class to show that this link has been processed already
              $(this).addClass('simpleEventProcessed');
              $(this).click(function(event) {
                // prevent the navigation
                event.preventDefault();
                // Set up some variables
                var url = $(this).attr('href');
                var title = $(this).attr('title');
                // Use defaults if not provided
                var selector = $(this).attr('name') ? 'event-calendar' : 'event_calendar';
                
                var options =  Drupal.event_popup.explodeOptions('width:auto;height:auto;position:[300,140]');
               
                if (url && title && selector) {
                  // Set the custom options of the dialog
                  $('#event-popup-container').dialog('option', options);
                  
                  // Set the title of the dialog
                  $('#event-popup-container').dialog('option', 'title', title);
                  
                  // Add a little loader into the dialog while data is loaded
                  $('#event-popup-container').html('<div class="event-popup-ajax-loader"></div>');
                  
                  // Change the height if it's set to auto
                  if (options.height && options.height == 'auto') {
                    $('#event-popup-container').dialog('option', 'height', 200);
                  }
                 
                  // Use jQuery .get() to request the target page
                  $.get(url, function(data) {
                    // Re-apply the height if it's auto to accomodate the new content
                    if (options.height && options.height == 'auto') {
                         
                      $('#event-popup-container').dialog('option', 'height', options.height);
                      
                    }
                    // Some trickery to make sure any inline javascript gets run.
                    // Inline javascript gets removed/moved around when passed into
                    // $() so you have to create a fake div and add the raw data into
                    // it then find what you need and clone it. Fun.
                    $('#event-popup-container').html( $( '<div></div>' ).html( data ).find( ':regex(class, .*'+selector+'.*)' ).not('.field').clone() );
                    
                    // Attach any behaviors to the loaded content
                    //Drupal.attachBehaviors($('#event-popup-container'));
                    
                  });
                  // Open the dialog
                  $('#event-popup-container').dialog('open');
                  // Return false for good measure
                  return false;
                }
              });
            }
          });
            var op = Drupal.settings.event_popup.op;
          if(op) {
            $('table.full tr td, table.mini tr td', context).click(function () {
            //$('.fc-sun', context).click(function () {
                  var node_type = Drupal.settings.event_popup.content_type;
            node_type = node_type.replace('_', '-');
            var url = Drupal.settings.basePath + 'node/add/' +  node_type;
            var title =  'Create Event';
            // Use defaults if not provided
            var selector = Drupal.settings.event_popup.selector;
            //var options =  Drupal.event_popup.explodeOptions(settings.event_popup.defaults);
            var options =  Drupal.event_popup.explodeOptions('width:auto;height:auto;position:[300,140]');
            if (url && title && selector) {
                    var event_date = $(this).attr('data-date');
                    /* var event_date_sep = event_date.split('-');
                    var year = event_date_sep[0];
                    var month = event_date_sep[1];
                    var day = event_date_sep[2]; */
                      // Set the custom options of the dialog
              $('#event-popup-container').dialog('option', options);
              // Set the title of the dialog
              $('#event-popup-container').dialog('option', 'title', title);
              // Add a little loader into the dialog while data is loaded
              $('#event-popup-container').html('<div class="event-popup-ajax-loader"></div>');
              // Change the height if it's set to auto
              if (options.height && options.height == 'auto') {
                $('#event-popup-container').dialog('option', 'height', 200);
              }
              // Use jQuery .get() to request the target page
                    
                    $.get(url, {'date':event_date}, function(data) {
                        
                         // Re-apply the height if it's auto to accomodate the new content
                    if (options.height && options.height == 'auto') {
                      $('#event-popup-container').dialog('option', 'height', options.height);
                    }
                    // Some trickery to make sure any inline javascript gets run.
                    // Inline javascript gets removed/moved around when passed into
                    // $() so you have to create a fake div and add the raw data into
                    // it then find what you need and clone it. Fun.
                    $('#event-popup-container').html( $( '<div></div>' ).html( data ).find( '#' + selector ).clone() );
                    // Attach any behaviors to the loaded content
                    //Drupal.attachBehaviors($('#event-popup-container'));	 
                    });
                     // Open the dialog
                  $('#event-popup-container').dialog('open');
                  // Return false for good measure
                  return false;
                }
          });
          }
        }
              
      };
    
    
    // Create a namespace for our simple dialog module
      Drupal.event_popup = {};
    
      // Convert the options to an object
      Drupal.event_popup.explodeOptions = function (opts) {
        var options = opts.split(';');
        var explodedOptions = {};
        for (var i in options) {
          if (options[i]) {
            // Parse and Clean the option
            var option = Drupal.event_popup.cleanOption(options[i].split(':'));
            explodedOptions[option[0]] = option[1];
          }
        }
        return explodedOptions;
      }
    
      // Function to clean up the option.
      Drupal.event_popup.cleanOption = function(option) {
        // If it's a position option, we may need to parse an array
        if (option[0] == 'position' && option[1].match(/\[.*,.*\]/)) {
          option[1] = option[1].match(/\[(.*)\]/)[1].split(',');
          // Check if positions need be converted to int
          if (!isNaN(parseInt(option[1][0]))) {
            option[1][0] = parseInt(option[1][0]);
          }
          if (!isNaN(parseInt(option[1][1]))) {
            option[1][1] = parseInt(option[1][1]);
          }
        }
        // Convert text boolean representation to boolean
        if (option[1] === 'true') {
          option[1]= true;
        }
        else if (option[1] === 'false') {
          option[1] = false;
        }
        return option;
      }
    
      Drupal.event_popup.log = function(msg) {
        if (window.console) {
          window.console.log(msg);
        }
    
      }
      
    })(jQuery);
    ;
    /*
      @file
      Defines the simple modal behavior
    */
    (function ($) {
      Drupal.behaviors.validates = {
        attach: function(context, settings) {
          var nodeType = Drupal.settings.event_popup.content_type;
          nodeType = nodeType.replace('_', '-');
          var formId = '#' + nodeType + '-node-form #edit-submit';
          $( formId ).click(function () {
          if ($("#display_error").length == 0) {
          $('#event-calendar-node-form').prepend('<div class="messages error" id = "display_error"><h2 class="element-invisible">Error message</h2><ul id="cl"  style="margin-left: 51px;"></ul></div>');
               }
              var eventTitle = $( '#edit-title'), 
              startDate = $( '#edit-event-calendar-date-und-0-value-datepicker-popup-0' ),
              endDate = $( '#edit-event-calendar-date-und-0-value2-datepicker-popup-0' ), 
              showEndDate = $( '#edit-event-calendar-date-und-0-show-todate'),
              allFields = $( [] ).add( eventTitle ).add( startDate ).add( endDate ),
              tips = $( '#cl' );
              var bValid = true;
              allFields.removeClass( "ui-state-error" );
              bValid = bValid && checkLength( eventTitle, "Event title", 1 );
                      bValid = bValid && checkStartDateLength( startDate, "Date", 1 );
                      if(showEndDate.attr('checked')) { 
                        bValid = bValid && checkEndDateLength( endDate, "Date", 1 );
                bValid = bValid && DateCompare( startDate, endDate );
              }
                if(!bValid) {
                  return false;
                }
    
          function updateTips( t ) {
              tips
            .html( '<li>' + t + '</li>' )
            .addClass( "ui-state-highlight" );
            setTimeout(function() {
              tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
          }
          function checkLength( o, n, min ) {
            if ( o.val().length < 1 ) {
              o.addClass( "ui-state-error" );
              updateTips( "Please enter event title");
                return false;
            } else {
              return true;
            }
          }
    
         function checkStartDateLength( o, n, min ) {
            if ( o.val().length < 1 ) {
              o.addClass( "ui-state-error" );
              updateTips( "Please enter start date");
                return false;
            } else {
              return true;
            }
          }
          
         function checkEndDateLength( o, n, min ) {
            if ( o.val().length < 1 ) {
              o.addClass( "ui-state-error" );
              updateTips( "Please enter end date");
                return false;
            } else {
              return true;
            }
          }
         
         function DateCompare(startDate, endDate) {
            var str1 = startDate.val();
            var str2 = endDate.val();
            if (str1.trim() != '' && str2.trim() != '') {
              var yr1 = parseInt(str1.substring(6, 10), 10);
              var dt1 = parseInt(str1.substring(3, 5), 10);
              var mon1 = parseInt(str1.substring(0, 2), 10);
              var yr2 = parseInt(str2.substring(6, 10), 10);
              var dt2 = parseInt(str2.substring(3, 5), 10);
              var mon2 = parseInt(str2.substring(0, 2), 10);
              var startDate1 = new Date(yr1, mon1, dt1);
              var endDate1 = new Date(yr2, mon2, dt2);
              if (startDate1 > endDate1) {
                startDate.addClass( "ui-state-error" );
                endDate.addClass( "ui-state-error" );
                updateTips( "Please enter valid date");
                return false;
            }
          }
            return true;
          }
          });
        }
      };
    
    })(jQuery);
    ;
    Toucan
    Over 100 word limit
    We’re working to increase this limit and keep load times short. In the meantime, try highlighting up to 100 words at one time to translate.
    Don’t show again