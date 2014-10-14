
"use strict";


function showAlert( message )
{
    if ( giMode == DEBUG_MODE )
    {
        alert( message );
    }
}




// ex. 340 -> 05:40:00
function getTimeStringFromMinute( allMinute )
{
    var hour = Math.floor( allMinute / 60 );
    var minute = allMinute - hour * 60;

    var hourString = hour > 9 ? "" + hour : "0" + hour;
    var minuteString = minute > 9 ? "" + minute : "0" + minute;

    return hourString + ":" + minuteString + ":" + "00";
}


// replace the native api (parseInt) cause the browser change 09 to 0 in Android ...
// ex. 09 -> 9
function getNumber( sNumber )
{
    if ( !isNumber( sNumber ) )
        return null;

    var iNumber = 0;

    for ( var i = 0; i < sNumber.length; i ++ )
    {
        var sToken = sNumber.substring( i, i + 1 );
        var iToken = 0;
        for ( var j = 0; j < 10; j ++ )
        {
            if ( sToken == "" + j )
            {
                iToken = j;
                break;
            }
        }

        iNumber = iNumber * 10 + iToken;
    }

    return iNumber;
}

// ex. 15 -> 15:00:00
function getTimeStringFromID( timeID )
{
    if ( timeID < 0 || timeID > 24 )
        timeID = 24; // indicate that no need to care about time

    return timeID + ":00:00";
}



// output: string
function getStandardDateText( dateString )
{
    var tokens = dateString.split( DIVISION_WORD_2 );

    return tokens[0] + "(" + getWeekText( tokens[1] ) + ")";
}

// ex. 2013.12.08=3 -> 3
// output: integer

// ex. 5 -> 5:00
function getTimeString( clockNum )
{
    return clockNum + S_CLOCK[giLanguageIndex];
}

// ex. 2012/10 -> daysInMonth( 2012, 9 ) -> 31
function daysInMonth( year, month )
{
    return new Date( year, month + 1, 0 ).getDate();
}

// ex. new Date() , 5 -> 2014.1.6_1
function getDateStringFromDate( baseDate, offset )
{
    var year = baseDate.getFullYear();
    var month = baseDate.getMonth();
    var date = baseDate.getDate();

    offset = parseInt( offset, 10 );

    var dayCount = daysInMonth( year, month );
    var thisDate;
    if ( date + offset <= dayCount )
    {
        date += offset;

    }
    else
    {
        month ++;
        date = date + offset - dayCount;
    }

    thisDate = new Date( year, month, date );

    var day = thisDate.getDay();

    return year + "." + ( month + 1 ) + "." + date + DIVISION_WORD_2 + day;
}

function getWeekText( day )
{
    return S_WEEK_ARRAY[day][giLanguageIndex];
}


// for the time select page
function getTimeText()
{
    if ( giTimeEarliestID < 0 )
        giTimeEarliestID = DEFAULT_TIME_EARLIEST_ID;
    if ( giTimeLatestID < 0 )
        giTimeLatestID = DEFAULT_TIME_LATEST_ID;

    return S_CHOSEN_TIME[giLanguageIndex] + COLON_WORD + getTimeString( parseInt( giTimeEarliestID, 10 ) ) + " ~ " + getTimeString( parseInt( giTimeLatestID, 10 ) );
}


function initData()
{
    //removePostMap(); // for debug
// --------------GWAI-----------------
    //addJS( "js/data.js", true );
    
    for ( var i = 0; i < gasDataURL.length; i ++ )
    {
        //addJS( gasDataURL[i], false );
    }
    

}


function checkLocale()
{
    if ( !navigator.globalization )
    {
        //showMessage( S_NOT_SUPPORT[giLanguageIndex] + "navigator.globalization" );
        return;
    }

    navigator.globalization.getLocaleName(
        function ( locale )
        {
            //alert('locale: ' + locale.value + '\n');
            var sLocale = locale.value.toLowerCase();

            if ( sLocale.indexOf( "zw" ) >= 0 ||
                 sLocale.indexOf( "tw" ) >= 0 ||
                 sLocale.indexOf( "hk" ) >= 0 )
            {
                gLocalLanguageIndex = ZH;
            }
            else if ( sLocale.indexOf( "cn" ) >= 0 )
            {
                gLocalLanguageIndex = CN;
            }
            else if ( sLocale.indexOf( "ja" ) >= 0 ||
                      sLocale.indexOf( "jp" ) >= 0 )
            {
                gLocalLanguageIndex = JA;
            }
            else if ( sLocale.indexOf( "ko" ) >= 0 ||
                      sLocale.indexOf( "kr" ) >= 0 )
            {
                gLocalLanguageIndex = KO;
            }
            else
            {
                gLocalLanguageIndex = EN; // English for default
            }

        },
        function ()
        {
            //alert('Error getting locale\n');
        }
    );
}


function initSetting()
{
    //removeAllItem(); // for recovery when the wrong items are stored
    //removeItem( KEY_TICKET_CATEGORY_INDEXS );

    setDocumentTitle( S_APP_NAME[giLanguageIndex] );

    // set language
    //giLanguageSelectedIndex = getLanguageIndex();
    //giLanguageIndex = giLanguageSelectedIndex;

    // set font size
    giFontSizeSelectedIndex = getFontSizeIndex();
    giFontRatio = 100 + giFontSizeSelectedIndex * 10;

    gaiFirstSearchPageIndex[0] = 0; // begin the first post in the first search page
    
    // set color and image
    gsFontColor = getFontColor();
    gsBackgroundColor = getBackgroundColor();
    gsBackgroundImage = getBackgroundImage();

    showFontColor( gsFontColor );
    showBackgroundColor( gsBackgroundColor );
    showBackgroundImage( gsBackgroundImage );


    // ----part-time king----
}


function log( text )
{
    if ( console != null )
        console.log( text );
}

// ex. ID_STYLE -> aStyleSlectedIndex
function getSelectArrayByID( sDivID )
{
    var abSelected = new Array();
    var i = 0;
    
    if ( sDivID === ID_STYLE )
    {
        for ( i = 0; i < S_STYLE_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giStyleSelectedIndex );
        }
    }
    else if ( sDivID === ID_LANGUAGE )
    {
        for ( i = 0; i < S_LANGUAGE_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giLanguageSelectedIndex );
        }
    }
    else if ( sDivID === ID_RESULT_LIMIT )
    {
        for ( i = 0; i < S_RESULT_LIMIT_ARRAY.length; i ++ )
        {
            abSelected[i] = ( i == giListLimitSelectedIndex );
        }
    }

    return abSelected;
}

