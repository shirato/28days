// This is a JavaScript file
$(function () {
    console.log("script start");


    //$("#concal").continuousCalendar({
    //    weeksBefore: 4,
    //    weeksAfter: 52,
    //    selectToday: true,
    //    theme: 'rounded'
    //});

    //$("#calendarcon").html(calendarcon.width);


    // childbrowser
    //cb = window.plugins.childBrowser;
    //if (cb != null) {
    //    cb.onLocationChange = function (loc) {
    //        locChanged(loc);
    //    };
    //    cb.onClose = function () {
    //        onCloseBrowser();
    //    };
    //    cb.onOpenExternal = function () {
    //        onOpenExternal();
    //    };
    //} else {
    //    console.warn('child browser is not properly loaded');
    //}

    console.log("script end");
});


//$("div[data-role*='page']").live('pageshow', function (event) {
//});


//pageinit
$(document).on('pageinit', '#home', function () {
    console.log("home pageinit");
    viewport(320);

    //init();
});

$(document).on('pageinit', '#calendarpage', function () {
    console.log("calendar pageinit start");
    viewport(320);
});

$(document).on('pageinit', '#alarm', function () {
    console.log("alarm pageinit");
    viewport(320);
});

$(document).on('pageinit', '#email', function () {
    console.log("email pageinit start");
    viewport(320);
});

$(document).on('pageinit', '#settings', function () {
    console.log("settings pageinit start");
    viewport(320);
});


//pageshow
$(document).on('pageshow', '#home', function () {
    console.log("home pageshow");
    init();
    //loadSettings();
});

$(document).on('pageshow', '#calendarpage', function () {
    console.log("calendar pageshow");
});

$(document).on('pageshow', '#alarm', function () {
    console.log("alarm pageshow");
});

$(document).on('pageshow', '#email', function () {
    console.log("email pageshow");
    loadMailSettings();
});

$(document).on('pageshow', '#settings', function () {
    console.log("settings pageshow");
});

//pagehide
$(document).on('pagehide', '#home', function () {
    console.log("home pagehide");
});

$(document).on('pagehide', '#calendarpage', function () {
    console.log("calendar pagehide");
});

$(document).on('pagehide', '#alarm', function () {
    console.log("alarm pagehide");
});

$(document).on('pagehide', '#email', function () {
    console.log("email pagehide");
    saveMailSettings();
});

$(document).on('pagehide', '#settings', function () {
    console.log("settings pagehide");
});

var settings = new Array(0);
var todayDate = new Date();
var countString = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th"];
var month = todayDate.getMonth() + 1;
var date = todayDate.getDate();

function init() {
    console.log("init?");
    $("#date").children("p").html(month + "/" + date);

    if (localStorage.settings == null) {
        console.log("initializing...");
        var text = "Welcome.<br/><br/>In your cycle, which day is today? (" + month + "/" + date + ")";
        $(".text1").html("<h3>" + text + "</h3>");

        //$.mobile.changePage("#initDialog", { role: "dialog" });
        $.mobile.changePage("#initDialog");
    } else {
        loadSettings();
    }
}

function loadSettings() {
    settings = JSON.parse(localStorage.settings);

    var startDate = new Date(settings.sYear, settings.sMonth - 1, settings.sDate);
    //startDate.setFullYear(settings.sYear);
    //startDate.setMonth(settings.sMonth - 1);
    //startDate.setDate(settings.sDate);
    var elapsedDate = (todayDate - startDate) / 1000 / 60 / 60 / 24;
    elapsedDate = Math.floor(elapsedDate);
    var count = elapsedDate % 28;
    $("#count").children("p").html(countString[count] + "<br/>day");
    //if ((count > 20) && (count < 28)) {
    //    var text = "Skip today<br />" + month + "/" + date + " (" + countString[count] + " day)";
    //    $('.text1').html("<h3>" + text + "</h3>");
    //    $.mobile.changePage("#skipDialog");
    //}
}

function saveCount() {
    var count = $("#setcount").val();
    var startDate = new Date();
    startDate.setDate(todayDate.getDate() - count + 1);
    var year = startDate.getFullYear();
    var month = startDate.getMonth() + 1;
    var date = startDate.getDate();
    console.log(year + "/" + month + "/" + date);

    settings = { "alarm": "off", "hour": 0, "minute": 0, "repeat": "21days", "tone": "default", "alert": "off", "gmail": "", "pass": "", "name": "", "bname": "", "bemail": "", "reminder": "off", "sYear": year, "sMonth": month, "sDate": date }

    localStorage.settings = JSON.stringify(settings);
}

