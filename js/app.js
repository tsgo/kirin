/*
 Template Name: Dashor - Responsive Bootstrap 4 Admin Dashboard
 Author: Themesdesign
 Website: www.themesdesign.in
 File: Main js
 */

!function ($) {
    "use strict";

    var MainApp = function () {
        this.$body = $("body"),
            this.$wrapper = $("#wrapper"),
            this.$btnFullScreen = $("#btn-fullscreen"),
            this.$leftMenuButton = $('.button-menu-mobile'),
            this.$menuItem = $('.has_sub > a')
    };
    //scroll
    MainApp.prototype.initSlimscroll = function () {
        $('.slimscrollleft').slimscroll({
            height: 'auto',
            position: 'right',
            size: "10px",
            color: '#9ea5ab'
        });
    },
        //left menu
        MainApp.prototype.initLeftMenuCollapse = function () {
            var $this = this;
            this.$leftMenuButton.on('click', function (event) {
                event.preventDefault();
                $this.$body.toggleClass("fixed-left-void");
                $this.$wrapper.toggleClass("enlarged");
            });
        },
        //left menu
        MainApp.prototype.initComponents = function () {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        },
        //full screen
        MainApp.prototype.initFullScreen = function () {
            var $this = this;
            $this.$btnFullScreen.on("click", function (e) {
                e.preventDefault();

                if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }
            });
        },
        //full screen
        MainApp.prototype.initMenu = function () {
            var $this = this;
            $this.$menuItem.on('click', function () {
                var parent = $(this).parent();
                var sub = parent.find('> ul');

                if (!$this.$body.hasClass('sidebar-collapsed')) {
                    if (sub.is(':visible')) {
                        sub.slideUp(300, function () {
                            parent.removeClass('nav-active');
                            $('.body-content').css({height: ''});
                            adjustMainContentHeight();
                        });
                    } else {
                        visibleSubMenuClose();
                        parent.addClass('nav-active');
                        sub.slideDown(300, function () {
                            adjustMainContentHeight();
                        });
                    }
                }
                return false;
            });

            //inner functions
            function visibleSubMenuClose() {
                $('.has_sub').each(function () {
                    var t = $(this);
                    if (t.hasClass('nav-active')) {
                        t.find('> ul').slideUp(300, function () {
                            t.removeClass('nav-active');
                        });
                    }
                });
            }

            function adjustMainContentHeight() {
                // Adjust main content height
                var docHeight = $(document).height();
                if (docHeight > $('.body-content').height())
                    $('.body-content').height(docHeight);
            }
        },
        MainApp.prototype.activateMenuItem = function () {
            // === following js will activate the menu in left side bar based on url ====
            $("#sidebar-menu a").each(function () {
                if (this.href == window.location.href) {
                    $(this).addClass("active");
                    $(this).parent().addClass("active"); // add active to li of the current link
                    $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
                    $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
                    $(this).parent().parent().prev().click(); // click the item to make it drop
                }
            });
        },
        MainApp.prototype.init = function () {
            this.initSlimscroll();
            this.initLeftMenuCollapse();
            this.initComponents();
            this.initFullScreen();
            this.initMenu();
            this.activateMenuItem();
        },
        //init
        $.MainApp = new MainApp, $.MainApp.Constructor = MainApp
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.MainApp.init();
		
		var drunkMe = function(){
			if($('footer.footer').eq(0).css('position').toLowerCase() == 'relative'){//手機小螢幕
				if($('footer.footer').eq(0).offset().top <= window.innerHeight){
					if(window.scrollY + window.innerHeight - 100 > $('footer.footer').eq(0).offset().top){
						$('.liqueurWarring').removeClass('air');
					} else {
						$('.liqueurWarring').addClass('air')
					}
				} else {
					if(window.scrollY + $('footer.footer')[0].clientHeight >= $('footer.footer').eq(0).offset().top){
						$('.liqueurWarring').removeClass('air');
					} else {
						$('.liqueurWarring').addClass('air');
					}
				}
			} else {
				if($('footer.footer').eq(0).offset().top <= window.innerHeight){//視窗自然高度 = footer 起始offset().top
					if(window.scrollY >= document.body.offsetHeight - $('footer.footer')[0].clientHeight){
						$('.liqueurWarring').removeClass('air');
					} else {
						$('.liqueurWarring').addClass('air')
					}
				} else if($('footer.footer').eq(0).offset().top >= document.body.offsetHeight){//網頁內容自然高度 = footer 起始offset().top
					if(window.scrollY + $('footer.footer')[0].clientHeight >= document.body.offsetHeight - $('footer.footer')[0].clientHeight - 100){
						$('.liqueurWarring').removeClass('air');
					} else {
						$('.liqueurWarring').addClass('air')
					}
				}
			}
				
			//console.log(window.scrollY);
		};
		if($('footer.footer').length > 0){
			
			$(window).on('scroll' , drunkMe);
			drunkMe();
		}
		//console.log('footer offsetTop = ' + $('footer.footer').eq(0).offset().top);
		//console.log('window.innerHeight = ' + window.innerHeight);
		//console.log('document.body.offsetHeight = ' + document.body.offsetHeight);
		
		
    }(window.jQuery);