function getRelatedUrlByIndex( index )
{
    if ( S_RELATED_LINKS_ARRAY[index].toString() === S_GOOGLE_PLAY.toString() )
    {
        return "https://play.google.com/store/apps/details?id=sk.phonegap.timetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_CHROME_WEB_STORE.toString() )
    {
        return "https://chrome.google.com/webstore";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_FIREFOX_MARKETPLACE.toString() )
    {
        return "https://marketplace.firefox.com/app/offlinetimetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_GITHUB.toString() )
    {
        return "https://github.com/abc9070410/OfflineTimetable";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_TRA_OFFICE_SITE.toString() )
    {
        return "http://twtraffic.tra.gov.tw/twrail/";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_THSR_OFFICE_SITE.toString() )
    {
        return "http://www.thsrc.com.tw/tw/TimeTable/SearchList";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_KINGBUS_OFFICE_SITE.toString() )
    {
        return "http://www.kingbus.com.tw/time&price.php";
    }
    else if ( S_RELATED_LINKS_ARRAY[index].toString() === S_UBUS_OFFICE_SITE.toString() )
    {
        return "http://www.ubus.com.tw/html/line/search_list.php";
    }
    else
    {
        showAlert( "no such related link index: " + index );

        return "";
    }
}

// return a random color between #000000 to #FFFFFF
function getRandomColor()
{
    var asSeed = new Array( "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" );

    var sColor = "#";
    for ( var i = 0; i < 6; i ++ )
    {
        sColor += asSeed[Math.floor( Math.random() * 16 )];
    }

    return sColor;
}










function saveTextFile( text )
{

    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
}

function downloadImageFile( fileURL )
{
    var beginIndex = fileURL.lastIndexOf( "/" ) + 1;
    var fileName = fileURL.substring( beginIndex, fileURL.length );


    var oReq = new XMLHttpRequest();
    oReq.open("GET", fileURL, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
        var blob = new Blob([oReq.response], {type: "image/png"});
        saveAs(blob, fileName);
    };

    oReq.send();
}


















function GetHttpRequest()
{
    if ( window.XMLHttpRequest ) // Gecko
        return new XMLHttpRequest() ;
    else if ( window.ActiveXObject ) // IE
        return new ActiveXObject("MsXml2.XmlHttp") ;
}
function AjaxPage(sId, url){
    var oXmlHttp = GetHttpRequest() ;
    oXmlHttp.OnReadyStateChange = function()
    {
        if ( oXmlHttp.readyState == 4 )
        {
            if ( oXmlHttp.status == 200 || oXmlHttp.status == 304 )
            {
                IncludeJS( sId, url, oXmlHttp.responseText );
            }
            else
            {
                alert( 'XML request error: ' + oXmlHttp.statusText + ' (' + oXmlHttp.status + ')' ) ;
            }
        }
    };
    oXmlHttp.open('GET', url, true);
    oXmlHttp.send(null);
}
function IncludeJS(sId, fileUrl, source)
{
    if ( ( source != null ) && ( !document.getElementById( sId ) ) )
    {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement( "script" );
        oScript.language = "javascript";
        oScript.type = "text/javascript";
        oScript.id = sId;
        oScript.defer = true;
        oScript.text = source;
        oHead.appendChild( oScript );
    }
}

function addJS( sJsFile, bLocalFile )
{
    var oHead = document.getElementsByTagName("head")[0];
    var oScript = document.createElement("script");
    
    giPrevListIndex = giCurrentListIndex;
    giPrevNameIndex = giCurrentNameIndex;
    
    lockWait();
    
    //alert( sJsFile );
    
    if ( giPlatform == PLATFORM_WP )
    {
        sJsFile = ( gbJSFileOnline && !bLocalFile ) ? sJsFile : getAbsolutePath() + sJsFile;
    }
    
    if ( oScript.onreadystatechange )
    {
        oScript.type = "text/javascript";
        oScript.src = sJsFile;
        oScript.onreadystatechange = function() {
        
            if (this.readyState == 'complete') 
            {
                alert( "complete :" + PT_TEMP_DATA.length );
                //alert("complete");
                loadDone();
                
            }
            else if (this.readyState == 'loaded') 
            {
                alert("loaded : " + PT_TEMP_DATA.length );
                loadDone();
            }
        };
        //head.appendChild(oScript);
        document.head.appendChild(oScript);
        
        
    }
    else
    {
        oScript.type = "text/javascript";
        oScript.src = sJsFile;
        oScript.async = true;
        //oHead.appendChild( oScript);
        oScript.onload = function() {
            //alert("onloaded : " + PT_TEMP_DATA.length );
            loadDone();
        };
        document.head.appendChild(oScript);
        //unlockWait();
        
        //alert( sJsFile );
    }
}

function loadDone() 
{
    if ( giPrevListIndex == giCurrentListIndex && 
         giPrevNameIndex == giCurrentNameIndex )
    {
        backupCurrentData();
    }
    else
    {
        //alert( gsCurrentName + "->" + gsBackupName );
        restoreCurrentData();
    }
    
    unlockWait();
    //alert( getCurrentDirectory() + "/" + getCurrentFileName() + "\n\n" + gsCurrentBasicIntroduction );
    mergeData();
    sortPostMap();
    
    //alert( "merged: " + getPostCount() );
    
    giUpdateState = STATE_UPDATE_FINISHED;
    updateDiv( gsNowDivID, getHTMLOfListDiv() );
    //loadPage( getListNextID( giPostKind ) );
    //loadPage( getListCurrentID( giPostKind ) );
    //updateListDiv( NEW_POST );
    //updateAllListDiv();
}

function isLock()
{
    return gbLockWait;
}

function lockWait()
{
    gbLockWait = true;
    $.ui.showMask( S_UPDATING[giLanguageIndex] );
}

function unlockWait()
{
    gbLockWait = false;
    $.ui.hideMask();
}

function backupCurrentData()
{
    gsBackupName = gsCurrentName;
    gsBackupURL = gsCurrentURL;
    gsBackupPicURL = gsCurrentPicURL;
    gsBackupBasicIntroduction = gsCurrentBasicIntroduction;
    gasBackupContentTitle = gasCurrentContentTitle;
    gasBackupContent = gasCurrentContent;
    gasBackupContentClass = gasCurrentContentClass;
}

function restoreCurrentData()
{
    gsCurrentName = gsBackupName;
    gsCurrentURL = gsBackupURL;
    gsCurrentPicURL = gsBackupPicURL;
    gsCurrentBasicIntroduction = gsBackupBasicIntroduction;
    gasCurrentContentTitle = gasBackupContentTitle;
    gasCurrentContent = gasBackupContent;
    gasCurrentContentClass = gasBackupContentClass;
}

function cleanCurrentData()
{
    gsCurrentName = "";
    gsCurrentURL = "";
    gsCurrentPicURL = "";
    gsCurrentBasicIntroduction = "";
    gasCurrentContentTitle = new Array();
    gasCurrentContent = new Array();
    gasCurrentContentClass = new Array();
}

function backupIndexPath()
{
    gsIndexPath = window.location.href;
}

function restoreIndexPath()
{
    //alert( "Reset: " + gsIndexPath );
    //window.location.href = gsIndexPath;
    //window.location.reload();
    
    window.history.pushState( "CHANGE1", "Title", gsIndexPath );
}

function getAbsolutePath()
{
    var sFilePath1 = window.location.pathname;
    var sFilePath2 = window.location.href;
    
    //alert( sFilePath + "\n" + sFilePath2 );
    
    var iBeginIndex = sFilePath1.lastIndexOf(':') - 1;
    var iEndIndex = sFilePath1.lastIndexOf('/') + 1;
    var sAbsolutePath = sFilePath1.substring( iBeginIndex, iEndIndex );
    
    //alert( sFilePath );
    
    if ( gbOnReady )
    {
        // ex. x-wmapp0:www/index.html
        iEndIndex = sFilePath2.indexOf(':') + 1;
        var sHeadPart = sFilePath2.substring( 0, iEndIndex );
        var sTailPart = "www/";
        sAbsolutePath = sHeadPart + sTailPart;
    }
    
    return sAbsolutePath;
}

// --------------GWAI-----------------

// get 0 ~ number-1
function getRandom( number )
{
    return Math.floor(Math.random() * number);
}

function isUsedName( iListIndex, iNameIndex )
{
    var bListIndexUsed = false;
    var bNameIndexUsed = false;

    var i = 0;
    
    for ( i = 0; i < gaiUsedListIndex.length; i ++ )
    {
        if ( gaiUsedListIndex[i] === iListIndex )
        {
            bListIndexUsed = true;
        }
    }
    
    if ( !bListIndexUsed )
        return false;
        
    for ( i = 0; i < gaiUsedNameIndex.length; i ++ )
    {
        if ( gaiUsedNameIndex[i] === iNameIndex )
        {
            return true;
        }
    }
    
    return false;
}

function getAnotherNames( iNameAmount )
{
    var aiNameIndex = new Array();
    var iListIndex = giCurrentListIndex;
    var iNameIndex = 0;
    var bUsed = false;
    
    while ( true )
    {
        iNameIndex = getRandomNameIndex( iListIndex );

        bUsed = isUsedName( iListIndex, iNameIndex );

        for ( var i = 0; !bUsed && i < aiNameIndex.length; i ++ )
        {
            if ( aiNameIndex[i] == iNameIndex )
                bUsed = true;
        }

        if ( bUsed )
        {
            continue;
        }

        aiNameIndex[aiNameIndex.length] = iNameIndex;

        if ( aiNameIndex.length == iNameAmount )
            break;
    }

    /*
    var asAnotherName = new Array();

    for ( var i = 0; i < aiNameIndex.length; i ++ )
    {
        asAnotherName[i] = getName( iListIndex, aiNameIndex[i] );
    }
    */

    //alert( "->" + gaiUsedNameIndex + "___" + aiNameIndex);

    //return asAnotherName;
    return getNames( iListIndex, aiNameIndex );
}


function getNames( iListIndex, aiIndex )
{
    var asNames = new Array();

    for ( var i = 0; i < aiIndex.length; i ++ )
    {
        asNames[i] = getName( iListIndex, aiIndex[i] );
    }

    return asNames;
}

function getCover( iListIndex, iNameIndex )
{
    return COVER_LIST[iListIndex][iNameIndex];
}

function getCurrentFullName()
{
    return getFullName( giCurrentListIndex, giCurrentNameIndex );
}

function getCurrentName()
{
    return getName( giCurrentListIndex, giCurrentNameIndex );
}

function getCurrentCover()
{
    return COVER_LIST[giCurrentListIndex][giCurrentNameIndex];
}

function getCurrentDirectory()
{
    if ( gbJSFileOnline )
    {
        return "https://manymanysinger.googlecode.com/svn/trunk/" + DIRECTORY_LIST[giCurrentListIndex];
    }
    else
    {
        return "js/data/" + DIRECTORY_LIST[giCurrentListIndex];
    }
}

function getCurrentFileName()
{
    var asTemp = getCurrentFullName().split( " " );
    var sFileName = "";

    for ( var i = 0; i < asTemp.length; i ++ )
    {
        sFileName += asTemp[i];
    }

    return sFileName + ".js";
}

function getSelectedNumber( sPageID )
{
    for ( var i = 0; i < ID_SELECTION_ARRAY.length; i ++ )
    {
        if ( sPageID == ID_SELECTION_ARRAY[i] )
            return i;
    }

    return -1;
}


function setCurrentName()
{
    var bUsed;
    var iListIndex;
    var iNameIndex;

    while ( true )
    {
        bUsed = false;
        iListIndex = getRandomListIndex();
        iNameIndex = getRandomNameIndex( iListIndex );

        for ( var i = 0; !bUsed && i < gaiUsedNameIndex.length; i ++ )
        {
            if ( gaiUsedNameIndex[i] == iNameIndex && 
                 gaiUsedListIndex[i] == iListIndex )
                bUsed = true;
        }

        if ( bUsed )
        {
            //alert( "USED : " + getName( iListIndex, iNameIndex ) );
            continue;
        }
        break;
    }

    //iListIndex = 0;// for debug
    //iNameIndex = 1;// for debug

    giCurrentListIndex = iListIndex;
    giCurrentNameIndex = iNameIndex;
    gaiUsedNameIndex[gaiUsedNameIndex.length] = iNameIndex;
    gaiUsedListIndex[gaiUsedListIndex.length] = iListIndex;

    gsDebug += "  (" + getNames( iListIndex, iNameIndex ) + ")";
}

function getTitleLevel( iClassIndex )
{
    var sClass = gasCurrentContentClass[iClassIndex];

    if ( sClass.search( "1 " ) === 0 )
        return LEVEL_1;
    else if ( sClass.search( "2 " ) === 0 )
        return LEVEL_2;
    else if ( sClass.search( "3 " ) === 0 )
        return LEVEL_3;
    else
        return LEVEL_4;
}

function isLevelOne( iClassIndex )
{
    return ( LEVEL_1 == getTitleLevel( iClassIndex ) );
}

function getCurrentNameCount()
{
    return NAME_LIST[giCurrentListIndex].length;
}

function getNumberFileName( iNumber )
{
    var sFrontName = "";
    var sExtension = ".png";
    
    if ( iNumber == 0 )
        return sFrontName + "36" + sExtension;
    else
        return sFrontName + ( 26 + iNumber ) + sExtension;
}

function getGoogleURL()
{
    var sSearchName = "";
    var asNameToken = getCurrentName().split( " " );
    
    for ( var i = 0; i < asNameToken.length; i ++ )
    {
        if ( i > 0 )
            sSearchName += "+";
            
        sSearchName += asNameToken[i];
    }
    
    return gsGoogleURL + sSearchName;
}


function getScreenHeight()
{
    return window.screen.height;
}

function getScreenWidth()
{
    return window.screen.width;
}


function deviceAlert( sMessage )
{
    if (typeof navigator.notification == 'undefined')
    {
        alert( sMessage );
    }
    else
    {
        navigator.notification.alert(
            sMessage,           // message
            null,               // callback
            'Alert Message',    // title
            'OK'                // buttonName
        );
    }
}



// ------ part-time king -----------

function toggleHeader()
{
    $.ui.toggleHeaderMenu();
    
    gbHeaderShowed = gbHeaderShowed ? false : true;
}


function disableHeader()
{
    if ( gbHeaderShowed )
    {
        toggleHeader();
    }
}

function enableHeader()
{
    if ( !gbHeaderShowed )
    {
        toggleHeader();
    }
}

function toggleFooter()
{
    $.ui.toggleNavMenu();
    
    gbFooterShowed = gbFooterShowed ? false : true;
}

function disableFooter()
{
    if ( gbFooterShowed )
    {
        toggleFooter();
    }
}

function enableFooter()
{
    if ( !gbFooterShowed )
    {
        toggleFooter();
    }
}



function getLocationCount()
{
    return Math.floor( LOCATION_ARRAY.length / 3 );
}

function getClickedLocationCount()
{
    var asLocation = getSelectedLocation();
    var iLocationCount = getLocationCount();
    
    if ( !asLocation )
    {
        return 0;
    }
    
    var iClickCount = 0;
    
    for ( var i = 0; i < iLocationCount; i ++ )
    {
        if ( asLocation[i] == TRUE )
        {
            iClickCount++;
        }
    }
    
    return iClickCount;
}

function clickLocation( iLocationIndex )
{
    var asLocation = getSelectedLocation();
    var iClickedLocationCount = getClickedLocationCount();
    
    // new a initial location array
    if ( !asLocation )
    {
        asLocation = new Array();
    
        var iLocationCount = getLocationCount();
        
        for ( var i = 0; i < iLocationCount; i ++ )
        {
            asLocation[i] = i === 0 ? TRUE : FALSE;
        }
    }
    
    if ( iLocationIndex == 0 ) // not limit
    {
        if ( asLocation[0] == TRUE && iClickedLocationCount > 1 )
        {
            asLocation[0] = FALSE;
        }
        else
        {
            asLocation[0] = TRUE;
        }
        
        for ( var i = 1; i < asLocation.length; i ++ )
        {
            asLocation[i] = FALSE;
        }
    }
    else // specific location 
    {
        asLocation[0] = FALSE;
    
        if ( asLocation[iLocationIndex] == TRUE && iClickedLocationCount > 1)
            asLocation[iLocationIndex] = FALSE;
        else
            asLocation[iLocationIndex] = TRUE;
    }
    
    setSelectedLocation( asLocation );
    updateDiv( ID_P_LOCATION, getHTMLOfLocationDiv() );
    
    //alert( "" + iLocationIndex + ":" + asLocation[iLocationIndex] );
}

function getLocationSortNumber( sLocation )
{
    var iCount = getLocationCount();
    
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( sameLocation( getLocationName( i ), sLocation ) )
            return i;
    }
    
    return INVALID_SORT_NUMBER;
}

function clickStyle( iClickIndex )
{
    removeFontColor(); // show the default font color when the style change
    setStyeIndex( iClickIndex );
    setStyle();

    updateDiv( ID_STYLE, getHTMLOfStyleDiv() );
}

function clickFontSize( iClickIndex )
{
    setFontSizeIndex( iClickIndex );
    giFontSizeSelectedIndex = iClickIndex;
    giFontRatio = 100 + giFontSizeSelectedIndex * 10;

    updateDiv( ID_FONT_SIZE, getHTMLOfFontSizeDiv() );
}

function clickPostCountPerPage( iClickIndex )
{
    setPostCountPerPageIndex( iClickIndex );

    updateDiv( ID_P_POST_COUNT_PER_PAGE, getHTMLOfPostCountPerPageDiv() );
}

function isSelectedLocation( iLocationIndex )
{
    var asLocation = getSelectedLocation();
    
    return ( ( !asLocation && iLocationIndex === 0 ) ||
             ( asLocation && asLocation[iLocationIndex] == TRUE ) );
}

function notLimitLocation()
{
    var asLocation = getSelectedLocation();
    return ( !asLocation || asLocation[0] == TRUE );
}

function notLimitKeyword()
{
    return ( gsKeyword == S_NOT_LIMIT[giLanguageIndex] );
}

function notLimitDate()
{
    var sDate = getDateString();
    
    return ( !sDate || sDate == "" );
}

function notLimitPeriod()
{
    var iPeriodIndex = getPeriodIndex();
    
    return ( !iPeriodIndex || iPeriodIndex == 0 );
}

// ex. [0]=新竹地區 , [1]=彰化地區
function getSelectedLocationStrings()
{
    var asLocation = getSelectedLocation();
    var asSelectedLocationString = new Array();
    var j = 0;
    
    var iCount = asLocation ? asLocation.length : 0;
    
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( asLocation[i] == TRUE )
        {
            asSelectedLocationString[j++] = getLocationName( i );
        }
    }

    return asSelectedLocationString;
}

