jQuery(document).ready(function($) {
	$("ul.sf-menu").superfish({ 
        animation: {height:'show'},   // 无淡入的下滑效果
        delay:     400 ,              // mouseout 延迟 1.2 秒
        autoArrows:  false,
        speed:         'normal'
    });
	//按钮
    $(document).mousemove(function(e){
    	if((e.pageY) < 200){
			$("#headernav").fadeIn();
		}else{
			$("#headernav").fadeOut();
		}
   	});
//背景图片切换
	$('#front-slides').slides({
		preload: true,
		generateNextPrev: false,
		slideSpeed: 500,
		animationStart: function(current){
			$slideCaption = $(".slides_container div.slide:eq("+ (current-1) +") .caption").text();
			$("#headline h6").text($slideCaption);

			if($slideCaption != ''){
				$("#headline").stop().hide().slideDown(600);
			}else{
				$("#headline").hide();
			}
		}
	});
	//图片
	$firstCaption = $(".slides_container div.slide:eq(0) .caption").text();
	if($firstCaption != ''){
		$("#headline h6").text($firstCaption);
	}else{
		$("#headline").hide();
	}
//简介轮播
	$('#reel').slides({
		preload: true,
		generateNextPrev: false,
		generatePagination: false,
		next: 'next',
		slideSpeed: 700
	});
	//背景轮播
	var $filterList = $('ul#portfolio-list');
	for(var i=0; i<$('ul#portfolio-list li').length; i++){
		$('ul#portfolio-list li:eq(' + i + ')').attr('id','unique_item' + i);
	}

	//切换
	var $data = $filterList.clone();
	$('#portfolio-filter a').click(function(e) {
		if($(this).attr('rel') == 'all') {
			var $filteredData = $data.find('li');
		} else {
			var $filteredData = $data.find('li.' + $(this).attr('rel'));
		}
		$('ul#portfolio-list').quicksand($filteredData, {
			duration: 500,
			attribute: function(v) {
				return $(v).attr('id');
			}
		}, function() {
	        galleryRestart();
		});
		e.preventDefault();
	});


	function galleryRestart(){
		$("a[rel^='prettyPhoto']").prettyPhoto();
		$displayText = $(".gallery-filter .layout-notext").hasClass("active");
		if($displayText){
			$filterList.find(".thumb-description").slideUp(0);
		}
	}
	galleryRestart();
	//图片字体隐藏
	var $layout_text = $(".gallery-filter .layout-text");
	var $layout_notext = $(".gallery-filter .layout-notext");
	var $gallery = $filterList;
	$layout_text.live('click', function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			$layout_notext.removeClass("active");
			$gallery.find(".thumb-description").slideDown();
		}
	});
	$layout_notext.live('click', function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			$layout_text.removeClass("active");
			$gallery.find(".thumb-description").slideUp();
		}
	});

});