function fadeImage() {
    var setImg = '#checkimg';
    var fadeSpeed = 500;
    var switchDelay = 500;

    var id = idForDate(todayDate);
    localStorage[id] = "checked";

    $(setImg).children('img').css({ opacity: '0' });
    $(setImg).children('img').css({ visibility: 'visible' });
    $(setImg + ' img:first').stop().animate({ opacity: '1', zIndex: '20' }, fadeSpeed, function () {
        $(setImg + ' :first-child').animate({ opacity: '0' }, fadeSpeed).next('img').animate({ opacity: '1' }, fadeSpeed, function () {
            setTimeout(function () {
                $(setImg).children('img').css({ visibility: 'hidden' });
                $.mobile.changePage("#calendarpage");
            }, 1000);
        });
    });

    //setInterval(function () {
    //    $(setImg + ' :first-child').animate({ opacity: '0' }, fadeSpeed).next('img').animate({ opacity: '1' }, fadeSpeed).end().appendTo(setImg);
    //}, switchDelay);

}

function saveMailSettings() {
    settings = JSON.parse(localStorage.settings);
    settings.alert = $("#alert").val();
    settings.gmail = $("#gmail").val();
    settings.pass = $("#pass").val();
    settings.name = $("#name").val();
    settings.bname = $("#bname").val();
    settings.bemail = $("#bemail").val();

    localStorage.settings = JSON.stringify(settings);
}

function loadMailSettings() {
    settings = JSON.parse(localStorage.settings);
    if (settings.alert != 0) {
        var state = $("#alert").val(settings.alert);
        var slider = $('select#alert');
        if (state == "on") {
            slider[0].selectedIndex = 1;
        } else if (state == "off") {
            slider[0].selectedIndex = 0;
        }
        slider.slider('refresh');
    }
    if (settings.gmail != 0) $("#gmail").val(settings.gmail);
    if (settings.pass != 0) $("#pass").val(settings.pass);
    if (settings.name != 0) $("#name").val(settings.name);
    if (settings.bname != 0) $("#bname").val(settings.bname);
    if (settings.bemail != 0) $("#bemail").val(settings.bemail);
}

function allReset() {
    localStorage.clear();
    //localStorage.removeItem("settings");
    init();
    //$.mobile.changePage("#initDialog", { role: "dialog" });
}



function viewport(width) {
    var rootElement = document.documentElement;
    var scale = screen.width / width * 100 + "%";
    rootElement.style.zoom = scale;
}

function getScreenHeight() {
    return screen.height;
}

//function myDatePicker() {
//    var myNewDate = new Date();

//    // Same handling for iPhone and Android
//    window.plugins.datePicker.show({
//        date: myNewDate,
//        mode: 'time', // date or time or blank for both
//        allowOldDates: true
//    }, function (returnDate) {
//        var newDate = new Date(returnDate);
//        var hours = newDate.getHours().toString();
//        var minutes = newDate.getMinutes().toString();
//        $("#time").val(hours + ":" + minutes);
//    });
//}

function ajaxSendMethod() {
    $('#send').button('disable');
    $.ajax({
        url: 'http://searat.net/public/mailtest.php',
        beforesend: function (xhr) {
            var credentials = "YXBwLXVzZXI6YXBwLXVzZXI=";
            xhr.setRequestHeader("Authorization", "Basic " + credentials);
            //xhr.setRequestHeader("Authorization", "Basic " + "YXBwLXVzZXI6YXBwLXVzZXI=");
        },
        xhrFields:{
            withCredentials: true
        },
        type: 'POST',
        //username: 'app-user',
        //password: 'app-user',
        data: {'name': $('#name').val(), 'bname': $('#bname').val(), 'bemail': $('#bemail').val()},
        success: function (d) {
            alert("success");
            $('#send').button('enable');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var XMLMsg = "XMLHttpRequest: " + XMLHttpRequest.status;
            var TextMsg = "textStatus: " + textStatus;
            var ErrorMsg = "errorThrown: " + errorThrown.message;
            alert(XMLMsg + "\n" + TextMsg + "\n" + ErrorMsg + "\n");
            $('#send').button('enable');
        }
    });
}