// ex. sLocation1=臺北地區 , sLocation2=台北
function sameLocation( sLocation1, sLocation2 )
{
    //alert( sLocation2 );
    sLocation1 = sLocation1.replace( "台", "臺" );
    var bSame1 = sLocation1.indexOf( sLocation2 ) >= 0;
    
    sLocation1 = sLocation1.replace( "臺", "台" );
    var bSame2 = sLocation1.indexOf( sLocation2 ) >= 0;

    return ( bSame1 || bSame2 );
}


function isNumber( sText )
{
    return !isNaN( parseInt( sText, 10 ) );
}

function getLoccalNumber( sText, iBegin, iEnd )
{
    var aiNumber = new Array();
    
    if ( iBegin < 0 )
        iBegin = 0;
    if ( iEnd > sText.length )
        iEnd = sText.length;
    
    for ( var iLength = iEnd - iBegin - 1; iLength > 0; iLength -- )
    {
        for ( var i = iBegin; i + iLength < iEnd; i ++ )
        {
            sTemp = sText.substring( i, i + iLength + 1 );     
                
            if ( isNumber( sTemp ) )
            {
                return parseInt( sTemp, 10 );
            }
        }
    }
    
    return NOT_FOUND;
}

function getFormatData( sOriginalData )
{
    var iBegin = sOriginalData.indexOf( ">" ) + 1;
    var iEnd = sOriginalData.indexOf( "</new>", iBegin );
    
    if ( iBegin <= 0 || iEnd < 0 )
        return sOriginalData;

    return sOriginalData.substring( iBegin, iEnd );
}

