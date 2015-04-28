var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);  
    },
   
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
	    app.mapInitializer();
	},
	
	//Map deviceready initializer 
	mapInitializer: function(){
		var mapTab = document.getElementById('tab-icon-map');
		var mapDiv = document.getElementById('map_canvas');
		var map = plugin.google.maps.Map.getMap(mapDiv);
		  
		//Set initialize center
		const ABISKO = new plugin.google.maps.LatLng(68.361218, 18.622549);
		//set markers position
		const MOUNT_NUOLJA = new plugin.google.maps.LatLng(68.326820, 18.522127);
		const TORNETRASK = new plugin.google.maps.LatLng(68.422695, 18.697543);
		const NORDKALOTTRUTA = new plugin.google.maps.LatLng(68.243110, 18.647783);
		const MYLOCATION = new plugin.google.maps.LatLng(68.397409, 18.569441);
		  
		//Add markers
		var marker_mount = map.addMarker({
		    'position': MOUNT_NUOLJA,
	        'title': "Mount Nuolja",
	        'icon': 'www/img/Mount_Nuolja.png',
	        disableAutoPan: true,
	        'markerClick': function(marker) {
			 	marker.showInfoWindow();
			  	map.setCenter(MOUNT_NUOLJA);
	  		}      
	    });
	      
	    var marker_tornetrask = map.addMarker({
			'position': TORNETRASK,
			'title': "Tornetrask",
			'icon': 'www/img/Tornetrask.png',
			disableAutoPan: true,
			'markerClick': function(marker) {
				marker.showInfoWindow();
				map.setCenter(TORNETRASK);
	  		}      
	    });
	      
	    var marker_nordkalottruta = map.addMarker({
		    'position': NORDKALOTTRUTA,
	        'title': "Nordkalottruta",
	        'icon': 'www/img/Nordkalottruta.png',
	        disableAutoPan: true,
	        'markerClick': function(marker) {
			 	marker.showInfoWindow();
			  	map.setCenter(NORDKALOTTRUTA);
	  		}      
		});
	
	    var marker_location = map.addMarker({
			'position': MYLOCATION,
			//'title': "Tornetrask",
			'icon': 'www/img/Location.png',
	        disableAutoPan: true,
	        'markerClick': function(marker) {
			 	marker.showInfoWindow();
			 	map.setCenter(MYLOCATION);
	  		}      
	    });
	      
		//Camera animation on startup
		map.animateCamera({
	    	'target': ABISKO,
		  	'zoom': 10,
		  	'duration': 3000
		});
	      	  
		//Set map initialize option
		map.setOptions({
			'controls': {
				'compass': true,
				'myLocationButton': true,
			},
			  	
			'gestures': {
				'scroll': true,
				'tilt': false,
				'rotate': true,
				'zoom': true	
			}
		});
	    //End of map initilizer  
		
		//Maptab onclick event listener
		mapTab.addEventListener('click', onTabClick, false); 
    },
    
    //Map tab onclick function
    onTabClick: function() {
    	map.showDialog();
	}
 
};//End of app function


app.initialize();

//jQuery animation
var main = function(){
	//Tab bar onclick function
	$('#tab-icon-learn').on('tap', function(){
		$('.tab-icon').removeClass('tab-icon-current');
		$(this).addClass('tab-icon-current');
		
		$('.page').removeClass('page-current');
		$('#page-learn').addClass('page-current');
		
		$('.title').removeClass('title-current');
		$('#title-learn').addClass('title-current');
	});
	
	$('#tab-icon-search').on('tap',function(){
		$('.tab-icon').removeClass('tab-icon-current');
		$(this).addClass('tab-icon-current');
		
		$('.page').removeClass('page-current');
		$('#page-search').addClass('page-current');
		
		$('.title').removeClass('title-current');
		$('#title-search').addClass('title-current');
		
	});
	
	$('#tab-icon-map').on('tap',function(){
		$('.tab-icon').removeClass('tab-icon-current');
		$(this).addClass('tab-icon-current');
		
		$('.page').removeClass('page-current');
		$('#page-map').addClass('page-current');
		
		$('.title').removeClass('title-current');
		$('#title-map').addClass('title-current');
		
	});
	
	//Silhouette lessons onclick function
	$('#link_silhouette').on('tap',function() {
		//remove display:none
		$('.silhouette_lessons').removeClass('lessons_hidden');
		$('#page-silhouette-lesson').removeClass('inactive-lesson-page').addClass('active-lesson-page');
		setTimeout(function() {
			$('#img_silhouette').animate({'left':'-=184px','top':'-=340px','height':$('#img_silhouette').height()*1.2, 'width':$('#img_silhouette').width()*1.2}, 400);
			$('#circle_silhouette').removeClass('circle').addClass('circle_active');
		}, 20);
		setTimeout(function() {
			$('.icon-back').addClass('icon-back_active');
			$('.lesson_title').addClass('lesson_title_active');
			$('.silhouette_lessons').addClass('lessons_active');
		}, 720);
	});	
	
	//Back onclick function
	$('.icon-back').on('tap',function() {
		
		$('.lesson_title').removeClass('lesson_title_active');
		$('.icon-back').removeClass('icon-back_active');
		$('.silhouette_lessons').removeClass('lessons_active');
		$('#img_silhouette').animate({'left':'+=184px','top':'+=340px','height':$('#img_silhouette').height()/1.2, 'width':$('#img_silhouette').width()/1.2}, 400);
		
		setTimeout(function() {
			$('#circle_silhouette').removeClass('circle_active').addClass('circle');
		}, 700);
		setTimeout(function(){
			$('.silhouette_lessons').addClass('lessons_hidden');
			$('#page-silhouette-lesson').removeClass('active-lesson-page').addClass('inactive-lesson-page');
		}, 1400);
	});
	
	//modify lessons array position
	var lessons = document.getElementsByClassName('silhouette_lessons');
	
	for(var i=0; i<lessons.length; i++) {
		lessons[i].style.left = 168 + 545*i + 'px';
	}
	
	//Lessons swipe selection
	$('.silhouette_lessons').on('swipeleft', function(){
		if(!$(this).hasClass('lessons_last') && $(this).hasClass('lessons_current')){
			$('.silhouette_lessons').animate({
				'left':'-=545px'}
			, 400);
			$(this).removeClass('lessons_current');
			$(this).next().addClass('lessons_current');
		}
	});
	
	$('.silhouette_lessons').on('swiperight', function(){
		if(!$(this).hasClass('lessons_first') && $(this).hasClass('lessons_current')){
			$('.silhouette_lessons').animate({
				'left':'+=545px'
				}
			, 400);
			$(this).removeClass('lessons_current');
			$(this).prev().addClass('lessons_current');
		}
	});
	
	//fix page overflow scrolling
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	
}

$(document).ready(main);


//layout the lessons
//every lesson moves once
//scale down the current lesson
//scale up the next lesson