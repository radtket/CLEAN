/* eslint-disable no-bitwise */
/* ---------------------------------------------
	Height 100%
	--------------------------------------------- */
function jsHeightInit() {
	$(".js-height-full").height($(window).height());
	$(".js-height-parent").each(function() {
		$(this).height(
			$(this)
				.parent()
				.first()
				.height()
		);
	});
}

/* ---------------------------------------------
	 Fullscreen menu
 --------------------------------------------- */

const fmMenuWrap = $("#fullscreen-menu");
const fmMenuButton = $(".fm-button");

function initFullscreenMenu() {
	fmMenuButton.click(function() {
		if ($(this).hasClass("animation-process")) {
			return false;
		}

		if ($(this).hasClass("active")) {
			$(this)
				.removeClass("active")
				.css("z-index", "2001")
				.addClass("animation-process");

			fmMenuWrap.find(".fm-wrapper-sub").fadeOut("fast", () => {
				fmMenuWrap.fadeOut(() => {
					fmMenuWrap
						.find(".fm-wrapper-sub")
						.removeClass("js-active")
						.show();
					fmMenuButton.css("z-index", "1030").removeClass("animation-process");
				});
			});
		} else {
			$(this)
				.addClass("active")
				.css("z-index", "2001")
				.addClass("animation-process");

			fmMenuWrap.fadeIn(() => {
				fmMenuWrap.find(".fm-wrapper-sub").addClass("js-active");
				fmMenuButton.removeClass("animation-process");
			});
		}

		return false;
	});

	$("#fullscreen-menu")
		.find("a:not(.fm-has-sub)")
		.click(() => {
			if (fmMenuButton.hasClass("animation-process")) {
				return false;
			}

			fmMenuButton
				.removeClass("active")
				.css("z-index", "2001")
				.addClass("animation-process");

			fmMenuWrap.find(".fm-wrapper-sub").fadeOut("fast", () => {
				fmMenuWrap.fadeOut(() => {
					fmMenuWrap
						.find(".fm-wrapper-sub")
						.removeClass("js-active")
						.show();
					fmMenuButton.css("z-index", "1030").removeClass("animation-process");
				});
			});
		});

	// Sub menu

	const fmHasSub = $(".fm-has-sub");
	let fmThisLi;

	fmHasSub.click(function() {
		fmThisLi = $(this).parent("li:first");
		if (fmThisLi.hasClass("js-opened")) {
			fmThisLi.find(".fm-sub:first").slideUp(() => {
				fmThisLi.removeClass("js-opened");
				fmThisLi
					.find(".fm-has-sub")
					.find(".fa:first")
					.removeClass("fa-angle-up")
					.addClass("fa-angle-down");
			});
		} else {
			$(this)
				.find(".fa:first")
				.removeClass("fa-angle-down")
				.addClass("fa-angle-up");
			fmThisLi.addClass("js-opened");
			fmThisLi.find(".fm-sub:first").slideDown();
		}

		return false;
	});
}

function BackgroundVideo(el, options) {
	const defaults = {
		videoid: "video_background",
		autoplay: true,
		loop: true,
		preload: true
	};

	const plugin = this;

	plugin.settings = {};

	function centerVideo() {
		const centerX =
			(($(window).width() >> 1) - (plugin.$videoEl.width() >> 1)) | 0;
		const centerY =
			(($(window).height() >> 1) - (plugin.$videoEl.height() >> 1)) | 0;

		if (plugin.settings.align === "centerXY") {
			plugin.$videoEl.css({
				left: centerX,
				top: centerY
			});
			return;
		}

		if (plugin.settings.align === "centerX") {
			plugin.$videoEl.css("left", centerX);
			return;
		}

		if (plugin.settings.align === "centerY") {
			plugin.$videoEl.css("top", centerY);
		}
	}

	function getProportion() {
		const windowWidth = $(window).width();
		const windowHeight = $(window).height();
		const windowProportion = windowWidth / windowHeight;
		const origProportion = plugin.settings.width / plugin.settings.height;
		let proportion = windowHeight / plugin.settings.height;

		if (windowProportion >= origProportion) {
			proportion = windowWidth / plugin.settings.width;
		}

		return proportion;
	}

	function setProportion() {
		const proportion = getProportion();
		plugin.$videoEl.width(proportion * plugin.settings.width);
		plugin.$videoEl.height(proportion * plugin.settings.height);

		if (typeof plugin.settings.align !== "undefined") {
			centerVideo();
		}
	}

	function buildVideo() {
		let html = "";
		let preloadString = "";
		let autoplayString = "";
		let loopString = "";
		const settingPreload = plugin.settings.preload;
		const settingAutoplay = plugin.settings.autoplay;
		const settingLoop = plugin.settings.loop;

		if (settingPreload) {
			preloadString = 'preload="auto"';
		} else {
			preloadString = "";
		}

		if (settingAutoplay) {
			autoplayString = 'autoplay="autoplay"';
		} else {
			autoplayString = "";
		}

		if (settingLoop) {
			loopString = 'loop="true"';
		} else {
			loopString = "";
		}

		html += `<video id="${
			plugin.settings.videoid
		}"${preloadString}${autoplayString}${loopString}`;

		if (plugin.settings.poster) {
			html += ` poster="${plugin.settings.poster}" `;
		}

		html +=
			'style="display:none;position:fixed;top:0;left:0;bottom:0;right:0;z-index:-100;width:100%;height:100%;">';
		for (let i = 0; i < plugin.settings.types.length; i += 1) {
			html += `<source src="${plugin.settings.path}${
				plugin.settings.filename
			}.${plugin.settings.types[i]}" type="video/${
				plugin.settings.types[i]
			}" />`;
		}
		html += "bgvideo</video>";
		plugin.el.html(html);
		plugin.videoEl = document.getElementById(plugin.settings.videoid);
		plugin.$videoEl = $(plugin.videoEl);
		plugin.$videoEl.fadeIn(2000);
		setProportion();
	}

	function init() {
		plugin.settings = $.extend({}, defaults, options);
		plugin.el = el;

		buildVideo();
	}

	init();

	$(window).resize(() => {
		setProportion();
	});

	function restartVideo() {
		this.play();
	}

	plugin.$videoEl.bind("ended", restartVideo);
}

/* ---------------------------------------------
 Scripts initialization
 --------------------------------------------- */

$(window).load(() => {
	$(window).trigger("scroll");
	$(window).trigger("resize");
});

$(document).ready(() => {
	$(window).trigger("resize");
	initFullscreenMenu();

	BackgroundVideo($("#video-background-1"), {
		align: "centerXY",
		width: 1280,
		height: 720,
		path: "video/",
		filename: "LastNightOut",
		types: ["mp4", "webm"],
		autoplay: true,
		loop: true
	});
});

$(window).resize(() => {
	jsHeightInit();
});
