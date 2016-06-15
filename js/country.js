
 class Country {
    
    constructor(color,mp4,ogg, title, desc) {
      this.color = color;
      this.mp4 = mp4;
      this.ogg = ogg;
      this.title = title;
      this.desc = desc;
    }
    get color_() {
      return this.color;
    }
    set color_ (str) {
     this.color = str; 
    }
    get mp4_() {
      return this.mp4;
    }
    set mp4_ (str) {
     this.mp4 = str; 
    }
    get ogg_() {
      return this.mp4;
    }
    set ogg_ (str) {
     this.ogg = str;
   }
    get title_() {
      return this.title;
    }
    set title_ (str) {
     this.title = str;
   }
   get desc_() {
      return this.desc;
    }
    set desc_ (str) {
     this.desc = str;
   }
  }

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
    $('#countriesList li').css("color",color);
  }
  // run app
  function run(){
    // append countries
    $.each( arrCountries, function( key, value ) {
      $('#countriesList').append('<li id=country'+ key +'><article>'+value.title_+'<div>'+value.desc_+'</div></article></li>');
       $('#countriesList li article').css("color",value.color_);
       $('#country'+ key).mouseout(function(){
          $("#previews").css('visibility','hidden');
          $('#countriesList li article').css("color", mainColor);
       }).mouseover('mouseover',function(){
          $('#countriesList li article').css("color", value.color_);
          $("#previews").attr("src",value.mp4_);
          $("#previews").css('visibility','visible');
       });
    });


  }
 