function getUnformatData( sOriginalData )
{
    var iEnd = sOriginalData.indexOf( "<" );
    
    if ( iEnd < 0 )
        return sOriginalData;
        
    return sOriginalData.substring( 0, iEnd );
}

function postExisted( asPostMap, sPostID )
{
    if ( !asPostMap )
        return false;

    var iCount = asPostMap.length;
    
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( asPostMap[i] == sPostID )
            return true;
    }
    
    return false;
}

function getRemovedPostMap()
{
    return PT_REMOVED_POST_MAP;
}

function getTempPostMap()
{
    if ( !PT_TEMP_DATA[0] )
        return null;
        
    var asPostMap = new Array();
    var iCount = PT_TEMP_DATA.length;

    for ( var i = 0; i < iCount; i ++ )
    {
        asPostMap[i] = PT_TEMP_DATA[i][PT_WORK_SUMMARY][4];
    }
    
    return asPostMap;
} 

function removeUnmarkedPTData( iPostKind, sPostID )
{
    // request to remove NORMAL post and it is marked -> cannot be removed
    if ( iPostKind != MARK_POST &&
         postExisted( getPostMap( MARK_POST ), sPostID ) )
        return;
       
    removePTData( iPostKind, sPostID );
}

function mergeData()
{
    // for updating the match table
    giCurrentPostKindForMatchPostTable = INIT_POST_KIND;

    //removePostMap();
    clearSortFlag();

    var asStaticPostMap = getPostMap( NEW_POST );
    var asDynamicPostMap = getTempPostMap();
    var asRemovedPostMap = getRemovedPostMap();
    var iNewestPostIndex = getNewestPostIndex( NEW_POST );
    
    //alert( asStaticPostMap.length );

    if ( asStaticPostMap && asDynamicPostMap )
    {
        //console.log( asStaticPostMap + "________" + asDynamicPostMap );
        
        var iTempCount = asDynamicPostMap.length;
    
        for ( var i = 0; i < iTempCount; i ++ )
        {
            if ( ++iNewestPostIndex == PT_DATA_MAX_COUNT - 1 )
            {
                iNewestPostIndex = 0;
            }
            
            
            if ( !postExisted( asStaticPostMap, asDynamicPostMap[i] ) )
            {
                var aaPTData = PT_TEMP_DATA[i];
                var sPostIDWithSameTitle = getSameTitlePostID( NEW_POST, getPostTitle( aaPTData ) );
                if ( sPostIDWithSameTitle )
                {
                    // remove the existed post which has the same title 
                    removePostData( NEW_POST, sPostIDWithSameTitle );
                }
            
                removeUnmarkedPTData( NEW_POST, asStaticPostMap[iNewestPostIndex] );
                asStaticPostMap[iNewestPostIndex] = asDynamicPostMap[i];
                setPTData( NEW_POST, asStaticPostMap[iNewestPostIndex], aaPTData );
                
                //alert( i + "-----" + asDynamicPostMap[i] + "_____" + PT_TEMP_DATA[i] );
            }
        }
    }
    else if ( asDynamicPostMap )
    {
        //alert( asDynamicPostMap.length + asDynamicPostMap );
        asStaticPostMap = asDynamicPostMap;
        
        var iCount = asStaticPostMap.length;
        for ( var i = 0; i < iCount; i ++ )
        {
            setPTData( NEW_POST, asStaticPostMap[i], PT_TEMP_DATA[i] );
        }
        
        iNewestPostIndex = iCount - 1;
    }
    
    //alert( asStaticPostMap );
    setNewestPostIndex( NEW_POST, iNewestPostIndex );
    setPostMap( NEW_POST, asStaticPostMap );
    
    if ( gbRemovedDataCheck && asRemovedPostMap )
    {
        setPostMap( REMOVE_POST, asRemovedPostMap );
    }
    //updatePTData( NORMAL_POST );
    
    //alert( "merge data OK" );
}

function updateMarkData()
{
    
}

function updatePTData( iPostKind )
{
    var asPostMap = getPostMap( iPostKind );
    var iCount = asPostMap ? asPostMap.length : 0;
    
    if ( iPostKind == MARK_POST )
    {
        for ( var i = 0; i < iCount; i ++ )
        {
            PT_MARK_TEMP_DATA[i] = getPTData( iPostKind, i );    
        }
    }
    else
    {
        for ( var i = 0; i < iCount; i ++ )
        {
            PT_TEMP_DATA[i] = getPTData( iPostKind, i );    
        }
    }
}

function resetAllListPage()
{
    giCurrentMarkListPage = 0; // current list page of Mark
    giCurrentSearchListPage = 0;
    giCurrentNewListPage = 0; 
}

function getCurrentListPage()
{
    if ( giPostKind == MARK_POST )
        return giCurrentMarkListPage;
    else if ( giPostKind == SEARCH_POST )
        return giCurrentSearchListPage
    else if ( giPostKind == NEW_POST )
        return giCurrentNewListPage; 
        
    error( "getCurrentListPage: " + giPostKind );
    return null;
}

function getPostAbsoluteIndex( iRelatedIndex )
{
    var iPostCountPerPage = getPostCountPerPage();

    if ( giPostKind == MARK_POST )
        return iRelatedIndex + giCurrentMarkListPage * iPostCountPerPage;
    else if ( giPostKind == SEARCH_POST )
    {
        //return iRelatedIndex + giCurrentSearchListPage * iPostCountPerPage;
        return iRelatedIndex + gaiFirstSearchPageIndex[giCurrentSearchListPage];
    }
    else if ( giPostKind == NEW_POST )
        return iRelatedIndex + giCurrentNewListPage * iPostCountPerPage;
        
    error( "getPostAbsoluteIndex: " + giPostKind );
    return null;
}


function removePostData( iPostKind, sPostID )
{
    var asPostMap = getPostMap( iPostKind );
    
    // clean the post id from PostMap
    for ( var i = 0; i < asPostMap.length; i++ )
    {
        if ( asPostMap[i] == sPostID )
        {
            asPostMap[i] = null;
            break;
        }
    }
        
    setPostMap( iPostKind, asPostMap );
    removeUnmarkedPTData( iPostKind, sPostID );

    var iNewestPostIndex = getNewestPostIndex( iPostKind );
    
    if ( iNewestPostIndex > 0 )
    {
        iNewestPostIndex--;
    }
        
    setNewestPostIndex( iPostKind, iNewestPostIndex );
    //updatePTData( iPostKind );
}


function addPostData( iPostKind, sPostID, aasPTData )
{
    var iMaxIndex;
    var asPostMap = getPostMap( iPostKind );
    
    if ( !asPostMap )
        asPostMap = new Array();
    
    if ( iPostKind == MARK_POST )
    {
        iMaxIndex = PT_MARK_DATA_MAX_COUNT - 1;
    }
    else
    {
        iMaxIndex = PT_DATA_MAX_COUNT - 1;
    }
    
    var iNewestPostIndex = getNewestPostIndex( iPostKind );

    if ( ++iNewestPostIndex == iMaxIndex )
    {
        iNewestPostIndex = 0;
    }
    
    //alert( "newIndex:" + iNewestPostIndex);
    
    
    removeUnmarkedPTData( iPostKind, asPostMap[iNewestPostIndex] );
    asPostMap[iNewestPostIndex] = sPostID;
    setPTData( iPostKind, asPostMap[iNewestPostIndex], aasPTData );
    setNewestPostIndex( iPostKind, iNewestPostIndex );
    setPostMap( iPostKind, asPostMap );
    //updatePTData( iPostKind );
}

function unmarkPost( iPostIndex )
{
    var aasPTData = getPTData( MARK_POST, iPostIndex );
    var sPostID = aasPTData[PT_WORK_SUMMARY][4];
    
    removePostData( MARK_POST, sPostID );
    
    return getValidText( aasPTData[PT_WORK_SUMMARY][0] );
}

function unmarkCurrentPost()
{
    var sTitle = unmarkPost( getCurrentPostIndex() );

    showMessage( LEFT_QUOTATION_MARK + sTitle + RIGHT_QUOTATION_MARK + S_UNMARKED[giLanguageIndex] );
}

