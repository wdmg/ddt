jQuery.fn.viewport = function() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
		width: e[a+'Width'],
		height: e[a+'Height']
	};
}


var addProjectToList = null;
$(document).ready(function() {
	
	var $viewMode = $('#viewMode');
	var $mainFrame = $('#mainFrame');
	var $selectSize = $('#selectSize');
	var $followToUrl = $('#followToUrl');
	var $selectProjects = $('#selectProjects');
	var $projectsMenu = $selectProjects.find('.dropdown-menu');
	
	var viewPort = $(document).viewport();
	var frameSet = {
		width: $mainFrame.outerWidth(),
		height: $mainFrame.outerHeight()
	};
	
	var projectsList = null;
	var frameSize = {
		"desktop": {
			"horizontal": {
				"width": "100%",
				"height": "100vh"
			}
		},
		"laptop": {
			"vertical": {
				"width": "991px",
				"height": "1200px"
			},
			"horizontal": {
				"width": "1200px",
				"height": "991px"
			}
		},
		"tablet": {
			"vertical": {
				"width": "788px",
				"height": "1040px"
			},
			"horizontal": {
				"width": "1040px",
				"height": "788px"
			}
		},
		"mobile": {
			"vertical": {
				"width": "320px",
				"height": "568px"
			},
			"horizontal": {
				"width": "568px",
				"height": "320px"
			}
		}
	};
	
	var pixelRatio = 1;
	if(window.devicePixelRatio !== undefined)
		pixelRatio = window.devicePixelRatio;
	
	if(frameSet.width < viewPort.width)
		$viewMode.find('#fitToView').prop('disabled', false);
	else
		$viewMode.find('#fitToView').prop('disabled', true);

	function fitToView(scale) {
		
		scale = parseInt(scale);
		
		if(!scale) {
			scale = 1;
			frameSet = {
				width: $mainFrame.outerWidth(),
				height: $mainFrame.outerHeight()
			};
			
			if(frameSet.width >= viewPort.width) {
				scale = (viewPort.width / frameSet.width).toFixed(3) - 0.2;
			} else if(frameSet.height >= viewPort.height) {
				scale = (viewPort.height / frameSet.height).toFixed(3) - 0.2;
			}
			
		}
		
		$mainFrame.css({
			"-ms-transform": "scale("+scale+")",
			"-moz-transform": "scale("+scale+")",
			"-o-transform": "scale("+scale+")",
			"-webkit-transform": "scale("+scale+")",
			"transform": "scale("+scale+")"
		});
		
		if(scale == 1) {
			$mainFrame.css({
				"margin-top": "auto",
				"margin-left": "auto"
			});
		} else {
			$mainFrame.css({
				"margin-top": 56,
				"margin-left": (frameSet.width / 2) * scale
			});
		}
	}
	
	$selectSize.find('a.nav-link[data-screen]').click(function(e) {
		e.preventDefault();
		
		var screen = $(this).data("screen");
		if(!screen)
			screen = "desktop";
		
		var orientation = $(this).data("orientation");
		if(!orientation)
			orientation = "horizontal";
		
		if (!$(this).parent('.nav-item').hasClass('active')) {
			$selectSize.find('.nav-item').removeClass('active');
			$(this).parent('.nav-item').addClass('active');
		} else {
			if (!$(this).is('[data-screen="desktop"]') && !$(this).is('[data-screen="laptop"]')) {
				$(this).find('.fa').toggleClass('fa-rotate-0 fa-rotate-90');
				
				if($(this).data("orientation") == "horizontal")
					$(this).data("orientation", "vertical")
				else
					$(this).data("orientation", "horizontal")
				
			}
		}
		
		screen = $(this).data("screen");
		orientation = $(this).data("orientation");
		$mainFrame.stop().animate({
			width: frameSize[screen][orientation]["width"],
			height: frameSize[screen][orientation]["height"]
		}, 300);
		
		frameSet = {
			width: $mainFrame.outerWidth(),
			height: $mainFrame.outerHeight()
		};
		
		if(frameSet.width < viewPort.width)
			$viewMode.find('#fitToView').prop('disabled', false);
		else
			$viewMode.find('#fitToView').prop('disabled', true);
		
		if (!$(this).is('[data-screen="desktop"]') && !$(this).is('[data-screen="laptop"]')) {
			
			if($viewMode.find('#fitToView').checked)
				fitToView();
			
			
			$mainFrame.parent('.main-frame').css('width', 'auto');
		} else {
			$viewMode.find('#fitToView').prop('disabled', true);
			$mainFrame.parent('.main-frame').css('width', '100%');
			fitToView(1);
		}
		
	});
	
	
    $viewMode.find('#fitToView').change(function() {
        if(this.checked) {
			fitToView();
        } else {
			fitToView(1);
		}    
    });
	
	
	function followToUrl(src) {
	  if(src) {
		  $mainFrame.attr('src', src);
		  $followToUrl.find('input[name="follow"]').val(src);
	  }
	}
	$followToUrl.on("submit", function(e) {
		e.preventDefault();
		var url = $(this).find('input[name="follow"]').val();
		if(url !== undefined)
			followToUrl(url);
	});
	
	$('body').delegate('#selectProjects .dropdown-menu > .dropdown-item > a', 'click', function(e) {
		e.preventDefault();
		
		$projectsMenu.find('.dropdown-item').removeClass('active');
		$(this).parent('.dropdown-item').addClass('active');
		
		var url = $(this).attr('href');
		if(url !== undefined)
			followToUrl(url);
	});
	
	
	addProjectToList = function(data) {
		$projectsMenu.empty();
		$.each(data.projects, function(i, project) {
			
			var favicon = project.url + project.favicon;
			if(!favicon)
			   favicon = project.url + '/favicon.png';
			
			$('<li class="dropdown-item"><a href="'+project.url+'"><span class="favicon" style="background:url(\''+favicon+'\');"></span>'+project.title+'</a></li>').appendTo($projectsMenu);
			
			if(project.isDefault && project.url !== undefined)
				followToUrl(project.url);
		});
	}
	function addScript(src) {
	  var elem = document.createElement("script");
	  elem.src = src;
	  document.head.appendChild(elem);
	}
	addScript('projects.json?callback=addProjectToList');
	
	
	
});