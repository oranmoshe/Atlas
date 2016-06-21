window.onload = function(){
    var loc = window.location.href;
    var replaceIndex = loc.lastIndexOf("/");
    var changeHref = loc.substring(replaceIndex+1, loc.length);
    var newHref, keyPressed;
    //console.log(changeHref);

    window.onkeydown = function(event){
        keyPressed = event.keyCode;
        var addKey = "?"+ keyPressed;
        var loadPage = "hyg.html" + addKey;
        newHref = loc.replace(changeHref, loadPage);
        window.location.assign(newHref);   
    };
};