function batchUnmarkPost()
{
    var sManyTitle = "";
    var iCount = gabCheckBox.length;
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( gabCheckBox[i] )
        {
            sManyTitle += LEFT_QUOTATION_MARK + unmarkPost( i ) + RIGHT_QUOTATION_MARK + "\n";
        }
    }
    
    //if ( sManyTitle != "" )
    {
        showMessage( sManyTitle + S_UNMARKED[giLanguageIndex] );
    }
    gbCheckBoxShowed = false;
    
    updateListDiv( MARK_POST );
    updateDiv( ID_HEADER, getHTMLOfHeaderDiv() ); // change the icon
}

function checkboxChecked()
{
    var iCount = gabCheckBox.length;
    
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( gabCheckBox[i] )
        {
            return true;
        }
    }
    
    return false;
}

function onClinkBatchUnmarkPost()
{
    if ( gbCheckBoxShowed )
    {
        if ( checkboxChecked() )
        {
            var sMessage = S_ARE_YOU_SURE[giLanguageIndex] + S_UNMARK_MANY_POST[giLanguageIndex].toLowerCase() + QUESTION_MARK;
            
            showConfirmMessage( sMessage, batchUnmarkPost );
        }
        else
        {
            gbCheckBoxShowed = false;

            updateListDiv( MARK_POST );
            updateDiv( ID_HEADER, getHTMLOfHeaderDiv() ); // change the icon
        }
    }
    else // not choic the unmark posts yet 
    {
        showCheckBoxOnList();
    }
    
    updateDiv( ID_HEADER, getHTMLOfHeaderDiv() ); // change the icon
}

function showMessage( sMessage )
{
    //alert( sMessage );
    var sTitle = S_INFO[giLanguageIndex];
    var sCancel = S_CANCEL[giLanguageIndex];
    var sDone = S_CONFIRM[giLanguageIndex];
    
    /*
    $( '#afui' ).popup(
    {
        title: sTitle,
        message: sMessage,
        cancelText: sCancel,
        doneText: sDone
    });
    */
    
    $( '#afui' ).popup( sMessage );
}

function showConfirmMessage( sMessage, fDoneFunction )
{
    var sTitle = S_CONFIRM[giLanguageIndex] + S_WINDOW[giLanguageIndex];
    var sCancel = S_CANCEL[giLanguageIndex];
    var sDone = S_CONFIRM[giLanguageIndex];
    
    $('#afui').popup(
    {
        title: sTitle,
        message: sMessage,
        cancelText: sCancel,
        cancelCallback: function () {
            console.log('cancelled');
        },
        doneText: sDone,
        doneCallback: fDoneFunction,
        cancelOnly: false
    });
}

function markCurrentPost()
{
    var aasPTData = getCurrentPTData();
    var sPostID = aasPTData[PT_WORK_SUMMARY][4];
    
    addPostData( MARK_POST, sPostID, aasPTData );
    showMessage( LEFT_QUOTATION_MARK + getValidText( aasPTData[PT_WORK_SUMMARY][0] ) + RIGHT_QUOTATION_MARK + S_MARKED[giLanguageIndex] );
}






function scrollToTop()
{
    $.ui.scrollToTop( "#" + gsNowDivID );
}

function isPageAboutOtpion( sDivID )
{
    return ( sDivID === ID_STYLE ||
             sDivID === ID_DISPLAY ||
             sDivID === ID_FONT_SIZE ||
             sDivID === ID_RESULT_LIMIT ||
             sDivID === ID_LANGUAGE ||
             sDivID === ID_P_POST_COUNT_PER_PAGE ||
             sDivID === ID_RELATED_LINKS ||
             sDivID === ID_ABOUT_APP ||
             sDivID === ID_ABOUT_AUTHOR );
}

function needConfirmHeader( sDivID )
{
    return ( sDivID === ID_P_LOCATION ||
             sDivID === ID_P_DATE ||
             sDivID === ID_P_PERIOD ||
             isPageAboutOtpion( sDivID ) );
}

function bindScrollEvent( sDivID )
{
    var myScroller = $( "#" + sDivID ).scroller();
    //myScroller.addInfinite();  
    var iEnd = 0;
    var iStart = 0;

    $.bind( myScroller, 'scrollend', function () {  
        iEnd = Math.floor( myScroller.scrollTop );
        giScrollEnd = iEnd;
        
        if ( iEnd < 0 )
            iEnd = - iEnd;
        // console.log("scroll end");  

        if ( iStart < iEnd )
        {
            if ( gbFooterShowed )
            {
                //toggleFooter();
            }
            if ( !gbHeaderShowed )
            {
                //toggleHeader();
            }
            //alert( "DOWN: " + iStart + "->" + iEnd  );
        }
        else if ( iStart > iEnd )
        {
            if ( !gbFooterShowed )
            {
                //toggleFooter();
            }
            if ( gbHeaderShowed && !needConfirmHeader( sDivID ) )
            {
                //toggleHeader();
            }
            //alert( "UP: " + iStart + "->" + iEnd  );
        }
        else if ( iStart === 0 && iEnd === 0 )
        {
            //enableFooter();
            
            if ( gbSwipeDown )
            {
                //enableHeader();
                
                if ( isNewListPageID( gsNowDivID ) )
                {
                    //alert( "pull to refresh : " );
                }
            }
        }
        //alert( "scrollend : " + iStart + "->" + iEnd );
    });  
    $.bind(myScroller, 'scrollstop', function () {  
        iStart = Math.floor( myScroller.scrollTop );
    });  
    $.bind(myScroller, 'infinite-scroll-end', function () {  
        //alert( "infinite-scroll-end" );
    });
}



function increaseCurrentListPage()
{
    if ( giPostKind == MARK_POST )   
        giCurrentMarkListPage++;
    else if ( giPostKind === SEARCH_POST )
        giCurrentSearchListPage++;
    else if ( giPostKind === NEW_POST )
        giCurrentNewListPage++;
}

function decreaseCurrentListPage()
{
    if ( giPostKind == MARK_POST && giCurrentMarkListPage > 0 )   
        giCurrentMarkListPage--;
    else if ( giPostKind === SEARCH_POST && giCurrentSearchListPage > 0 )
        giCurrentSearchListPage--;
    else if ( giPostKind === NEW_POST && giCurrentNewListPage > 0 )
        giCurrentNewListPage--;
}


function updateCurrentPostIndex( iPostIndex )
{
    if ( giPostKind === MARK_POST )
        giCurrentMarkPostIndex = iPostIndex;
    else if ( giPostKind === NEW_POST )
        giCurrentNewPostIndex = iPostIndex;
    else if ( giPostKind === SEARCH_POST )
        giCurrentSearchPostIndex = iPostIndex;    
}
         
function getCurrentPostIndex()
{
    if ( giPostKind == MARK_POST )
        return giCurrentMarkPostIndex;
    else if ( giPostKind == NEW_POST )
        return giCurrentNewPostIndex;
    else if ( giPostKind == SEARCH_POST )
        return giCurrentSearchPostIndex;
        
    error( "getCurrentPostIndex : " + giPostKind );
    return null;
}

function goLocation()
{
    window.open( getGmapURL( gsLocation ), "_system" );
}

function goEmail()
{
    window.open( getEmailURL( gsEmail ), "_system" );
}

function goEmailOfAuthor()
{
    window.open( getEmailURL( gsEmailOfAuthor ), "_system" );
}

function goPhoneNumber()
{
    window.open( getPhoneURL( gsPhoneNumber ), "_system" );
}

function goOriginalURL()
{
    goURL( gsOriginalPostURL );
}

function goURL( sURL )
{
    window.open( sURL, "_system" );
}

function showMask()
{
    $.ui.showMask();
}

// ex. "Tue Aug 26 23:44:35 2014" -> 20140826234435
function getDateNumber( sDate )
{
    var asMonth = new Array( 
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec" );
        
    var asWeek = new Array( 
        "Sun", "Mon", "Tue", "Wed",
        "Thu", "Fri", "Sat" );

    var asDate = sDate.split( " " );
    var iDateCount = asDate.length;

    var sYear = asDate[4];
    var sDay = asDate[2];
    
    if ( sDay.length == 1 )
    {
        sDay = "0" + sDay; // ex. 2 -> 02
    }
    
    var asTime = asDate[3].split( ":" );
    var sTime = "";
    for ( var i = 0; i < asTime.length; i ++ )
    {
        sTime += asTime[i];
    }
        
    var iMonthCount = asMonth.length;
    var sMonth = "00";

    for ( var i = 0; i < iMonthCount; i ++ )
    {
        if ( sDate.indexOf( asMonth[i] ) > 0 )
        {
            if ( i + 1 < 10 )
                sMonth = "0" + ( i + 1 );
            else
                sMonth = "" + ( i + 1 );
                
            break;
        }
    }
    
    
    var sNumber = sYear + sMonth + sDay + sTime;
    
    if ( isNumber( sNumber ) )
        return parseInt( sNumber, 10 );
    else
        return 0;
}

// ex. A: "Tue Aug 26 23:44:35 2014"
//     B: "Tue Aug 26 23:45:27 2014"
//     -> return false 
function AisLaterThanB( sDateA, sDateB )
{
    var iDateNumberA = getDateNumber( sDateA );
    var iDateNumberB = getDateNumber( sDateB );
    
    return iDateNumberA > iDateNumberB;
}

function getNowSortType()
{
    var iSortByIndex = getSortByIndex();
    var iCount = S_SORT_ARRAY.length;
    
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( S_SORT_ARRAY[iSortByIndex] == S_SORT_BY_POST )
            return SORT_BY_POST_DATE;
        else if ( S_SORT_ARRAY[iSortByIndex] == S_SORT_BY_DATE )
            return SORT_BY_WORK_DATE;
        else if ( S_SORT_ARRAY[iSortByIndex] == S_SORT_BY_PERIOD )
            return SORT_BY_PERIOD;
        else if ( S_SORT_ARRAY[iSortByIndex] == S_SORT_BY_LOCATION )
            return SORT_BY_LOCATION;
        else if ( S_SORT_ARRAY[iSortByIndex] == S_SORT_BY_CATEGORY )
            return SORT_BY_CATEGORY;
        else if ( S_SORT_ARRAY[iSortByIndex] == S_SORT_BY_SITE )
            return SORT_BY_SITE;
    }
    
    return SORT_BY_WORK_DATE; // default
}

