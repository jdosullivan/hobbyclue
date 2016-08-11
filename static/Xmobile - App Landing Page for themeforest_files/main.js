'use strict';
	
//FOR DEMO
jQuery(document).ready(function(){

	// ADD demo.css and jquery.cookie.js and menu for colors
	$('body').append('\
	<!-- DEMO BEGIN -->\
	<div id="demo">\
		<ul>\
			<li><a href="#" rel="red" class="styleswitch"></a></li>\
			<li><a href="#" rel="purple" class="styleswitch"></a></li>\
			<li><a href="#" rel="blue" class="styleswitch"></a></li>\
			<li><a href="#" rel="aqua" class="styleswitch"></a></li>\
			<li><a href="#" rel="green" class="styleswitch"></a></li>\
			<li><a href="#" rel="yellow" class="styleswitch"></a></li>\
			<li><a href="#" rel="orange" class="styleswitch"></a></li>\
		</ul>\
	</div>\
	<link rel="stylesheet" href="demo/demo.css">\
	<link rel="alternate stylesheet" href="assets/css/colors/red.css" title="red" media="all"/>\
	<link rel="alternate stylesheet" href="assets/css/colors/purple.css" title="purple" media="all">\
	<link rel="alternate stylesheet" href="assets/css/colors/blue.css" title="blue" media="all">\
	<link rel="alternate stylesheet" href="assets/css/colors/aqua.css" title="aqua" media="all">\
	<link rel="alternate stylesheet" href="assets/css/colors/green.css" title="green" media="all">\
	<link rel="alternate stylesheet" href="assets/css/colors/yellow.css" title="yellow" media="all">\
	<link rel="alternate stylesheet" href="assets/css/colors/orange.css" title="orange" media="all">\
	<!-- DEMO END -->\
	');

	// CHANGE COLOR

	// delegate all clicks on "a" tag (links)
	$(document).on("click", "#back", function () {

	    // get the href attribute
	    var newUrl = $(this).attr("href");

	    // veryfy if the new url exists or is a hash
	    if (!newUrl || newUrl[0] === "#") {
	        // set that hash
	        location.hash = newUrl;
	        return;
	    }

	    // now, fadeout the html (whole page)
	    $(".preloader").fadeIn('slow', function() {

	        // when the animation is complete, set the new location
	        location = newUrl;
	        
	    });

	    // prevent the default browser behavior.
	    return false;
	});

	(function($)
	{
	    $(document).ready(function() {
	        $('.styleswitch').click(function()
	        {
	            switchStylestyle(this.getAttribute("rel"));
	            return false;
	        });
	        var c = readCookie('style');
	        if (c) switchStylestyle(c);
	    });

	    function switchStylestyle(styleName)
	    {
	        $('link[rel*=style][title]').each(function(i) 
	        {
	            this.disabled = true;
	            if (this.getAttribute('title') == styleName) this.disabled = false;
	        });
	        createCookie('style', styleName, 365);
	    }
	})(jQuery);

	// Cookie functions
	function createCookie(name,value,days)
	{
	    if (days)
	    {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	}
	function readCookie(name)
	{
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++)
	    {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}
	function eraseCookie(name)
	{
	    createCookie(name,"",-1);
	}

});



/*---------------------------------------------------------*/
/*  LOADER                                                 */
/*---------------------------------------------------------*/

jQuery(window).load(function () {


	$(".preloader").delay(800).fadeOut("slow");

	// SPECIAL VERSION
	setTimeout(function (){$('.header-special-version .intro').addClass('animated fadeInLeft')}, 1000);
	setTimeout(function (){$('.hand-phone').delay(1000).queue(function () {
		$(this).addClass('animated fadeInRight')}, 200);
	});

	// PHONES VERSION
	setTimeout(function (){$('.header-phones-version .intro, .header-minimal-version .intro, .header-blog-version .intro').addClass('animated fadeInDown')}, 1000);
	setTimeout(function (){$('.phone-center').delay(1000).queue(function () {
		$(this).addClass('animated fadeInUp')}, 100);
	});
	setTimeout(function (){$('.phone-left').delay(1500).queue(function () {
		$(this).addClass('animated fadeInRight')}, 100);
	});
	setTimeout(function (){$('.phone-right').delay(1500).queue(function () {
		$(this).addClass('animated fadeInLeft')}, 100);
	});
	setTimeout(function (){$('header .shadow-left').delay(1500).queue(function () {
		$(this).addClass('animated fadeInRight')}, 100);
	});
	setTimeout(function (){$('header .shadow-right').delay(1500).queue(function () {
		$(this).addClass('animated fadeInLeft')}, 100);
	});

});



/*---------------------------------------------------------*/
/*  NAVBAR LI AUTOHEIGHT                                   */
/*---------------------------------------------------------*/

// Auto counter for calculate the elements of the fullscreen menu
function contactNum() {

	var numberOfElementsList = $('nav .localScroll li').filter(function() {
		return $(this).css('display') !== 'none';
	}).length,
		calculation = (100/numberOfElementsList),
		calculationInPixels = ($(window).height()/numberOfElementsList);
	$('nav .localScroll li').css('height', calculation+'%');
	$('nav .localScroll li').css('line-height', calculationInPixels+'px');

};




/*---------------------------------------------------------*/
/*  DOCUMENT READY                                         */
/*---------------------------------------------------------*/

jQuery(document).ready(function () {


	/*---------------------------------------------------------*/
	/*  ONE PAGE NAV                                           */
	/*---------------------------------------------------------*/

	 // Navigation for desktop bar
	$('#menu').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		easing: 'swing'
	});


	/*=========================================================*/
	/*  LOCAL SCROLL                                           */
	/*=========================================================*/

	$('.localScroll').localScroll({
		duration: 1000
	});

	$('.localScroll-slow').localScroll({
		duration: 2000
	});


	/*---------------------------------------------------------*/
	/*  CLOSE FULLSCREEN MENU WHEN CLICK                       */
	/*---------------------------------------------------------*/

	$(".localScroll").find("li").click(function () {
		$(".overlay-close").click();
	});


	/*---------------------------------------------------------*/
	/*  ACTIVE BUTTON TAB                                      */
	/*---------------------------------------------------------*/

	$('.buttons-tab li').on('click',function (){
		$('.buttons-tab li').removeClass('active');
		$(this).addClass('active');
	});


	/*---------------------------------------------------------*/
	/*  OWN CAROUSEL FOR TABS                                  */
	/*---------------------------------------------------------*/

	$('#tab').owlCarousel({
		items:1,
		animateIn: 'owl-goDown-in',
		animateOut: 'owl-goDown-out',
		responsiveClass:true,
		mouseDrag: false,
		dots: false,
		responsive:{
			0:{dots:true,loop:true},
			600:{nav:true,loop:true},
			992:{nav:false}
		}
	});


	/*---------------------------------------------------------*/
	/*  OWN CAROUSEL FOR SCREESHOTS                            */
	/*---------------------------------------------------------*/

	$('#screenshots').owlCarousel({
		margin:100,
		loop:true,
		nav:true,
		center: true,
		mouseDrag: false,
		dots: false,
		responsiveClass:true,
		responsive:{
			0:{items:2,nav:false,margin:30},
			480:{items:2,margin:100},
			800:{items:4},
			1500:{items:6},
			2200:{items:8}
		}
	});


	/*---------------------------------------------------------*/
	/*  OWN CAROUSEL FOR TESTIMONIALS                          */
	/*---------------------------------------------------------*/

	$('#testimonials').owlCarousel({
		items:1,
		animateIn: 'owl-goDown-in',
		animateOut: 'owl-goDown-out',
		responsiveClass:true,
		mouseDrag: false,
		dots:true,
		loop:true,
		nav:false,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true
	});


	/*---------------------------------------------------------*/
	/*  NIVO LIGHTBOX                                          */
	/*---------------------------------------------------------*/

	$('#screenshots a').nivoLightbox({
		effect: 'fadeScale',
	});

	$('a.nivo-preview').nivoLightbox({
		effect: 'fadeScale',
	});


	/*---------------------------------------------------------*/
	/*  TWITTIE                                                */
	/*---------------------------------------------------------*/

	$('#twits').twittie({
		dateFormat: '%b. %d, %Y',
		// If you want to fetch tweets from specific Twitter list, you must define the list name in the list option and username of the list owner.
		//username: 'vincentdignan',
		//list: '',
		template: '<div class="wow fadeInUpBig"><div class="container"><h3 class="pulse-hover">{{tweet}}</h3><div class="info"><!-- ***TWITTER ACCOUNT*** --><div class="author"><span class="icon icon-bullhorn"></span>{{screen_name}}</div><!-- ***AUTHOR*** --><div class="author hidden-xs"><span class="icon icon-head"></span>{{user_name}}</div><!-- ***DATE*** --><div class="date"><span class="icon icon-calendar"></span>{{date}}</div></div></div></div>',
		count: 3
	});


	/*---------------------------------------------------------*/
	/*  CONTACT FORM                                           */
	/*---------------------------------------------------------*/

	$("#contact").submit(function (e) {

		e.preventDefault();
		var btn = $('#submit');
		btn.button('loading');
		setTimeout(function () {

			btn.button('reset');

			var b = 'border-error';
			var ap = 'animated-error pulse';
			var bap = 'border-error animated-error pulse';

			var n = '#name';
			var name = $("#name").val();

			var e = '#email';
			var email = $("#email").val();

			var m = '#message';
			var message = $("#message").val();
			
			var dataString = 'name=' + name + '&email=' + email + '&message=' + message;

			function isValidEmail(emailAddress) {
				var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
				return pattern.test(emailAddress);
			}

			if (name.length <= 1) {
				$(n).addClass(bap);
				setTimeout(function () {
					$(n).removeClass(ap);
				}, 1000);
			} else { $(n).removeClass(b);}

			if (isValidEmail(email) === false) { $(e).addClass(bap);
				setTimeout(function () {
					$(e).removeClass(ap);
				}, 1000);
			} else { $(e).removeClass(b);}

			if (message.length <= 1) { $(m).addClass(bap);
				setTimeout(function () {
					$(m).removeClass(ap);
				}, 1000);
			} else { $(m).removeClass(b);}

			if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {

				$.ajax({
					type: "POST",
					url: "assets/php/sendmail.php",
					data: dataString,
					success: function () {
						$(btn).fadeOut(500);
						$('.success').fadeIn(1000);
						$(n,e,m).removeClass(b);
					}
				});

			}
			return false;
		}, 800);

	});


	/*---------------------------------------------------------*/
	/*  MAILCHIMP SUBSCRIPTION                                 */
	/*---------------------------------------------------------*/

	$('#subscription').ajaxChimp({
		callback: callbackFunction,
		url: MailChimpUrl
	});

	function callbackFunction (resp) {

		if(resp.result === 'success') {
			$('.subscription-success')
				.html('Please check your e-mail to complete the subscription')//resp.msg
				.fadeIn(500);
			$('.spam').fadeOut(500);
			$('.subscription-failed').fadeOut(500);

		} else if(resp.result === 'error') {

			$('#subscription').addClass('animated-error pulse');
			setTimeout(function () {
				$('#subscription').removeClass('animated-error pulse');
			}, 1000);
			$('.spam').fadeOut('300', function () {
				$('.subscription-failed')
				.html('Please enter unsubscribed or valid e-mail address')
				.fadeIn(1000);
			});
			$('.subscription-success').fadeOut(500);
		}
	}


	/*---------------------------------------------------------*/
	/*  DECLARE IF IT IS A DEVICE                              */
	/*---------------------------------------------------------*/

	var onMobile = false;
	if( navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|IEMobile/i) ) {
		var onMobile = true;
	}

	/*---------------------------------------------------------*/
	/*  ONLY FOR DEVICES                                       */
	/*---------------------------------------------------------*/

	if( onMobile == true ) {
		$('.pulse-hover, header ul li i, .responsive-nav li i, .owl-prev, .owl-next, .social li a, .links li').addClass('no-pulse');

	}


	/*---------------------------------------------------------*/
	/*  ONLY DESKTOP                                           */
	/*---------------------------------------------------------*/

	if ( onMobile == false ) {

		/*---------------------------------------------------------*/
		/*  WOW                                                    */
		/*---------------------------------------------------------*/

		var wow = new WOW({
			boxClass:     'wow',      // default
			animateClass: 'animated', // default
			mobile: false
		});
		wow.init();

	}

	/*---------------------------------------------------------*/
	/*  CLICK ACTIVE ACCORDION                                 */
	/*---------------------------------------------------------*/

	if ( $(window).width() >= 992) {
		$(".responsive-accordion .active .responsive-accordion-head").click();
	}


	/*---------------------------------------------------------*/
	/*  FULLSCREEN MENU                                        */
	/*---------------------------------------------------------*/

	//open/close primary navigation
	$('.cd-primary-nav-trigger').on('click', function(){
		$('.cd-menu-icon').toggleClass('is-clicked'); 
		$('.cd-header').toggleClass('menu-is-open');
		
		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( $('.cd-primary-nav').hasClass('is-visible') ) {
			$('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').addClass('overflow-hidden');
			});	
		}
	});


	/*---------------------------------------------------------*/
	/*  VIDEO AND SLIDE BACKGROUND                             */
	/*---------------------------------------------------------*/

	if ($("header").hasClass('video')){
		$(".video").vide({
			'mp4': 'assets/videos/video-bg',
			'webm': 'assets/videos/video-bg',
			'ogv': 'assets/videos/video-bg',
			'poster': 'assets/videos/video-bg',
		});
	} else if ($("header").hasClass('slide-bg')){
		$('#maximage').maximage({
			cycleOptions: {
				fx: 'fade',
				speed: 4000,
				timeout: 400
			},
			fillElement: '#home'
		});
	};




}); //END DOCUMENT READY


