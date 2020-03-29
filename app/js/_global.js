app.global = {
    init: function(){
        console.log("load global functions");
        app.global.loadHeader();
        app.global.loadHero();
        app.global.loadCookie();
        app.global.loadTab();
        app.global.loadValidation();

        $(document).ready(function (){
            app.global.loadRouting();
        })
    },
    loadRouting: function (){
        console.log("loadRouting()");

        var r = $("html,body");
        var h = $("header");
        var n = $('nav a, .footer__menu a');

        //IF USER USE THE URL WITH //#
        if(window.location.hash) {
            var hl;
            if($(window).width() > 999){
                hl = 121;
            }else{
                hl = 78;
            }
            r.animate({
                scrollTop: $(window.location.hash).offset().top - hl
            }, 0);
        }

        //ON CLICK
        n.click(function(e){
            e.preventDefault();
            r.animate({
              scrollTop: $(this.hash).offset().top - h.outerHeight()
            }, 500);
            return false;
        });
    },
    loadHeader: function(){
        console.log("loadHeader()");

        //ANIMAZIONE SCROLL HEADER
        var h = $(".header");
        var hS = "header--scrolled";

        $(window).scroll(function (){
            if($(window).scrollTop() > 100){
                h.addClass(hS);
            }else{
                h.removeClass(hS);
            }
        })
    },
    loadHero: function(){
        console.log("loadHero()");

        //SLICK FOR HERO
        //Documentation: https://kenwheeler.github.io/slick/
        $('.hero__slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            prevArrow:"<img class='a-left control-c prev slick-prev' src='../../img/elements/f-left.png'>",
            nextArrow:"<img class='a-right control-c next slick-next' src='../../img/elements/f-right.png'>"
        });

        //REMOVE BUTTON ON DOTS
        $(".slick-dots li button").remove();
    },
    loadCookie: function(){
        console.log("loadCookie()");

        var c = getCookie("cookiePG")
        if(c == "true"){
            $(".cookiebar").hide();
        }else{
            $(".cookiebar").show();
        }
        $(".cookiebar a").click(function (e){
            e.preventDefault();
            $(".cookiebar").fadeOut();

            setCookie("cookiePG", "true");
        })
    },
    loadTab: function (){
        console.log("loadTab()");

        //ON LOAD - PRE-LOAD THE FIRST TAB
        getJson("../../json/tab1.json").then(function(result) {
            //SETTIMEOUT IS ONLY FOR SIMULATING THE LOADING ICON - Remove in PROD environment
            setTimeout(function (){
                $(".boxtab__loading").hide();
                var i = result.item;
                var f = $(".boxtab__content div[data-id=1]");
                f.addClass("active");
                f.text(i.content.join(' '));
            }, 2000);
        }, function() {
            //MESSAGE IN CASE OF ERROR
        });

        $(".boxtab__controls div").click(function (){
            var n = $(this).data("id");
            var c = $(".boxtab__content div[data-id=" + n + "]");
            
            $(".boxtab__content div, .boxtab__controls div").removeClass("active");
            $(".boxtab__controls div[data-id=" + n + "]").addClass("active");
            $(".boxtab__content div[data-id=" + n + "]").addClass("active");

            if(c.is(':empty')){
                getJson("../../json/tab" + n + ".json").then(function(result) {
                    //SETTIMEOUT IS ONLY FOR SIMULATING THE LOADING ICON - Remove in PROD environment
                    setTimeout(function (){
                        $(".boxtab__loading").hide();
                        var i = result.item;
                        c.text(i.content.join(' '));
                        
                    }, 2000);
                }, function() {
                    //MESSAGE IN CASE OF ERROR
                });
            }
        })
    },
    loadValidation: function(){
        $(".contact__validation button").click(function (e){
            e.preventDefault();
            var iE = $(".contact__validation input[type=email]");
            var iM = $(".contact__validation textarea");
            var Error = "contact__error"

            var input1 = inputRequired(iE, "email", Error);
            var input2 = inputRequired(iM, "text", Error);

            if(input1 && input2){
                alert("Message sent!");
            }
        });
    }
}

app.global.init();