function sortPostList( iSortIndex )
{
    setSortByIndex( iSortIndex );
    
    sortPostMap();

    $.ui.toggleSideMenu(); // always call this function by menu
}

// ex. 20140826234435 -> "2014.08.26"
function getSortFlag( iSortNumber )
{
    var iSortType = getNowSortType();
    
    if ( iSortNumber == INVALID_SORT_NUMBER )
    {
        return S_NOT_SORTED[giLanguageIndex];
    }
    
    if ( iSortType == SORT_BY_POST_DATE )
    {
        var iTemp = Math.floor( iSortNumber / 1000000 );
        
        //return "" + iTemp;
        
        var sDay = "" + iTemp % 100;
        
        iTemp = Math.floor( iTemp / 100 );
        var sMonth = "" + iTemp % 100;
        
        iTemp = Math.floor( iTemp / 100 );
        var sYear = "" + iTemp;
        
        return sYear + "." + sMonth + "." + sDay;
    }
    else if ( iSortType === SORT_BY_WORK_DATE )
    {
        return getDayText( iSortNumber );
    }
    else if ( iSortType === SORT_BY_PERIOD )
    {
        return getPeriodName( iSortNumber );
    }
    else if ( iSortType === SORT_BY_CATEGORY )
    {
        return getCategoryName( iSortNumber );
    }
    else if ( iSortType === SORT_BY_LOCATION )
    {
        return getLocationName( iSortNumber );
    }
}

// ex. iOldSortNumber: 20140826234435
//     iNewSortNumber: 20140827234435
//     return true
function needNewSortFlag( iPostKind, iOldSortNumber, iNewSortNumber )
{
    var iSortType = getNowSortType();
    
    if ( iSortType == SORT_BY_POST_DATE )
    {
        var sOldFlag = getSortFlag( iOldSortNumber );
        var sNewFlag = getSortFlag( iNewSortNumber );
        
        if ( sOldFlag != sNewFlag )
        {
            //alert( sOldFlag + " != " + sNewFlag );
            return true;
        }
    }
    else if ( iSortType === SORT_BY_WORK_DATE ||
              iSortType === SORT_BY_PERIOD ||
              iSortType === SORT_BY_CATEGORY ||
              iSortType === SORT_BY_LOCATION )
    {
        return iOldSortNumber != iNewSortNumber;
    }
    
    return false;
}

function getSortNumber( iPostKind, iPostIndex )
{
    var iSortType = getNowSortType();
    var aaPTData = getPTData( iPostKind, iPostIndex );
    
    if ( !aaPTData )
    {
        removePostMap();
        updateData();
    }

    if ( iSortType === SORT_BY_POST_DATE )
    {
        var iValue = getDateNumber( aaPTData[PT_WORK_SUMMARY][5] );
        
        if ( isNumber( iValue ) )
            return parseInt( iValue, 10 );
        else
            return INVALID_SORT_NUMBER;
    }
    else if ( iSortType === SORT_BY_WORK_DATE )
    {
        var sTemp = aaPTData[PT_WORK_TIME][1];
        if ( noValidText( sTemp ) )
        {
            return INVALID_SORT_NUMBER;
        }
        else
        {
            return getDayNumber( getFirstDate( getValidText( sTemp ) ) );
        }
    }
    else if ( iSortType === SORT_BY_PERIOD )
    {
        var sTemp = aaPTData[PT_WORK_TIME][1];
        if ( noValidText( sTemp ) )
        {
            return INVALID_SORT_NUMBER;
        }
        else
        {
            return getPeriodType( getValidText( sTemp ) );
        }
    }
    else if ( iSortType === SORT_BY_LOCATION )
    {
        var sTemp = getValidText( aaPTData[PT_WORK_SUMMARY][2] );
        
        return sTemp ? getLocationSortNumber( sTemp ) : INVALID_SORT_NUMBER;
    }
    else if ( iSortType === SORT_BY_CATEGORY )
    {
        var sTemp = aaPTData[PT_WORK_SUMMARY][6];
        
        return sTemp ? getCategoryType( sTemp ) : INVALID_SORT_NUMBER;
    }
    else if ( iSortType === SORT_BY_SITE )
    {
        var sTemp = aaPTData[PT_WORK_SUMMARY][1];
        
        return sTemp ? getSiteType( sTemp ) : INVALID_SORT_NUMBER;
    }
}

function sortPostMap()
{
    var asPostMap = getPostMap( giPostKind );
    var iCount = asPostMap ? asPostMap.length : 0;
    
    var aiSortNumber = new Array();
    var i = 0;
    
    for ( i = 0; i < iCount; i++ )
    {
        aiSortNumber[i] = getSortNumber( giPostKind, i );
    }

    //alert( aiSortNumber.length + ":" + aiSortNumber );
    
    var iSmallestNumber = -1;
    var iSmallestIndex = 0;
    var sSmallestPost = "";
    
    var aiDebug = new Array();
    
    for ( i = 0; i < iCount; i ++ )
    {
        for ( var j = i; j < iCount; j ++ )
        {
            if ( iSmallestNumber < 0 || 
                 aiSortNumber[j] < iSmallestNumber )
            {
                iSmallestIndex = j;
               
                iSmallestNumber = aiSortNumber[j];
                sSmallestPost = asPostMap[j];
            }
        }

        aiSortNumber[iSmallestIndex] = aiSortNumber[i];
        aiSortNumber[i] = iSmallestNumber;

        asPostMap[iSmallestIndex] = asPostMap[i];
        asPostMap[i] = sSmallestPost;
        
        iSmallestNumber = -1;
        
        aiDebug[i] = iSmallestIndex;
    }
    
    //alert( aiSortNumber );
    
    updateSortFlag( giPostKind, aiSortNumber );
    
    setPostMap( giPostKind, asPostMap );
    
    resetAllListPage();
    updateAllListDiv();
    
    //alert( aiDebug.length + ":" + aiDebug );
}

function clearSortFlag()
{
    var iCount = gasSortFlag ? gasSortFlag.length : 0;
    
    gasSortFlag = null;
}

function updateSortFlag( iPostKind, aiSortNumber )
{
    var iCount = aiSortNumber.length;
    
    gasSortFlag = new Array();

    // set the flag array
    for ( var i = 0; i < iCount; i ++ )
    {
        /*
        if ( i === 0 ||
             needNewSortFlag( iPostKind, aiSortNumber[i], aiSortNumber[i-1] ) ) 
        {
            gasSortFlag[i] = getSortFlag( aiSortNumber[i] );
        }
        else
        {
            gasSortFlag[i] = null;
        }
        */
        
        gasSortFlag[i] = getSortFlag( aiSortNumber[i] );
    }
}

// ex. 9/1~9/13 -> 9/1
function getFirstDate( sDate )
{
    if ( !sDate )
        return null;

    var asDate1 = sDate.split( "," );
    var asDate2 = asDate1[0].split( "~" );

    return asDate2[0];
}

// ex. 9/1~9/13 -> 9/13
function getLastDate( sDate )
{
    if ( !sDate )
        return null;

    var asDate1 = sDate.split( "," );
    var asDate2 = asDate1[asDate1.length - 1].split( "~" );

    return asDate2[asDate2.length - 1];
}



// ex. 271 -> 9/1
function getDayText( iDayNumber )
{
    if ( iDayNumber == INVALID_SORT_NUMBER )
    {
        return S_NOT_SORTED[giLanguageIndex];
    }
   
    var sMonth = Math.floor( iDayNumber / BASE_DAY_PER_MONTH );
    var sDay = iDayNumber % BASE_DAY_PER_MONTH;
    
    //alert( "" + iDayNumber + " = " + sMonth + "/" + sDay );
    
    return sMonth + "/" + sDay;
}