/*---------------------------------------------------------*/
/*  FULLSCREEN MENU                                        */
/*---------------------------------------------------------*/


// NAV FOR BLOG
function nav_blog() {
	if ($("header > div").hasClass("header-blog-version")) {
		$('.responsive-nav').css('top','0');
		$('.responsive-nav').css('opacity','1');
	}
};

nav_blog();


/*---------------------------------------------------------*/
/*  WINDOW SCROLL                                          */
/*---------------------------------------------------------*/

jQuery(window).scroll(function () {



	/*---------------------------------------------------------*/
	/*  NAVBAR                                                 */
	/*---------------------------------------------------------*/
	
	if ( $(window).scrollTop() >= $('header').outerHeight()-100) {
		$('.responsive-nav').css('top','0');
		$('.responsive-nav').css('opacity','1');
	}
	else{
		$('.responsive-nav').css('top',-$('.responsive-nav').outerHeight()+'px');
		$('.responsive-nav').css('opacity','0');
	}

	nav_blog();

	/*---------------------------------------------------------*/
	/*  OPACITY WHEN SCROLLING                                 */
	/*---------------------------------------------------------*/

	var fadeS = $('.fadeScroll');
	var st = $(this).scrollTop();
	fadeS.each(function () {
		var offset = $(this).offset().top;
		var height = $(this).outerHeight();
		offset = offset + height / 2;
		$(this).css({
			'opacity': (1 - ((st - offset + 300) / 200))
		});
	});


	/*---------------------------------------------------------*/
	/*  SIDEBAR BLOG                                           */
	/*---------------------------------------------------------*/

	if ( $("aside").hasClass('sidebar-blog') ) {
		var superarHeight = $(".sidebar-blog").height() + $(".sidebar-blog").offset().top;
		if ($(window).scrollTop() >= superarHeight){
			$("#blog-scroll").removeClass('col-md-8').addClass('col-md-12');
		} else {
			$("#blog-scroll").addClass('col-md-8').removeClass('col-md-12');
		}
	}


}); //END WINDOW SCROLL





/*---------------------------------------------------------*/
/*  NAVBAR LI AUTOHEIGHT                                   */
/*---------------------------------------------------------*/

contactNum();
$(window).on('resize', function(){
	contactNum();
});

// NAVBAR LI AUTOHEIGHT END