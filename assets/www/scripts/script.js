// This is a JavaScript file
$(function () {
    console.log("script start");

    if (typeof device === 'undefined') {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }


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

var settings = new Array(0);
var todayDate = new Date();
var countString = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th"];
var month = todayDate.getMonth() + 1;
var date = todayDate.getDate();
var uuid;
var message = new Array(0);
var timezone = todayDate.getTimezoneOffset();


function onDeviceReady() {
    console.log("Device ready");
    uuid = window.device.uuid;
}


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
    ajaxLoadMessage();
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


function init() {
    console.log("init?");
    console.log(todayDate);
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

    settings = { "alarm": "off", "hour": 0, "minute": 0, "repeat": "21days", "tone": "default", "alert": "off", "name": "", "bname": "", "bemail": "", "reminder": "off", "sYear": year, "sMonth": month, "sDate": date, "active": "false", "timezone": timezone}

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
    $("#name").val(settings.name);
    $("#bname").val(settings.bname);
    $("#bemail").val(settings.bemail);
    $("#uuid").val(uuid);
}

function allReset() {
    ajaxResetMethod();
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

function escapeHTML(html) {
    return $('div').text(html).html();
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

function ajaxLoadMessage() {
    $.ajax({
        url: 'http://searat.net/public/getmessage.php',
        beforeSend: function (xhr) {
            var credentials = "YXBwLXVzZXI6YXBwLXVzZXI=";
            xhr.setRequestHeader("Authorization", "Basic " + credentials);
            //xhr.setRequestHeader("Authorization", "Basic " + "YXBwLXVzZXI6YXBwLXVzZXI=");
        },
        //xhrFields: {
        //    withCredentials: true
        //},
        type: 'GET',
        dataType: 'json',
        //username: 'app-user',
        //password: 'app-user',
        success: function (j_data) {
            console.log("success to load");
            if (j_data == null) {
                alert("message is N/A");
            } else {
                message = j_data;
                //message = JSON.parse(j_data);
                $("#eompanel").find("h3").text("Email of the month (" + message.month + ")");
                $("#eompanel").find("p").text(message.detail_eng);
                //$("#eompanel").html("<h3>Email of the month (" + month + ")</h3> <p>" + detail + "</p>" +
                //    '<a href="#" data-rel="close" data-role="button" data-icon="delete" data-inline="true">Close</a>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var XMLMsg = "XMLHttpRequest: " + XMLHttpRequest.status;
            var TextMsg = "textStatus: " + textStatus;
            var ErrorMsg = "errorThrown: " + errorThrown.message;
            alert(XMLMsg + "\n" + TextMsg + "\n" + ErrorMsg + "\n");
        }
    });
}


function ajaxSaveMethod() {
    $('#save').button('disable');

    console.log($('#name').val());
    console.log($('#bname').val());
    console.log($('#bemail').val());

    console.log($('#uuid').val());
    console.log($('#alert').val());
    console.log(settings.sYear);
    console.log(settings.sMonth);
    console.log(settings.sDate);


    $.ajax({
        url: 'http://searat.net/public/savedata.php',
        beforeSend: function (xhr) {
            var credentials = "YXBwLXVzZXI6YXBwLXVzZXI=";
            xhr.setRequestHeader("Authorization", "Basic " + credentials);
            //xhr.setRequestHeader("Authorization", "Basic " + "YXBwLXVzZXI6YXBwLXVzZXI=");
        },
        //xhrFields: {
        //    withCredentials: true
        //},
        type: 'POST',
        //username: 'app-user',
        //password: 'app-user',
        data: {
            'name': $('#name').val(), 'bname': $('#bname').val(), 'bemail': $('#bemail').val(), 'alert': $('#alert').val(), 'uuid': $('#uuid').val(), 'sYear': settings.sYear, 'sMonth': settings.sMonth, 'sDate': settings.sDate, 'timezone': settings.timezone},
        success: function (d) {
            alert("success");
            $('#save').button('enable');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var XMLMsg = "XMLHttpRequest: " + XMLHttpRequest.status;
            var TextMsg = "textStatus: " + textStatus;
            var ErrorMsg = "errorThrown: " + errorThrown.message;
            alert(XMLMsg + "\n" + TextMsg + "\n" + ErrorMsg + "\n");
            $('#save').button('enable');
        }
    });
}

function ajaxSendMethod() {
    $('#send').button('disable');
    //var xhr = new XMLHttpRequest();
    //xhr.onload = function () {
    //    alert("success");
    //    $('#send').button('enable');
    //};
    //xhr.onerror = function () {
    //    alert("Fail!");
    //    $('#send').button('enable');
    //};

    //xhr.open('POST', 'http://searat.net/public/mailtest.php');
    //xhr.withCredentials = true;
    //var credentials = "YXBwLXVzZXI6YXBwLXVzZXI=";
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //xhr.setRequestHeader("Authorization", "Basic " + credentials);
    //var param = "name=" + $('#name').val() + "&" + "bname=" + $('#bname').val() + "&" + "bemail=" + $('#bemail').val();
    //xhr.send(param);


    $.ajax({
        url: 'http://searat.net/public/mailtest.php',
        beforeSend: function (xhr) {
            var credentials = "YXBwLXVzZXI6YXBwLXVzZXI=";
            xhr.setRequestHeader("Authorization", "Basic " + credentials);
            //xhr.setRequestHeader("Authorization", "Basic " + "YXBwLXVzZXI6YXBwLXVzZXI=");
        },
        //xhrFields: {
        //    withCredentials: true
        //},
        type: 'POST',
        //username: 'app-user',
        //password: 'app-user',
        data: {'name': $('#name').val(), 'bname': $('#bname').val(), 'bemail': $('#bemail').val(), 'alert': $('#alert').val()},
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

function ajaxResetMethod() {
    $('#reset').addClass('ui-disabled');


    $.ajax({
        url: 'http://searat.net/public/deletedata.php',
        beforeSend: function (xhr) {
            var credentials = "YXBwLXVzZXI6YXBwLXVzZXI=";
            xhr.setRequestHeader("Authorization", "Basic " + credentials);
            //xhr.setRequestHeader("Authorization", "Basic " + "YXBwLXVzZXI6YXBwLXVzZXI=");
        },
        //xhrFields: {
        //    withCredentials: true
        //},
        type: 'POST',
        //username: 'app-user',
        //password: 'app-user',
        data: {
            'name': settings.name, 'bname': settings.bname, 'bemail': settings.bemail, 'alert': settings.alert, 'uuid': uuid, 'sYear': settings.sYear, 'sMonth': settings.sMonth, 'sDate': settings.sDate, 'timezone': settings.timezone
        },
        success: function (d) {
            alert("success");
            $('#reset').removeClass('ui-disabled');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var XMLMsg = "XMLHttpRequest: " + XMLHttpRequest.status;
            var TextMsg = "textStatus: " + textStatus;
            var ErrorMsg = "errorThrown: " + errorThrown.message;
            alert(XMLMsg + "\n" + TextMsg + "\n" + ErrorMsg + "\n");
            $('#reset').removeClass('ui-disabled');
        }
    });
}
