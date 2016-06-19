

 class SoundBox {
    
    constructor(mp3, ogg,icon,color) {
      this.mp3 = mp3;
      this.ogg = ogg;
      this.location = location;
      this.color = color;
      SoundBox.counter++;
      this.boxId = SoundBox.counter;
      this.icon = icon;
      this.myAudio = new Audio(mp3); 
      this.myAudio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
      this.myAudio.play();
      this.myAudio.volume = 0;
    }
    get icon_() {
      return this.icon;
    }
    get location_() {
      return this.location;
    }
    get color_() {
      return this.color;
    }
   get id_() {
      return this.boxId;
    }
    set location_ (str) {
     this.location = str; 
    }
  }

var sounds = new Array();
    
function AddSound(mp3, ogg,icon,color){
  sounds.push(new SoundBox(mp3, ogg,icon,color));
}
 
var RunSoundBox = function Run(){

  var arr = sounds;
  var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var boxHeight = 50;
  var iconTop = 50;

  function playPause(){
    var button = $('#mute-button');  
    if($(button).hasClass('play')){
      $(button).removeClass('play')
      $(button).addClass('pause');;
      mute();
    }
    else{   
      $(button).removeClass('pause');
      $(button).addClass('play');
      volume();
     }
  }

  $('#mute-button').click(function(){
      playPause();
    });

  function mute(){
    jQuery.each( arr, function( j, val ) {
          arr[j].myAudio.volume = 0;
        });
  }

  function fixColors(){
      jQuery.each( arr, function( j, val ) {
        var newHeight = arr[j].myAudio.volume*100 + "%";
        $('#sound-box'+j).css("background-size",newHeight + " " + newHeight);
      });
    }  

  function volume(){
      jQuery.each( arr, function( j, val ) {
        if(j==0){
          arr[j].myAudio.volume = Math.abs(height-arr[j].location_)/height;
        }
        else{
          arr[j].myAudio.volume = Math.abs(arr[j].location_ - arr[j-1].location_)/height;
        }     
        var newHeight = arr[j].myAudio.volume*100 + "%";
     
        $('#sound-box'+j).css("background-size",newHeight + " " + newHeight);
      });
    }  

  jQuery.each( arr, function( i, val ) {
    if(i==(arr.length-1)){
        arr[i].myAudio.volume = 1;
    }
    // Append Boxes
    $("section#sound-content").append('<div id=sound-box' + i + ' class=sound-box><div class=box-show-icon></div></div>');
    $('#sound-box'+i).css("width", width);
    $('#sound-box'+i).css("height", height);
    $('#sound-box'+i).css("background-color", val.color);
    $('#sound-box'+i).css("z-index", 100-i);
    var init =  -i*boxHeight + height -boxHeight;
    $('#sound-box'+i).css("top",init);
    arr[i].location_ = init;
    this.startLimit_ = init;
    $('#sound-box'+i).draggable({ axis: "y" ,
       containment: [0,0,0,height-(boxHeight*i)-boxHeight]
    });

    // Icons
    var mouseX;
    var mouseY;
    $(document).mousemove( function(e) {
       mouseX = e.pageX; 
       mouseY = e.pageY;
       if(mouseY < 30){
         $('#sound-icon'+i).css('top',mouseY+0);
       }else{
         $('#sound-icon'+i).css('top',$('#sound-box'+i).position().top-iconTop);
       }

       if(mouseX< width-200){
          $('#sound-icon'+i).css('left',mouseX+20);
        }else{
          $('#sound-icon'+i).css('left',mouseX-200);
        }
    });  

    $("#sound-icons").append('<div id=sound-icon'+i+' class=sound-icon></div>');
    $('#sound-icon'+i).css({"background-image":'url('+ arr[i].icon_ +')', 'left':mouseX, 'top': $('#sound-box'+i).position().top-iconTop});    
    $('#sound-box'+i + ' .box-show-icon').hover(function(){
      $('#sound-icon'+i).toggle();
    });
    
      // Gradient
      var gradientHeight = (boxHeight/height)*100 + "%";
      $('#sound-box'+i).css("background",arr[i].color_);
      if(i<arr.length-1){
        $('#sound-box'+i).css("background",'-webkit-linear-gradient('+arr[i+1].color_+','+arr[i].color_);
        $('#sound-box'+i).css("background",'-o-linear-gradient('+arr[i+1].color_+','+arr[i].color_);
        $('#sound-box'+i).css("background",'-moz-linear-gradient('+arr[i+1].color_+','+arr[i].color_);
        $('#sound-box'+i).css("background",'linear-gradient('+arr[i+1].color_+','+arr[i].color_);
      }else{
        $('#sound-box'+i).css("background",'-webkit-linear-gradient(rgba(50,50,50,0.0),'+arr[i].color_);
        $('#sound-box'+i).css("background",'-o-linear-gradient(rgba(50,50,50,0.0),'+arr[i].color_);
        $('#sound-box'+i).css("background",'-moz-linear-gradient(rgba(50,50,50,0.0),'+arr[i].color_);
        $('#sound-box'+i).css("background",'linear-gradient(rgba(50,50,50,0.0),'+arr[i].color_);
      }
      $('#sound-box'+i).css("background-size",gradientHeight + ' ' +gradientHeight);

    // Drag event
    $('#sound-box'+i).on( "drag", function( event, ui ) { 
      // play
      var button = $('#mute-button');  
      $(button).removeClass('pause');
      $(button).addClass('play');
      // icon
      $('#sound-icon'+i).css("top",ui.position.top-iconTop);// move spesific icon      
        jQuery.each( arr, function( j, val ) {
          if(i<j  && $('#sound-box'+j).position().top >(arr.length-j)*boxHeight-boxHeight){
            var delta = ui.position.top - arr[i].location_;
            var dragged = $('#sound-box'+j).position().top;
            $('#sound-box'+j).css("top",dragged+delta);
            arr[j].location_ = $('#sound-box'+j).position().top;
            $('#sound-icon'+j).css("top",arr[j].location_-iconTop); // move all up icons
          }
        });
      arr[i].location_ = ui.position.top;
      volume();
      fixColors();
    }); 

    // Mouse down event work 
    $('#sound-box'+i).mousedown(function() {
      var friendHeight = height;
      if(i>0){
        friendHeight = $('#sound-box'+(i-1)).position().top;
      }
      $('#sound-box'+i).draggable({ axis: "y" ,
         containment: [0,(arr.length-i)*boxHeight-boxHeight,0,friendHeight-boxHeight]
      });
    });

    
  });

  // First sound dragging
  var startPosition = 0;   
  if(startPosition < arr[arr.length-1].location_){
    $('#sound-box'+(arr.length-1)).css("top",startPosition);
    arr[arr.length-1].location_ = startPosition;
    $('#sound-icon'+(arr.length-1)).css("top",startPosition-iconTop); 
    var newHeight;
    if(arr.length>1){
      newHeight = ((arr[arr.length-2].location_)-(arr[arr.length-1].location_))/height*100 + "%";
    }else{
      newHeight =  (height-startPosition)/height;
    }
    $('#sound-box'+(arr.length-1)).css("background-size",newHeight + ' ' +newHeight);
  }

};




