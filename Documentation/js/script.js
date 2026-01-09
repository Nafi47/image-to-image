(function ($) {

	"use strict";

	// Add OnepageNav / Sidebar
	function sideNav() {
		if ($('.menu-box .sticky-menu').length) {
			$('.menu-box .sticky-menu ul').onePageNav();
		}
	}

	// Add Scroll Bar To Sidebar
	if ($('#sidebar .menu-box').length) {
		$("#sidebar .menu-box").mCustomScrollbar({
			axis: "y",
			autoExpandScrollbar: false
		});
	}

	// // Offcanvas Js Start
	$(document).on('click', '.menu__open', function () {
		$('#sidebar, .overlay').addClass('active');
	});

	$(document).on('click', '.menu__close, .overlay, .sticky-menu li a', function () {
		$('#sidebar, .overlay').removeClass('active');
	});

	// animate to top on Page Refresh
	$('html, body').animate({
		scrollTop: $('html, body').offset().top
	}, 100);

	/* ==========================================================================
	   When document is ready, do
	   ========================================================================== */

	$(document).on('ready', function () {
		sideNav();
	});

})(window.jQuery);