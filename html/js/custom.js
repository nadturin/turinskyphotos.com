$(function() {
    var current_url = $(location).attr('href');

    $('body').waitForImages({
        finished: function() {

            setTimeout(function() {
                $('header').removeClass('first-load');
                setTimeout(function() {
                    $('#header-wrapper').animate({
                        opacity: 1
                    }, 200);
                }, 200);
                openWebsite();
            }, 1000);
        },
        waitForAll: true
    });


    function openWebsite() {
        $("header").removeClass("hbg");
        initScripts();
        setTimeout(function() {
            $(".dyfac-mask").fadeOut(500);
        }, 1000);

    }

    function initScripts() {

        $(document).ready(function() {
            HeaderBackground();
            HideShowMenu();
            MenuOverlay();
            MenuOverlay();
            HeroHeight();
            HeroParallax();
            MasonryPortfolio();
            ToggleSecondaryMenu();
        });

        $(window).ready(function() {
            MenuOverlayResponsive();
        });

        $(window).on('resize', function() {
            MenuOverlayResponsive();
            HeroHeight();
        });

    }




    /*========================*/
    /* page size */
    /*========================*/
    function pageCalculations() {
        winW = $(window).width();
        winH = $(window).height();
        footTop = ($('foot').length) ? $('foot').offset().top : 0;
        if ($('.pt-detail-related-go').length) footTop = $('.pt-detail-related-go').offset().top;
        if ($('.menu-butt').is(':visible')) _isresponsive = true;
        else _isresponsive = false;
        $('.page-height').css({
            'height': winH,
            'min-height': (winH < 480) ? 480 : winH
        });
        if (winH <= 600) $('body').addClass('min-height');
        else $('body').removeClass('min-height');
        $('.rotate').each(function() {
            $(this).css({
                'width': $(this).parent().height()
            });
        });
    }

    $('.input').each(function() {
        if ($(this).val() !== '') $(this).parent().addClass('focus');
    });
    if (_ismobile) $('body').addClass('mobile');
    pageCalculations();

    /*============================*/
    /* load */
    /*============================*/
    $(window).load(function() {
        initSwiper();
        $('body').addClass('loaded');
        $('#loader-wrapper').fadeOut();
        setTimeout(function() {
            pageCalculations();
            scrollCall();
        }, 0);
    });

    /*==============================*/
    /* resize */
    /*==============================*/
    function resizeCall() {
        pageCalculations();
    }
    if (!_ismobile) {
        $(window).resize(function() {
            resizeCall();
        });
    } else {
        window.addEventListener("orientationchange", function() {
            resizeCall();
        }, false);
    }

    /*==============================*/
    /* scroll */
    /*==============================*/
    $(window).scroll(function() {
        scrollCall();
    });

    function scrollCall() {
        winScr = $(window).scrollTop();
        if (winScr > ((winW >= 992) ? 100 : 50)) $('header.fixed').addClass('scrolled');
        else $('header.fixed').removeClass('scrolled');
        if ($('.h-4-slider-navigation').length) {
            if (winScr + winH - 115 >= footTop) $('.h-4-slider-navigation .rotate').css({
                'margin-top': (-1) * (winScr + winH - footTop - 115)
            });
            else $('.h-4-slider-navigation .rotate').css({
                'margin-top': '0px'
            });
        }
    }

    /*==============================*/
    /* header */
    /*==============================*/

    function HeaderBackground() {

        if ($("#hero").length <= 0) {
            $("#secondary-menu").removeClass("hide-secondary");
            $("header").addClass("hbg");
        };

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= $("#hero").height()) {
                $("header").addClass("hbg");
                $("#secondary-menu").removeClass("hide-secondary");
            } else {
                $("header").removeClass("hbg");
                $("#secondary-menu").addClass("hide-secondary");
            }
        });

    }

    /*=====================*/
    /* menu overlay */
    /*=====================*/

    function MenuOverlay() {

        var Menu = {
            settings: {
                menubtn: $(".dyfac-menubtn"),
                menu: $(".dyfac-overlay-menu"),
                navigation: $("header"),
                closebtn: $(".dyfac-menuclosebtn"),
                bg: $(".dyfac-menubg"),
                container: $(".dyfac-menu-container"),
                menuitem: $('a.no-action'),
                submenuitem: $('.submenu'),
                isOpen: !1,
                isAnimating: !1
            },
            init: function() {
                this.bindUIActions()
            },
            bindUIActions: function() {
                var e = this.settings;
                e.menubtn.click(function() {
                    Menu.toggle()
                });
                e.bg.click(function() {
                    Menu.close()
                });
                e.container.click(function() {
                    Menu.close()
                });
                e.closebtn.click(function() {
                    Menu.close()
                });
                $(window).keydown(function(e) {
                    e.which === 27 && Menu.close()
                });
                e.submenuitem.click(function() {
                    Menu.close()
                });
                e.menuitem.click(function() {
                    return false
                });
            },
            toggle: function() {
                var e = this.settings;
                e.isOpen ? Menu.close() : Menu.open()
            },
            open: function() {
                function t() {
                    e.menu.addClass("is-active");
                    e.closebtn.addClass("is-active");
                    e.navigation.addClass("nav-up");
                    e.isAnimating = !1,
                        $.each($('.menu-item'), function(i, el) {
                            setTimeout(function() {
                                $(el).animate({
                                    'opacity': 1.0
                                });
                            }, 500 + (i * 80));
                        });
                }
                var e = this.settings;
                if (e.isAnimating === !1) {
                    e.isOpen = !0;
                    e.isAnimating = !0;
                    e.menu.css("display", "block");
                    setTimeout(t, 100)
                }
            },
            close: function() {
                $.each($('.menu-item').get().reverse(), function(i, el) {
                    setTimeout(function() {
                        $(el).css({
                            'opacity': 0
                        });
                    }, 1 + (i * 60));
                });

                function t() {
                    e.menu.css("display", "none");
                    e.isAnimating = !1
                }
                var e = this.settings;
                if (e.isAnimating === !1) {
                    e.isOpen = !1;
                    e.isAnimating = !0;
                    e.menu.removeClass("is-active");
                    e.closebtn.removeClass("is-active");
                    e.navigation.removeClass("nav-up");
                    setTimeout(t, 1200)
                }
            }
        };

        if ($('.dyfac-overlay-menu').length > 0) {
            Menu.init();
        }

        $(".submenu").hover(
            function() {
                $(this).parent().children('a').addClass("active");
            },
            function() {
                $(this).parent().children('a').removeClass("active");
            }
        );


    }

    function MenuOverlayResponsive() {

        var winHeight = window.innerHeight
        var winWidth = window.innerWidth
        if (winWidth > 750) {
            $('.scr_menu').css({
                height: winHeight - 250 + 'px',
                width: winWidth + 25 + 'px'
            });
        } else {
            $('.scr_menu').css({
                height: winHeight - 200 + 'px',
                width: winWidth + 25 + 'px'
            });
        }

    }

    /*=====================*/
    /* Lightbox */
    /*=====================*/

    $('a[data-rel^=lightcase]').lightcase();
	
    /*=====================*/
    /* Hero intro */
    /*=====================*/

    function HeroHeight() {
        if ($('#hero').length > 0) {

            if ($('#hero').hasClass('hero-big')) {
                var heights = window.innerHeight;
                document.getElementById("hero").style.height = heights * 0.85 + "px";
            } else if ($('#hero').hasClass('hero-small')) {
                var heights = window.innerHeight;
                document.getElementById("hero").style.height = heights * 0.40 + "px";
            } else {
                var heights = window.innerHeight;
                document.getElementById("hero").style.height = heights + "px";
            }

        }

        if ($('#video-container').length > 0) {

            $("#playmovie").css({
                'height': ($("#hero").height() + 'px')
            });

        }

    }

    function HeroParallax() {

        var page_title = $('body');
        var block_intro = page_title.find('#hero');
        if (block_intro.length > 0) var block_intro_top = block_intro.offset().top;
        $(window).scroll(function() {
            var current_top = $(document).scrollTop();
            var hero_height = $('#hero').height();
            if ($('#hero').hasClass('parallax-hero')) {
                block_intro.css('top', (current_top * 0.5));
            }
            if ($('#hero').hasClass('static-hero')) {
                block_intro.css('top', (current_top * 1));
            }
            if ($('#hero').hasClass('opacity-hero')) {
                block_intro.css('opacity', (1 - current_top / hero_height * 1));
            }
        });

    }

    /*=====================*/
    /* swiper */
    /*=====================*/
    var swipers = [],
        winW, winH, winScr, footTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

    function initSwiper() {
        var initIterator = 0;
        $('.swiper-container').each(function() {
            var $t = $(this);

            var index = 'swiper-unique-id-' + initIterator;

            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.swiper-pagination').addClass('swiper-pagination-' + index);
            $t.find('.swiper-butt-prev').addClass('swiper-butt-prev-' + index);
            $t.find('.swiper-butt-next').addClass('swiper-butt-next-' + index);
            if ($t.find('.swiper-slide').length <= 1) $('.slider-click[data-pagination-rel="' + $t.data('pagination-rel') + '"]').addClass('disabled');

            var slidesPerViewVar = ($t.data('slides-per-view')) ? $t.data('slides-per-view') : 1,
                loopVar = ($t.data('loop')) ? parseInt($t.data('loop'), 10) : 0;
            if (slidesPerViewVar != 'auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                pagination: '.swiper-pagination-' + index,
                paginationClickable: true,
                nextButton: '.swiper-butt-next-' + index,
                prevButton: '.swiper-butt-prev-' + index,
                slidesPerView: slidesPerViewVar,
                autoHeight: ($t.data('auto-height')) ? parseInt($t.data('auto-height'), 10) : 0,
                loop: loopVar,
                autoplay: ($t.data('autoplay')) ? parseInt($t.data('autoplay'), 10) : 0,
                centeredSlides: ($t.data('center')) ? parseInt($t.data('center'), 10) : 0,
                breakpoints: ($t.data('breakpoints')) ? {
                    767: {
                        slidesPerView: parseInt($t.attr('data-xs-slides'), 10)
                    },
                    991: {
                        slidesPerView: parseInt($t.attr('data-sm-slides'), 10)
                    },
                    1199: {
                        slidesPerView: parseInt($t.attr('data-md-slides'), 10)
                    }
                } : {},
                initialSlide: ($t.data('ini')) ? parseInt($t.data('ini'), 10) : 0,
                watchSlidesProgress: true,
                speed: ($t.data('speed')) ? parseInt($t.data('speed'), 10) : 500,
                parallax: ($t.data('parallax')) ? parseInt($t.data('parallax'), 10) : 0,
                slideToClickedSlide: true,
                keyboardControl: true,
                direction: ($t.data('direction')) ? $t.data('direction') : 'horizontal',
                onProgress: function(swiper, progress) {
                    watchSwiperProgress($t, swiper, swiper.activeIndex);
                },
                onSlideChangeStart: function(swiper) {
                    var activeIndex = (loopVar == 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                    watchSwiperProgress($t, swiper, activeIndex);
                },
                onTransitionEnd: function(swiper) {
                    var activeIndex = (loopVar == 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                    if ($('.slider-click[data-pagination-rel="' + $t.data('pagination-rel') + '"]').length) {
                        var updateLeftNum = $('.slider-click.left[data-pagination-rel="' + $t.data('pagination-rel') + '"]'),
                            updateRightNum = $('.slider-click.right[data-pagination-rel="' + $t.data('pagination-rel') + '"]');
                        if (loopVar != 1) {
                            if (activeIndex < 1) updateLeftNum.addClass('disabled');
                            else updateLeftNum.removeClass('disabled').find('.left').text(activeIndex);
                            if (activeIndex + 2 > swiper.slides.length) updateRightNum.addClass('disabled');
                            else updateRightNum.removeClass('disabled').find('.left').text(activeIndex + 2);
                            updateLeftNum.find('.preview-go.active').removeClass('active');
                            updateLeftNum.find('.preview-go[data-rel="' + (activeIndex - 1) + '"]').addClass('active');
                            updateRightNum.find('.preview-go.active').removeClass('active');
                            updateRightNum.find('.preview-go[data-rel="' + (activeIndex + 1) + '"]').addClass('active');
                        }
                    }
                }
            });
            swipers['swiper-' + index].update();
            initIterator++;
        });

    }

    function watchSwiperProgress(container, swiper, index) {
        if ($('.h-1-backgrounds[data-pagination-rel="' + container.data('pagination-rel') + '"]').length) {
            $('.h-1-backgrounds .entry.active').removeClass('active');
            $('.h-1-backgrounds .entry[data-rel=' + index + ']').addClass('active');
        }
        if ($('.slider-click-label[data-pagination-rel="' + container.data('pagination-rel') + '"]').length) {
            $('.slider-click-label[data-pagination-rel="' + container.data('pagination-rel') + '"]').removeClass('active prev next');
            $('.slider-click-label[data-pagination-rel="' + container.data('pagination-rel') + '"][data-slide-to="' + index + '"]').addClass('active');
        }
        if ($('.pagination-slider-wrapper[data-pagination-rel="' + container.data('pagination-rel') + '"]').length) {
            var foo = $('.pagination-slider-wrapper[data-pagination-rel="' + container.data('pagination-rel') + '"]');
            foo.css({
                'top': (-1) * parseInt(foo.find('.active').attr('data-slide-to'), 10) * foo.parent().height()
            });
        }
    }

    $('.slider-click.left').on('click', function() {
        if ($(this)[0].hasAttribute('data-pagination-rel')) {
            swipers['swiper-' + $('.swiper-container[data-pagination-rel="' + $(this).data('pagination-rel') + '"]').attr('id')].slidePrev();
            $(this).find('.preview-go').removeClass('active');
        }
    });

    $('.slider-click.right').on('click', function() {
        if ($(this)[0].hasAttribute('data-pagination-rel')) {
            swipers['swiper-' + $('.swiper-container[data-pagination-rel="' + $(this).data('pagination-rel') + '"]').attr('id')].slideNext();
            $(this).find('.preview-go').removeClass('active');
        }
    });

    $('.slider-click-label').on('click', function() {
        swipers['swiper-' + $('.swiper-container[data-pagination-rel="' + $(this).data('pagination-rel') + '"]').attr('id')].slideTo($(this).data('slide-to'));
    });


    $('.tab-menu').on('click', function() {
        if ($(this).hasClass('active')) return false;
        var $this = $(this);
        $(this).parent().parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.sorting-menu').find('.responsive-filtration-title .text').text($(this).text());
        $('.tab-go[data-tab-menu="' + $this.data('tab-menu') + '"]:visible').animate({
            'opacity': '0'
        }, function() {
            $(this).hide();
            var tab = $('.tab-go[data-tab-menu="' + $this.data('tab-menu') + '"][data-tab="' + $this.data('tab') + '"]');
            tab.show();
            tab.animate({
                'opacity': '1'
            });
            swipers['swiper-' + tab.find('.swiper-container').attr('id')].update();
        });
    });

    $('.nice-slider-container .swiper-butt-next').on('click', function() {

    });

    $('.overlay .button-close').on('click', function() {
        $(this).closest('.video-popup').find('iframe').attr('src', '');
        if ($('.overlay.active').length == 1) $('html').removeClass('overflow-hidden');
        $(this).closest('.overlay').removeClass('active');
    });


    // SmoothScroll v1.2.1
    // Licensed under the terms of the MIT license.
    // People involved
    //  - Balazs Galambosi (maintainer)  
    //  - Patrick Brunner  (original idea)
    //  - Michael Herf     (Pulse Algorithm)
    function init() {
        if (!document.body) return;
        var body = document.body;
        var html = document.documentElement;
        var windowHeight = window.innerHeight;
        var scrollHeight = body.scrollHeight;
        root = document.compatMode.indexOf("CSS") >= 0 ? html : body;
        activeElement = body;
        initTest();
        initDone = true;
        if (top != self) isFrame = true;
        else if (scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
            var pending = false;
            var refresh = function() {
                if (!pending && html.scrollHeight != document.height) {
                    pending = true;
                    setTimeout(function() {
                        html.style.height =
                            document.height + "px";
                        pending = false
                    }, 500)
                }
            };
            html.style.height = "auto";
            setTimeout(refresh, 10);
            var config = {
                attributes: true,
                childList: true,
                characterData: false
            };
            observer = new MutationObserver(refresh);
            observer.observe(body, config);
            if (root.offsetHeight <= windowHeight) {
                var underlay = document.createElement("div");
                underlay.style.clear = "both";
                body.appendChild(underlay)
            }
        }
        if (document.URL.indexOf("mail.google.com") > -1) {
            var s = document.createElement("style");
            s.innerHTML = ".iu { visibility: hidden }";
            (document.getElementsByTagName("head")[0] ||
                html).appendChild(s)
        } else if (document.URL.indexOf("www.facebook.com") > -1) {
            var home_stream = document.getElementById("home_stream");
            home_stream && (home_stream.style.webkitTransform = "translateZ(0)")
        }
        if (!options.fixedBackground && !isExcluded) {
            body.style.backgroundAttachment = "scroll";
            html.style.backgroundAttachment = "scroll"
        }
    }
    var que = [];
    var pending = false;
    var lastScroll = +new Date;

    function scrollArray(elem, left, top, delay) {
        delay || (delay = 1E3);
        directionCheck(left, top);
        if (options.accelerationMax != 1) {
            var now = +new Date;
            var elapsed = now - lastScroll;
            if (elapsed < options.accelerationDelta) {
                var factor = (1 + 30 / elapsed) / 2;
                if (factor > 1) {
                    factor = Math.min(factor, options.accelerationMax);
                    left *= factor;
                    top *= factor
                }
            }
            lastScroll = +new Date
        }
        que.push({
            x: left,
            y: top,
            lastX: left < 0 ? .99 : -.99,
            lastY: top < 0 ? .99 : -.99,
            start: +new Date
        });
        if (pending) return;
        var scrollWindow = elem === document.body;
        var step = function(time) {
            var now = +new Date;
            var scrollX = 0;
            var scrollY = 0;
            for (var i = 0; i < que.length; i++) {
                var item = que[i];
                var elapsed = now - item.start;
                var finished = elapsed >= options.animationTime;
                var position = finished ? 1 : elapsed / options.animationTime;
                if (options.pulseAlgorithm) position = pulse(position);
                var x = item.x * position - item.lastX >> 0;
                var y = item.y * position - item.lastY >> 0;
                scrollX += x;
                scrollY += y;
                item.lastX += x;
                item.lastY += y;
                if (finished) {
                    que.splice(i, 1);
                    i--
                }
            }
            if (scrollWindow) window.scrollBy(scrollX, scrollY);
            else {
                if (scrollX) elem.scrollLeft += scrollX;
                if (scrollY) elem.scrollTop += scrollY
            }
            if (!left && !top) que = [];
            if (que.length) requestFrame(step, elem, delay / options.frameRate + 1);
            else pending = false
        };
        requestFrame(step, elem, 0);
        pending = true
    }

    function wheel(event) {
        if (!initDone) init();
        var target = event.target;
        var overflowing = overflowingAncestor(target);
        if (!overflowing || event.defaultPrevented || isNodeName(activeElement, "embed") || isNodeName(target, "embed") && /\.pdf/i.test(target.src)) return true;
        var deltaX = event.wheelDeltaX || 0;
        var deltaY = event.wheelDeltaY || 0;
        if (!deltaX && !deltaY) deltaY = event.wheelDelta || 0;
        if (!options.touchpadSupport && isTouchpad(deltaY)) return true;
        if (Math.abs(deltaX) > 1.2) deltaX *= options.stepSize / 120;
        if (Math.abs(deltaY) > 1.2) deltaY *=
            options.stepSize / 120;
        scrollArray(overflowing, -deltaX, -deltaY);
        event.preventDefault()
    }

    function keydown(event) {
        var target = event.target;
        var modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;
        if (/input|textarea|select|embed/i.test(target.nodeName) || target.isContentEditable || event.defaultPrevented || modifier) return true;
        if (isNodeName(target, "button") && event.keyCode === key.spacebar) return true;
        var shift, x = 0,
            y = 0;
        var elem = overflowingAncestor(activeElement);
        var clientHeight = elem.clientHeight;
        if (elem == document.body) clientHeight = window.innerHeight;
        switch (event.keyCode) {
            case key.up:
                y = -options.arrowScroll;
                break;
            case key.down:
                y = options.arrowScroll;
                break;
            case key.spacebar:
                shift = event.shiftKey ? 1 : -1;
                y = -shift * clientHeight * .9;
                break;
            case key.pageup:
                y = -clientHeight * .9;
                break;
            case key.pagedown:
                y = clientHeight * .9;
                break;
            case key.home:
                y = -elem.scrollTop;
                break;
            case key.end:
                var damt = elem.scrollHeight - elem.scrollTop - clientHeight;
                y = damt > 0 ? damt + 10 : 0;
                break;
            case key.left:
                x = -options.arrowScroll;
                break;
            case key.right:
                x = options.arrowScroll;
                break;
            default:
                return true
        }
        scrollArray(elem,
            x, y);
        event.preventDefault()
    }

    function mousedown(event) {
        activeElement = event.target
    }
    var cache = {};
    setInterval(function() {
        cache = {}
    }, 10 * 1E3);
    var uniqueID = function() {
        var i = 0;
        return function(el) {
            return el.uniqueID || (el.uniqueID = i++)
        }
    }();

    function setCache(elems, overflowing) {
        for (var i = elems.length; i--;) cache[uniqueID(elems[i])] = overflowing;
        return overflowing
    }

    function overflowingAncestor(el) {
        var elems = [];
        var rootScrollHeight = root.scrollHeight;
        do {
            var cached = cache[uniqueID(el)];
            if (cached) return setCache(elems, cached);
            elems.push(el);
            if (rootScrollHeight === el.scrollHeight) {
                if (!isFrame || root.clientHeight + 10 < rootScrollHeight) return setCache(elems, document.body)
            } else if (el.clientHeight + 10 < el.scrollHeight) {
                overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
                if (overflow === "scroll" || overflow === "auto") return setCache(elems, el)
            }
        } while (el = el.parentNode)
    }
    var defaultOptions = {
        frameRate: 350,
        animationTime: 1700,
        stepSize: 120,
        pulseAlgorithm: true,
        pulseScale: 8,
        pulseNormalize: 1,
        accelerationDelta: 20,
        accelerationMax: 1,
        keyboardSupport: true,
        arrowScroll: 50,
        touchpadSupport: true,
        fixedBackground: true,
        excluded: ""
    };
    var options = defaultOptions;
    var isExcluded = false;
    var isFrame = false;
    var direction = {
        x: 0,
        y: 0
    };
    var initDone = false;
    var root = document.documentElement;
    var activeElement;
    var observer;
    var deltaBuffer = [120, 120, 120];
    var key = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36
    };

    function initTest() {
        var disableKeyboard = false;
        if (document.URL.indexOf("google.com/reader/view") > -1) disableKeyboard = true;
        if (options.excluded) {
            var domains = options.excluded.split(/[,\n] ?/);
            domains.push("mail.google.com");
            for (var i = domains.length; i--;)
                if (document.URL.indexOf(domains[i]) > -1) {
                    observer && observer.disconnect();
                    removeEvent("mousewheel", wheel);
                    disableKeyboard = true;
                    isExcluded = true;
                    break
                }
        }
        if (disableKeyboard) removeEvent("keydown", keydown);
        if (options.keyboardSupport && !disableKeyboard) addEvent("keydown",
            keydown)
    }

    function addEvent(type, fn, bubble) {
        window.addEventListener(type, fn, bubble || false)
    }

    function removeEvent(type, fn, bubble) {
        window.removeEventListener(type, fn, bubble || false)
    }

    function isNodeName(el, tag) {
        return (el.nodeName || "").toLowerCase() === tag.toLowerCase()
    }

    function directionCheck(x, y) {
        x = x > 0 ? 1 : -1;
        y = y > 0 ? 1 : -1;
        if (direction.x !== x || direction.y !== y) {
            direction.x = x;
            direction.y = y;
            que = [];
            lastScroll = 0
        }
    }
    var deltaBufferTimer;

    function isTouchpad(deltaY) {
        if (!deltaY) return;
        deltaY = Math.abs(deltaY);
        deltaBuffer.push(deltaY);
        deltaBuffer.shift();
        clearTimeout(deltaBufferTimer);
        deltaBufferTimer = setTimeout(function() {
            chrome.storage.local.set({
                deltaBuffer: deltaBuffer
            })
        }, 1E3);
        var allEquals = deltaBuffer[0] == deltaBuffer[1] && deltaBuffer[1] == deltaBuffer[2];
        var allDivisable = isDivisible(deltaBuffer[0], 120) && isDivisible(deltaBuffer[1], 120) && isDivisible(deltaBuffer[2], 120);
        return !(allEquals || allDivisable)
    }

    function isDivisible(n, divisor) {
        return Math.floor(n / divisor) == n / divisor
    }
    var requestFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback, element, delay) {
            window.setTimeout(callback, delay || 1E3 / 60)
        }
    }();
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    function pulse_(x) {
        var val, start, expx;
        x = x * options.pulseScale;
        if (x < 1) val = x - (1 - Math.exp(-x));
        else {
            start = Math.exp(-1);
            x -= 1;
            expx = 1 - Math.exp(-x);
            val = start + expx * (1 - start)
        }
        return val * options.pulseNormalize
    }

    function pulse(x) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;
        if (options.pulseNormalize == 1) options.pulseNormalize /= pulse_(1);
        return pulse_(x)
    }
    addEvent("mousedown", mousedown);
    addEvent("mousewheel", wheel);
    addEvent("load", init);




    /*=====================*/
    /* Hide show menu */
    /*=====================*/


    function HideShowMenu() {

        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();
        var navbarHideAfter = 20

        $(window).scroll(function(event) {
            didScroll = true;
        });


        if ($('.hsm').length > 0) {

            setInterval(function() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 100);

        }

        return false;

        function hasScrolled() {
            var st = $(this).scrollTop();

            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHideAfter) {
                // Scroll Down
                if ($('.hsm').length > 0) {
                    $('header').removeClass('nav-down').addClass('nav-up');
                }
            } else {
                // Scroll Up
                if ($('.hsm').length > 0) {
                    if (st + $(window).height() < $(document).height()) {
                        $('header').removeClass('nav-up').addClass('nav-down');
                    }
                }
            }

            lastScrollTop = st;
        }



    }


    /*=====================*/
    /* find filter */
    /*=====================*/

    function ToggleSecondaryMenu() {

        $('.toggle-filters').click(function() {

            if ($("#filters").hasClass('filters-hide')) {
                $("#filters").toggleClass("filters-hide");
                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: $("#folio").offset().top + 1
                    }, 500);
                }, (100));
            } else {
                $("#filters").toggleClass("filters-hide");
            }
            if ($(this).text() == "Filters") {
                $(this).text("Hide");
            } else {
                $(this).text("Filters");
            }
            return false;
        });


    }




    /*=====================*/
    /* folio */
    /*=====================*/

    function MasonryPortfolio() {

        if ($('#portfolio-wrap').length > 0) {

            var $container = $('#portfolio');

            $container.isotope({
                itemSelector: '.item',
                gutter: 0,
                transitionDuration: "0.5s"
            });

            $('#filters a').click(function() {
                $('#filters a').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector
                });
                return false;
            });

            $(document).scroll(function() {
                if ($('.auto-construct').length > 0) {
                    var y = $(this).scrollTop();
                    var t = $('#portfolio').offset().top + $('#portfolio').height() - window.innerHeight;
                    if (y > t) {
                        $('#portfolio').removeClass('auto-construct')
                    }
                }
            });

            $(window).on('resize', function() {

                var winWidth = window.innerWidth;
                columnNumb = 1;
                var attr_col = $('#portfolio').attr('data-col');

                if (winWidth >= 1470) {

                    $('#portfolio-wrap').css({
                        width: 1360 + 'px'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 1280 + 'px'
                    });
                    var portfolioWidth = $('#portfolio-wrap').width();

                    if (typeof attr_col !== typeof undefined && attr_col !== false) {
                        columnNumb = $('#portfolio').attr('data-col');
                    } else columnNumb = 3;

                    postWidth = Math.floor(portfolioWidth / columnNumb)
                    $container.find('.item').each(function() {
                        $('.item').css({
                            width: postWidth - 80 + 'px',
                            height: postWidth * 0.75 - 80 + 'px',
                            margin: 40 + 'px'
                        });
                        $('.no-gutter .item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.item.wide').css({
                            width: postWidth * 2 - 80 + 'px'
                        });
                        $('.no-gutter .item.wide').css({
                            width: postWidth * 2 + 'px'
                        });
                        $('.item.tall').css({
                            height: postWidth * 1.5 - 80 + 'px'
                        });
                        $('.no-gutter .item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.item.wide-tall').css({
                            width: postWidth * 2 - 80 + 'px',
                            height: postWidth * 1.5 - 80 + 'px'
                        });
                        $('.no-gutter .item.wide-tall').css({
                            width: postWidth * 2 + 'px',
                            height: postWidth * 1.5 + 'px'
                        });
                    });


                } else if (winWidth > 1024) {

                    $('#portfolio-wrap').css({
                        width: 1000 + 'px'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 940 + 'px'
                    });
                    var portfolioWidth = $('#portfolio-wrap').width();

                    if (typeof attr_col !== typeof undefined && attr_col !== false) {
                        columnNumb = $('#portfolio').attr('data-col');
                    } else columnNumb = 3;

                    postWidth = Math.floor(portfolioWidth / columnNumb)
                    $container.find('.item').each(function() {
                        $('.item').css({
                            width: postWidth - 60 + 'px',
                            height: postWidth * 0.75 - 60 + 'px',
                            margin: 30 + 'px'
                        });
                        $('.no-gutter .item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.item.wide').css({
                            width: postWidth * 2 - 60 + 'px'
                        });
                        $('.no-gutter .item.wide').css({
                            width: postWidth * 2 + 'px'
                        });
                        $('.item.tall').css({
                            height: postWidth * 1.5 - 60 + 'px'
                        });
                        $('.no-gutter .item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.item.wide-tall').css({
                            width: postWidth * 2 - 60 + 'px',
                            height: postWidth * 1.5 - 60 + 'px'
                        });
                        $('.no-gutter .item.wide-tall').css({
                            width: postWidth * 2 + 'px',
                            height: postWidth * 1.5 + 'px'
                        });
                    });


                } else if (winWidth > 768) {

                    $('#portfolio-wrap').css({
                        width: 640 + 'px'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 600 + 'px'
                    });

                    var portfolioWidth = $('#portfolio-wrap').width(),

                        columnNumb = 2;
                    postWidth = Math.floor(portfolioWidth / columnNumb)
                    $container.find('.item').each(function() {
                        $('.item').css({
                            width: postWidth - 40 + 'px',
                            height: postWidth * 0.75 - 40 + 'px',
                            margin: 20 + 'px'
                        });
                        $('.no-gutter .item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.item.wide').css({
                            width: postWidth * 2 - 40 + 'px'
                        });
                        $('.no-gutter .item.wide').css({
                            width: postWidth * 2 + 'px'
                        });
                        $('.item.tall').css({
                            height: postWidth * 1.5 - 40 + 'px'
                        });
                        $('.no-gutter .item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.item.wide-tall').css({
                            width: postWidth * 2 - 40 + 'px',
                            height: postWidth * 1.5 - 40 + 'px'
                        });
                        $('.no-gutter .item.wide-tall').css({
                            width: postWidth * 2 + 'px',
                            height: postWidth * 1.5 + 'px'
                        });
                    });


                } else if (winWidth > 479) {

                    $('#portfolio-wrap').css({
                        width: 440 + 'px'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 400 + 'px'
                    });

                    var portfolioWidth = $('#portfolio-wrap').width(),

                        columnNumb = 1;
                    postWidth = Math.floor(portfolioWidth / columnNumb)
                    $container.find('.item').each(function() {
                        $('.item').css({
                            width: postWidth - 40 + 'px',
                            height: postWidth * 0.75 - 40 + 'px',
                            margin: 20 + 'px'
                        });
                        $('.no-gutter .item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.item.wide').css({
                            width: postWidth - 40 + 'px'
                        });
                        $('.no-gutter .item.wide').css({
                            width: postWidth + 'px'
                        });
                        $('.item.tall').css({
                            height: postWidth * 1.5 - 40 + 'px'
                        });
                        $('.no-gutter .item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.item.wide-tall').css({
                            width: postWidth - 40 + 'px',
                            height: postWidth * 0.75 - 40 + 'px'
                        });
                        $('.no-gutter .item.wide-tall').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px'
                        });
                    });


                } else if (winWidth <= 479) {

                    $('#portfolio-wrap').css({
                        width: 280 + 'px'
                    });
                    $('#portfolio-wrap.no-gutter').css({
                        width: 240 + 'px'
                    });

                    var portfolioWidth = $('#portfolio-wrap').width(),

                        columnNumb = 1;
                    postWidth = Math.floor(portfolioWidth / columnNumb)
                    $container.find('.item').each(function() {
                        $('.item').css({
                            width: postWidth - 40 + 'px',
                            height: postWidth * 0.75 - 40 + 'px',
                            margin: 20 + 'px'
                        });
                        $('.no-gutter .item').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px',
                            margin: 0 + 'px'
                        });
                        $('.item.wide').css({
                            width: postWidth - 40 + 'px'
                        });
                        $('.no-gutter .item.wide').css({
                            width: postWidth + 'px'
                        });
                        $('.item.tall').css({
                            height: postWidth * 1.5 - 40 + 'px'
                        });
                        $('.no-gutter .item.tall').css({
                            height: postWidth * 1.5 + 'px'
                        });
                        $('.item.wide-tall').css({
                            width: postWidth - 40 + 'px',
                            height: postWidth * 0.75 - 40 + 'px'
                        });
                        $('.no-gutter .item.wide-tall').css({
                            width: postWidth + 'px',
                            height: postWidth * 0.75 + 'px'
                        });
                    });


                }
                return columnNumb;


            }).resize();

            $("#all").click();


            if (window.innerWidth >= 1470) {
                if ($('.auto-construct').length > 0) {
                    $('.item').each(function(i) {
                        $(this).css({
                            'opacity': 0,
                            'margin-top': 180 + 'px',
                            'margin-bottom': 80 + 'px'
                        });

                        if ($('.auto-construct').length > 0) {
                            $(this).appear(function() {
                                if ($("#portfolio-wrap").hasClass("no-gutter")) {
                                    $(this).delay(i * 50).animate({
                                        'opacity': 1,
                                        'margin-top': 0 + 'px',
                                        'margin-bottom': 0 + 'px'
                                    }, 300, 'easeOutSine');
                                } else {
                                    $(this).delay(i * 50).animate({
                                        'opacity': 1,
                                        'margin-top': 40 + 'px',
                                        'margin-bottom': 40 + 'px'
                                    }, 300, 'easeOutSine');
                                }
                            });

                            $('#portfolio').removeClass('.auto-construct');
                        }

                    });
                }
            } else if (window.innerWidth > 1024) {
                if ($('.auto-construct').length > 0) {
                    $('.item').each(function(i) {
                        $(this).css({
                            'opacity': 0,
                            'margin-top': 180 + 'px',
                            'margin-bottom': 80 + 'px'
                        });

                        if ($('.auto-construct').length > 0) {
                            $(this).appear(function() {
                                if ($("#portfolio-wrap").hasClass("no-gutter")) {
                                    $(this).delay(i * 50).animate({
                                        'opacity': 1,
                                        'margin-top': 0 + 'px',
                                        'margin-bottom': 0 + 'px'
                                    }, 300, 'easeOutSine');
                                } else {
                                    $(this).delay(i * 50).animate({
                                        'opacity': 1,
                                        'margin-top': 30 + 'px',
                                        'margin-bottom': 30 + 'px'
                                    }, 300, 'easeOutSine');
                                }
                            });
                        }

                    });
                }
            }




        }

    }




})