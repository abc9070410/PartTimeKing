
"use strict";

function setItem( key, value )
{
    if ( document.all && !window.localStorage )
        setCookie( key, value, 100 );
    else
        localStorage.setItem( key, value );
}

function getItem( key )
{
    if ( document.all && !window.localStorage )
        return getCookie( key );
    else
        return localStorage.getItem( key );
}


function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

function setTheme( theme )
{
    setItem( KEY_OPTION_STYLE, theme );
}

function getTheme()
{
    return getItem( KEY_OPTION_STYLE );
}

function getHeaderTheme()
{
    return getTheme();
}

function getFooterTheme()
{
    return getTheme();
}

function getContentTheme()
{
    return getTheme();
}

function removeAllSetting()
{
    // first three items are related to record and favourite
    for ( var i = 4; i < KEY_ALL_ARRAY.length; i ++ )
    {
        removeItem( KEY_ALL_ARRAY[i] );
    }
}

function removeItem( key )
{
    if ( document.all && !window.localStorage )
    {
        document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    else
    {
        localStorage.removeItem( key );
    }
}


function removeAllItem()
{
    if ( document.all && !window.localStorage )
    {
        for ( var i = 0; i < KEY_ALL_ARRAY.length; i ++ )
        {
            var key = KEY_ALL_ARRAY[i];
            document.cookie = key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
        showAlert( "all cookie are clear" );
    }
    else
    {
        localStorage.clear();
        showAlert( "all local storage are clear" );
    }
}




// 

function setSortByIndex( index )
{
    setItem( KEY_SORT_BY_INDEX, index );
}

function getSortByIndex()
{
    var value = getItem( KEY_SORT_BY_INDEX );

    return value == null ? 0 : parseInt( value, 10 );
}

function setStyeIndex( index )
{
    setItem( KEY_STYLE_INDEX, index );
}

function getStyleIndex()
{
    var value = getItem( KEY_STYLE_INDEX );
    
    var iDefaultIndex = 5; // IOS7 Style as default 
    if ( giPlatform == PLATFORM_DESKTOP )
        iDefaultIndex = 0; // Android Style
    else if ( giPlatform == PLATFORM_WP )
        iDefaultIndex = 6; // black berry 10 style

    return value == null ? iDefaultIndex : parseInt( value, 10 );
}

function setLanguageIndex( index )
{
    setItem( KEY_LANGUAGE_INDEX, index );
}

function getLanguageIndex()
{
    var value = getItem( KEY_LANGUAGE_INDEX );
    
    var index = gLocalLanguageIndex >= 0 ? gLocalLanguageIndex : 0;

    return value == null ? index : parseInt( value, 10 );
}

function setFontSizeIndex( index )
{
    setItem( KEY_FONT_SIZE_INDEX, index );
}

function getFontSizeIndex()
{
    var value = getItem( KEY_FONT_SIZE_INDEX );
    
    if ( value == null )
    {
        if ( giPlatform == PLATFORM_WP )
            return 5; // 150%
        else
            return 1; // default:110%
    }

    return parseInt( value, 10 );
}

function removeFontColor()
{
    removeItem( KEY_FONT_COLOR );
}

function setFontColor( sColor )
{
    setItem( KEY_FONT_COLOR, sColor );
}

function getFontColor()
{
    var value = getItem( KEY_FONT_COLOR );

    return value == null ? null : value;
}

function setBackgroundColor( sColor )
{
    setItem( KEY_BACKGROUND_COLOR, sColor );
}

function getBackgroundColor()
{
    var value = getItem( KEY_BACKGROUND_COLOR );

    return value == null ? null : value;
}

function deleteBackgroundImage()
{
    removeItem( KEY_BACKGROUND_IMAGE );
}

function setBackgroundImage( sBase64 )
{
    setItem( KEY_BACKGROUND_IMAGE, sBase64 );
}

function getBackgroundImage()
{
    var value = getItem( KEY_BACKGROUND_IMAGE );

    return value == null ? null : value;
}


// ------ part-time king -----------

function getPeriodIndex()
{
    var sPeriodIndex = getItem( KEY_PERIOD_INDEX );
    
    if ( sPeriodIndex )
        return parseInt( sPeriodIndex, 10 );
    else
        return 0;
}

function setPeriodIndex( iPeriodIndex )
{
    setItem( KEY_PERIOD_INDEX, "" + iPeriodIndex );
}

// ex. 1.0.1.0.0.0...
function getSelectedLocation()
{
    var sLocation = getItem( KEY_SELECTED_LOCATION );
    
    if ( sLocation )
    {
        return sLocation.split( LOCATION_DIVISION );
    }
    else
        return null;
}

function setSelectedLocation( asSelectedLocation )
{
    var sSelectedLocation = "";
    var iCount = asSelectedLocation ? asSelectedLocation.length : 0;

    for ( var i = 0; i < iCount; i ++ )
    {
        sSelectedLocation += asSelectedLocation[i];
    
        if ( i < iCount - 1 )
            sSelectedLocation += LOCATION_DIVISION;
    }
    
    if ( sSelectedLocation != "" )
        setItem( KEY_SELECTED_LOCATION, sSelectedLocation );
}

function getDateString()
{
    var value = getItem( KEY_DATE ); 

    return value ? value : null;    
}

function setDateString( sDate )
{
    //if ( sDate )
        setItem( KEY_DATE, sDate ); 
}

function getPostMapKey( iPostKind )
{
    if ( iPostKind == MARK_POST )
        return KEY_MARK_POST_MAP;
    else if ( iPostKind == REMOVE_POST )
        return KEY_REMOVE_POST_MAP;
    /*
    else if ( iPostKind == SEARCH_POST )
        return KEY_SEARCH_POST_MAP;
    else if ( iPostKind == NEW_POST )
        return KEY_NEW_POST_MAP;
    */
    else
        return KEY_POST_MAP;
    
    error( "getPostMapKey: " + iPostKind );
    
    return null;
}

function getPostMapString( iPostKind )
{        
    var value = getItem( getPostMapKey( iPostKind ) ); 

    return value ? value : null;    
}

function setPostMapString( iPostKind, sPostMap )
{
    setItem( getPostMapKey( iPostKind ), sPostMap );
}

function removePostMapString( iPostKind )
{
    removeItem( getPostMapKey( iPostKind ) );
}

function removePostMap( iPostKind )
{
    var asPostMap = getPostMap( iPostKind );
    var iCount = asPostMap ? asPostMap.length : 0;
    for ( var i = 0; i < iCount; i ++ )
    {
        removePTData( iPostKind, asPostMap[i] );
    }
    
    removePostMapString( iPostKind );
}

// ex. [0]=1407601986 , [1]=1407603267
function getPostMap( iPostKind )
{
    var sPostMap = getPostMapString( iPostKind );
    
    if ( sPostMap )
        return sPostMap.split( WHITE_SPACE );
        
    return null;
}

function getPostCount( iPostKind )
{
    var asPostMap = getPostMap( iPostKind );
    
    return asPostMap ? asPostMap.length : 0;
}

function getNewestPostIndexKey( iPostKind )
{
    if ( iPostKind === NEW_POST )
        return KEY_NEWEST_NEW_POST_INDEX;
    else if ( iPostKind === MARK_POST )
        return KEY_NEWEST_MARK_POST_INDEX;
    else if ( iPostKind === SEARCH_POST )
        return KEY_NEWEST_SEARCH_POST_INDEX;

    error( "getNewestPostIndexKey : " + iPostKind );
    
    return null;
}

function removeNewestPostIndex( iPostKind )
{        
    //alert( "remove " + iPostKind );
    removeItem( getNewestPostIndexKey( iPostKind ) );
}

function setNewestPostIndex( iPostKind, iPostIndex )
{       
    //alert( "save " + iPostKind + "." + iPostIndex );
        
    setItem( getNewestPostIndexKey( iPostKind ), "" + iPostIndex );
}

function getNewestPostIndex( iPostKind, iPostIndex )
{       
    var sPostIndex = getItem( getNewestPostIndexKey( iPostKind ) );
    
    //alert( "load " + iPostKind + "." + sPostIndex );
    
    return sPostIndex ? parseInt( sPostIndex, 10 ) : 0;
}



function setPostMap( iPostKind, asPostMap )
{
    var sPostMap = "";
    var iCount = asPostMap ? asPostMap.length : 0;
    
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( !asPostMap[i] || asPostMap[i] == "" )
            continue;
            
        sPostMap += asPostMap[i];
        
        if ( i < iCount - 1 )
        {
            sPostMap += WHITE_SPACE;
        }
    }
    
    setPostMapString( iPostKind, sPostMap );
}

function getPostKey( iPostKind, sPostID )
{
    if ( iPostKind === MARK_POST )
        return "KEY_MARK_POST_" + sPostID + "_";
    /*
    else if ( iPostKind === SEARCH_POST )
        return "KEY_SEARCH_POST_" + sPostID + "_";
    else if ( iPostKind === NEW_POST )
        return "KEY_NEW_POST_" + sPostID + "_";
    */
    else
        return "KEY_POST_" + sPostID + "_";

    error( "getPostKey: " + iPostKind );
    
    return null;
}

function getPostDetail( iPostKind, sPostID )
{
    var value = getItem( getPostKey( iPostKind, sPostID ) );

    return value ? value : null;   
}

function setPostDetail( iPostKind, sPostID, sPostDetail )
{
    setItem( getPostKey( iPostKind, sPostID ), sPostDetail );
}

function getCurrentPTData()
{
    return getPTData( giPostKind, getCurrentPostIndex() );
}

// return aasPTData
function getPTData( iPostKind, iPostIndex )
{
    var asPostMap = getPostMap( iPostKind );
    var sPostID = asPostMap ? asPostMap[iPostIndex] : "";
    
    //alert( "" + iPostKind + ":" + sPostID );

    var sPostDetail = getPostDetail( iPostKind, sPostID );
    
    return sPostDetail ? getSinglePTDataByString( sPostDetail ) : null;
}

function setPTData( iPostKind, sPostID, aasPTData )
{
    var sPostDetail = getSinglePTDataString( aasPTData );
    
    setPostDetail( iPostKind, sPostID, sPostDetail );
}

function removePTData( iPostKind, sPostID )
{
    removeItem( getPostKey( iPostKind, sPostID ) );
}

function getSinglePTDataString( aasPTData )
{
    var sPostDetail = "";
    
    for ( var i = 0; i < aasPTData.length; i ++ )
    {
        if ( i > 0 )
        {
            sPostDetail += DIVISION_WORD_2;
        }
        
        for ( var j = 0; j < aasPTData[i].length; j ++ )
        {
            if ( j > 0 )
            {
                sPostDetail += DIVISION_WORD;
            }
            
            sPostDetail += aasPTData[i][j];
        }
    }

    return sPostDetail;
}


function getSinglePTDataByString( sPostDetail )
{
    var aasPTData = new Array();
    var asData1 = sPostDetail.split( DIVISION_WORD_2 );
    for ( var i = 0; i < asData1.length; i ++ )
    {
        var asPTData = asData1[i].split( DIVISION_WORD );
        aasPTData[i] = asPTData;
    }
     
    return aasPTData;
}

function setPostCountPerPageIndex( index )
{
    setItem( KEY_POST_COUNT_PER_PAGE_INDEX, "" + index );
}

// ex. if 2 , there exists iPostCountPerPage * 3 posts in the list page
function getPostCountPerPageIndex() 
{
    var value = getItem( KEY_POST_COUNT_PER_PAGE_INDEX );
    
    return value ? parseInt( value ) : 0;
}

function getPostCountPerPage()
{
    var iPostCountPerPageIndex = getPostCountPerPageIndex();
    
    return ( iPostCountPerPageIndex + 1 ) * 10;
}   

function error( sMessage )
{
    alert( "ERROR " + sMessage );
}