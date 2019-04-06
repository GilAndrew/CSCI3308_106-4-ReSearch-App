// HOME ARROW //

// arrow fades away as you scroll
$(window).scroll(function() {
    $(".arrow").css("opacity", 1 - $(window).scrollTop() / 450); 
        // 250: pixel fade
    });