// ex. 9/1 -> 9 * 30 + 1 = 271
function getDayNumber( sDate )
{
    var asTemp = sDate ? sDate.split( "/" ) : null;
    var iCount = asTemp ? asTemp.length : 0;

    // return 0 if there exists NaN in the date
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( !isNumber( asTemp[i] ) )
        {
            return INVALID_SORT_NUMBER;
        }
    }
    
    // ex. 99/9/1
    if ( iCount == 3 )
    {
        return 365 * getNumber( asTemp[0] ) + BASE_DAY_PER_MONTH * getNumber( asTemp[1] ) + getNumber( asTemp[2] ); 
    }
    // ex. 9/1
    else if ( iCount == 2 )
    {
        //alert( asTemp[0] + "," + asTemp[1] );
        //alert( getNumber( asTemp[0] ) + "," + getNumber( asTemp[1] ) );
        return BASE_DAY_PER_MONTH * getNumber( asTemp[0] ) + getNumber( asTemp[1] );
    }

    return INVALID_SORT_NUMBER;
}

// ex. 9/1, 9/13 -> 13
function getDayPeriod( sDay1, sDay2 )
{
    var iDayNumber1 = getDayNumber( sDay1 );
    var iDayNumber2 = getDayNumber( sDay2 );
    
    if ( iDayNumber1 > iDayNumber2 )
        return iDayNumber1 - iDayNumber2 + 1;
    else
        return iDayNumber2 - iDayNumber1 + 1;
}

function getPeriodTypeByIndex( iPeriodIndex )
{
 // var PERIOD_ARRAY =  new Array( 
// '0', '不限', 'Not limit', '1', '一天內', 'one day or less', '2', '一天到一個禮拜', 'one day to one week', '3', '一個禮拜到一個月', 'one week', '4', '一個月或更久', 'one month or more' );

    if ( iPeriodIndex == 0 )
        return PERIOD_DONT_KNOW;
    else if ( iPeriodIndex == 1 )
        return PERIOD_ONE_DAY;
    else if ( iPeriodIndex == 2 )
        return PERIOD_ONE_WEEK;
    else if ( iPeriodIndex == 3 )
        return PERIOD_ONE_MONTH;
    else if ( iPeriodIndex == 4 )
        return PERIOD_MANY_DAY;
}


function getCategoryType( sCategory )
{
    var iCategoryCount = Math.floor( CATEGORY_ARRAY.length / 3 );
    
    for ( var i = 0; i < iCategoryCount; i ++ )
    {
        if ( getCategoryName( i ).indexOf( sCategory ) >= 0 )
        {
            return i;
        }
    }

    return 4;
}

function getSiteType( sSite )
{
    if ( sSite == "PTT" )
    {
        return SITE_PTT;
    }
    else if ( sSite == "FB" )
    {
        return SITE_FB;
    }
    else
    {
        return SITE_OTHER;
    }
}

// ex. 9/1~9/13 -> PERIOD_ONE_MONTH
// ex. 9/17~9/23 -> PERIOD_ONE_WEEK
function getPeriodType( sPeriod )
{
    var iDayCount = 0;
    var asPart1 = sPeriod.split( "," );
    
    for ( var i = 0; i < asPart1.length; i ++ )
    {
        var asPart2 = asPart1[i].split( "~" );
        
        // ex. 9/1~9/13
        if ( asPart2.length == 2 )
        {
            iDayCount += getDayPeriod( asPart2[0], asPart2[1] );
        }
        // ex. 9/1
        else
        {
            iDayCount++;
        }
    }
    
    if ( iDayCount == 0 )
    {
        return PERIOD_DONT_KNOW;
    }
    else if ( iDayCount == 1 )
    {
        return PERIOD_ONE_DAY;
    }
    else if ( iDayCount <= 7 )
    {
        return PERIOD_ONE_WEEK;
    }
    else if ( iDayCount <= 31 )
    {
        return PERIOD_ONE_MONTH;
    }
    else
    {
        return PERIOD_MANY_DAY;
    }
}

function setPostPageIndex( iClickIndex, iLastClickIndex )
{
    // indicate that the page changed by prev or next from the post page
    if ( giLastPageSytle == ITEM_PAGE )
    {
        var iPostCountPerPage = getPostCountPerPage();
        
        //alert( iPostCountPerPage + "." + iLastClickIndex + "." + iClickIndex );
        
        // last post in N page -> first post in N+1 page
        if ( iLastClickIndex == iPostCountPerPage - 1 && iClickIndex == 0 )
        {           
            increaseCurrentListPage();
            //alert( "+" );
        }
        // first post in N page -> last post in N-1 page
        else if ( iLastClickIndex == 0 && iClickIndex == iPostCountPerPage - 1 )
        {
            decreaseCurrentListPage();
            //alert( "-" );
        }
        
    }
    
    updatePostAbsoluteIndex( iClickIndex );
    giCurrentRelatedPostIndex = iClickIndex;
}

function updatePostKind( sDivID )
{
    if ( isMarkListPageID( sDivID ) )
        giPostKind = MARK_POST;
    else if ( isSearchListPageID( sDivID ) )
        giPostKind = SEARCH_POST;
    else if ( isNewListPageID( sDivID ) )
        giPostKind = NEW_POST;
    else
        error( "changeHash: " );
}

function loadPage( sDivID )
{
    $.ui.loadContent( "#" + sDivID, false, false, gsTransition );
}

function getNextMatchPostIndex( iPostIndex )
{
    var iCount = getPostCount();

    for ( var i = iPostIndex + 1; i < iCount; i ++ )
    {
        if ( gabMatchPostTable[i] )
        {
            return i;
        }
    }

    return INIT_INDEX;
}

function getPrevMatchPostIndex( iPostIndex )
{
    var iCount = getPostCount();

    for ( var i = iPostIndex - 1; i >= 0; i -- )
    {
        if ( gabMatchPostTable[i] )
        {
            return i;
        }
    }

    return INIT_INDEX;
}

// update the information on gabMatchPostTable
function updateMatchTable()
{
    if ( giCurrentPostKindForMatchPostTable == giPostKind )
    {
        return; // no need to update
    }
    
    giCurrentPostKindForMatchPostTable = giPostKind;

    var asSelectedLocationStrings = getSelectedLocationStrings();
    var iSelectedLocationCount = asSelectedLocationStrings ? asSelectedLocationStrings.length : 0;
    
    var iMaxIndex = getPostCount( giPostKind ) - 1;
    var sTemp = "";
    
    gabMatchPostTable = new Array();
    
    for ( var i = 0; i <= iMaxIndex; i ++ )
    {
        var aaPTData = getPTData( giPostKind, i );
        if ( !aaPTData )
            continue;
            
        //alert( getPostTitle( aaPTData ) );

        var bLocationMatched = isLocationMatched( aaPTData[PT_WORK_SUMMARY][2] );
        var bDateMatched = false;
        var bPeriodMatched = false;
        var bKeywordMatched = false;
        
        sTemp = aaPTData[PT_WORK_TIME][1];
        if ( notLimitDate() || !noValidText( sTemp ) )
        {
            bDateMatched = isDateMatched( getValidText( sTemp ) );
        }
        
        sTemp = aaPTData[PT_WORK_TIME][1];
        if ( notLimitPeriod() || !noValidText( sTemp ) )
        {
            bPeriodMatched = isPeriodMatched( getPeriodType( getValidText( sTemp ) ) );
        }
        
        bKeywordMatched = isKeywordMatched( aaPTData );
        
        gabMatchPostTable[i] = false;
        
        if ( giPostKind == MARK_POST || 
             giPostKind == NEW_POST ||
             ( giPostKind == SEARCH_POST && 
               bLocationMatched && bDateMatched && bPeriodMatched && bKeywordMatched ) )
        {
            gabMatchPostTable[i] = true;
        }
    }
}

function isLocationMatched( sLocation )
{
    if ( notLimitLocation() )
    {
        return true;
    }
    
    var asSelectedLocationStrings = getSelectedLocationStrings();
    var iSelectedLocationCount = asSelectedLocationStrings ? asSelectedLocationStrings.length : 0;  

    for ( var j = 0; j < iSelectedLocationCount; j ++ )
    {
        if ( sameLocation( asSelectedLocationStrings[j], sLocation ) )
        {
            return true;
        }
    }
    
    return false;
}

function isKeywordMatched( aaPTData )
{
    if ( notLimitKeyword() )
        return true;
    else
    {
        //alert( "L");
        return ( aaPTData.toString().indexOf( gsKeyword ) >= 0 );
        
    }
}

