/*
 *	created by zhangkai on 2016/10/10 
 */


Splitting();

;(function(global,$){
	'use strict';
	var Fullpage = (function(){
		function Fullpage (el,options) {
			this.$el = el;
			this.currIndex = 0;
			this.animating = false;
			this.init();
		}

		var utils = {
			throttle:function(callback,delayTime,maxTime){
				var timer = null;
				var prevTime = 0;

				return function(){
					var context = this;
					var argument = arguments;
					var currTime = Date.now();
					if(maxTime && currTime - prevTime >= maxTime){
						prevTime = currTime;
						callback.apply(context,argument);
					}else{
						if(timer) clearTimeout(timer);
						timer = setTimeout(function(){
							callback.apply(context,argument);
						},delayTime);
					}
				}
			}
		};

		Fullpage.prototype = {
			constructor:Fullpage,
			init:function(){
				this.initHTML();
				this.bindEvent();
			},
			initHTML:function(){
				this.$el.children().css({
					'height':'100vh',
					'transition':'all 0.7s',
					'-webkit-transition':'all 0.7s'
				});
			},
			bindEvent:function(){
				var that = this;
				var targetIndex,x0,y0,xDiff,yDiff,delta;

				$(window).on('wheel DOMMouseScroll',utils.throttle(function(){
					var e = arguments[0].originalEvent;
					delta = e.wheelDelta?e.wheelDelta:-e.detail;
					targetIndex = that.currIndex + (delta>0?-1:1);
					that.gotoTarget(targetIndex);
				},100));

				this.$el.on('touchstart',function(e){     
					x0 = e.touches[0].clientX;
					y0 = e.touches[0].clientY;
				});

				this.$el.on('touchmove',utils.throttle(function(){
					console.log('move')
					var e = arguments[0];
					if (!x0 || !y0) return;
					xDiff = e.touches[0].clientX - x0;
					yDiff = e.touches[0].clientY - y0;

					targetIndex = that.currIndex + (yDiff>0?-1:1);
					that.gotoTarget(targetIndex);
				},16));
			},
			gotoTarget:function(targetIndex){
				var children = this.$el.children();
				var that = this;
				var translateY;

				if(this.animating || targetIndex<0 || targetIndex>this.$el.children().length-1) return;

				translateY= 'translateY(-'+targetIndex*100+'%)';
				this.animating = true;
				$(children[0]).on('transitionend', function callback() {
			        this.removeEventListener('transitionend', callback);
			        that.animating = false;
		        });
		        children.css({
					'transform':translateY,
					'-webkit-transform':translateY
				});	

				this.currIndex = targetIndex;
			}
		};

		return Fullpage;
	})();

	$.fn.fullpage = function(options){
		this.each(function(){
			new Fullpage($(this),options);
		});
		return this;
	};
})(this,this.jQuery);



/*----scroll----*/
$(function() {
  $('a[href*=#]').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});






/*----bubble----*/
var $bubbles = $('.bubbles');

function bubbles() {
  
  // Settings
  var min_bubble_count = 20, // Minimum number of bubbles
      max_bubble_count = 60, // Maximum number of bubbles
      min_bubble_size = 3, // Smallest possible bubble diameter (px)
      max_bubble_size = 12; // Maximum bubble blur amount (px)
  
  // Calculate a random number of bubbles based on our min/max
  var bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count + 1));
  
  // Create the bubbles
  for (var i = 0; i < bubbleCount; i++) {
    $bubbles.append('<div class="bubble-container"><div class="bubble"></div></div>');
  }
  
  // Now randomise the various bubble elements
  $bubbles.find('.bubble-container').each(function(){
    
    // Randomise the bubble positions (0 - 100%)
    var pos_rand = Math.floor(Math.random() * 101);
    
    // Randomise their size
    var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 1));
    
    // Randomise the time they start rising (0-15s)
    var delay_rand = Math.floor(Math.random() * 16);
    
    // Randomise their speed (3-8s)
    var speed_rand = 3 + Math.floor(Math.random() * 9);
    
    // Random blur
    var blur_rand = Math.floor(Math.random() * 3);
    
    // Cache the this selector
    var $this = $(this);
    
    // Apply the new styles
    $this.css({
      'left' : pos_rand + '%',
      
      '-webkit-animation-duration' : speed_rand + 's',
      '-moz-animation-duration' : speed_rand + 's',
      '-ms-animation-duration' : speed_rand + 's',
      'animation-duration' : speed_rand + 's',
      
      '-webkit-animation-delay' : delay_rand + 's',
      '-moz-animation-delay' : delay_rand + 's',
      '-ms-animation-delay' : delay_rand + 's',
      'animation-delay' : delay_rand + 's',
      
      '-webkit-filter' : 'blur(' + blur_rand  + 'px)',
      '-moz-filter' : 'blur(' + blur_rand  + 'px)',
      '-ms-filter' : 'blur(' + blur_rand  + 'px)',
      'filter' : 'blur(' + blur_rand  + 'px)',
    });
    
    $this.children('.bubble').css({
      'width' : size_rand + 'px',
      'height' : size_rand + 'px'
    });
    
  });
}

// In case users value their laptop battery life
// Allow them to turn the bubbles off
$('.bubble-toggle').click(function(){
  if($bubbles.is(':empty')) {
    bubbles();
    $bubbles.show();
    $(this).text('Bubbles Off');
  } else {
    $bubbles.fadeOut(function(){
      $(this).empty();
    });
    $(this).text('Bubbles On');
  }
  
  return false;
});

bubbles();




