var webRoot = "./";$.ui.autoLaunch = false; //By default, it is set to true and you're app will run right away.  We set it to false to show a splashscreen/* This function runs when the body is loaded.*/var webRoot = "./";// $.os.android=true;$.ui.openLinksNewTab = false;$.ui.splitview=false;var alreadyInitialized = false; // ensure calling init() only one timevar init = function () {        //navigator.splashscreen.show();               if ( alreadyInitialized )            return;                /*        window.setTimeout(function () {            $.ui.splitview = false;            $.ui.launch();        }, 1500);//We wait 1.5 seconds to call $.ui.launch after DOMContentLoaded fires        */                //$.ui.showLoading=true;        $.ui.blockPageScroll();        initSetting();        initUI();        $.ui.backButtonText = S_BACK[giLanguageIndex];// We override the back button text to always say "Back"        //showBackgroundImage( "bg_sunrise.jpg" );        //alert( getNumber( "04" ) );        //log( getClosestStationIDs( 1022, 1202, CAR_KINGBUS ) );                $.ui.splitview = false;        $.ui.launch();                initData();        backupIndexPath();    };//if ( !navSupported() )    document.addEventListener("DOMContentLoaded", init, false);$.ui.ready(function () {    //This function will get executed when $.ui.launch has completed    //if ( navSupported() && giPlatform != PLATFORM_DESKTOP )        //$.ui.removeFooterMenu(); // disable navbar (footer) menu    $.ui.slideSideMenu = false;            if ( !navSupported() )        ;//$.ui.toggleHeaderMenu(false); //force hide            bindSwipeEvent();    bindTouchEvent();});window.addEventListener("hashchange", onHashChange, false);function onHashChange(){    var hash = location.hash;    //alert( "id = " + hash  );;    if ( true || !isLock() )    {        changeHash( hash.substring( 1, hash.length ) );    }    else    {        alert( "Loading..." );    }        if ( giPlatform == PLATFORM_WP )    {        restoreIndexPath();    }}// --------------GWAI-----------------gScriptFile.onload = function () {    //do stuff with the script    showAlert( "OK" );};document.addEventListener('deviceready', onDeviceReady, false);function onDeviceReady(){    gbOnReady = true;        document.addEventListener("offline", onOffline, false);    document.addEventListener("online", onOnline, false);    document.addEventListener("backbutton", onBackKeyDown, false);        setPlatform();}function setPlatform(){    var sPlatform = device.platform;        if ( sPlatform.indexOf( "Win" ) >= 0 )    {        giPlatform = PLATFORM_WP;    }    else if ( sPlatform.indexOf( "ndroid" ) >= 0 )    {        giPlatform = PLATFORM_ANDROID;    }    else if ( sPlatform.indexOf( "iOS" ) >= 0 )    {        giPlatform = PLATFORM_IOS;    }    else if ( sPlatform.indexOf( "lackBerry" ) >= 0 )    {        giPlatform = PLATFORM_BLACKBERRY;    }    else if ( sPlatform.indexOf( "irefox" ) >= 0 )    {        giPlatform = PLATFORM_FIREFOXOS;    }    else if ( sPlatform.indexOf( "izen" ) >= 0 )    {        giPlatform = PLATFORM_TIZEN;    }    else    {        giPlatform = PLATFORM_ANDROID;    }        //alert( "Platform: " + sPlatform + " -> " + giPlatform );}function supportAdmobAD(){    return ( giPlatform == PLATFORM_ANDROID ||         giPlatform == PLATFORM_WP ||         giPlatform == PLATFORM_IOS );}function destroyAD(){    if ( !supportAdmobAD() )        return;            if ( window.plugins && window.plugins.AdMob )     {        var am = window.plugins.AdMob;        am.destroyBannerView(            undefined,            function() {},            function() {}        );    }}function getInneractiveAD( sAppID ){    if ( giPlatform != PLATFORM_FIREFOXOS )        return null;    var eOptions = {        TYPE: "Banner",        REFRESH_RATE: 50,        APP_ID: sAppID    };        return Inneractive.createAd( eOptions );}function showInneractiveAD( sDivID ){    if ( giPlatform == PLATFORM_FIREFOXOS )    {        geInneractiveAD.placement( "bottom", "left" );        geInneractiveAD.addTo( document.getElementById( sDivID ) );    }}function showAD(){    if ( !supportAdmobAD() )        return;            if ( window.plugins && window.plugins.AdMob )     {    	var admob_ios_key = gsIOSCodeOfAD;    	var admob_android_key = gsAndroidCodeOfAD;        var admob_wp_key = gsWPCodeOfAD;        var adId = admob_android_key;                if ( giPlatform == PLATFORM_WP )        {            adId = admob_wp_key;        }        else if ( giPlatform == PLATFORM_IOS )        {            adId = admob_ios_key;        }                var am = window.plugins.AdMob;            am.createBannerView(             {            'publisherId': adId,            'adSize': am.AD_SIZE.BANNER,            'bannerAtTop': false            },             function() {        	    am.requestAd(        		    { 'isTesting':false },             		function(){            			am.showAd( true );            		},             		function(){ alert('failed to request ad'); }            	);            },             function(){ alert('failed to create banner view'); }        );    } else {      alert('AdMob plugin not available/ready.');    }}function onOffline() {    gbOnline = false;}function onOnline() {    gbOnline = true;        //alert( "ON LINE" );}function onBackKeyDown(){    // if this is post page, then go back to the previous list page.    if ( isPostDivNow() )    {        loadPage( getListCurrentID( giPostKind ) );                return;    }        if ( gbPluginPopupEanbled )    {        var sMessage = S_ARE_YOU_SURE[giLanguageIndex] + S_EXIT_APP[giLanguageIndex].toLowerCase() + QUESTION_MARK;                showConfirmMessage( sMessage, exitThisApp );    }    else    {        // If this is list page, then ask user quit app or not         var ok = window.confirm( S_ARE_YOU_SURE[giLanguageIndex] + S_EXIT_APP[giLanguageIndex].toLowerCase() + QUESTION_MARK );        if ( ok )        {            exitThisApp();        }        else        {            console.log( "select NO" );        }    }}function exitThisApp(){    if ( navigator.app )    {        navigator.app.exitApp();    }    else    {        console.log( "Do not support navigator.app !!" );    }}function bindTouchEvent(){    var iTouchY = 0;    var iTouchX = 0;    var iTriggerLength = 100;        $(document).bind( "touchstart",         function(e) {            if(e.originalEvent)                e = e.originalEvent;            iTouchX = e.touches[0].pageX;            iTouchY = e.touches[0].pageY;                        giStartTouchY = iTouchY;        }    );        $(document).bind( "touchmove",         function(e) {            if(e.originalEvent)                e = e.originalEvent;            iTouchX = e.touches[0].pageX;            iTouchY = e.touches[0].pageY;                                   if ( iTouchY - giStartTouchY > iTriggerLength ) // swipe up            {                enableFooter();                                if ( giScrollEnd == 0 )                {                    enableHeader();                                        if ( isNewListPageNow() )                    {                        updateData();                    }                                        giScrollEnd = SCROLL_INIT_VALUE;                }                else if ( !needConfirmHeader( gsNowDivID ) )                 {                    disableHeader();                                        giStartTouchY = iTouchY; // for the reverse direction before touchend                }            }                else if ( giStartTouchY - iTouchY > iTriggerLength ) // swipe down            {                                disableFooter();                enableHeader();                                giStartTouchY = iTouchY; // for the reverse direction before touchend            }        }    );        $(document).bind( "touchend",         function(e) {            if ( ( iTouchY - giStartTouchY ) > giStartTouchY )            {                //alert( "pull to refresh 2 " );            }                        //alert( giStartTouchY + "," + iTouchY );                    iTouchY = iTouchX = 0;        }    );}function bindSwipeEvent(){    $(document).bind( "swipeLeft",         function()        {            gbSwipeLock = true;            gbSwipeDown = false;                        if ( isPostDivNow() )            {                swipePost( SWIPE_LEFT );            }            else if ( isListPageNow() )            {                swipeList( SWIPE_LEFT );            }                        gbSwipeLock = false;        }    );        $(document).bind( "swipeRight",         function()        {            gbSwipeLock = true;            gbSwipeDown = false;                    if ( isPostDivNow() )            {                swipePost( SWIPE_RIGHT );            }            else if ( isListPageNow() )            {                swipeList( SWIPE_RIGHT );            }                        gbSwipeLock = false;        }    );        $(document).bind( "swipeDown",         function()        {            gbSwipeDown = true;        }    );}