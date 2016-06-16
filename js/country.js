  // add country
  var arrCountries = new Array();
  function addCountries(country){
    arrCountries.push(country);
  }
  // set main video & color
  var mainVideo;
  var mainColor;
  function setBackgroundVideo(color, src){
    mainVideo = src;
    mainColor = color;
    $("#bgvid").attr("src",src);
  }
  // run app
  function run(){
   $.getJSON( "data/countries.json", function( data ) {
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

         $('#country'+ key + ' div.title').click(function(){
            var fadeSelector = (!(value.background=='white')?'#fadeBlack':'#fadeWhite');
            var textColor = (!(value.background=='white')?'white':'black');
            $(fadeSelector).fadeIn(500, function() {
              if(value.url.length>0){
                $("iframe").attr("src",value.url);
              }else{
                $("iframe").attr("src",'video.html?vid='+key);
              }
              $("iframe").css("visibility","visible");
              $("#iframeHeader").css("visibility","visible");

              $(fadeSelector).fadeOut();
            });
        });

          $(".close").click(function(){
              var fadeSelector = (!(value.background=='white')?'#fadeBlack':'#fadeWhite');
              $(fadeSelector).fadeIn(500, function() {
                $("iframe").css("visibility","hidden");
                $("#iframeHeader").css("visibility","hidden");
                $("#iframeHeader").removeClass("transparent_block");
                $(fadeSelector).fadeOut();

              });
          });

      });
    });


   // when opening iframe
   $("#iframeHeader").click(function(){
    if(!$(this).hasClass("transparent_block")){
           $(this).addClass("transparent_block");
        }
        else{
          $(this).removeClass("transparent_block");
        }
   });


  }
