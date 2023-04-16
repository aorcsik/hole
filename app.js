$(window).bind("load", function() {

    var bridge_to = null;

    var steps = new Audio('mixkit-walking-on-grass-1921.wav');
    var fall = new Audio('mixkit-short-whistle-fall-406.wav');

    $("#hole").on("mouseenter", function(e) {
        var cur = $("<img src='cursor.png'>");
        var offset = $("#hole").offset();
        cur.appendTo($("#hole"));
        cur.addClass("cur").css({
            top: (e.pageY - offset.top) + "px",
            left: (e.pageX - offset.left) + "px"
        });
        window.setTimeout(function() {
            cur.addClass("falling").css({
                width: 0,
                height: 0,
                top: "100px",
                left: "100px"
            });
            fall.play();
            steps.pause();
            window.setTimeout(function() {
                cur.remove();
                steps.play();
            }, 4000);
        }, 10);

        $("#bridge").hide().removeClass("final");
        window.clearTimeout(bridge_to);
        bridge_to = window.setTimeout(function() {
            $("#bridge").show();
            window.setTimeout(function() {
                $("#bridge").addClass("final");
            }, 10);
        }, 2000);
    })

    $("#start").on("click", function() {
        $(this).hide();

        prevStep = null;
        footprint = false;

        steps.loop = true;
        steps.muted = true;
        steps.play();
        var stepsTimeout = null;
        $(window).on("mousemove", function(event) {
            // console.log(event.clientX, event.clientY);
            
            if (!footprint) { // TODO: fix rotation to follow mouse
                if (prevStep) {

                    // var A = prevStep.y - event.clientY;
                    // var B = event.clientX - prevStep.x;
                    // var cosT = B / Math.sqrt(A * A + B * B);
                    // rot = Math.acos(cosT) * 180;
                    // console.log(rot);

                    var fs = $("<div>").addClass("step").css({
                        top: event.clientY,
                        left: event.clientX,
                        // transform: "rotate(" + rot + "deg)",
                    }).appendTo($("body"));
                    window.setTimeout(function() {
                        fs.addClass("hidden");
                    }, 400);
                    window.setTimeout(function() {
                        fs.remove();
                    }, 2000);
                }
                prevStep = {x: event.clientX, y: event.clientY};
                footprint = true;
                window.setTimeout(function() {
                    footprint = false;
                }, 400);
            }
            
            steps.muted = false;
            window.clearTimeout(stepsTimeout);
            stepsTimeout = window.setTimeout(function() {
                steps.muted = true;
            }, 100);
        });    

        $("#hole").show();
        $("#note").addClass("visible");
        window.setTimeout(function() {
            $("#hole").addClass("grown");
        }, 100);
        window.setTimeout(function() {
            $("#hole").addClass("final");
        }, 2100);
        window.setTimeout(function() {
            $("#bridge").addClass("final");
        }, 4100);
        $("#arrow").show();
        window.setTimeout(function() {
            $("#arrow").addClass("final");
        }, 6100);
    
    });


    window.setTimeout(function() {
        // (function(d, s, id) {
        //   var js, fjs = d.getElementsByTagName(s)[0];
        //   if (d.getElementById(id)) return;
        //   js = d.createElement(s); js.id = id;
        //   js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=288239034618065";
        //   fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'facebook-jssdk'));

        $(".twitter-share-button").show();
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    }, 8100);


});