// set main video & color
var mainVideo;
var mainColor;
var countriesLength = 0;

// run app
function run() {
    $.getJSON("data/countries.json", function (data) {
        countriesLength = data.length;
        $.each(data, function (key, value) {

            // Generate DOM elements
            $('#countriesList').append('<li id=country' + key +
                '><article><div class=title>' + value.title +
                '</div><div class=country>' + value.country + ' <span class=dot></span> ' +
                (key * 7 + 50) + 'km</div></article></li>');

            console.log("ss");

            // Bind mouseover event, change BG and video SRC etc.
            $('#country' + key + ' div.title').first()
                .mouseover('mouseover', function () {
                    if (value.color == 'black') {
                        $("body").removeClass("dark")
                        $("body").addClass("light")
                    } else {
                        $("body").removeClass("light")
                        $("body").addClass("dark")
                    }
                    var otherVids = $("video.previews")
                    var newVid = $(
                        "<video class=previews loop autoplay src=" +
                        value.mp4 + ">")
                    $("body").append(newVid)
                    newVid.css("opacity", 0)
                        .animate({
                            "opacity": 1
                        }, {
                            "duration": 300
                        })
                    console.log(otherVids)
                    otherVids.animate({
                        "opacity": 0
                    }, {
                        "duration": 300,
                        "complete": function () {
                            $(this).remove()
                        }
                    })
                });

            // Handle clicks.
            $('#country' + key + ' div.title').on("mousedown", function () {
                var fadeSelector = ((value.background == 'white') ?
                    '#fadeWhite' : '#fadeBlack');
                var textColor = ((value.background == 'white') ?
                    'black' : 'white');
                if (value.color == "black") {
                    $("body").addClass("dark")
                    $("body").removeClass("light")
                } else {
                    $("body").addClass("light")
                    $("body").removeClass("dark")
                }
                $(fadeSelector).fadeIn(500, function () {
                    if (value.url.length > 0) {
                        $("iframe").attr("src", value.url);
                    } else {
                        $("iframe").attr("src",
                            'video.html?vid=' + key);
                    }
                    $("#iframeHeader").addClass("animateClose");
                    iframeOpen();
                    // Set color scheme.
                    if (value.color == "white") {
                        $("body").addClass("dark")
                        $("body").removeClass("light")
                    } else {
                        $("body").addClass("light")
                        $("body").removeClass("dark")
                    }
                    hoverNone() // Just in case
                    fillData(value);
                    $(fadeSelector).fadeOut();
                });
                $("#next").click(function () {
                    goNext();
                });
                $("#prev").click(function () {
                    goPrev();
                });
                $(".close").click(function () {
                    var fadeSelector = ((value.background ==
                            'white') ? '#fadeWhite' :
                        '#fadeBlack');
                    $(fadeSelector).fadeIn(500, function () {
                        iframeClose();
                        $(fadeSelector).fadeOut();
                    });
                });
                $("#info").unbind('click').bind('click', function (
                    event) {
                    iframeMenuToggle();
                });

                $("#slider").mouseout(function() {
                    hoverNone()
                    console.log("lkj")
                })
            });
        });
    });
    var iterator = 0; // The iterator points to the ID of the current minisite.

    // Put data into the menubar
    function fillData(data) {
        $("#story h1").html(data.title);
        $("#story h2").html(data.country);
        $("#story p").html(data.info);
        $("#story div").html(data.by);
    }

    // Go to next video by manipulating the iterator.
    function goNext() {
        if (iterator < countriesLength) {
            $("iframe").attr("src", 'video.html?vid=' + (iterator + 1));
            iterator++;
            console.log(iterator);
        }
    }

    // Previous video
    function goPrev() {
        if (iterator > 0) {
            $("iframe").attr("src", 'video.html?vid=' + (iterator - 1));
            iterator--;
            console.log(iterator);
        }
    }

    function fadeOut(color) {
        var fadeSelector = ((color == 'white') ? '#fadeWhite' : '#fadeBlack');
        $(fadeSelector).fadeIn(500, function () {
            $("iframe").css("visibility", "hidden");
            $(fadeSelector).fadeOut();
        });
    }

    function iframeOpen() {
        $("#iframeHeader").css("display", "block");
        $("#iframeHeader").removeClass("hide");
        $("iframe").removeClass("hide");
        $("iframe").addClass("show");
    }

    function iframeClose() {
        $("iframe").attr("src", '');
        $("iframe").removeClass("show");
        $("iframe").addClass("hide");
        $("#iframeHeader").addClass("hide");
        $("#iframeHeader").css("display", "none");
        $("#iframeHeader").removeClass("animateOpen");
        $("#iframeHeader").removeClass("animateClose");
        openFlag = 0;
    }

    // Open the video menu
    function iframeMenuOpen() {
        $("#iframeHeader").removeClass("animateClose");
        $("#iframeHeader").addClass("animateOpen");
    }
    // Close the video menu.
    function iframeMenuClose() {
        $("#iframeHeader").removeClass("animateOpen");
        $("#iframeHeader").addClass("animateClose");
    }

    // Toggle the menu
    function iframeMenuToggle() {
        if ($("#iframeHeader").hasClass("animateOpen")) {
            iframeMenuClose();
        } else {
            iframeMenuOpen();
        }
    }

    // Clear the hover state. Makes the screen go back to white.
    function hoverNone() {
        $("body").removeClass("dark")
            .addClass("light")

        $("video.previews").animate({
            opacity: 0
        }, {
            duration: 200,
            complete: function() {
                $(this).remove()
            }
        })
    }
}
