//背景动画
var autoplay = true;
// 自动幻灯片的速度
var slideshowSpeed = 9000;
// 用于存储我们需要设置为背景的图像/滑块的变量
var photos = [ 
	{"image" : "img/bg/grunge.jpg", "color" : "#ffffff" },
	{ "image" : "img/bg/blue.jpg", "color" : "#ffffff" },
	{"image" : "img/bg/spaces.jpg", "color" : "#ffffff" },
	{ "image" : "img/bg/twilight.jpg", "color" : "#ffffff" },
	{ "image" : "img/bg/rainbow.jpg", "color" : "#ffffff" }
];
// IMPORTANT: Don't mess below this line //


// Jquery with no conflict
jQuery(document).ready(function($) {

	// 向后导航
	$("#back").click(function() {
		stopAnimation();
		navigate("back");
	});

	// Forward navigation
	$("#next").click(function() {
		stopAnimation();
		navigate("next");
	});

	var interval;
	$("#control").toggle(function(){
		stopAnimation();
	}, function() {
		navigate("next");

		// 显示下一张图片开始播放动画
		interval = setInterval(function() {
			navigate("next");
		}, slideshowSpeed);
	});

//图片轮播
	var activeContainer = 1;
	var currentImg = 0;
	var animating = false;
	var navigate = function(direction) {
		if(animating) {
			return;
		}
		if(direction == "next") {
			currentImg++;
			if(currentImg == photos.length + 1) {
				currentImg = 1;
			}
		} else {
			currentImg--;
			if(currentImg == 0) {
				currentImg = photos.length;
			}
		}
		var currentContainer = activeContainer;
		if(activeContainer == 1) {
			activeContainer = 2;
		} else {
			activeContainer = 1;
		}
		showImage(photos[currentImg - 1], currentContainer, activeContainer);
	};
//背景图切换
	var currentZindex = -1;
	var showImage = function(photoObject, currentContainer, activeContainer) {
		animating = true;
		currentZindex--;
		$("#headerimg" + activeContainer).css({
			"background-image" : "url(" + photoObject.image + ")",
			"display" : "block",
			"z-index" : currentZindex
		});
		$("body").css({
			"background-color" : photoObject.color
		});
		$("#headerimg" + currentContainer).fadeOut(function() {
			setTimeout(function() {
				animating = false;
			}, 500);
		});
	};



	var stopAnimation = function() {
		clearInterval(interval);
	};
	// We should statically set the first image
	navigate("next");
	// Start playing the animation
	if(autoplay){
		interval = setInterval(function() {
			navigate("next");
		}, slideshowSpeed);
	}

});