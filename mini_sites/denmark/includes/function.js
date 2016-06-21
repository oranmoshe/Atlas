$(document).ready(function(){
    var loc = window.location.href;
    var replaceIndex = loc.lastIndexOf("/");
    var currentHref = loc.substring(replaceIndex+1, loc.length);
    var currentKeySearch = currentHref.lastIndexOf("?");
    var currentKey = currentHref.substring(currentKeySearch+1, currentHref.length);
    var currentLetter = String.fromCharCode(currentKey);
    var newHref, keyPressed, word, term, images, color;
    var imgArr = [];
  
  	$.getJSON("data/words.json", function(data){
		$.each(data.words, function(k, v){	 
			if (v.letter == currentLetter){
				 word = v.word;
				 term = v.term;
				 imgNum = v.imgnum;
				 images = v.images;
				 color = v.color;
				 var j; 
				 var arr = [];
				 for(j=0; j<imgNum; j++){
				 	imgArr[j] = (images[j].src);
				 	//console.log(imgArr[j]);	
				 }
			}
		});
    	
    	var preloadArr = new Array();
	    var i;
	             
	    for(i=0; i < imgArr.length; i++){
	        preloadArr[i] = new Image();
	        preloadArr[i].src = imgArr[i];
	    }
	
	    var currImg = 0;
	    var intID = setInterval(changeImg, 150);
	    function changeImg(){
	        if(currImg < (preloadArr.length)) { 
	            $(document.body).animate(100, function(){
	            $(this).css('background','url('
	            + preloadArr[currImg++].src +') center center fixed no-repeat');
	            }).animate({opacity: 1}, 100);
	        }
	        else {
	            //console.log('stop!');
	            stopFunction(); 
	        	showTerm();
	        }
    	}
    	
    	$("#term").html(term);
		$(".element").typed({
	        strings: [word],
	        typeSpeed: 100,
	        callback: function() {},
    	});
		
	    function stopFunction() {
	        //console.log('stopping');
	        clearInterval(intID);
	    }
	
	    function showTerm(){
	        $("#term").fadeIn('slow');
	    }
	});

    window.onkeydown = function(event){
        keyPressed = event.keyCode;
        var addKey = "?"+ keyPressed;
        var loadPage = "hyg.html" + addKey;
        newHref = loc.replace(currentHref, loadPage);
        window.location.assign(newHref);  
    };     
});