function isDateMatched( sPTDate )
{
    if ( notLimitDate() )
    {
        return true;
    }

    var sDate = getDateString();   

    if ( sDate && sDate.split( DATE_DIVISION ).length > 1 &&
         sPTDate && sPTDate.split( "/" ).length > 0 )
    {
        var sMonth = sDate.split( DATE_DIVISION )[1].trim();
        var sPTMonth = sPTDate.split( "/" )[0].trim();
        
        //alert( sMonth + " == " + sPTMonth );
        return ( sMonth == sPTMonth );
    }
    
    return false;
}

function isPeriodMatched( iPeriodType )
{
    if ( notLimitPeriod() )
    {
        return true;
    }

    var iPeriodIndex = getPeriodIndex();

    return iPeriodType == getPeriodTypeByIndex( iPeriodIndex );
}





function swipePost( iSwipeDirection )
{
    var iCurrentPostIndex = getCurrentPostIndex();
    
    if ( iSwipeDirection === SWIPE_LEFT )
    {
        var iNextPostIndex = getNextMatchPostIndex( iCurrentPostIndex );
    
        if ( iNextPostIndex != INIT_INDEX )
        {
            clickPost( iNextPostIndex );
        }
        else
        {
            showMessage( S_LAST_POST_NOW[giLanguageIndex] );
        }
    }
    else if ( iSwipeDirection === SWIPE_RIGHT )
    {
        var iPrevPostIndex = getPrevMatchPostIndex( iCurrentPostIndex );    
                
        if ( iPrevPostIndex != INIT_INDEX )
        {
            // use the transition of slide left
            gsTransition = TRANSITION_SLIDE_LEFT;
            clickPost( iPrevPostIndex );
            gsTransition = TRANSITION_SLIDE;
        }
        else
        {
            showMessage( S_FIRST_POST_NOW[giLanguageIndex] );
        }
    }
}

function swipeList( iSwipeDirection )
{
    if ( iSwipeDirection === SWIPE_LEFT )
    {
        if ( existNextListPage() )
        {
            loadPage( getListNextID( giPostKind ) );
        }
        else
        {
            showMessage( S_LAST_LIST_NOW[giLanguageIndex] );
        }
    }
    else if ( iSwipeDirection === SWIPE_RIGHT )
    {
        if ( existPrevListPage() )
        {
            // use the transition of slide left
            gsTransition = TRANSITION_SLIDE_LEFT;
            loadPage( getListPrevID( giPostKind ) );
            gsTransition = TRANSITION_SLIDE;       
        }
        else
        {
            showMessage( S_FIRST_LIST_NOW[giLanguageIndex] );
        }
    }
}

function clickDate( iClickIndex )
{
    if ( iClickIndex == 0 )
        setDateString( "" );
    else
        setDateString( getYearAndMonth( iClickIndex - 1 ) );
        
    loadPage( ID_P_SEARCH );
}

function clickPeriod( iClickIndex )
{
    setPeriodIndex( iClickIndex );
    loadPage( ID_P_SEARCH );
}

function clickGoBack()
{
    $.ui.goBack();
}

function clickKeyword()
{
    var sKeyword = prompt( S_ENTER_KEYWORD_FOR_SEARCH[giLanguageIndex], "keyword");
    
    gsKeyword = sKeyword ? sKeyword : S_NOT_LIMIT[giLanguageIndex];
    
    updateDiv( ID_P_SEARCH, getHTMLOfSearchDiv() );
}

function isOutdatePost( sDate )
{
    /*
    var asDate = sDate.split( "/" );
    var iMonth = getNumber( asDate[0] );
    var iDay = getNumber( asDate[1] );
    
    var date = new Date();
    var iCurrentMonth = date.getMonth() + 1;
    var iCurrentDay = date.getDate();
    
    return ( iMonth < iCurrentMonth ) || 
           ( iMonth == iCurrentMonth && iDay < iCurrentDay );
           
    */
    
    var date = new Date();
    var sNowDate = "" + ( date.getMonth() + 1 ) + "/" + date.getDate();
    

    return getDayNumber( sNowDate ) > getDayNumber( sDate  );
}

function getPostTitle( aaPTData )
{
    return getValidTitle( aaPTData[PT_WORK_SUMMARY][0] );
}

function getPostID( aaPTData )
{
    return aaPTData[PT_WORK_SUMMARY][4];
}

function getSameTitlePostID( iPostKind, sPostTitle )
{
    var asPostMap = getPostMap( iPostKind );
    var iCount = asPostMap ? asPostMap.length : 0;
    for ( var i = 0; i < iCount; i ++ )
    {
        var aaPTData = getPTData( iPostKind, i );
        var sTempTitle = getPostTitle( aaPTData );
        
        if ( sTempTitle.indexOf( sPostTitle ) >= 0 ||
             sPostTitle.indexOf( sTempTitle ) >= 0 )
        {
            return getPostID( aaPTData );
        }
    }
    
    return null;
}

function isRemovedPost( sPostID )
{
    return postExisted( getPostMap( REMOVE_POST ), sPostID );
}

// month 0 = january, 11 = december
function getMonthValue( sDate )
{
    return sDate ? getNumber( sDate.split( "/" )[0] ) - 1 : 0;
}

function getDayValue( sDate )
{
    if ( sDate && sDate.split( "/" ).length > 1 )
    {
        return getNumber( sDate.split( "/" )[1] );
    }
    
    return 0;
}

function getTextWithoutTag( sText, sTag, sReplace )
{
    while ( sText.indexOf( sTag ) >= 0 )
    {
        sText = sText.replace( sTag, sReplace );
    }
    
    return sText
}

function calendarSupported()
{
    return window.plugins && window.plugins.calendar;
}

function addCalendar()
{
    if ( !window.plugins )
    {
        showMessage( S_NOT_SUPPORT[giLanguageIndex] + LEFT_QUOTATION_MARK + S_ADD_TO_CALENDAR[giLanguageIndex] + RIGHT_QUOTATION_MARK );
        return;
    }

    var sFirstDate = getFirstDate( gsDate );
    var sLastDate = getLastDate( gsDate );
    
    if ( !sFirstDate || !sLastDate )
    {
        return;
    }
    
    var iYear = 2014;
    var iFirstMonth = getMonthValue( sFirstDate );
    var iFirstDay = getDayValue( sFirstDate );
    var iLastMonth = getMonthValue( sLastDate );
    var iLastDay = getDayValue( sLastDate );

    // prep some variables
     
    var startDate = new Date( iYear, iFirstMonth, iFirstDay, 8, 0, 0, 0, 0 );
    var endDate = new Date( iYear, iLastMonth, iLastDay, 17, 0, 0, 0, 0 );
    var title = gsTitle;
    var location = gsLocation;
    var notes = getTextWithoutTag( gsNote, "<br>", " " );
    var success = function(message) { /*alert("Success: " + JSON.stringify(message));*/ };
    var error = function(message) { /*alert("Error: " + message);*/ };
    
    // create an event interactively (only supported on Android)
    window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);

    //alert( "add Calendar success !!" );
}

function updateData()
{
    //alert( "pull to refresh !!! " );
    giUpdateState = STATE_UPDATING;
    
    updateDiv( gsNowDivID, getHTMLOfListDiv() );
    
    addJS( gsGoogleCodeBaseURL + "ptt_data.js", false );  

    if ( gbRemovedDataCheck )
    {
        addJS( gsGoogleCodeBaseURL + "remove_data.js", false );
    }
}

function checkInitialData()
{
    if ( gsNowDivID === ID_P_NEW_RESULT_FIRST )
    {
        var asPostMap = getPostMap( NEW_POST );
        if ( !asPostMap || asPostMap.length < 2 )
        {
            giUpdateState = STATE_UPDATING;
            addJS( gsGoogleCodeBaseURL + "ptt_data.js", false );
        }
    }
}

function postMapExisted()
{
    var asPostMap = getPostMap( NEW_POST );
    
    return asPostMap && asPostMap.length > 2 ? true : false;
}

function backToDefault()
{
    removeAllSetting();
    window.location.hash = "#" + ID_OPTION;
    window.location.reload();
}

function onClickBackToDefault()
{
    var sMessage = S_ARE_YOU_SURE[giLanguageIndex] + S_CLEAN_ALL_RECORDS[giLanguageIndex].toLowerCase() + QUESTION_MARK;
    
    showConfirmMessage( sMessage, backToDefault );
}

// ---------------------------------

/*
"9/1-9/5中午11:50-12:50、下午15:40-17:40<new>99/1~9</new>", 
"9/6(六)11:00:13:00<new>9/611001300</new>", 
"即日起至11/29日(每周排班、彈性排班)<new>11/29,</new>", 
"9/6.7大潤發平鎮 9/13.14.20.21家樂福經國<new>9/679/13142021</new>", 
"10/25 & 11/22 每次1小時<new>10/25,11/221</new>", 
"9/3 14:00~24:00 9/6 16:00~24:00<new>9/31</new>", 
"九月三號 下午一點", 
"2014/09/15 ~ 2014/10/10 共四周 每周1.5小時<new></new>", 
"9/1號＆2號<new>9/12</new>", 
*/