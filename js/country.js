  // add country
  var arrCountries = new Array();
  function addCountries(country){
    arrCountries.push(country);
  }
  // set main video & color
  var mainVideo;
  var mainColor;
  var countriesLength=0;
  function setBackgroundVideo(color, src){
    mainVideo = src;
    mainColor = color;
    $("#bgvid").attr("src",src);
  }
  // run app
  function run(){
    var openFlag = 0; 
   $.getJSON( "data/countries.json", function( data ) {
      countriesLength=data.length;
      $.each( data, function( key, value ) {

         $('#countriesList').append('<li id=country'+ key +'><article><div class=title>'+value.title+'</div><div class=country>'+value.country+' ⋆ '+ (key*7+50) +'km</div></article></li>');
         $('#country'+ key + ' div.title').first()
            .mouseover('mouseover',function(){
            if (value.color == 'black') {
                $("body").removeClass("dark")
                $("body").addClass("light")
            } else {
                $("body").removeClass("light")
                $("body").addClass("dark")
            }
            $("#previews").attr("src",value.mp4);
            $("#previews").css('visibility','visible');
         });

         $('#country'+ key + ' div.title').on("mousedown",function(){
            var fadeSelector = (!(value.background=='white')?'#fadeBlack':'#fadeWhite');
            var textColor = (!(value.background=='white')?'white':'black');
            $(fadeSelector).fadeIn(500, function() {
              if(value.url.length>0){
                $("iframe").attr("src",value.url);
              }else{
                $("iframe").attr("src",'video.html?vid='+key);
              }
              $("#iframeHeader").css("background-color",value.background);
              $("#iframeHeader span").css("color",value.color);
               $("#iframeHeader").addClass("animateClose"); 
              iframeOpen();
              $(fadeSelector).fadeOut();
            });  
            $("#next").click(function(){
              goNext();
            });
            $("#prev").click(function(){
              goPrev();
            });
            $(".close").click(function(){
              var fadeSelector = (!(value.background=='white')?'#fadeBlack':'#fadeWhite');
              $(fadeSelector).fadeIn(500, function() {
                iframeClose();
                $(fadeSelector).fadeOut();
              });
            });
           $("#info").unbind('click').bind('click', function(event){              
              if(event.target.id =="info") {
                if(openFlag==0){
                  iframeMenuOpen();
                  openFlag=1;
                  console.log(openFlag);
                }else{
                  iframeMenuClose();
                  openFlag=0;
                  console.log(openFlag);
                }
              }
            });
          });
        });
      });
   var iterator = 0;
   function goNext(){
    if(iterator<countriesLength){
      $("iframe").attr("src",'video.html?vid='+(iterator+1));
        iterator++;
        console.log(iterator);
      }
   }
   function goPrev(){
     if(iterator>0){
        $("iframe").attr("src",'video.html?vid='+(iterator-1));
        iterator--;
        console.log(iterator);
      }
   }
   function fadeOut(color){
      var fadeSelector = (!(color=='white')?'#fadeBlack':'#fadeWhite');
      $(fadeSelector).fadeIn(500, function() {
        $("iframe").css("visibility","hidden");
        $(fadeSelector).fadeOut();
      });  
   }
   function iframeOpen(){
       $("#iframeHeader").css("display","block");
       $("#iframeHeader").removeClass("hide");
       $("iframe").removeClass("hide");
   }
  function iframeClose(){
       $("iframe").attr("src",'');
       $("iframe").css("display","none");
       $("#iframeHeader").addClass("hide");
       $("#iframeHeader").css("display","none");
       $("#iframeHeader").removeClass("animateOpen");
       $("#iframeHeader").removeClass("animateClose");
   }
   function iframeMenuOpen(){
    $("#iframeHeader").removeClass("animateClose");
    $("#iframeHeader").addClass("animateOpen"); 
    $("#story").fadeIn(1000);
   }
   function iframeMenuClose(){
    $("#iframeHeader").removeClass("animateOpen");
    $("#iframeHeader").addClass("animateClose"); 
    $("#story").fadeOut(300);
   }

}
