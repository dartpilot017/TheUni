/* $Id: lightbox.js,v 1.5.2.6.2.136 2010/09/24 08:39:40 snpower Exp $ */

/**
 * jQuery Lightbox
 * @author
 *   Stella Power, <http://drupal.org/user/66894>
 *
 * Based on Lightbox v2.03.3 by Lokesh Dhakar
 * <http://www.huddletogether.com/projects/lightbox2/>
 * Also partially based on the jQuery Lightbox by Warren Krewenki
 *   <http://warren.mesozen.com>
 *
 * Permission has been granted to Mark Ashmead & other Drupal Lightbox2 module
 * maintainers to distribute this file via Drupal.org
 * Under GPL license.
 *
 * Slideshow, iframe and video functionality added by Stella Power.
 */

 var Lightbox;
 (function($) {
 Lightbox = {
   auto_modal : false,
   overlayOpacity : 0.8, // Controls transparency of shadow overlay.
   overlayColor : '000', // Controls colour of shadow overlay.
   disableCloseClick : true,
   // Controls the order of the lightbox resizing animation sequence.
   resizeSequence: 0, // 0: simultaneous, 1: width then height, 2: height then width.
   resizeSpeed: 'normal', // Controls the speed of the lightbox resizing animation.
   fadeInSpeed: 'normal', // Controls the speed of the image appearance.
   slideDownSpeed: 'slow', // Controls the speed of the image details appearance.
   minWidth: 240,
   borderSize : 10,
   boxColor : 'fff',
   fontColor : '000',
   topPosition : '',
   infoHeight: 20,
   alternative_layout : false,
   imageArray : [],
   imageNum : null,
   total : 0,
   activeImage : null,
   inprogress : false,
   disableResize : false,
   disableZoom : false,
   isZoomedIn : false,
   rtl : false,
   loopItems : false,
   keysClose : ['c', 'x', 27],
   keysPrevious : ['p', 37],
   keysNext : ['n', 39],
   keysZoom : ['z'],
   keysPlayPause : [32],
 
   // Slideshow options.
   slideInterval : 5000, // In milliseconds.
   showPlayPause : true,
   autoStart : true,
   autoExit : true,
   pauseOnNextClick : false, // True to pause the slideshow when the "Next" button is clicked.
   pauseOnPrevClick : true, // True to pause the slideshow when the "Prev" button is clicked.
   slideIdArray : [],
   slideIdCount : 0,
   isSlideshow : false,
   isPaused : false,
   loopSlides : false,
 
   // Iframe options.
   isLightframe : false,
   iframe_width : 600,
   iframe_height : 400,
   iframe_border : 1,
 
   // Video and modal options.
   enableVideo : false,
   flvPlayer : '/flvplayer.swf',
   flvFlashvars : '',
   isModal : false,
   isVideo : false,
   videoId : false,
   modalWidth : 400,
   modalHeight : 400,
   modalHTML : null,
 
 
   // initialize()
   // Constructor runs on completion of the DOM loading.
   // The function inserts html at the bottom of the page which is used
   // to display the shadow overlay and the image container.
   initialize: function() {
 
     var s = Drupal.settings.lightbox2;
     Lightbox.overlayOpacity = s.overlay_opacity;
     Lightbox.overlayColor = s.overlay_color;
     Lightbox.disableCloseClick = s.disable_close_click;
     Lightbox.resizeSequence = s.resize_sequence;
     Lightbox.resizeSpeed = s.resize_speed;
     Lightbox.fadeInSpeed = s.fade_in_speed;
     Lightbox.slideDownSpeed = s.slide_down_speed;
     Lightbox.borderSize = s.border_size;
     Lightbox.boxColor = s.box_color;
     Lightbox.fontColor = s.font_color;
     Lightbox.topPosition = s.top_position;
     Lightbox.rtl = s.rtl;
     Lightbox.loopItems = s.loop_items;
     Lightbox.keysClose = s.keys_close.split(" ");
     Lightbox.keysPrevious = s.keys_previous.split(" ");
     Lightbox.keysNext = s.keys_next.split(" ");
     Lightbox.keysZoom = s.keys_zoom.split(" ");
     Lightbox.keysPlayPause = s.keys_play_pause.split(" ");
     Lightbox.disableResize = s.disable_resize;
     Lightbox.disableZoom = s.disable_zoom;
     Lightbox.slideInterval = s.slideshow_interval;
     Lightbox.showPlayPause = s.show_play_pause;
     Lightbox.showCaption = s.show_caption;
     Lightbox.autoStart = s.slideshow_automatic_start;
     Lightbox.autoExit = s.slideshow_automatic_exit;
     Lightbox.pauseOnNextClick = s.pause_on_next_click;
     Lightbox.pauseOnPrevClick = s.pause_on_previous_click;
     Lightbox.loopSlides = s.loop_slides;
     Lightbox.alternative_layout = s.use_alt_layout;
     Lightbox.iframe_width = s.iframe_width;
     Lightbox.iframe_height = s.iframe_height;
     Lightbox.iframe_border = s.iframe_border;
     Lightbox.enableVideo = s.enable_video;
     if (s.enable_video) {
       Lightbox.flvPlayer = s.flvPlayer;
       Lightbox.flvFlashvars = s.flvFlashvars;
     }
 
     // Make the lightbox divs.
     var layout_class = (s.use_alt_layout ? 'lightbox2-alt-layout' : 'lightbox2-orig-layout');
     var output = '<div id="lightbox2-overlay" style="display: none;"></div>\
       <div id="lightbox" style="display: none;" class="' + layout_class + '">\
         <div id="outerImageContainer"></div>\
         <div id="imageDataContainer" class="clearfix">\
           <div id="imageData"></div>\
         </div>\
       </div>';
     var loading = '<div id="loading"><a href="#" id="loadingLink"></a></div>';
     var modal = '<div id="modalContainer" style="display: none;"></div>';
     var frame = '<div id="frameContainer" style="display: none;"></div>';
     var imageContainer = '<div id="imageContainer" style="display: none;"></div>';
     var details = '<div id="imageDetails"></div>';
     var bottomNav = '<div id="bottomNav"></div>';
     var image = '<img id="lightboxImage" alt="" />';
     var hoverNav = '<div id="hoverNav"><a id="prevLink" href="#"></a><a id="nextLink" href="#"></a></div>';
     var frameNav = '<div id="frameHoverNav"><a id="framePrevLink" href="#"></a><a id="frameNextLink" href="#"></a></div>';
     var hoverNav = '<div id="hoverNav"><a id="prevLink" title="' + Drupal.t('Previous') + '" href="#"></a><a id="nextLink" title="' + Drupal.t('Next') + '" href="#"></a></div>';
     var frameNav = '<div id="frameHoverNav"><a id="framePrevLink" title="' + Drupal.t('Previous') + '" href="#"></a><a id="frameNextLink" title="' + Drupal.t('Next') + '" href="#"></a></div>';
     var caption = '<span id="caption"></span>';
     var numberDisplay = '<span id="numberDisplay"></span>';
     var close = '<a id="bottomNavClose" title="' + Drupal.t('Close') + '" href="#"></a>';
     var zoom = '<a id="bottomNavZoom" href="#"></a>';
     var zoomOut = '<a id="bottomNavZoomOut" href="#"></a>';
     var pause = '<a id="lightshowPause" title="' + Drupal.t('Pause Slideshow') + '" href="#" style="display: none;"></a>';
     var play = '<a id="lightshowPlay" title="' + Drupal.t('Play Slideshow') + '" href="#" style="display: none;"></a>';
 
     $("body").append(output);
     $('#outerImageContainer').append(modal + frame + imageContainer + loading);
     if (!s.use_alt_layout) {
       $('#imageContainer').append(image + hoverNav);
       $('#imageData').append(details + bottomNav);
       $('#imageDetails').append(caption + numberDisplay);
       $('#bottomNav').append(frameNav + close + zoom + zoomOut + pause + play);
     }
     else {
       $('#outerImageContainer').append(bottomNav);
       $('#imageContainer').append(image);
       $('#bottomNav').append(close + zoom + zoomOut);
       $('#imageData').append(hoverNav + details);
       $('#imageDetails').append(caption + numberDisplay + pause + play);
     }
 
     // Setup onclick handlers.
     if (Lightbox.disableCloseClick) {
       $('#lightbox2-overlay').click(function() { Lightbox.end(); return false; } ).hide();
     }
     $('#loadingLink, #bottomNavClose').click(function() { Lightbox.end('forceClose'); return false; } );
     $('#prevLink, #framePrevLink').click(function() { Lightbox.changeData(Lightbox.activeImage - 1); return false; } );
     $('#nextLink, #frameNextLink').click(function() { Lightbox.changeData(Lightbox.activeImage + 1); return false; } );
     $('#bottomNavZoom').click(function() { Lightbox.changeData(Lightbox.activeImage, true); return false; } );
     $('#bottomNavZoomOut').click(function() { Lightbox.changeData(Lightbox.activeImage, false); return false; } );
     $('#lightshowPause').click(function() { Lightbox.togglePlayPause("lightshowPause", "lightshowPlay"); return false; } );
     $('#lightshowPlay').click(function() { Lightbox.togglePlayPause("lightshowPlay", "lightshowPause"); return false; } );
 
     // Fix positioning.
     $('#prevLink, #nextLink, #framePrevLink, #frameNextLink').css({ 'paddingTop': Lightbox.borderSize + 'px'});
     $('#imageContainer, #frameContainer, #modalContainer').css({ 'padding': Lightbox.borderSize + 'px'});
     $('#outerImageContainer, #imageDataContainer, #bottomNavClose').css({'backgroundColor': '#' + Lightbox.boxColor, 'color': '#'+Lightbox.fontColor});
     if (Lightbox.alternative_layout) {
       $('#bottomNavZoom, #bottomNavZoomOut').css({'bottom': Lightbox.borderSize + 'px', 'right': Lightbox.borderSize + 'px'});
     }
     else if (Lightbox.rtl == 1 && Drupal.settings.lightbox2.useragent.search('MSIE') !== -1) {
       $('#bottomNavZoom, #bottomNavZoomOut').css({'left': '0px'});
     }
 
     // Force navigation links to always be displayed
     if (s.force_show_nav) {
       $('#prevLink, #nextLink').addClass("force_show_nav");
     }
 
   },
 
   // initList()
   // Loops through anchor tags looking for 'lightbox', 'lightshow' and
   // 'lightframe', etc, references and applies onclick events to appropriate
   // links. You can rerun after dynamically adding images w/ajax.
   initList : function(context) {
 
     if (context == undefined || context == null) {
       context = document;
     }
 
     // Attach lightbox to any links with rel 'lightbox', 'lightshow' or
     // 'lightframe', etc.
     $("a[rel^='lightbox']:not(.lightbox-processed), area[rel^='lightbox']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
       if (Lightbox.disableCloseClick) {
         $('#lightbox').unbind('click');
         $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
       }
       Lightbox.start(this, false, false, false, false);
       if (e.preventDefault) { e.preventDefault(); }
       return false;
     });
     $("a[rel^='lightshow']:not(.lightbox-processed), area[rel^='lightshow']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
       if (Lightbox.disableCloseClick) {
         $('#lightbox').unbind('click');
         $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
       }
       Lightbox.start(this, true, false, false, false);
       if (e.preventDefault) { e.preventDefault(); }
       return false;
     });
     $("a[rel^='lightframe']:not(.lightbox-processed), area[rel^='lightframe']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
       if (Lightbox.disableCloseClick) {
         $('#lightbox').unbind('click');
         $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
       }
       Lightbox.start(this, false, true, false, false);
       if (e.preventDefault) { e.preventDefault(); }
       return false;
     });
     if (Lightbox.enableVideo) {
       $("a[rel^='lightvideo']:not(.lightbox-processed), area[rel^='lightvideo']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
         if (Lightbox.disableCloseClick) {
           $('#lightbox').unbind('click');
           $('#lightbox').click(function() { Lightbox.end('forceClose'); } );
         }
         Lightbox.start(this, false, false, true, false);
         if (e.preventDefault) { e.preventDefault(); }
         return false;
       });
     }
     $("a[rel^='lightmodal']:not(.lightbox-processed), area[rel^='lightmodal']:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
       $('#lightbox').unbind('click');
       // Add classes from the link to the lightbox div - don't include lightbox-processed
       $('#lightbox').addClass($(this).attr('class'));
       $('#lightbox').removeClass('lightbox-processed');
       Lightbox.start(this, false, false, false, true);
       if (e.preventDefault) { e.preventDefault(); }
       return false;
     });
     $("#lightboxAutoModal:not(.lightbox-processed)", context).addClass('lightbox-processed').click(function(e) {
       Lightbox.auto_modal = true;
       $('#lightbox').unbind('click');
       Lightbox.start(this, false, false, false, true);
       if (e.preventDefault) { e.preventDefault(); }
       return false;
     });
   },
 
   // start()
   // Display overlay and lightbox. If image is part of a set, add siblings to
   // imageArray.
   start: function(imageLink, slideshow, lightframe, lightvideo, lightmodal) {
 
     Lightbox.isPaused = !Lightbox.autoStart;
 
     // Replaces hideSelectBoxes() and hideFlash() calls in original lightbox2.
     Lightbox.toggleSelectsFlash('hide');
 
     // Stretch overlay to fill page and fade in.
     var arrayPageSize = Lightbox.getPageSize();
     $("#lightbox2-overlay").hide().css({
       'width': '100%',
       'zIndex': '10090',
       'height': arrayPageSize[1] + 'px',
       'backgroundColor' : '#' + Lightbox.overlayColor
     });
     // Detect OS X FF2 opacity + flash issue.
     if (lightvideo && this.detectMacFF2()) {
       $("#lightbox2-overlay").removeClass("overlay_default");
       $("#lightbox2-overlay").addClass("overlay_macff2");
       $("#lightbox2-overlay").css({'opacity' : null});
     }
     else {
       $("#lightbox2-overlay").removeClass("overlay_macff2");
       $("#lightbox2-overlay").addClass("overlay_default");
       $("#lightbox2-overlay").css({'opacity' : Lightbox.overlayOpacity});
     }
     $("#lightbox2-overlay").fadeIn(Lightbox.fadeInSpeed);
 
 
     Lightbox.isSlideshow = slideshow;
     Lightbox.isLightframe = lightframe;
     Lightbox.isVideo = lightvideo;
     Lightbox.isModal = lightmodal;
     Lightbox.imageArray = [];
     Lightbox.imageNum = 0;
 
     var anchors = $(imageLink.tagName);
     var anchor = null;
     var rel_parts = Lightbox.parseRel(imageLink);
     var rel = rel_parts["rel"];
     var rel_group = rel_parts["group"];
     var title = (rel_parts["title"] ? rel_parts["title"] : imageLink.title);
     var rel_style = null;
     var i = 0;
 
     if (rel_parts["flashvars"]) {
       Lightbox.flvFlashvars = Lightbox.flvFlashvars + '&' + rel_parts["flashvars"];
     }
 
     // Set the title for image alternative text.
     var alt = imageLink.title;
     if (!alt) {
       var img = $(imageLink).find("img");
       if (img && $(img).attr("alt")) {
         alt = $(img).attr("alt");
       }
       else {
         alt = title;
       }
     }
 
     if ($(imageLink).attr('id') == 'lightboxAutoModal') {
       rel_style = rel_parts["style"];
       Lightbox.imageArray.push(['#lightboxAutoModal > *', title, alt, rel_style, 1]);
     }
     else {
       // Handle lightbox images with no grouping.
       if ((rel == 'lightbox' || rel == 'lightshow') && !rel_group) {
         Lightbox.imageArray.push([imageLink.href, title, alt]);
       }
 
       // Handle other items with no grouping.
       else if (!rel_group) {
         rel_style = rel_parts["style"];
         Lightbox.imageArray.push([imageLink.href, title, alt, rel_style]);
       }
 
       // Handle grouped items.
       else {
 
         // Loop through anchors and add them to imageArray.
         for (i = 0; i < anchors.length; i++) {
           anchor = anchors[i];
           if (anchor.href && typeof(anchor.href) == "string" && $(anchor).attr('rel')) {
             var rel_data = Lightbox.parseRel(anchor);
             var anchor_title = (rel_data["title"] ? rel_data["title"] : anchor.title);
             img_alt = anchor.title;
             if (!img_alt) {
               var anchor_img = $(anchor).find("img");
               if (anchor_img && $(anchor_img).attr("alt")) {
                 img_alt = $(anchor_img).attr("alt");
               }
               else {
                 img_alt = title;
               }
             }
             if (rel_data["rel"] == rel) {
               if (rel_data["group"] == rel_group) {
                 if (Lightbox.isLightframe || Lightbox.isModal || Lightbox.isVideo) {
                   rel_style = rel_data["style"];
                 }
                 Lightbox.imageArray.push([anchor.href, anchor_title, img_alt, rel_style]);
               }
             }
           }
         }
 
         // Remove duplicates.
         for (i = 0; i < Lightbox.imageArray.length; i++) {
           for (j = Lightbox.imageArray.length-1; j > i; j--) {
             if (Lightbox.imageArray[i][0] == Lightbox.imageArray[j][0]) {
               Lightbox.imageArray.splice(j,1);
             }
           }
         }
         while (Lightbox.imageArray[Lightbox.imageNum][0] != imageLink.href) {
           Lightbox.imageNum++;
         }
       }
     }
 
     if (Lightbox.isSlideshow && Lightbox.showPlayPause && Lightbox.isPaused) {
       $('#lightshowPlay').show();
       $('#lightshowPause').hide();
     }
 
     // Calculate top and left offset for the lightbox.
     var arrayPageScroll = Lightbox.getPageScroll();
     var lightboxTop = arrayPageScroll[1] + (Lightbox.topPosition == '' ? (arrayPageSize[3] / 10) : Lightbox.topPosition) * 1;
     var lightboxLeft = arrayPageScroll[0];
     $('#frameContainer, #modalContainer, #lightboxImage').hide();
     $('#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink').hide();
     $('#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut').hide();
     $('#outerImageContainer').css({'width': '250px', 'height': '250px'});
     $('#lightbox').css({
       'zIndex': '10500',
       'top': lightboxTop + 'px',
       'left': lightboxLeft + 'px'
     }).show();
 
     Lightbox.total = Lightbox.imageArray.length;
     Lightbox.changeData(Lightbox.imageNum);
   },
 
   // changeData()
   // Hide most elements and preload image in preparation for resizing image
   // container.
   changeData: function(imageNum, zoomIn) {
 
     if (Lightbox.inprogress === false) {
       if (Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) {
         if (imageNum >= Lightbox.total) imageNum = 0;
         if (imageNum < 0) imageNum = Lightbox.total - 1;
       }
 
       if (Lightbox.isSlideshow) {
         for (var i = 0; i < Lightbox.slideIdCount; i++) {
           window.clearTimeout(Lightbox.slideIdArray[i]);
         }
       }
       Lightbox.inprogress = true;
       Lightbox.activeImage = imageNum;
 
       if (Lightbox.disableResize && !Lightbox.isSlideshow) {
         zoomIn = true;
       }
       Lightbox.isZoomedIn = zoomIn;
 
 
       // Hide elements during transition.
       $('#loading').css({'zIndex': '10500'}).show();
       if (!Lightbox.alternative_layout) {
         $('#imageContainer').hide();
       }
       $('#frameContainer, #modalContainer, #lightboxImage').hide();
       $('#hoverNav, #prevLink, #nextLink, #frameHoverNav, #framePrevLink, #frameNextLink').hide();
       $('#imageDataContainer, #numberDisplay, #bottomNavZoom, #bottomNavZoomOut').hide();
 
       // Preload image content, but not iframe pages.
       if (!Lightbox.isLightframe && !Lightbox.isVideo && !Lightbox.isModal) {
         $("#lightbox #imageDataContainer").removeClass('lightbox2-alt-layout-data');
         imgPreloader = new Image();
         imgPreloader.onerror = function() { Lightbox.imgNodeLoadingError(this); };
 
         imgPreloader.onload = function() {
           var photo = document.getElementById('lightboxImage');
           photo.src = Lightbox.imageArray[Lightbox.activeImage][0];
           photo.alt = Lightbox.imageArray[Lightbox.activeImage][2];
 
           var imageWidth = imgPreloader.width;
           var imageHeight = imgPreloader.height;
 
           // Resize code.
           var arrayPageSize = Lightbox.getPageSize();
           var targ = { w:arrayPageSize[2] - (Lightbox.borderSize * 2), h:arrayPageSize[3] - (Lightbox.borderSize * 6) - (Lightbox.infoHeight * 4) - (arrayPageSize[3] / 10) };
           var orig = { w:imgPreloader.width, h:imgPreloader.height };
 
           // Image is very large, so show a smaller version of the larger image
           // with zoom button.
           if (zoomIn !== true) {
             var ratio = 1.0; // Shrink image with the same aspect.
             $('#bottomNavZoomOut, #bottomNavZoom').hide();
             if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w) {
               ratio = ((targ.w / orig.w) < (targ.h / orig.h)) ? targ.w / orig.w : targ.h / orig.h;
               if (!Lightbox.disableZoom && !Lightbox.isSlideshow) {
                 $('#bottomNavZoom').css({'zIndex': '10500'}).show();
               }
             }
 
             imageWidth  = Math.floor(orig.w * ratio);
             imageHeight = Math.floor(orig.h * ratio);
           }
 
           else {
             $('#bottomNavZoom').hide();
             // Only display zoom out button if the image is zoomed in already.
             if ((orig.w >= targ.w || orig.h >= targ.h) && orig.h && orig.w) {
               // Only display zoom out button if not a slideshow and if the
               // buttons aren't disabled.
               if (!Lightbox.disableResize && Lightbox.isSlideshow === false && !Lightbox.disableZoom) {
                 $('#bottomNavZoomOut').css({'zIndex': '10500'}).show();
               }
             }
           }
 
           photo.style.width = (imageWidth) + 'px';
           photo.style.height = (imageHeight) + 'px';
           Lightbox.resizeContainer(imageWidth, imageHeight);
 
           // Clear onLoad, IE behaves irratically with animated gifs otherwise.
           imgPreloader.onload = function() {};
         };
 
         imgPreloader.src = Lightbox.imageArray[Lightbox.activeImage][0];
         imgPreloader.alt = Lightbox.imageArray[Lightbox.activeImage][2];
       }
 
       // Set up frame size, etc.
       else if (Lightbox.isLightframe) {
         $("#lightbox #imageDataContainer").addClass('lightbox2-alt-layout-data');
         var src = Lightbox.imageArray[Lightbox.activeImage][0];
         $('#frameContainer').html('<iframe id="lightboxFrame" style="display: none;" src="'+src+'"></iframe>');
 
         // Enable swf support in Gecko browsers.
         if (Drupal.settings.lightbox2.useragent.search('Mozilla') !== -1 && src.indexOf('.swf') != -1) {
           setTimeout(function () {
             document.getElementById("lightboxFrame").src = Lightbox.imageArray[Lightbox.activeImage][0];
           }, 1000);
         }
 
         if (!Lightbox.iframe_border) {
           $('#lightboxFrame').css({'border': 'none'});
           $('#lightboxFrame').attr('frameborder', '0');
         }
         var iframe = document.getElementById('lightboxFrame');
         var iframeStyles = Lightbox.imageArray[Lightbox.activeImage][3];
         iframe = Lightbox.setStyles(iframe, iframeStyles);
         Lightbox.resizeContainer(parseInt(iframe.width, 10), parseInt(iframe.height, 10));
       }
       else if (Lightbox.isVideo || Lightbox.isModal) {
         $("#lightbox #imageDataContainer").addClass('lightbox2-alt-layout-data');
         var container = document.getElementById('modalContainer');
         var modalStyles = Lightbox.imageArray[Lightbox.activeImage][3];
         container = Lightbox.setStyles(container, modalStyles);
         if (Lightbox.isVideo) {
           Lightbox.modalHeight =  parseInt(container.height, 10) - 10;
           Lightbox.modalWidth =  parseInt(container.width, 10) - 10;
           Lightvideo.startVideo(Lightbox.imageArray[Lightbox.activeImage][0]);
         }
         Lightbox.resizeContainer(parseInt(container.width, 10), parseInt(container.height, 10));
       }
     }
   },
 
   // imgNodeLoadingError()
   imgNodeLoadingError: function(image) {
     var s = Drupal.settings.lightbox2;
     var original_image = Lightbox.imageArray[Lightbox.activeImage][0];
     if (s.display_image_size !== "") {
       original_image = original_image.replace(new RegExp("."+s.display_image_size), "");
     }
     Lightbox.imageArray[Lightbox.activeImage][0] = original_image;
     image.onerror = function() { Lightbox.imgLoadingError(image); };
     image.src = original_image;
   },
 
   // imgLoadingError()
   imgLoadingError: function(image) {
     var s = Drupal.settings.lightbox2;
     Lightbox.imageArray[Lightbox.activeImage][0] = s.default_image;
     image.src = s.default_image;
   },
 
   // resizeContainer()
   resizeContainer: function(imgWidth, imgHeight) {
 
     imgWidth = (imgWidth < Lightbox.minWidth ? Lightbox.minWidth : imgWidth);
 
     this.widthCurrent = $('#outerImageContainer').width();
     this.heightCurrent = $('#outerImageContainer').height();
 
     var widthNew = (imgWidth  + (Lightbox.borderSize * 2));
     var heightNew = (imgHeight  + (Lightbox.borderSize * 2));
 
     // Scalars based on change from old to new.
     this.xScale = ( widthNew / this.widthCurrent) * 100;
     this.yScale = ( heightNew / this.heightCurrent) * 100;
 
     // Calculate size difference between new and old image, and resize if
     // necessary.
     wDiff = this.widthCurrent - widthNew;
     hDiff = this.heightCurrent - heightNew;
 
     $('#modalContainer').css({'width': imgWidth, 'height': imgHeight});
     // Detect animation sequence.
     if (Lightbox.resizeSequence) {
       var animate1 = {width: widthNew};
       var animate2 = {height: heightNew};
       if (Lightbox.resizeSequence == 2) {
         animate1 = {height: heightNew};
         animate2 = {width: widthNew};
       }
       $('#outerImageContainer').animate(animate1, Lightbox.resizeSpeed).animate(animate2, Lightbox.resizeSpeed, 'linear', function() { Lightbox.showData(); });
     }
     // Simultaneous.
     else {
       $('#outerImageContainer').animate({'width': widthNew, 'height': heightNew}, Lightbox.resizeSpeed, 'linear', function() { Lightbox.showData(); });
     }
 
     // If new and old image are same size and no scaling transition is necessary
     // do a quick pause to prevent image flicker.
     if ((hDiff === 0) && (wDiff === 0)) {
       if (Drupal.settings.lightbox2.useragent.search('MSIE') !== -1) {
         Lightbox.pause(250);
       }
       else {
         Lightbox.pause(100);
       }
     }
 
     var s = Drupal.settings.lightbox2;
     if (!s.use_alt_layout) {
       $('#prevLink, #nextLink').css({'height': imgHeight + 'px'});
     }
     $('#imageDataContainer').css({'width': widthNew + 'px'});
   },
 
   // showData()
   // Display image and begin preloading neighbors.
   showData: function() {
     $('#loading').hide();
 
     if (Lightbox.isLightframe || Lightbox.isVideo || Lightbox.isModal) {
       Lightbox.updateDetails();
       if (Lightbox.isLightframe) {
         $('#frameContainer').show();
         if (Drupal.settings.lightbox2.useragent.search('Safari') !== -1 || Lightbox.fadeInSpeed === 0) {
           $('#lightboxFrame').css({'zIndex': '10500'}).show();
         }
         else {
           $('#lightboxFrame').css({'zIndex': '10500'}).fadeIn(Lightbox.fadeInSpeed);
         }
       }
       else {
         if (Lightbox.isVideo) {
           $("#modalContainer").html(Lightbox.modalHTML).click(function(){return false;}).css('zIndex', '10500').show();
         }
         else {
           var src = unescape(Lightbox.imageArray[Lightbox.activeImage][0]);
           if (Lightbox.imageArray[Lightbox.activeImage][4]) {
             $(src).appendTo("#modalContainer");
             $('#modalContainer').css({'zIndex': '10500'}).show();
           }
           else {
             // Use a callback to show the new image, otherwise you get flicker.
             $("#modalContainer").hide().load(src, function () {$('#modalContainer').css({'zIndex': '10500'}).show();});
           }
           $('#modalContainer').unbind('click');
         }
         // This might be needed in the Lightframe section above.
         //$('#modalContainer').css({'zIndex': '10500'}).show();
       }
     }
 
     // Handle display of image content.
     else {
       $('#imageContainer').show();
       if (Drupal.settings.lightbox2.useragent.search('Safari') !== -1 || Lightbox.fadeInSpeed === 0) {
         $('#lightboxImage').css({'zIndex': '10500'}).show();
       }
       else {
         $('#lightboxImage').css({'zIndex': '10500'}).fadeIn(Lightbox.fadeInSpeed);
       }
       Lightbox.updateDetails();
       this.preloadNeighborImages();
     }
     Lightbox.inprogress = false;
 
     // Slideshow specific stuff.
     if (Lightbox.isSlideshow) {
       if (!Lightbox.loopSlides && Lightbox.activeImage == (Lightbox.total - 1)) {
         if (Lightbox.autoExit) {
           Lightbox.slideIdArray[Lightbox.slideIdCount++] = setTimeout(function () {Lightbox.end('slideshow');}, Lightbox.slideInterval);
         }
       }
       else {
         if (!Lightbox.isPaused && Lightbox.total > 1) {
           Lightbox.slideIdArray[Lightbox.slideIdCount++] = setTimeout(function () {Lightbox.changeData(Lightbox.activeImage + 1);}, Lightbox.slideInterval);
         }
       }
       if (Lightbox.showPlayPause && Lightbox.total > 1 && !Lightbox.isPaused) {
         $('#lightshowPause').show();
         $('#lightshowPlay').hide();
       }
       else if (Lightbox.showPlayPause && Lightbox.total > 1) {
         $('#lightshowPause').hide();
         $('#lightshowPlay').show();
       }
     }
 
     // Adjust the page overlay size.
     var arrayPageSize = Lightbox.getPageSize();
     var arrayPageScroll = Lightbox.getPageScroll();
     var pageHeight = arrayPageSize[1];
     if (Lightbox.isZoomedIn && arrayPageSize[1] > arrayPageSize[3]) {
       var lightboxTop = (Lightbox.topPosition == '' ? (arrayPageSize[3] / 10) : Lightbox.topPosition) * 1;
       pageHeight = pageHeight + arrayPageScroll[1] + lightboxTop;
     }
     $('#lightbox2-overlay').css({'height': pageHeight + 'px', 'width': arrayPageSize[0] + 'px'});
 
     // Gecko browsers (e.g. Firefox, SeaMonkey, etc) don't handle pdfs as
     // expected.
     if (Drupal.settings.lightbox2.useragent.search('Mozilla') !== -1) {
       if (Lightbox.imageArray[Lightbox.activeImage][0].indexOf(".pdf") != -1) {
         setTimeout(function () {
           document.getElementById("lightboxFrame").src = Lightbox.imageArray[Lightbox.activeImage][0];
         }, 1000);
       }
     }
   },
 
   // updateDetails()
   // Display caption, image number, and bottom nav.
   updateDetails: function() {
 
     $("#imageDataContainer").hide();
 
     var s = Drupal.settings.lightbox2;
 
     if (s.show_caption) {
       var caption = Lightbox.filterXSS(Lightbox.imageArray[Lightbox.activeImage][1]);
       if (!caption) caption = '';
       $('#caption').html(caption).css({'zIndex': '10500'}).show();
     }
 
     // If image is part of set display 'Image x of x'.
     var numberDisplay = null;
     if (s.image_count && Lightbox.total > 1) {
       var currentImage = Lightbox.activeImage + 1;
       if (!Lightbox.isLightframe && !Lightbox.isModal && !Lightbox.isVideo) {
         numberDisplay = s.image_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
       }
       else if (Lightbox.isVideo) {
         numberDisplay = s.video_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
       }
       else {
         numberDisplay = s.page_count.replace(/\!current/, currentImage).replace(/\!total/, Lightbox.total);
       }
       $('#numberDisplay').html(numberDisplay).css({'zIndex': '10500'}).show();
     }
     else {
       $('#numberDisplay').hide();
     }
 
     $("#imageDataContainer").hide().slideDown(Lightbox.slideDownSpeed, function() {
       $("#bottomNav").show();
     });
     if (Lightbox.rtl == 1) {
       $("#bottomNav").css({'float': 'left'});
     }
     Lightbox.updateNav();
   },
 
   // updateNav()
   // Display appropriate previous and next hover navigation.
   updateNav: function() {
 
     $('#hoverNav').css({'zIndex': '10500'}).show();
     var prevLink = '#prevLink';
     var nextLink = '#nextLink';
 
     // Slideshow is separated as we need to show play / pause button.
     if (Lightbox.isSlideshow) {
       if ((Lightbox.total > 1 && Lightbox.loopSlides) || Lightbox.activeImage !== 0) {
         $(prevLink).css({'zIndex': '10500'}).show().click(function() {
           if (Lightbox.pauseOnPrevClick) {
             Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
           }
           Lightbox.changeData(Lightbox.activeImage - 1); return false;
         });
       }
       else {
         $(prevLink).hide();
       }
 
       // If not last image in set, display next image button.
       if ((Lightbox.total > 1 && Lightbox.loopSlides) || Lightbox.activeImage != (Lightbox.total - 1)) {
         $(nextLink).css({'zIndex': '10500'}).show().click(function() {
           if (Lightbox.pauseOnNextClick) {
             Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
           }
           Lightbox.changeData(Lightbox.activeImage + 1); return false;
         });
       }
       // Safari browsers need to have hide() called again.
       else {
         $(nextLink).hide();
       }
     }
 
     // All other types of content.
     else {
 
       if ((Lightbox.isLightframe || Lightbox.isModal || Lightbox.isVideo) && !Lightbox.alternative_layout) {
         $('#frameHoverNav').css({'zIndex': '10500'}).show();
         $('#hoverNav').css({'zIndex': '10500'}).hide();
         prevLink = '#framePrevLink';
         nextLink = '#frameNextLink';
       }
 
       // If not first image in set, display prev image button.
       if ((Lightbox.total > 1 && Lightbox.loopItems) || Lightbox.activeImage !== 0) {
         // Unbind any other click handlers, otherwise this adds a new click handler
         // each time the arrow is clicked.
         $(prevLink).css({'zIndex': '10500'}).show().unbind().click(function() {
           Lightbox.changeData(Lightbox.activeImage - 1); return false;
         });
       }
       // Safari browsers need to have hide() called again.
       else {
         $(prevLink).hide();
       }
 
       // If not last image in set, display next image button.
       if ((Lightbox.total > 1 && Lightbox.loopItems) || Lightbox.activeImage != (Lightbox.total - 1)) {
         // Unbind any other click handlers, otherwise this adds a new click handler
         // each time the arrow is clicked.
         $(nextLink).css({'zIndex': '10500'}).show().unbind().click(function() {
           Lightbox.changeData(Lightbox.activeImage + 1); return false;
         });
       }
       // Safari browsers need to have hide() called again.
       else {
         $(nextLink).hide();
       }
     }
 
     // Don't enable keyboard shortcuts so forms will work.
     if (!Lightbox.isModal) {
       this.enableKeyboardNav();
     }
   },
 
 
   // enableKeyboardNav()
   enableKeyboardNav: function() {
     $(document).bind("keydown", this.keyboardAction);
   },
 
   // disableKeyboardNav()
   disableKeyboardNav: function() {
     $(document).unbind("keydown", this.keyboardAction);
   },
 
   // keyboardAction()
   keyboardAction: function(e) {
     if (e === null) { // IE.
       keycode = event.keyCode;
       escapeKey = 27;
     }
     else { // Mozilla.
       keycode = e.keyCode;
       escapeKey = e.DOM_VK_ESCAPE;
     }
 
     key = String.fromCharCode(keycode).toLowerCase();
 
     // Close lightbox.
     if (Lightbox.checkKey(Lightbox.keysClose, key, keycode)) {
       Lightbox.end('forceClose');
     }
     // Display previous image (p, <-).
     else if (Lightbox.checkKey(Lightbox.keysPrevious, key, keycode)) {
       if ((Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) || Lightbox.activeImage !== 0) {
         Lightbox.changeData(Lightbox.activeImage - 1);
       }
 
     }
     // Display next image (n, ->).
     else if (Lightbox.checkKey(Lightbox.keysNext, key, keycode)) {
       if ((Lightbox.total > 1 && ((Lightbox.isSlideshow && Lightbox.loopSlides) || (!Lightbox.isSlideshow && Lightbox.loopItems))) || Lightbox.activeImage != (Lightbox.total - 1)) {
         Lightbox.changeData(Lightbox.activeImage + 1);
       }
     }
     // Zoom in.
     else if (Lightbox.checkKey(Lightbox.keysZoom, key, keycode) && !Lightbox.disableResize && !Lightbox.disableZoom && !Lightbox.isSlideshow && !Lightbox.isLightframe) {
       if (Lightbox.isZoomedIn) {
         Lightbox.changeData(Lightbox.activeImage, false);
       }
       else if (!Lightbox.isZoomedIn) {
         Lightbox.changeData(Lightbox.activeImage, true);
       }
       return false;
     }
     // Toggle play / pause (space).
     else if (Lightbox.checkKey(Lightbox.keysPlayPause, key, keycode) && Lightbox.isSlideshow) {
 
       if (Lightbox.isPaused) {
         Lightbox.togglePlayPause("lightshowPlay", "lightshowPause");
       }
       else {
         Lightbox.togglePlayPause("lightshowPause", "lightshowPlay");
       }
       return false;
     }
   },
 
   preloadNeighborImages: function() {
 
     if ((Lightbox.total - 1) > Lightbox.activeImage) {
       preloadNextImage = new Image();
       preloadNextImage.src = Lightbox.imageArray[Lightbox.activeImage + 1][0];
     }
     if (Lightbox.activeImage > 0) {
       preloadPrevImage = new Image();
       preloadPrevImage.src = Lightbox.imageArray[Lightbox.activeImage - 1][0];
     }
 
   },
 
   end: function(caller) {
     var closeClick = (caller == 'slideshow' ? false : true);
     if (Lightbox.isSlideshow && Lightbox.isPaused && !closeClick) {
       return;
     }
     // To prevent double clicks on navigation links.
     if (Lightbox.inprogress === true && caller != 'forceClose') {
       return;
     }
     Lightbox.disableKeyboardNav();
     $('#lightbox').hide();
     $("#lightbox2-overlay").fadeOut();
     Lightbox.isPaused = true;
     Lightbox.inprogress = false;
     Lightbox.imageArray = [];
     Lightbox.imageNum = 0;
     // Replaces calls to showSelectBoxes() and showFlash() in original
     // lightbox2.
     Lightbox.toggleSelectsFlash('visible');
     if (Lightbox.isSlideshow) {
       for (var i = 0; i < Lightbox.slideIdCount; i++) {
         window.clearTimeout(Lightbox.slideIdArray[i]);
       }
       $('#lightshowPause, #lightshowPlay').hide();
     }
     else if (Lightbox.isLightframe) {
       $('#frameContainer').empty().hide();
     }
     else if (Lightbox.isVideo || Lightbox.isModal) {
       if (!Lightbox.auto_modal) {
         $('#modalContainer').hide().html("");
       }
       Lightbox.auto_modal = false;
     }
   },
 
 
   // getPageScroll()
   // Returns array with x,y page scroll values.
   // Core code from - quirksmode.com.
   getPageScroll : function() {
 
     var xScroll, yScroll;
 
     if (self.pageYOffset || self.pageXOffset) {
       yScroll = self.pageYOffset;
       xScroll = self.pageXOffset;
     }
     else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {  // Explorer 6 Strict.
       yScroll = document.documentElement.scrollTop;
       xScroll = document.documentElement.scrollLeft;
     }
     else if (document.body) {// All other Explorers.
       yScroll = document.body.scrollTop;
       xScroll = document.body.scrollLeft;
     }
 
     arrayPageScroll = [xScroll,yScroll];
     return arrayPageScroll;
   },
 
   // getPageSize()
   // Returns array with page width, height and window width, height.
   // Core code from - quirksmode.com.
   // Edit for Firefox by pHaez.
 
   getPageSize : function() {
 
     var xScroll, yScroll;
 
     if (window.innerHeight && window.scrollMaxY) {
       xScroll = window.innerWidth + window.scrollMaxX;
       yScroll = window.innerHeight + window.scrollMaxY;
     }
     else if (document.body.scrollHeight > document.body.offsetHeight) { // All but Explorer Mac.
       xScroll = document.body.scrollWidth;
       yScroll = document.body.scrollHeight;
     }
     else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari.
       xScroll = document.body.offsetWidth;
       yScroll = document.body.offsetHeight;
     }
 
     var windowWidth, windowHeight;
 
     if (self.innerHeight) { // All except Explorer.
       if (document.documentElement.clientWidth) {
         windowWidth = document.documentElement.clientWidth;
       }
       else {
         windowWidth = self.innerWidth;
       }
       windowHeight = self.innerHeight;
     }
     else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode.
       windowWidth = document.documentElement.clientWidth;
       windowHeight = document.documentElement.clientHeight;
     }
     else if (document.body) { // Other Explorers.
       windowWidth = document.body.clientWidth;
       windowHeight = document.body.clientHeight;
     }
     // For small pages with total height less than height of the viewport.
     if (yScroll < windowHeight) {
       pageHeight = windowHeight;
     }
     else {
       pageHeight = yScroll;
     }
     // For small pages with total width less than width of the viewport.
     if (xScroll < windowWidth) {
       pageWidth = xScroll;
     }
     else {
       pageWidth = windowWidth;
     }
     arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
     return arrayPageSize;
   },
 
 
   // pause(numberMillis)
   pause : function(ms) {
     var date = new Date();
     var curDate = null;
     do { curDate = new Date(); }
     while (curDate - date < ms);
   },
 
 
   // toggleSelectsFlash()
   // Hide / unhide select lists and flash objects as they appear above the
   // lightbox in some browsers.
   toggleSelectsFlash: function (state) {
     if (state == 'visible') {
       $("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").show();
     }
     else if (state == 'hide') {
       $("select:visible, embed:visible, object:visible").not('#lightboxAutoModal select, #lightboxAutoModal embed, #lightboxAutoModal object').addClass("lightbox_hidden");
       $("select.lightbox_hidden, embed.lightbox_hidden, object.lightbox_hidden").hide();
     }
   },
 
 
   // parseRel()
   parseRel: function (link) {
     var parts = [];
     parts["rel"] = parts["title"] = parts["group"] = parts["style"] = parts["flashvars"] = null;
     if (!$(link).attr('rel')) return parts;
     parts["rel"] = $(link).attr('rel').match(/\w+/)[0];
 
     if ($(link).attr('rel').match(/\[(.*)\]/)) {
       var info = $(link).attr('rel').match(/\[(.*?)\]/)[1].split('|');
       parts["group"] = info[0];
       parts["style"] = info[1];
       if (parts["style"] != undefined && parts["style"].match(/flashvars:\s?(.*?);/)) {
         parts["flashvars"] = parts["style"].match(/flashvars:\s?(.*?);/)[1];
       }
     }
     if ($(link).attr('rel').match(/\[.*\]\[(.*)\]/)) {
       parts["title"] = $(link).attr('rel').match(/\[.*\]\[(.*)\]/)[1];
     }
     return parts;
   },
 
   // setStyles()
   setStyles: function(item, styles) {
     item.width = Lightbox.iframe_width;
     item.height = Lightbox.iframe_height;
     item.scrolling = "auto";
 
     if (!styles) return item;
     var stylesArray = styles.split(';');
     for (var i = 0; i< stylesArray.length; i++) {
       if (stylesArray[i].indexOf('width:') >= 0) {
         var w = stylesArray[i].replace('width:', '');
         item.width = jQuery.trim(w);
       }
       else if (stylesArray[i].indexOf('height:') >= 0) {
         var h = stylesArray[i].replace('height:', '');
         item.height = jQuery.trim(h);
       }
       else if (stylesArray[i].indexOf('scrolling:') >= 0) {
         var scrolling = stylesArray[i].replace('scrolling:', '');
         item.scrolling = jQuery.trim(scrolling);
       }
       else if (stylesArray[i].indexOf('overflow:') >= 0) {
         var overflow = stylesArray[i].replace('overflow:', '');
         item.overflow = jQuery.trim(overflow);
       }
     }
     return item;
   },
 
 
   // togglePlayPause()
   // Hide the pause / play button as appropriate.  If pausing the slideshow also
   // clear the timers, otherwise move onto the next image.
   togglePlayPause: function(hideId, showId) {
     if (Lightbox.isSlideshow && hideId == "lightshowPause") {
       for (var i = 0; i < Lightbox.slideIdCount; i++) {
         window.clearTimeout(Lightbox.slideIdArray[i]);
       }
     }
     $('#' + hideId).hide();
     $('#' + showId).show();
 
     if (hideId == "lightshowPlay") {
       Lightbox.isPaused = false;
       if (!Lightbox.loopSlides && Lightbox.activeImage == (Lightbox.total - 1)) {
         Lightbox.end();
       }
       else if (Lightbox.total > 1) {
         Lightbox.changeData(Lightbox.activeImage + 1);
       }
     }
     else {
       Lightbox.isPaused = true;
     }
   },
 
   triggerLightbox: function (rel_type, rel_group) {
     if (rel_type.length) {
       if (rel_group && rel_group.length) {
         $("a[rel^='" + rel_type +"\[" + rel_group + "\]'], area[rel^='" + rel_type +"\[" + rel_group + "\]']").eq(0).trigger("click");
       }
       else {
         $("a[rel^='" + rel_type +"'], area[rel^='" + rel_type +"']").eq(0).trigger("click");
       }
     }
   },
 
   detectMacFF2: function() {
     var ua = navigator.userAgent.toLowerCase();
     if (/firefox[\/\s](\d+\.\d+)/.test(ua)) {
       var ffversion = new Number(RegExp.$1);
       if (ffversion < 3 && ua.indexOf('mac') != -1) {
         return true;
       }
     }
     return false;
   },
 
   checkKey: function(keys, key, code) {
     return (jQuery.inArray(key, keys) != -1 || jQuery.inArray(String(code), keys) != -1);
   },
 
   filterXSS: function(str, allowed_tags) {
     var output = "";
     var prefix = Drupal.settings.pathPrefix;
     if (!prefix) prefix = '';
     $.ajax({
       url: Drupal.settings.basePath + prefix + '?q=system/lightbox2/filter-xss',
       data: {
         'string' : str,
         'allowed_tags' : allowed_tags
       },
       type: "POST",
       async: false,
       dataType:  "json",
       success: function(data) {
         output = data;
       }
     });
     return output;
   }
 
 };
 
 // Initialize the lightbox.
 Drupal.behaviors.initLightbox = {
   attach: function(context) {
 
   $('body:not(.lightbox-processed)', context).addClass('lightbox-processed').each(function() {
     Lightbox.initialize();
     return false; // Break the each loop.
   });
 
   // Attach lightbox to any links with lightbox rels.
   Lightbox.initList(context);
   $('#lightboxAutoModal', context).triggerHandler('click');
   }
 };
 })(jQuery);
 ;
 (function($){
 /**
  * Toggle the visibility of the scroll to top link.
  */
  
 Drupal.behaviors.scroll_to_top = {
   attach: function (context, settings) {
     // append  back to top link top body if it is not
     var exist= jQuery('#back-top').length; // exist = 0 if element doesn't exist
     if(exist == 0){ // this test is for fixing the ajax bug 
         $("body").append("<p id='back-top'><a href='#top'><span id='button'></span><span id='link'>" + settings.scroll_to_top.label + "</span></a></p>");
     }
     // Preview function
     $("input").change(function () {
         // building the style for preview
         var style="<style>#scroll-to-top-prev-container #back-top-prev span#button-prev{ background-color:"+$("#edit-scroll-to-top-bg-color-out").val()+";} #scroll-to-top-prev-container #back-top-prev span#button-prev:hover{ background-color:"+$("#edit-scroll-to-top-bg-color-hover").val()+" }</style>"
         // building the html content of preview
         var html="<p id='back-top-prev' style='position:relative;'><a href='#top'><span id='button-prev'></span><span id='link'>";
         // if label enabled display it
         if($("#edit-scroll-to-top-display-text").attr('checked')){
         html+=$("#edit-scroll-to-top-label").val();
         }
         html+="</span></a></p>";
         // update the preview
         $("#scroll-to-top-prev-container").html(style+html);
     });
     $("#back-top").hide();
     $(function () {
         $(window).scroll(function () {
         // Adding IE8 support
           var scrollTop = 0;
           if (document.documentElement && document.documentElement.scrollTop) {
             scrollTop = document.documentElement.scrollTop;
           }
       if ($(this).scrollTop() > 100 || scrollTop > 100) {
                 $('#back-top').fadeIn();
             } else {
                 $('#back-top').fadeOut();
             }
         });
 
         // scroll body to 0px on click
         $('#back-top a').click(function () {
             $('body,html').animate({
                 scrollTop: 0
             }, 800);
             return false;
         });
     });
     }
 };
 })(jQuery);
 ;
 Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};
 
 (function ($) {
   Drupal.TBMegaMenu.menuInstance = false;
   Drupal.behaviors.tbMegaMenuAction = {
     attach: function(context) {
       $('.tb-megamenu-button').click(function() {
         if(parseInt($(this).parent().children('.nav-collapse').height())) {
           $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
         }
         else {
           $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
         }
       });
       var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
       if(!isTouch){
         $(document).ready(function($){
           var mm_duration = 0;
           $('.tb-megamenu').each (function(){
             if ($(this).data('duration')) {
               mm_duration = $(this).data('duration');
             }
           });
           var mm_timeout = mm_duration ? 100 + mm_duration : 500;
           $('.nav > li, li.mega').hover(function(event) {
             var $this = $(this);
             if ($this.hasClass ('mega')) {
               $this.addClass ('animating');
               clearTimeout ($this.data('animatingTimeout'));
               $this.data('animatingTimeout', setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
               clearTimeout ($this.data('hoverTimeout'));
               $this.data('hoverTimeout', setTimeout(function(){$this.addClass ('open')}, 100));  
             } else {
               clearTimeout ($this.data('hoverTimeout'));
               $this.data('hoverTimeout', 
               setTimeout(function(){$this.addClass ('open')}, 100));
             }
           },
           function(event) {
             var $this = $(this);
             if ($this.hasClass ('mega')) {
               $this.addClass ('animating');
               clearTimeout ($this.data('animatingTimeout'));
               $this.data('animatingTimeout', 
               setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
               clearTimeout ($this.data('hoverTimeout'));
               $this.data('hoverTimeout', setTimeout(function(){$this.removeClass ('open')}, 100));
             } else {
               clearTimeout ($this.data('hoverTimeout'));
               $this.data('hoverTimeout', 
               setTimeout(function(){$this.removeClass ('open')}, 100));
             }
           });
         });
       }
     }
   }
 })(jQuery);
 
 ;
 Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};
 
 (function ($) {
   Drupal.TBMegaMenu.createTouchMenu = function(items) {
       items.children('a').each( function() {
     var $item = $(this);
         var tbitem = $(this).parent();
         $item.click( function(event){
           if ($item.hasClass('tb-megamenu-clicked')) {
             var $uri = $item.attr('href');
             window.location.href = $uri;
           }
           else {
             event.preventDefault();
             $item.addClass('tb-megamenu-clicked');
             if(!tbitem.hasClass('open')){	
               tbitem.addClass('open');
             }
           }
         }).closest('li').mouseleave( function(){
           $item.removeClass('tb-megamenu-clicked');
           tbitem.removeClass('open');
         });
      });
      /*
      items.children('a').children('span.caret').each( function() {
     var $item = $(this).parent();
         $item.click(function(event){
           tbitem = $item.parent();
           if ($item.hasClass('tb-megamenu-clicked')) {
             Drupal.TBMegaMenu.eventStopPropagation(event);
             if(tbitem.hasClass('open')){	
               tbitem.removeClass('open');
               $item.removeClass('tb-megamenu-clicked');
             }
           }
           else {
             Drupal.TBMegaMenu.eventStopPropagation(event);
             $item.addClass('tb-megamenu-clicked');
             if(!tbitem.hasClass('open')){	
               tbitem.addClass('open');
               $item.removeClass('tb-megamenu-clicked');
             }
           }
         });
      });
      */
   }
   
   Drupal.TBMegaMenu.eventStopPropagation = function(event) {
     if (event.stopPropagation) {
       event.stopPropagation();
     }
     else if (window.event) {
       window.event.cancelBubble = true;
     }
   }  
   Drupal.behaviors.tbMegaMenuTouchAction = {
     attach: function(context) {
       var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
       if(isTouch){
         $('html').addClass('touch');
         Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));
       }
     }
   }
 })(jQuery);
 ;
 (function ($) {
     
   /**
    * VSCC Controls
    */
 
   // Add views slieshow api calls for views slideshow text controls.
   Drupal.behaviors.vscc = {
     attach: function (context) {
 
       // Process previous link
       $('.vscc_controls_previous:not(.vscc-previous-processed)', context).addClass('vscc-previous-processed').each(function() {
         var uniqueID = $(this).attr('id').replace('vscc_controls_previous_', '');
         $(this).click(function() {
           Drupal.viewsSlideshow.action({ "action": 'previousSlide', "slideshowID": uniqueID });
           return false;
         });
       });
 
       // Process next link
       $('.vscc_controls_next:not(.vscc-next-processed)', context).addClass('vscc-next-processed').each(function() {
         var uniqueID = $(this).attr('id').replace('vscc_controls_next_', '');
         $(this).click(function() {
           Drupal.viewsSlideshow.action({ "action": 'nextSlide', "slideshowID": uniqueID });
           return false;
         });
       });
 
       // Process pause link
       $('.vscc_controls_pause:not(.vscc-pause-processed)', context).addClass('vscc-pause-processed').each(function() {
         var uniqueID = $(this).attr('id').replace('vscc_controls_pause_', '');
         $(this).click(function() {
           if (Drupal.settings.viewsSlideshow[uniqueID].paused) {
             Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID, "force": true });
           }
           else {
             Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID, "force": true });
           }
           return false;
         });
       });
     }
   };
 
   Drupal.vsccControls = Drupal.vsccControls || {};
 
   /**
    * Implement the pause hook for configurable controls.
    */
   Drupal.vsccControls.pause = function (options) {
     $('#vscc_controls_pause_' + options.slideshowID + ' span.vscc-pause').hide();
     $('#vscc_controls_pause_' + options.slideshowID + ' span.vscc-resume').show();
   };
 
   /**
    * Implement the play hook for configurable controls.
    */
   Drupal.vsccControls.play = function (options) {
     $('#vscc_controls_pause_' + options.slideshowID + ' span.vscc-resume').hide();
     $('#vscc_controls_pause_' + options.slideshowID + ' span.vscc-pause').show();
   };
 })(jQuery);;
 /*
  * jQuery Cycle Plugin (with Transition Definitions)
  * Examples and documentation at: http://jquery.malsup.com/cycle/
  * Copyright (c) 2007-2010 M. Alsup
  * Version: 2.99 (12-MAR-2011)
  * Dual licensed under the MIT and GPL licenses.
  * http://jquery.malsup.com/license.html
  * Requires: jQuery v1.3.2 or later
  */
 (function($){var ver="2.99";if($.support==undefined){$.support={opacity:!($.browser.msie)};}function debug(s){$.fn.cycle.debug&&log(s);}function log(){window.console&&console.log&&console.log("[cycle] "+Array.prototype.join.call(arguments," "));}$.expr[":"].paused=function(el){return el.cyclePause;};$.fn.cycle=function(options,arg2){var o={s:this.selector,c:this.context};if(this.length===0&&options!="stop"){if(!$.isReady&&o.s){log("DOM not ready, queuing slideshow");$(function(){$(o.s,o.c).cycle(options,arg2);});return this;}log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)"));return this;}return this.each(function(){var opts=handleArguments(this,options,arg2);if(opts===false){return;}opts.updateActivePagerLink=opts.updateActivePagerLink||$.fn.cycle.updateActivePagerLink;if(this.cycleTimeout){clearTimeout(this.cycleTimeout);}this.cycleTimeout=this.cyclePause=0;var $cont=$(this);var $slides=opts.slideExpr?$(opts.slideExpr,this):$cont.children();var els=$slides.get();if(els.length<2){log("terminating; too few slides: "+els.length);return;}var opts2=buildOptions($cont,$slides,els,opts,o);if(opts2===false){return;}var startTime=opts2.continuous?10:getTimeout(els[opts2.currSlide],els[opts2.nextSlide],opts2,!opts2.backwards);if(startTime){startTime+=(opts2.delay||0);if(startTime<10){startTime=10;}debug("first timeout: "+startTime);this.cycleTimeout=setTimeout(function(){go(els,opts2,0,!opts.backwards);},startTime);}});};function handleArguments(cont,options,arg2){if(cont.cycleStop==undefined){cont.cycleStop=0;}if(options===undefined||options===null){options={};}if(options.constructor==String){switch(options){case"destroy":case"stop":var opts=$(cont).data("cycle.opts");if(!opts){return false;}cont.cycleStop++;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);}cont.cycleTimeout=0;$(cont).removeData("cycle.opts");if(options=="destroy"){destroy(opts);}return false;case"toggle":cont.cyclePause=(cont.cyclePause===1)?0:1;checkInstantResume(cont.cyclePause,arg2,cont);return false;case"pause":cont.cyclePause=1;return false;case"resume":cont.cyclePause=0;checkInstantResume(false,arg2,cont);return false;case"prev":case"next":var opts=$(cont).data("cycle.opts");if(!opts){log('options not found, "prev/next" ignored');return false;}$.fn.cycle[options](opts);return false;default:options={fx:options};}return options;}else{if(options.constructor==Number){var num=options;options=$(cont).data("cycle.opts");if(!options){log("options not found, can not advance slide");return false;}if(num<0||num>=options.elements.length){log("invalid slide index: "+num);return false;}options.nextSlide=num;if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}if(typeof arg2=="string"){options.oneTimeFx=arg2;}go(options.elements,options,1,num>=options.currSlide);return false;}}return options;function checkInstantResume(isPaused,arg2,cont){if(!isPaused&&arg2===true){var options=$(cont).data("cycle.opts");if(!options){log("options not found, can not resume");return false;}if(cont.cycleTimeout){clearTimeout(cont.cycleTimeout);cont.cycleTimeout=0;}go(options.elements,options,1,!options.backwards);}}}function removeFilter(el,opts){if(!$.support.opacity&&opts.cleartype&&el.style.filter){try{el.style.removeAttribute("filter");}catch(smother){}}}function destroy(opts){if(opts.next){$(opts.next).unbind(opts.prevNextEvent);}if(opts.prev){$(opts.prev).unbind(opts.prevNextEvent);}if(opts.pager||opts.pagerAnchorBuilder){$.each(opts.pagerAnchors||[],function(){this.unbind().remove();});}opts.pagerAnchors=null;if(opts.destroy){opts.destroy(opts);}}function buildOptions($cont,$slides,els,options,o){var opts=$.extend({},$.fn.cycle.defaults,options||{},$.metadata?$cont.metadata():$.meta?$cont.data():{});if(opts.autostop){opts.countdown=opts.autostopCount||els.length;}var cont=$cont[0];$cont.data("cycle.opts",opts);opts.$cont=$cont;opts.stopCount=cont.cycleStop;opts.elements=els;opts.before=opts.before?[opts.before]:[];opts.after=opts.after?[opts.after]:[];if(!$.support.opacity&&opts.cleartype){opts.after.push(function(){removeFilter(this,opts);});}if(opts.continuous){opts.after.push(function(){go(els,opts,0,!opts.backwards);});}saveOriginalOpts(opts);if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($slides);}if($cont.css("position")=="static"){$cont.css("position","relative");}if(opts.width){$cont.width(opts.width);}if(opts.height&&opts.height!="auto"){$cont.height(opts.height);}if(opts.startingSlide){opts.startingSlide=parseInt(opts.startingSlide);}else{if(opts.backwards){opts.startingSlide=els.length-1;}}if(opts.random){opts.randomMap=[];for(var i=0;i<els.length;i++){opts.randomMap.push(i);}opts.randomMap.sort(function(a,b){return Math.random()-0.5;});opts.randomIndex=1;opts.startingSlide=opts.randomMap[1];}else{if(opts.startingSlide>=els.length){opts.startingSlide=0;}}opts.currSlide=opts.startingSlide||0;var first=opts.startingSlide;$slides.css({position:"absolute",top:0,left:0}).hide().each(function(i){var z;if(opts.backwards){z=first?i<=first?els.length+(i-first):first-i:els.length-i;}else{z=first?i>=first?els.length-(i-first):first-i:els.length-i;}$(this).css("z-index",z);});$(els[first]).css("opacity",1).show();removeFilter(els[first],opts);if(opts.fit&&opts.width){$slides.width(opts.width);}if(opts.fit&&opts.height&&opts.height!="auto"){$slides.height(opts.height);}var reshape=opts.containerResize&&!$cont.innerHeight();if(reshape){var maxw=0,maxh=0;for(var j=0;j<els.length;j++){var $e=$(els[j]),e=$e[0],w=$e.outerWidth(),h=$e.outerHeight();if(!w){w=e.offsetWidth||e.width||$e.attr("width");}if(!h){h=e.offsetHeight||e.height||$e.attr("height");}maxw=w>maxw?w:maxw;maxh=h>maxh?h:maxh;}if(maxw>0&&maxh>0){$cont.css({width:maxw+"px",height:maxh+"px"});}}if(opts.pause){$cont.hover(function(){this.cyclePause++;},function(){this.cyclePause--;});}if(supportMultiTransitions(opts)===false){return false;}var requeue=false;options.requeueAttempts=options.requeueAttempts||0;$slides.each(function(){var $el=$(this);this.cycleH=(opts.fit&&opts.height)?opts.height:($el.height()||this.offsetHeight||this.height||$el.attr("height")||0);this.cycleW=(opts.fit&&opts.width)?opts.width:($el.width()||this.offsetWidth||this.width||$el.attr("width")||0);if($el.is("img")){var loadingIE=($.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete);var loadingFF=($.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete);var loadingOp=($.browser.opera&&((this.cycleW==42&&this.cycleH==19)||(this.cycleW==37&&this.cycleH==17))&&!this.complete);var loadingOther=(this.cycleH==0&&this.cycleW==0&&!this.complete);if(loadingIE||loadingFF||loadingOp||loadingOther){if(o.s&&opts.requeueOnImageNotLoaded&&++options.requeueAttempts<100){log(options.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);setTimeout(function(){$(o.s,o.c).cycle(options);},opts.requeueTimeout);requeue=true;return false;}else{log("could not determine size of image: "+this.src,this.cycleW,this.cycleH);}}}return true;});if(requeue){return false;}opts.cssBefore=opts.cssBefore||{};opts.cssAfter=opts.cssAfter||{};opts.cssFirst=opts.cssFirst||{};opts.animIn=opts.animIn||{};opts.animOut=opts.animOut||{};$slides.not(":eq("+first+")").css(opts.cssBefore);$($slides[first]).css(opts.cssFirst);if(opts.timeout){opts.timeout=parseInt(opts.timeout);if(opts.speed.constructor==String){opts.speed=$.fx.speeds[opts.speed]||parseInt(opts.speed);}if(!opts.sync){opts.speed=opts.speed/2;}var buffer=opts.fx=="none"?0:opts.fx=="shuffle"?500:250;while((opts.timeout-opts.speed)<buffer){opts.timeout+=opts.speed;}}if(opts.easing){opts.easeIn=opts.easeOut=opts.easing;}if(!opts.speedIn){opts.speedIn=opts.speed;}if(!opts.speedOut){opts.speedOut=opts.speed;}opts.slideCount=els.length;opts.currSlide=opts.lastSlide=first;if(opts.random){if(++opts.randomIndex==els.length){opts.randomIndex=0;}opts.nextSlide=opts.randomMap[opts.randomIndex];}else{if(opts.backwards){opts.nextSlide=opts.startingSlide==0?(els.length-1):opts.startingSlide-1;}else{opts.nextSlide=opts.startingSlide>=(els.length-1)?0:opts.startingSlide+1;}}if(!opts.multiFx){var init=$.fn.cycle.transitions[opts.fx];if($.isFunction(init)){init($cont,$slides,opts);}else{if(opts.fx!="custom"&&!opts.multiFx){log("unknown transition: "+opts.fx,"; slideshow terminating");return false;}}}var e0=$slides[first];if(opts.before.length){opts.before[0].apply(e0,[e0,e0,opts,true]);}if(opts.after.length){opts.after[0].apply(e0,[e0,e0,opts,true]);}if(opts.next){$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});}if(opts.prev){$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});}if(opts.pager||opts.pagerAnchorBuilder){buildPager(els,opts);}exposeAddSlide(opts,els);return opts;}function saveOriginalOpts(opts){opts.original={before:[],after:[]};opts.original.cssBefore=$.extend({},opts.cssBefore);opts.original.cssAfter=$.extend({},opts.cssAfter);opts.original.animIn=$.extend({},opts.animIn);opts.original.animOut=$.extend({},opts.animOut);$.each(opts.before,function(){opts.original.before.push(this);});$.each(opts.after,function(){opts.original.after.push(this);});}function supportMultiTransitions(opts){var i,tx,txs=$.fn.cycle.transitions;if(opts.fx.indexOf(",")>0){opts.multiFx=true;opts.fxs=opts.fx.replace(/\s*/g,"").split(",");for(i=0;i<opts.fxs.length;i++){var fx=opts.fxs[i];tx=txs[fx];if(!tx||!txs.hasOwnProperty(fx)||!$.isFunction(tx)){log("discarding unknown transition: ",fx);opts.fxs.splice(i,1);i--;}}if(!opts.fxs.length){log("No valid transitions named; slideshow terminating.");return false;}}else{if(opts.fx=="all"){opts.multiFx=true;opts.fxs=[];for(p in txs){tx=txs[p];if(txs.hasOwnProperty(p)&&$.isFunction(tx)){opts.fxs.push(p);}}}}if(opts.multiFx&&opts.randomizeEffects){var r1=Math.floor(Math.random()*20)+30;for(i=0;i<r1;i++){var r2=Math.floor(Math.random()*opts.fxs.length);opts.fxs.push(opts.fxs.splice(r2,1)[0]);}debug("randomized fx sequence: ",opts.fxs);}return true;}function exposeAddSlide(opts,els){opts.addSlide=function(newSlide,prepend){var $s=$(newSlide),s=$s[0];if(!opts.autostopCount){opts.countdown++;}els[prepend?"unshift":"push"](s);if(opts.els){opts.els[prepend?"unshift":"push"](s);}opts.slideCount=els.length;$s.css("position","absolute");$s[prepend?"prependTo":"appendTo"](opts.$cont);if(prepend){opts.currSlide++;opts.nextSlide++;}if(!$.support.opacity&&opts.cleartype&&!opts.cleartypeNoBg){clearTypeFix($s);}if(opts.fit&&opts.width){$s.width(opts.width);}if(opts.fit&&opts.height&&opts.height!="auto"){$s.height(opts.height);}s.cycleH=(opts.fit&&opts.height)?opts.height:$s.height();s.cycleW=(opts.fit&&opts.width)?opts.width:$s.width();$s.css(opts.cssBefore);if(opts.pager||opts.pagerAnchorBuilder){$.fn.cycle.createPagerAnchor(els.length-1,s,$(opts.pager),els,opts);}if($.isFunction(opts.onAddSlide)){opts.onAddSlide($s);}else{$s.hide();}};}$.fn.cycle.resetState=function(opts,fx){fx=fx||opts.fx;opts.before=[];opts.after=[];opts.cssBefore=$.extend({},opts.original.cssBefore);opts.cssAfter=$.extend({},opts.original.cssAfter);opts.animIn=$.extend({},opts.original.animIn);opts.animOut=$.extend({},opts.original.animOut);opts.fxFn=null;$.each(opts.original.before,function(){opts.before.push(this);});$.each(opts.original.after,function(){opts.after.push(this);});var init=$.fn.cycle.transitions[fx];if($.isFunction(init)){init(opts.$cont,$(opts.elements),opts);}};function go(els,opts,manual,fwd){if(manual&&opts.busy&&opts.manualTrump){debug("manualTrump in go(), stopping active transition");$(els).stop(true,true);opts.busy=0;}if(opts.busy){debug("transition active, ignoring new tx request");return;}var p=opts.$cont[0],curr=els[opts.currSlide],next=els[opts.nextSlide];if(p.cycleStop!=opts.stopCount||p.cycleTimeout===0&&!manual){return;}if(!manual&&!p.cyclePause&&!opts.bounce&&((opts.autostop&&(--opts.countdown<=0))||(opts.nowrap&&!opts.random&&opts.nextSlide<opts.currSlide))){if(opts.end){opts.end(opts);}return;}var changed=false;if((manual||!p.cyclePause)&&(opts.nextSlide!=opts.currSlide)){changed=true;var fx=opts.fx;curr.cycleH=curr.cycleH||$(curr).height();curr.cycleW=curr.cycleW||$(curr).width();next.cycleH=next.cycleH||$(next).height();next.cycleW=next.cycleW||$(next).width();if(opts.multiFx){if(opts.lastFx==undefined||++opts.lastFx>=opts.fxs.length){opts.lastFx=0;}fx=opts.fxs[opts.lastFx];opts.currFx=fx;}if(opts.oneTimeFx){fx=opts.oneTimeFx;opts.oneTimeFx=null;}$.fn.cycle.resetState(opts,fx);if(opts.before.length){$.each(opts.before,function(i,o){if(p.cycleStop!=opts.stopCount){return;}o.apply(next,[curr,next,opts,fwd]);});}var after=function(){opts.busy=0;$.each(opts.after,function(i,o){if(p.cycleStop!=opts.stopCount){return;}o.apply(next,[curr,next,opts,fwd]);});};debug("tx firing("+fx+"); currSlide: "+opts.currSlide+"; nextSlide: "+opts.nextSlide);opts.busy=1;if(opts.fxFn){opts.fxFn(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}else{if($.isFunction($.fn.cycle[opts.fx])){$.fn.cycle[opts.fx](curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}else{$.fn.cycle.custom(curr,next,opts,after,fwd,manual&&opts.fastOnEvent);}}}if(changed||opts.nextSlide==opts.currSlide){opts.lastSlide=opts.currSlide;if(opts.random){opts.currSlide=opts.nextSlide;if(++opts.randomIndex==els.length){opts.randomIndex=0;}opts.nextSlide=opts.randomMap[opts.randomIndex];if(opts.nextSlide==opts.currSlide){opts.nextSlide=(opts.currSlide==opts.slideCount-1)?0:opts.currSlide+1;}}else{if(opts.backwards){var roll=(opts.nextSlide-1)<0;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=1;opts.currSlide=0;}else{opts.nextSlide=roll?(els.length-1):opts.nextSlide-1;opts.currSlide=roll?0:opts.nextSlide+1;}}else{var roll=(opts.nextSlide+1)==els.length;if(roll&&opts.bounce){opts.backwards=!opts.backwards;opts.nextSlide=els.length-2;opts.currSlide=els.length-1;}else{opts.nextSlide=roll?0:opts.nextSlide+1;opts.currSlide=roll?els.length-1:opts.nextSlide-1;}}}}if(changed&&opts.pager){opts.updateActivePagerLink(opts.pager,opts.currSlide,opts.activePagerClass);}var ms=0;if(opts.timeout&&!opts.continuous){ms=getTimeout(els[opts.currSlide],els[opts.nextSlide],opts,fwd);}else{if(opts.continuous&&p.cyclePause){ms=10;}}if(ms>0){p.cycleTimeout=setTimeout(function(){go(els,opts,0,!opts.backwards);},ms);}}$.fn.cycle.updateActivePagerLink=function(pager,currSlide,clsName){$(pager).each(function(){$(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);});};function getTimeout(curr,next,opts,fwd){if(opts.timeoutFn){var t=opts.timeoutFn.call(curr,curr,next,opts,fwd);while(opts.fx!="none"&&(t-opts.speed)<250){t+=opts.speed;}debug("calculated timeout: "+t+"; speed: "+opts.speed);if(t!==false){return t;}}return opts.timeout;}$.fn.cycle.next=function(opts){advance(opts,1);};$.fn.cycle.prev=function(opts){advance(opts,0);};function advance(opts,moveForward){var val=moveForward?1:-1;var els=opts.elements;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}if(opts.random&&val<0){opts.randomIndex--;if(--opts.randomIndex==-2){opts.randomIndex=els.length-2;}else{if(opts.randomIndex==-1){opts.randomIndex=els.length-1;}}opts.nextSlide=opts.randomMap[opts.randomIndex];}else{if(opts.random){opts.nextSlide=opts.randomMap[opts.randomIndex];}else{opts.nextSlide=opts.currSlide+val;if(opts.nextSlide<0){if(opts.nowrap){return false;}opts.nextSlide=els.length-1;}else{if(opts.nextSlide>=els.length){if(opts.nowrap){return false;}opts.nextSlide=0;}}}}var cb=opts.onPrevNextEvent||opts.prevNextClick;if($.isFunction(cb)){cb(val>0,opts.nextSlide,els[opts.nextSlide]);}go(els,opts,1,moveForward);return false;}function buildPager(els,opts){var $p=$(opts.pager);$.each(els,function(i,o){$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);});opts.updateActivePagerLink(opts.pager,opts.startingSlide,opts.activePagerClass);}$.fn.cycle.createPagerAnchor=function(i,el,$p,els,opts){var a;if($.isFunction(opts.pagerAnchorBuilder)){a=opts.pagerAnchorBuilder(i,el);debug("pagerAnchorBuilder("+i+", el) returned: "+a);}else{a='<a href="#">'+(i+1)+"</a>";}if(!a){return;}var $a=$(a);if($a.parents("body").length===0){var arr=[];if($p.length>1){$p.each(function(){var $clone=$a.clone(true);$(this).append($clone);arr.push($clone[0]);});$a=$(arr);}else{$a.appendTo($p);}}opts.pagerAnchors=opts.pagerAnchors||[];opts.pagerAnchors.push($a);$a.bind(opts.pagerEvent,function(e){e.preventDefault();opts.nextSlide=i;var p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout){clearTimeout(timeout);p.cycleTimeout=0;}var cb=opts.onPagerEvent||opts.pagerClick;if($.isFunction(cb)){cb(opts.nextSlide,els[opts.nextSlide]);}go(els,opts,1,opts.currSlide<i);});if(!/^click/.test(opts.pagerEvent)&&!opts.allowPagerClickBubble){$a.bind("click.cycle",function(){return false;});}if(opts.pauseOnPagerHover){$a.hover(function(){opts.$cont[0].cyclePause++;},function(){opts.$cont[0].cyclePause--;});}};$.fn.cycle.hopsFromLast=function(opts,fwd){var hops,l=opts.lastSlide,c=opts.currSlide;if(fwd){hops=c>l?c-l:opts.slideCount-l;}else{hops=c<l?l-c:l+opts.slideCount-c;}return hops;};function clearTypeFix($slides){debug("applying clearType background-color hack");function hex(s){s=parseInt(s).toString(16);return s.length<2?"0"+s:s;}function getBg(e){for(;e&&e.nodeName.toLowerCase()!="html";e=e.parentNode){var v=$.css(e,"background-color");if(v&&v.indexOf("rgb")>=0){var rgb=v.match(/\d+/g);return"#"+hex(rgb[0])+hex(rgb[1])+hex(rgb[2]);}if(v&&v!="transparent"){return v;}}return"#ffffff";}$slides.each(function(){$(this).css("background-color",getBg(this));});}$.fn.cycle.commonReset=function(curr,next,opts,w,h,rev){$(opts.elements).not(curr).hide();if(typeof opts.cssBefore.opacity=="undefined"){opts.cssBefore.opacity=1;}opts.cssBefore.display="block";if(opts.slideResize&&w!==false&&next.cycleW>0){opts.cssBefore.width=next.cycleW;}if(opts.slideResize&&h!==false&&next.cycleH>0){opts.cssBefore.height=next.cycleH;}opts.cssAfter=opts.cssAfter||{};opts.cssAfter.display="none";$(curr).css("zIndex",opts.slideCount+(rev===true?1:0));$(next).css("zIndex",opts.slideCount+(rev===true?0:1));};$.fn.cycle.custom=function(curr,next,opts,cb,fwd,speedOverride){var $l=$(curr),$n=$(next);var speedIn=opts.speedIn,speedOut=opts.speedOut,easeIn=opts.easeIn,easeOut=opts.easeOut;$n.css(opts.cssBefore);if(speedOverride){if(typeof speedOverride=="number"){speedIn=speedOut=speedOverride;}else{speedIn=speedOut=1;}easeIn=easeOut=null;}var fn=function(){$n.animate(opts.animIn,speedIn,easeIn,function(){cb();});};$l.animate(opts.animOut,speedOut,easeOut,function(){$l.css(opts.cssAfter);if(!opts.sync){fn();}});if(opts.sync){fn();}};$.fn.cycle.transitions={fade:function($cont,$slides,opts){$slides.not(":eq("+opts.currSlide+")").css("opacity",0);opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.opacity=0;});opts.animIn={opacity:1};opts.animOut={opacity:0};opts.cssBefore={top:0,left:0};}};$.fn.cycle.ver=function(){return ver;};$.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:false,animIn:null,animOut:null,autostop:0,autostopCount:0,backwards:false,before:null,cleartype:!$.support.opacity,cleartypeNoBg:false,containerResize:1,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:true,next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:true,requeueTimeout:250,rev:0,shuffle:null,slideExpr:null,slideResize:1,speed:1000,speedIn:null,speedOut:null,startingSlide:0,sync:1,timeout:4000,timeoutFn:null,updateActivePagerLink:null};})(jQuery);
 /*
  * jQuery Cycle Plugin Transition Definitions
  * This script is a plugin for the jQuery Cycle Plugin
  * Examples and documentation at: http://malsup.com/jquery/cycle/
  * Copyright (c) 2007-2010 M. Alsup
  * Version:	 2.73
  * Dual licensed under the MIT and GPL licenses:
  * http://www.opensource.org/licenses/mit-license.php
  * http://www.gnu.org/licenses/gpl.html
  */
 (function($){$.fn.cycle.transitions.none=function($cont,$slides,opts){opts.fxFn=function(curr,next,opts,after){$(next).show();$(curr).hide();after();};};$.fn.cycle.transitions.fadeout=function($cont,$slides,opts){$slides.not(":eq("+opts.currSlide+")").css({display:"block",opacity:1});opts.before.push(function(curr,next,opts,w,h,rev){$(curr).css("zIndex",opts.slideCount+(!rev===true?1:0));$(next).css("zIndex",opts.slideCount+(!rev===true?0:1));});opts.animIn.opacity=1;opts.animOut.opacity=0;opts.cssBefore.opacity=1;opts.cssBefore.display="block";opts.cssAfter.zIndex=0;};$.fn.cycle.transitions.scrollUp=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var h=$cont.height();opts.cssBefore.top=h;opts.cssBefore.left=0;opts.cssFirst.top=0;opts.animIn.top=0;opts.animOut.top=-h;};$.fn.cycle.transitions.scrollDown=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var h=$cont.height();opts.cssFirst.top=0;opts.cssBefore.top=-h;opts.cssBefore.left=0;opts.animIn.top=0;opts.animOut.top=h;};$.fn.cycle.transitions.scrollLeft=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var w=$cont.width();opts.cssFirst.left=0;opts.cssBefore.left=w;opts.cssBefore.top=0;opts.animIn.left=0;opts.animOut.left=0-w;};$.fn.cycle.transitions.scrollRight=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push($.fn.cycle.commonReset);var w=$cont.width();opts.cssFirst.left=0;opts.cssBefore.left=-w;opts.cssBefore.top=0;opts.animIn.left=0;opts.animOut.left=w;};$.fn.cycle.transitions.scrollHorz=function($cont,$slides,opts){$cont.css("overflow","hidden").width();opts.before.push(function(curr,next,opts,fwd){if(opts.rev){fwd=!fwd;}$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.left=fwd?(next.cycleW-1):(1-next.cycleW);opts.animOut.left=fwd?-curr.cycleW:curr.cycleW;});opts.cssFirst.left=0;opts.cssBefore.top=0;opts.animIn.left=0;opts.animOut.top=0;};$.fn.cycle.transitions.scrollVert=function($cont,$slides,opts){$cont.css("overflow","hidden");opts.before.push(function(curr,next,opts,fwd){if(opts.rev){fwd=!fwd;}$.fn.cycle.commonReset(curr,next,opts);opts.cssBefore.top=fwd?(1-next.cycleH):(next.cycleH-1);opts.animOut.top=fwd?curr.cycleH:-curr.cycleH;});opts.cssFirst.top=0;opts.cssBefore.left=0;opts.animIn.top=0;opts.animOut.left=0;};$.fn.cycle.transitions.slideX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();$.fn.cycle.commonReset(curr,next,opts,false,true);opts.animIn.width=next.cycleW;});opts.cssBefore.left=0;opts.cssBefore.top=0;opts.cssBefore.width=0;opts.animIn.width="show";opts.animOut.width=0;};$.fn.cycle.transitions.slideY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$(opts.elements).not(curr).hide();$.fn.cycle.commonReset(curr,next,opts,true,false);opts.animIn.height=next.cycleH;});opts.cssBefore.left=0;opts.cssBefore.top=0;opts.cssBefore.height=0;opts.animIn.height="show";opts.animOut.height=0;};$.fn.cycle.transitions.shuffle=function($cont,$slides,opts){var i,w=$cont.css("overflow","visible").width();$slides.css({left:0,top:0});opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);});if(!opts.speedAdjusted){opts.speed=opts.speed/2;opts.speedAdjusted=true;}opts.random=0;opts.shuffle=opts.shuffle||{left:-w,top:15};opts.els=[];for(i=0;i<$slides.length;i++){opts.els.push($slides[i]);}for(i=0;i<opts.currSlide;i++){opts.els.push(opts.els.shift());}opts.fxFn=function(curr,next,opts,cb,fwd){if(opts.rev){fwd=!fwd;}var $el=fwd?$(curr):$(next);$(next).css(opts.cssBefore);var count=opts.slideCount;$el.animate(opts.shuffle,opts.speedIn,opts.easeIn,function(){var hops=$.fn.cycle.hopsFromLast(opts,fwd);for(var k=0;k<hops;k++){fwd?opts.els.push(opts.els.shift()):opts.els.unshift(opts.els.pop());}if(fwd){for(var i=0,len=opts.els.length;i<len;i++){$(opts.els[i]).css("z-index",len-i+count);}}else{var z=$(curr).css("z-index");$el.css("z-index",parseInt(z)+1+count);}$el.animate({left:0,top:0},opts.speedOut,opts.easeOut,function(){$(fwd?this:curr).hide();if(cb){cb();}});});};$.extend(opts.cssBefore,{display:"block",opacity:1,top:0,left:0});};$.fn.cycle.transitions.turnUp=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.cssBefore.top=next.cycleH;opts.animIn.height=next.cycleH;opts.animOut.width=next.cycleW;});opts.cssFirst.top=0;opts.cssBefore.left=0;opts.cssBefore.height=0;opts.animIn.top=0;opts.animOut.height=0;};$.fn.cycle.transitions.turnDown=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssFirst.top=0;opts.cssBefore.left=0;opts.cssBefore.top=0;opts.cssBefore.height=0;opts.animOut.height=0;};$.fn.cycle.transitions.turnLeft=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.cssBefore.left=next.cycleW;opts.animIn.width=next.cycleW;});opts.cssBefore.top=0;opts.cssBefore.width=0;opts.animIn.left=0;opts.animOut.width=0;};$.fn.cycle.transitions.turnRight=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});$.extend(opts.cssBefore,{top:0,left:0,width:0});opts.animIn.left=0;opts.animOut.width=0;};$.fn.cycle.transitions.zoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false,true);opts.cssBefore.top=next.cycleH/2;opts.cssBefore.left=next.cycleW/2;$.extend(opts.animIn,{top:0,left:0,width:next.cycleW,height:next.cycleH});$.extend(opts.animOut,{width:0,height:0,top:curr.cycleH/2,left:curr.cycleW/2});});opts.cssFirst.top=0;opts.cssFirst.left=0;opts.cssBefore.width=0;opts.cssBefore.height=0;};$.fn.cycle.transitions.fadeZoom=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,false);opts.cssBefore.left=next.cycleW/2;opts.cssBefore.top=next.cycleH/2;$.extend(opts.animIn,{top:0,left:0,width:next.cycleW,height:next.cycleH});});opts.cssBefore.width=0;opts.cssBefore.height=0;opts.animOut.opacity=0;};$.fn.cycle.transitions.blindX=function($cont,$slides,opts){var w=$cont.css("overflow","hidden").width();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.width=next.cycleW;opts.animOut.left=curr.cycleW;});opts.cssBefore.left=w;opts.cssBefore.top=0;opts.animIn.left=0;opts.animOut.left=w;};$.fn.cycle.transitions.blindY=function($cont,$slides,opts){var h=$cont.css("overflow","hidden").height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssBefore.top=h;opts.cssBefore.left=0;opts.animIn.top=0;opts.animOut.top=h;};$.fn.cycle.transitions.blindZ=function($cont,$slides,opts){var h=$cont.css("overflow","hidden").height();var w=$cont.width();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH;});opts.cssBefore.top=h;opts.cssBefore.left=w;opts.animIn.top=0;opts.animIn.left=0;opts.animOut.top=h;opts.animOut.left=w;};$.fn.cycle.transitions.growX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true);opts.cssBefore.left=this.cycleW/2;opts.animIn.left=0;opts.animIn.width=this.cycleW;opts.animOut.left=0;});opts.cssBefore.top=0;opts.cssBefore.width=0;};$.fn.cycle.transitions.growY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false);opts.cssBefore.top=this.cycleH/2;opts.animIn.top=0;opts.animIn.height=this.cycleH;opts.animOut.top=0;});opts.cssBefore.height=0;opts.cssBefore.left=0;};$.fn.cycle.transitions.curtainX=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,false,true,true);opts.cssBefore.left=next.cycleW/2;opts.animIn.left=0;opts.animIn.width=this.cycleW;opts.animOut.left=curr.cycleW/2;opts.animOut.width=0;});opts.cssBefore.top=0;opts.cssBefore.width=0;};$.fn.cycle.transitions.curtainY=function($cont,$slides,opts){opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,false,true);opts.cssBefore.top=next.cycleH/2;opts.animIn.top=0;opts.animIn.height=next.cycleH;opts.animOut.top=curr.cycleH/2;opts.animOut.height=0;});opts.cssBefore.height=0;opts.cssBefore.left=0;};$.fn.cycle.transitions.cover=function($cont,$slides,opts){var d=opts.direction||"left";var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts);if(d=="right"){opts.cssBefore.left=-w;}else{if(d=="up"){opts.cssBefore.top=h;}else{if(d=="down"){opts.cssBefore.top=-h;}else{opts.cssBefore.left=w;}}}});opts.animIn.left=0;opts.animIn.top=0;opts.cssBefore.top=0;opts.cssBefore.left=0;};$.fn.cycle.transitions.uncover=function($cont,$slides,opts){var d=opts.direction||"left";var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);if(d=="right"){opts.animOut.left=w;}else{if(d=="up"){opts.animOut.top=-h;}else{if(d=="down"){opts.animOut.top=h;}else{opts.animOut.left=-w;}}}});opts.animIn.left=0;opts.animIn.top=0;opts.cssBefore.top=0;opts.cssBefore.left=0;};$.fn.cycle.transitions.toss=function($cont,$slides,opts){var w=$cont.css("overflow","visible").width();var h=$cont.height();opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts,true,true,true);if(!opts.animOut.left&&!opts.animOut.top){$.extend(opts.animOut,{left:w*2,top:-h/2,opacity:0});}else{opts.animOut.opacity=0;}});opts.cssBefore.left=0;opts.cssBefore.top=0;opts.animIn.left=0;};$.fn.cycle.transitions.wipe=function($cont,$slides,opts){var w=$cont.css("overflow","hidden").width();var h=$cont.height();opts.cssBefore=opts.cssBefore||{};var clip;if(opts.clip){if(/l2r/.test(opts.clip)){clip="rect(0px 0px "+h+"px 0px)";}else{if(/r2l/.test(opts.clip)){clip="rect(0px "+w+"px "+h+"px "+w+"px)";}else{if(/t2b/.test(opts.clip)){clip="rect(0px "+w+"px 0px 0px)";}else{if(/b2t/.test(opts.clip)){clip="rect("+h+"px "+w+"px "+h+"px 0px)";}else{if(/zoom/.test(opts.clip)){var top=parseInt(h/2);var left=parseInt(w/2);clip="rect("+top+"px "+left+"px "+top+"px "+left+"px)";}}}}}}opts.cssBefore.clip=opts.cssBefore.clip||clip||"rect(0px 0px 0px 0px)";var d=opts.cssBefore.clip.match(/(\d+)/g);var t=parseInt(d[0]),r=parseInt(d[1]),b=parseInt(d[2]),l=parseInt(d[3]);opts.before.push(function(curr,next,opts){if(curr==next){return;}var $curr=$(curr),$next=$(next);$.fn.cycle.commonReset(curr,next,opts,true,true,false);opts.cssAfter.display="block";var step=1,count=parseInt((opts.speedIn/13))-1;(function f(){var tt=t?t-parseInt(step*(t/count)):0;var ll=l?l-parseInt(step*(l/count)):0;var bb=b<h?b+parseInt(step*((h-b)/count||1)):h;var rr=r<w?r+parseInt(step*((w-r)/count||1)):w;$next.css({clip:"rect("+tt+"px "+rr+"px "+bb+"px "+ll+"px)"});(step++<=count)?setTimeout(f,13):$curr.css("display","none");})();});$.extend(opts.cssBefore,{display:"block",opacity:1,top:0,left:0});opts.animIn={left:0};opts.animOut={left:0};};})(jQuery);;
 /**
  *  @file
  *  A simple jQuery Cycle Div Slideshow Rotator.
  */
 
 /**
  * This will set our initial behavior, by starting up each individual slideshow.
  */
 (function ($) {
   Drupal.behaviors.viewsSlideshowCycle = {
     attach: function (context) {
       $('.views_slideshow_cycle_main:not(.viewsSlideshowCycle-processed)', context).addClass('viewsSlideshowCycle-processed').each(function() {
         var fullId = '#' + $(this).attr('id');
         var settings = Drupal.settings.viewsSlideshowCycle[fullId];
         settings.targetId = '#' + $(fullId + " :first").attr('id');
 
         settings.slideshowId = settings.targetId.replace('#views_slideshow_cycle_teaser_section_', '');
         // Pager after function.
         var pager_after_fn = function(curr, next, opts) {
           // Need to do some special handling on first load.
           var slideNum = opts.currSlide;
           if (typeof settings.processedAfter == 'undefined' || !settings.processedAfter) {
             settings.processedAfter = 1;
             slideNum = (typeof settings.opts.startingSlide == 'undefined') ? 0 : settings.opts.startingSlide;
           }
           if (settings.pause_after_slideshow) {
             opts.counter += 1;
             if (opts.counter == settings.num_divs + 1) {
               opts.counter = 1;
               Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId, "force": true });
             }
           }
           Drupal.viewsSlideshow.action({ "action": 'transitionEnd', "slideshowID": settings.slideshowId, "slideNum": slideNum });
         }
         // Pager before function.
         var pager_before_fn = function(curr, next, opts) {
           $(document).trigger('drupal:views_slideshow_cycle:before', {
             curr: curr, next: next, opts: opts, settings: settings
           });
 
           var slideNum = opts.nextSlide;
 
           // Remember last slide.
           if (settings.remember_slide) {
             createCookie(settings.vss_id, slideNum, settings.remember_slide_days);
           }
 
           // Make variable height.
           if (!settings.fixed_height) {
             //get the height of the current slide
             var $ht = $(next).height();
             //set the container's height to that of the current slide
             $(next).parent().animate({height: $ht});
           }
 
           // Need to do some special handling on first load.
           if (typeof settings.processedBefore == 'undefined' || !settings.processedBefore) {
             settings.processedBefore = 1;
             slideNum = (typeof opts.startingSlide == 'undefined') ? 0 : opts.startingSlide;
           }
 
           Drupal.viewsSlideshow.action({ "action": 'transitionBegin', "slideshowID": settings.slideshowId, "slideNum": slideNum });
         }
         settings.loaded = false;
 
         settings.opts = {
           speed:settings.speed,
           timeout:settings.timeout,
           delay:settings.delay,
           sync:settings.sync,
           random:settings.random,
           nowrap:settings.nowrap,
           pause_after_slideshow:settings.pause_after_slideshow,
           counter:0,
           after:pager_after_fn,
           before:pager_before_fn,
           cleartype:(settings.cleartype)? true : false,
           cleartypeNoBg:(settings.cleartypenobg)? true : false
         }
 
         // Set the starting slide if we are supposed to remember the slide
         if (settings.remember_slide) {
           var startSlide = readCookie(settings.vss_id);
           if (startSlide == null) {
             startSlide = 0;
           }
           settings.opts.startingSlide = parseInt(startSlide);
         }
 
         if (settings.effect == 'none') {
           settings.opts.speed = 1;
         }
         else {
           settings.opts.fx = settings.effect;
         }
 
         // Take starting item from fragment.
         var hash = location.hash;
         if (hash) {
           var hash = hash.replace('#', '');
           var aHash = hash.split(';');
           var aHashLen = aHash.length;
 
           // Loop through all the possible starting points.
           for (var i = 0; i < aHashLen; i++) {
             // Split the hash into two parts. One part is the slideshow id the
             // other is the slide number.
             var initialInfo = aHash[i].split(':');
             // The id in the hash should match our slideshow.
             // The slide number chosen shouldn't be larger than the number of
             // slides we have.
             if (settings.slideshowId == initialInfo[0] && settings.num_divs > initialInfo[1]) {
               settings.opts.startingSlide = parseInt(initialInfo[1]);
             }
           }
         }
 
         // Pause on hover.
         if (settings.pause) {
           var mouseIn = function() {
             Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId });
           }
 
           var mouseOut = function() {
             Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": settings.slideshowId });
           }
 
           if (jQuery.fn.hoverIntent) {
             $('#views_slideshow_cycle_teaser_section_' + settings.vss_id).hoverIntent(mouseIn, mouseOut);
           }
           else {
             $('#views_slideshow_cycle_teaser_section_' + settings.vss_id).hover(mouseIn, mouseOut);
           }
         }
 
         // Play on hover.
         if (settings.play_on_hover) {
           var mouseIn = function() {
             Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": settings.slideshowId, "force": true });
           }
 
           var mouseOut = function() {
             Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId });
           }
 
           if (jQuery.fn.hoverIntent) {
             $('#views_slideshow_cycle_teaser_section_' + settings.vss_id).hoverIntent(mouseIn, mouseOut);
           }
           else {
             $('#views_slideshow_cycle_teaser_section_' + settings.vss_id).hover(mouseIn, mouseOut);
           }
         }
 
         // Pause on clicking of the slide.
         if (settings.pause_on_click) {
           $('#views_slideshow_cycle_teaser_section_' + settings.vss_id).click(function() {
             Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId, "force": true });
           });
         }
 
         if (typeof JSON != 'undefined') {
           var advancedOptions = JSON.parse(settings.advanced_options);
           for (var option in advancedOptions) {
             switch(option) {
 
               // Standard Options
               case "activePagerClass":
               case "allowPagerClickBubble":
               case "autostop":
               case "autostopCount":
               case "backwards":
               case "bounce":
               case "cleartype":
               case "cleartypeNoBg":
               case "containerResize":
               case "continuous":
               case "delay":
               case "easeIn":
               case "easeOut":
               case "easing":
               case "fastOnEvent":
               case "fit":
               case "fx":
               case "manualTrump":
               case "metaAttr":
               case "next":
               case "nowrap":
               case "pager":
               case "pagerEvent":
               case "pause":
               case "pauseOnPagerHover":
               case "prev":
               case "prevNextEvent":
               case "random":
               case "randomizeEffects":
               case "requeueOnImageNotLoaded":
               case "requeueTimeout":
               case "rev":
               case "slideExpr":
               case "slideResize":
               case "speed":
               case "speedIn":
               case "speedOut":
               case "startingSlide":
               case "sync":
               case "timeout":
                 var optionValue = advancedOptions[option];
                 optionValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(optionValue);
                 settings.opts[option] = optionValue;
                 break;
 
               // If width is set we need to disable resizing.
               case "width":
                 var optionValue = advancedOptions["width"];
                 optionValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(optionValue);
                 settings.opts["width"] = optionValue;
                 settings.opts["containerResize"] = 0;
                 break;
 
               // If height is set we need to set fixed_height to true.
               case "height":
                 var optionValue = advancedOptions["height"];
                 optionValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(optionValue);
                 settings.opts["height"] = optionValue;
                 settings.fixed_height = 1;
                 break;
 
               // These process options that look like {top:50, bottom:20}
               case "animIn":
               case "animInDelay":
               case "animOut":
               case "animOutDelay":
               case "cssBefore":
               case "cssAfter":
               case "shuffle":
                 var cssValue = advancedOptions[option];
                 cssValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(cssValue);
                 settings.opts[option] = eval('(' + cssValue + ')');
                 break;
 
               // These options have their own functions.
               case "after":
                 var afterValue = advancedOptions[option];
                 afterValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(afterValue);
                 // transition callback (scope set to element that was shown): function(currSlideElement, nextSlideElement, options, forwardFlag)
                 settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                   pager_after_fn(currSlideElement, nextSlideElement, options);
                   eval(afterValue);
                 }
                 break;
 
               case "before":
                 var beforeValue = advancedOptions[option];
                 beforeValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(beforeValue);
                 // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
                 settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                   pager_before_fn(currSlideElement, nextSlideElement, options);
                   eval(beforeValue);
                 }
                 break;
 
               case "end":
                 var endValue = advancedOptions[option];
                 endValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(endValue);
                 // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
                 settings.opts[option] = function(options) {
                   eval(endValue);
                 }
                 break;
 
               case "fxFn":
                 var fxFnValue = advancedOptions[option];
                 fxFnValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(fxFnValue);
                 // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
                 settings.opts[option] = function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag) {
                   eval(fxFnValue);
                 }
                 break;
 
               case "onPagerEvent":
                 var onPagerEventValue = advancedOptions[option];
                 onPagerEventValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(onPagerEventValue);
                 settings.opts[option] = function(zeroBasedSlideIndex, slideElement) {
                   eval(onPagerEventValue);
                 }
                 break;
 
               case "onPrevNextEvent":
                 var onPrevNextEventValue = advancedOptions[option];
                 onPrevNextEventValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(onPrevNextEventValue);
                 settings.opts[option] = function(isNext, zeroBasedSlideIndex, slideElement) {
                   eval(onPrevNextEventValue);
                 }
                 break;
 
               case "pagerAnchorBuilder":
                 var pagerAnchorBuilderValue = advancedOptions[option];
                 pagerAnchorBuilderValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(pagerAnchorBuilderValue);
                 // callback fn for building anchor links:  function(index, DOMelement)
                 settings.opts[option] = function(index, DOMelement) {
                   var returnVal = '';
                   eval(pagerAnchorBuilderValue);
                   return returnVal;
                 }
                 break;
 
               case "pagerClick":
                 var pagerClickValue = advancedOptions[option];
                 pagerClickValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(pagerClickValue);
                 // callback fn for pager clicks:    function(zeroBasedSlideIndex, slideElement)
                 settings.opts[option] = function(zeroBasedSlideIndex, slideElement) {
                   eval(pagerClickValue);
                 }
                 break;
 
               case "paused":
                 var pausedValue = advancedOptions[option];
                 pausedValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(pausedValue);
                 // undocumented callback when slideshow is paused:    function(cont, opts, byHover)
                 settings.opts[option] = function(cont, opts, byHover) {
                   eval(pausedValue);
                 }
                 break;
 
               case "resumed":
                 var resumedValue = advancedOptions[option];
                 resumedValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(resumedValue);
                 // undocumented callback when slideshow is resumed:    function(cont, opts, byHover)
                 settings.opts[option] = function(cont, opts, byHover) {
                   eval(resumedValue);
                 }
                 break;
 
               case "timeoutFn":
                 var timeoutFnValue = advancedOptions[option];
                 timeoutFnValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(timeoutFnValue);
                 settings.opts[option] = function(currSlideElement, nextSlideElement, options, forwardFlag) {
                   // Set a sane return value unless function overrides it.
                   var returnVal = settings.timeout;
                   eval(timeoutFnValue);
                   return returnVal;
                 }
                 break;
 
               case "updateActivePagerLink":
                 var updateActivePagerLinkValue = advancedOptions[option];
                 updateActivePagerLinkValue = Drupal.viewsSlideshowCycle.advancedOptionCleanup(updateActivePagerLinkValue);
                 // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
                 settings.opts[option] = function(pager, currSlideIndex) {
                   eval(updateActivePagerLinkValue);
                 }
                 break;
             }
           }
         }
 
         // If selected wait for the images to be loaded.
         // otherwise just load the slideshow.
         if (settings.wait_for_image_load) {
           // For IE/Chrome/Opera we if there are images then we need to make
           // sure the images are loaded before starting the slideshow.
           settings.totalImages = $(settings.targetId + ' img').length;
           if (settings.totalImages) {
             settings.loadedImages = 0;
 
             // Add a load event for each image.
             $(settings.targetId + ' img').each(function() {
               var $imageElement = $(this);
               $imageElement.bind('load', function () {
                 Drupal.viewsSlideshowCycle.imageWait(fullId);
               });
 
               // Removing the source and adding it again will fire the load event.
               var imgSrc = $imageElement.attr('src');
               $imageElement.attr('src', '');
               $imageElement.attr('src', imgSrc);
             });
 
             // We need to set a timeout so that the slideshow doesn't wait
             // indefinitely for all images to load.
             setTimeout("Drupal.viewsSlideshowCycle.load('" + fullId + "')", settings.wait_for_image_load_timeout);
           }
           else {
             Drupal.viewsSlideshowCycle.load(fullId);
           }
         }
         else {
           Drupal.viewsSlideshowCycle.load(fullId);
         }
       });
     }
   };
 
   /**
    * Views Slideshow swipe support.
    */
   Drupal.behaviors.viewsSlideshowSwipe = {
     attach: function (context) {
       var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
       if (isTouch === true && $('.views-slideshow-cycle-main-frame').length) {
         var $slider = $('.views-slideshow-cycle-main-frame'),
           opts = {
             start: {x: 0, y: 0},
             end: {x: 0, y: 0},
             hdiff: 0,
             vdiff: 0,
             length: 0,
             angle: null,
             direction: null,
           },
           optsReset = $.extend(true, {}, opts),
          H_THRESHOLD =  110, // roughly one inch effective resolution on ipad
          V_THRESHOLD = 50;
         $slider.data('bw', opts)
         .bind('touchstart.cycle', function (e) {
           var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
           if (e.originalEvent.touches.length == 1) {
             var data = $(this).data('bw');
             data.start.x = touch.pageX;
             data.start.y = touch.pageY;
             $(this).data('bw', data);
           }
         })
         .bind('touchend.cycle', function (e) {
           var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
           var data = $(this).data('bw');
           data.end.x = touch.pageX;
           data.end.y = touch.pageY;
           $(this).data('bw', data);
           if (data.start.x != 0 && data.start.y != 0) {
             data.vdiff = data.start.x - data.end.x;
             data.hdiff = data.end.y - data.start.y;
             if (Math.abs(data.vdiff) == data.start.x && Math.abs(data.hdiff) == data.start.y) {
               data.vdiff = 0;
               data.hdiff = 0;
             }
             var length = Math.round(Math.sqrt(Math.pow(data.vdiff,2) + Math.pow(data.hdiff,2)));
             var rads = Math.atan2(data.hdiff, data.vdiff);
             var angle = Math.round(rads*180/Math.PI);
             if (angle < 0) { angle = 360 - Math.abs(angle); }
             if (length > H_THRESHOLD && V_THRESHOLD > data.hdiff) {
               e.preventDefault();
               if (angle > 135 && angle < 225) {
                 var cyopt = $slider.data('cycle.opts');
                 if (cyopt.currSlide > 0) {
                   $slider.cycle((cyopt.currSlide - 1), 'scrollRight');
                 }
                 else {
                    $slider.cycle((cyopt.slideCount - 1), 'scrollRight');
                 }
               }
               else if (angle > 315 || angle < 45) {
                 $slider.cycle('next');
               }
             }
           }
           data = $.extend(true, {}, optsReset);
         });
       }
     }
   };
 
   Drupal.viewsSlideshowCycle = Drupal.viewsSlideshowCycle || {};
 
   // Cleanup the values of advanced options.
   Drupal.viewsSlideshowCycle.advancedOptionCleanup = function(value) {
     value = $.trim(value);
     value = value.replace(/\n/g, '');
     if (value.match(/^[\d.]+%$/)) {
       // noop
     }
     else if (!isNaN(parseInt(value))) {
       value = parseInt(value);
     }
     else if (value.toLowerCase() == 'true') {
       value = true;
     }
     else if (value.toLowerCase() == 'false') {
       value = false;
     }
 
     return value;
   }
 
   // This checks to see if all the images have been loaded.
   // If they have then it starts the slideshow.
   Drupal.viewsSlideshowCycle.imageWait = function(fullId) {
     if (++Drupal.settings.viewsSlideshowCycle[fullId].loadedImages == Drupal.settings.viewsSlideshowCycle[fullId].totalImages) {
       Drupal.viewsSlideshowCycle.load(fullId);
     }
   };
 
   // Start the slideshow.
   Drupal.viewsSlideshowCycle.load = function (fullId) {
     var settings = Drupal.settings.viewsSlideshowCycle[fullId];
 
     // Make sure the slideshow isn't already loaded.
     if (!settings.loaded) {
       $(settings.targetId).cycle(settings.opts);
       $(settings.targetId).parent().parent().addClass('views-slideshow-cycle-processed');
       settings.loaded = true;
 
       // Start Paused
       if (settings.start_paused) {
         Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId, "force": true });
       }
 
       // Pause if hidden.
       if (settings.pause_when_hidden) {
         var checkPause = function(settings) {
           // If the slideshow is visible and it is paused then resume.
           // otherwise if the slideshow is not visible and it is not paused then
           // pause it.
           var visible = viewsSlideshowCycleIsVisible(settings.targetId, settings.pause_when_hidden_type, settings.amount_allowed_visible);
           if (visible) {
             Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": settings.slideshowId });
           }
           else {
             Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": settings.slideshowId });
           }
         }
 
         // Check when scrolled.
         $(window).scroll(function() {
          checkPause(settings);
         });
 
         // Check when the window is resized.
         $(window).resize(function() {
           checkPause(settings);
         });
       }
     }
   };
 
   Drupal.viewsSlideshowCycle.pause = function (options) {
     //Eat TypeError, cycle doesn't handle pause well if options isn't defined.
     try{
       if (options.pause_in_middle && $.fn.pause) {
         $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).pause();
       }
       else {
         $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle('pause');
       }
     }
     catch(e){
       if(!e instanceof TypeError){
         throw e;
       }
     }
   };
 
   Drupal.viewsSlideshowCycle.play = function (options) {
     Drupal.settings.viewsSlideshowCycle['#views_slideshow_cycle_main_' + options.slideshowID].paused = false;
     if (options.pause_in_middle && $.fn.resume) {
       $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).resume();
     }
     else {
       $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle('resume');
     }
   };
 
   Drupal.viewsSlideshowCycle.previousSlide = function (options) {
     $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle('prev');
   };
 
   Drupal.viewsSlideshowCycle.nextSlide = function (options) {
     $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle('next');
   };
 
   Drupal.viewsSlideshowCycle.goToSlide = function (options) {
     $('#views_slideshow_cycle_teaser_section_' + options.slideshowID).cycle(options.slideNum);
   };
 
   // Verify that the value is a number.
   function IsNumeric(sText) {
     var ValidChars = "0123456789";
     var IsNumber=true;
     var Char;
 
     for (var i=0; i < sText.length && IsNumber == true; i++) {
       Char = sText.charAt(i);
       if (ValidChars.indexOf(Char) == -1) {
         IsNumber = false;
       }
     }
     return IsNumber;
   }
 
   /**
    * Cookie Handling Functions
    */
   function createCookie(name,value,days) {
     if (days) {
       var date = new Date();
       date.setTime(date.getTime()+(days*24*60*60*1000));
       var expires = "; expires="+date.toGMTString();
     }
     else {
       var expires = "";
     }
     document.cookie = name+"="+value+expires+"; path=/";
   }
 
   function readCookie(name) {
     var nameEQ = name + "=";
     var ca = document.cookie.split(';');
     for(var i=0;i < ca.length;i++) {
       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1,c.length);
       if (c.indexOf(nameEQ) == 0) {
         return c.substring(nameEQ.length,c.length);
       }
     }
     return null;
   }
 
   function eraseCookie(name) {
     createCookie(name,"",-1);
   }
 
   /**
    * Checks to see if the slide is visible enough.
    * elem = element to check.
    * type = The way to calculate how much is visible.
    * amountVisible = amount that should be visible. Either in percent or px. If
    *                it's not defined then all of the slide must be visible.
    *
    * Returns true or false
    */
   function viewsSlideshowCycleIsVisible(elem, type, amountVisible) {
     // Get the top and bottom of the window;
     var docViewTop = $(window).scrollTop();
     var docViewBottom = docViewTop + $(window).height();
     var docViewLeft = $(window).scrollLeft();
     var docViewRight = docViewLeft + $(window).width();
 
     // Get the top, bottom, and height of the slide;
     var elemTop = $(elem).offset().top;
     var elemHeight = $(elem).height();
     var elemBottom = elemTop + elemHeight;
     var elemLeft = $(elem).offset().left;
     var elemWidth = $(elem).width();
     var elemRight = elemLeft + elemWidth;
     var elemArea = elemHeight * elemWidth;
 
     // Calculate what's hiding in the slide.
     var missingLeft = 0;
     var missingRight = 0;
     var missingTop = 0;
     var missingBottom = 0;
 
     // Find out how much of the slide is missing from the left.
     if (elemLeft < docViewLeft) {
       missingLeft = docViewLeft - elemLeft;
     }
 
     // Find out how much of the slide is missing from the right.
     if (elemRight > docViewRight) {
       missingRight = elemRight - docViewRight;
     }
 
     // Find out how much of the slide is missing from the top.
     if (elemTop < docViewTop) {
       missingTop = docViewTop - elemTop;
     }
 
     // Find out how much of the slide is missing from the bottom.
     if (elemBottom > docViewBottom) {
       missingBottom = elemBottom - docViewBottom;
     }
 
     // If there is no amountVisible defined then check to see if the whole slide
     // is visible.
     if (type == 'full') {
       return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
       && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop)
       && (elemLeft >= docViewLeft) && (elemRight <= docViewRight)
       && (elemLeft <= docViewRight) && (elemRight >= docViewLeft));
     }
     else if(type == 'vertical') {
       var verticalShowing = elemHeight - missingTop - missingBottom;
 
       // If user specified a percentage then find out if the current shown percent
       // is larger than the allowed percent.
       // Otherwise check to see if the amount of px shown is larger than the
       // allotted amount.
       if (typeof amountVisible === 'string' && amountVisible.indexOf('%')) {
         return (((verticalShowing/elemHeight)*100) >= parseInt(amountVisible));
       }
       else {
         return (verticalShowing >= parseInt(amountVisible));
       }
     }
     else if(type == 'horizontal') {
       var horizontalShowing = elemWidth - missingLeft - missingRight;
 
       // If user specified a percentage then find out if the current shown percent
       // is larger than the allowed percent.
       // Otherwise check to see if the amount of px shown is larger than the
       // allotted amount.
       if (typeof amountVisible === 'string' && amountVisible.indexOf('%')) {
         return (((horizontalShowing/elemWidth)*100) >= parseInt(amountVisible));
       }
       else {
         return (horizontalShowing >= parseInt(amountVisible));
       }
     }
     else if(type == 'area') {
       var areaShowing = (elemWidth - missingLeft - missingRight) * (elemHeight - missingTop - missingBottom);
 
       // If user specified a percentage then find out if the current shown percent
       // is larger than the allowed percent.
       // Otherwise check to see if the amount of px shown is larger than the
       // allotted amount.
       if (typeof amountVisible === 'string' && amountVisible.indexOf('%')) {
         return (((areaShowing/elemArea)*100) >= parseInt(amountVisible));
       }
       else {
         return (areaShowing >= parseInt(amountVisible));
       }
     }
   }
 })(jQuery);
 ;
 /*
 * vertical news ticker
 * Tadas Juozapaitis ( kasp3rito@gmail.com )
 * http://plugins.jquery.com/project/vTicker
 */
 (function(a){a.fn.vTicker=function(b){var c={speed:700,pause:4000,showItems:3,animation:"",mousePause:true,isPaused:false,direction:"up",height:0};var b=a.extend(c,b);moveUp=function(g,d,e){if(e.isPaused){return}var f=g.children("ul");var h=f.children("li:first").clone(true);if(e.height>0){d=f.children("li:first").height()}f.animate({top:"-="+d+"px"},e.speed,function(){a(this).children("li:first").remove();a(this).css("top","0px")});if(e.animation=="fade"){f.children("li:first").fadeOut(e.speed);if(e.height==0){f.children("li:eq("+e.showItems+")").hide().fadeIn(e.speed)}}h.appendTo(f)};moveDown=function(g,d,e){if(e.isPaused){return}var f=g.children("ul");var h=f.children("li:last").clone(true);if(e.height>0){d=f.children("li:first").height()}f.css("top","-"+d+"px").prepend(h);f.animate({top:0},e.speed,function(){a(this).children("li:last").remove()});if(e.animation=="fade"){if(e.height==0){f.children("li:eq("+e.showItems+")").fadeOut(e.speed)}f.children("li:first").hide().fadeIn(e.speed)}};return this.each(function(){var f=a(this);var e=0;f.css({overflow:"hidden",position:"relative"}).children("ul").css({position:"absolute",margin:0,padding:0}).children("li").css({margin:0,padding:0});if(b.height==0){f.children("ul").children("li").each(function(){if(a(this).height()>e){e=a(this).height()}});f.children("ul").children("li").each(function(){a(this).height(e)});f.height(e*b.showItems)}else{f.height(b.height)}var d=setInterval(function(){if(b.direction=="up"){moveUp(f,e,b)}else{moveDown(f,e,b)}},b.pause);if(b.mousePause){f.bind("mouseenter",function(){b.isPaused=true}).bind("mouseleave",function(){b.isPaused=false})}})}})(jQuery);;
 Toucan
 Over 100 word limit
 We’re working to increase this limit and keep load times short. In the meantime, try highlighting up to 100 words at one time to translate.
 Don’t show again