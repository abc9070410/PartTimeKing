
"use strict";

//
// variable prefix :
//
// e: Element
// i: integer
// f: float
// s: string
// b: boolean
// a: array
// g: global
//

function setDocumentTitle( sTitle )
{
    //$.ui.setTitle( sTitle );
    document.title = sTitle;
}

function addDiv( sDivID, sHTML, sTitle )
{
    $.ui.addContentDiv( "#" + sDivID, sDivHTML, sTitle );
}

function updateDiv( sDivID, sDivHTML )
{
    if ( $.os.desktop )
    {
        document.getElementById( sDivID ).innerHTML = sDivHTML;
    }
    else
    {
        //$.ui.showMask("Wait");
        $.ui.updateContentDiv( "#" + sDivID, sDivHTML );
        //$.ui.hideMask();
    }
    
    showInneractiveAD( sDivID );
}

function setDivTitle( eDiv, sTitle )
{
    eDiv.setAttribute( "title", sTitle );
}

function clearHistory()
{
    $.ui.clearHistory(); // not allow user go back
}

// ex. search ( without '#' )
function updateHash( sHash )
{
    $.ui.updateHash( sHash );
}

function isListID( sDivID )
{
    return false;
}

function getItemIndex( sDivID )
{
    return parseInt( sDivID.substring( ID_ITEM.length, sDivID.length ), 10 );
}

function changeHash( sPageID )
{
    //var eContent = document.getElementById( ID_CONTENT );

    //confirm( "XX" );
    
    gsNowDivID = sPageID;

    //console.log( "changeHash: " + sPageID );

    var eDiv = document.getElementById( sPageID );
    var iClickItemIndex = getItemIndex( gsLastItemDivID );
    
    // disable the sort option
    if ( isListID( gsLastDivID ) && !isListID( sPageID ) && sPageID.indexOf( ID_ITEM ) != 0 )
    {
        //if ( navSupported() )
        {
            updateDiv( ID_HEADER, getHTMLOfHeaderDiv() );
            updateDiv( ID_NAV, getHTMLOfNavDiv() );
        }

        //updateDiv( ID_NAV, getHTMLOfNavbarsDiv() );
        gMergeListsList = null; // clean the result

        console.log( "set nav & header to back to normal" );
    }
    
    updateDiv( ID_HEADER, getHTMLOfHeaderDiv() );
    updateDiv( ID_NAV, getHTMLOfNavDiv() );
    //updateDiv( ID_NAVBAR, getHTMLOfNavbarDiv() );
    
    
    if ( !isMarkListPageID( sPageID ) )
    {
        gbCheckBoxShowed = false;
    }
    
    
    gbFooterShowed = true; // default enable the footer if page is changed
    gbHeaderShowed = true; // default enable the footer if page is changed
    bindScrollEvent( sPageID ); // disable the footer while scroll down
    
    if ( sPageID.indexOf( ID_ITEM ) === 0 )
    {
        giItemStack++;

        var iClickIndex = getItemIndex( sPageID );
        
        // ---------part-time king----------
        
        // ---------------------------------
        if ( gsLastDivID === ID_LANGUAGE )
        {
            setLanguageIndex( iClickIndex );
            window.location.hash = "#" + ID_LANGUAGE;
            window.location.reload(); // update the theme
        }
        else if ( gsLastDivID === ID_FONT_SIZE )
        {
            setFontSizeIndex( iClickIndex );
            giFontSizeSelectedIndex = iClickIndex;
            giFontRatio = 100 + giFontSizeSelectedIndex * 10;

            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_FONT_COLOR )
        {
            gsFontColor = gasTempColor[iClickIndex];
            setFontColor( gsFontColor );
            showFontColor( gsFontColor );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_BACKGROUND_COLOR )
        {
            gsBackgroundColor = gasTempColor[iClickIndex];
            setBackgroundColor( gsBackgroundColor );
            showBackgroundColor( gsBackgroundColor );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }
        else if ( gsLastDivID === ID_BACKGROUND_IMAGE )
        {
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }



        else if ( gsLastDivID === ID_RELATED_LINKS )
        {
            var url = getRelatedUrlByIndex( iClickIndex );

            // _self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            // _blank: Opens in the InAppBrowser.
            // _system: Opens in the system's web browser.
            window.open( url, "_system", "location=yes" );
            updateDiv( sPageID, getHTMLOfDoneDiv() );
        }

        gsLastItemDivID = sPageID; // remember the last item div ID
        giLastPageSytle = ITEM_PAGE;
    }
    else
    {
        giItemStack = 0;

        // -----------------------

        if ( sPageID === ID_MENU )
        {
           updateDiv( sPageID, getHTMLOfNavDiv() );
        }
        else if ( sPageID === ID_OPTION )
        {
            //clearHistory();
            updateDiv( sPageID, getHTMLOfOptionDiv() );
        }
        else if ( sPageID === ID_Q_AND_A )
        {
            updateDiv( sPageID, getHTMLOfQAndADiv() );
        }
        else if ( sPageID === ID_DATE )
        {
            updateDiv( sPageID, getHTMLOfDateDiv() );
        }

        else if ( sPageID === ID_STYLE )
        {
            updateDiv( ID_STYLE, getHTMLOfStyleDiv() );
        }
        else if ( sPageID === ID_LANGUAGE )
        {
            updateDiv( ID_LANGUAGE, getHTMLOfCommonSettingDiv( S_LANGUAGE_ARRAY, getSelectArrayByID( ID_LANGUAGE ) ) );
        }
        else if ( sPageID === ID_FONT_SIZE )
        {
            updateDiv( ID_FONT_SIZE, getHTMLOfFontSizeDiv() );
        }
        else if ( sPageID === ID_FONT_COLOR )
        {
            updateDiv( sPageID, getHTMLOfColorDiv() );
        }
        else if ( sPageID === ID_BACKGROUND_COLOR )
        {
            updateDiv( sPageID, getHTMLOfColorDiv() );
        }
        else if ( sPageID === ID_BACKGROUND_IMAGE )
        {
            updateDiv( sPageID, getHTMLOfLoadImageDiv() );
        }
        // --------part-time king---------
        else if ( sPageID === ID_P_POST_COUNT_PER_PAGE )
        {
            updateDiv( sPageID, getHTMLOfPostCountPerPageDiv() );
        }
        else if ( sPageID === ID_P_SEARCH )
        {
            //mergeData();
            updateDiv( sPageID, getHTMLOfSearchDiv() );
        }
        else if ( isPostDivID( sPageID ) )
        {
            updateDiv( sPageID, getHTMLOfPostDiv() );
        }
        else if ( sPageID === ID_P_LOCATION )
        {
            updateDiv( sPageID, getHTMLOfLocationDiv() );
        }        
        else if ( sPageID === ID_P_PERIOD )
        {
            updateDiv( sPageID, getHTMLOfPeriodDiv() );
        }
        else if ( sPageID === ID_P_DATE )
        {
            updateDiv( sPageID, getHTMLOfDateDiv() );
        }
        else if ( isListNowID( sPageID ) )
        {
            giPostKind = getPostKindByListPage( sPageID );
            //sortPostMap();
            updateDiv( sPageID, getHTMLOfListDiv() );
        }
        else if ( isListPrevID( sPageID ) )
        {
            giPrevPostKind = giPostKind;
        
            if ( isMarkListPageID( sPageID ) )
            {
                giPostKind = MARK_POST;
                decreaseCurrentListPage();
            }
            else if ( isSearchListPageID( sPageID ) )
            {
                giPostKind = SEARCH_POST;
                decreaseCurrentListPage();
            }
            else if ( isNewListPageID( sPageID ) )
            {
                giPostKind = NEW_POST;
                decreaseCurrentListPage();
                //alert( "PREV: " + sPageID );
            }
            else
            {
                error( "isListPrevID:" + sPageID );
            }
            
            if ( giPostKind != giPrevPostKind )
            {
                resetAllListPage();
            }
            
            setListCurrentID( sPageID );
            
            updateDiv( sPageID, getHTMLOfListDiv() );
        }
        else if ( isListNextID( sPageID ) )
        {
            if ( isMarkListPageID( sPageID ) )
            {
                giPostKind = MARK_POST;
                increaseCurrentListPage();
                //alert( "NEXT MARK: " + sPageID );
            }
            else if ( isSearchListPageID( sPageID ) )
            {
                giPostKind = SEARCH_POST;
                increaseCurrentListPage();
                //alert( "NEXT SEARCH: " + sPageID );
            }
            else if ( isNewListPageID( sPageID ) )
            {
                giPostKind = NEW_POST;     
                increaseCurrentListPage();
                //alert( "NEXT: " + sPageID );
            }
            else
            {
                error( "isListNextID: " + sPageID );
            }
            
            setListCurrentID( sPageID );
            
            updateDiv( sPageID, getHTMLOfListDiv() );
        }
        
        // -------------------------------
        

        else if ( sPageID === ID_ABOUT_AUTHOR )
        {
            updateDiv( sPageID, getHTMLOfAuthorDiv() );
        }
        else if ( sPageID === ID_ABOUT_APP )
        {
            updateDiv( sPageID, getHTMLOfAppDiv() );
        }
        else if ( sPageID === ID_RELATED_LINKS )
        {
            updateDiv( ID_RELATED_LINKS, getHTMLOfCommonDiv( S_RELATED_LINKS_ARRAY, "icon info", 0 ) ); // getHTMLOfRelatedLinks
        }
        else if ( sPageID === ID_DELETE_BACKGROUND_IMAGE )
        {
            var ok = window.confirm( S_ARE_YOU_SURE[giLanguageIndex] + S_DELETE_BACKGROUND_IMAGE[giLanguageIndex].toLowerCase() + QUESTION_MARK );

            if ( ok )
            {
                deleteBackgroundImage();

                window.location.hash = "#" + ID_BACKGROUND_IMAGE;
                window.location.reload();
            }
        }

        gsLastDivID = sPageID; // only record the non-item or non-result        
        giLastPageSytle = NORMAL_PAGE;
    }
}

function blockUI()
{
    $.ui.blockUI(0.3);

    setTimeout(function(){
        $.ui.unblockUI()
    },3000);
}


function initUI()
{
    var string = "";

    // header
    string += "<div id='" + ID_HEADER + "'>";
    string += getHTMLOfHeaderDiv();
    string += "</div>";

    // content
    string += "<div id='" + ID_CONTENT + "'>";

    // -----GWAI-----------------
    string += getEmptyDiv( ID_SCORE, S_FINAL_SCORE[giLanguageIndex] );
    string += getEmptyDiv( ID_QUESTION, S_WHO_AM_I[giLanguageIndex] );
    string += getEmptyDiv( ID_QUESTION_2, S_WHO_AM_I[giLanguageIndex] );
    for ( var i = 0; i < ID_SELECTION_ARRAY.length; i ++ )
    {
        string += getEmptyDiv( ID_SELECTION_ARRAY[i], S_APP_NAME[giLanguageIndex] );
    }
    string += getEmptyDiv( ID_INTRODUCTION, S_APP_NAME[giLanguageIndex] );

    for ( var i = 0; i < ID_CONTENT_ARRAY.length; i ++ )
    {
        string += getEmptyDiv( ID_CONTENT_ARRAY[i], S_APP_NAME[giLanguageIndex] );
    }

    string += getEmptyDiv( ID_LINK_WIKI, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_LINK_CC, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_MENU, S_MENU[giLanguageIndex] );

    // -------------------------

    string += getEmptyDiv( ID_OPTION, S_OPTION[giLanguageIndex] );
    string += getEmptyDiv( ID_Q_AND_A, S_Q_AND_A[giLanguageIndex] );



    string += getEmptyDiv( ID_STYLE, S_STYLE[giLanguageIndex] );
    string += getEmptyDiv( ID_LANGUAGE, S_LANGUAGE[giLanguageIndex] );
    string += getEmptyDiv( ID_FONT_SIZE, S_FONT_SIZE[giLanguageIndex] );
    string += getEmptyDiv( ID_FONT_COLOR, S_FONT_COLOR[giLanguageIndex] );

    string += getEmptyDiv( ID_UPDATE, S_UPDATE[giLanguageIndex] );
    string += getEmptyDiv( ID_DISPLAY, S_DISPLAY[giLanguageIndex] );

    string += getEmptyDiv( ID_RECOVERY, S_RECOVERY[giLanguageIndex] );

    string += getEmptyDiv( ID_ABOUT_APP, S_ABOUT_APP[giLanguageIndex] );
    string += getEmptyDiv( ID_ABOUT_AUTHOR, S_ABOUT_AUTHOR[giLanguageIndex] );
    string += getEmptyDiv( ID_EMAIL_TO_AUTHOR, S_ABOUT_AUTHOR[giLanguageIndex] );
    string += getEmptyDiv( ID_RELATED_LINKS, S_RELATED_LINKS[giLanguageIndex] );

    string += getEmptyDiv( ID_SETTING_DONE, S_SETTING_DONE[giLanguageIndex] );

    string += getEmptyDiv( ID_DELETE_BACKGROUND_IMAGE, S_DELETE_BACKGROUND_IMAGE[giLanguageIndex] );

    // part-time king
    string += getEmptyDiv( ID_P_LOCATION, S_REGION[giLanguageIndex] );
    string += getEmptyDiv( ID_P_DATE, S_CHOOSE_DATE[giLanguageIndex] );
    string += getEmptyDiv( ID_P_CATEGORY, S_CHOOSE_CATEGORY[giLanguageIndex] );
    string += getEmptyDiv( ID_P_PERIOD, S_CHOOSE_PERIOD[giLanguageIndex] );
    string += getEmptyDiv( ID_P_CONTENT_1, S_CONTENT[giLanguageIndex] );
    string += getEmptyDiv( ID_P_CONTENT_2, S_CONTENT[giLanguageIndex] );
    string += getEmptyDiv( ID_P_CONTENT_3, S_CONTENT[giLanguageIndex] );
    string += getEmptyDiv( ID_P_SEARCH, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_POST_NOW, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_POST_NEXT, S_APP_NAME[giLanguageIndex] );

    string += getEmptyDiv( ID_P_NEW_RESULT_1, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_NEW_RESULT_2, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_NEW_RESULT_3, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_MARK_RESULT_1, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_MARK_RESULT_2, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_MARK_RESULT_3, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_SEARCH_RESULT_1, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_SEARCH_RESULT_2, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_SEARCH_RESULT_3, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_POST_COUNT_PER_PAGE, S_APP_NAME[giLanguageIndex] );
    string += getEmptyDiv( ID_P_MARK, S_MARK[giLanguageIndex] );
    
    // --------------
    

    for ( var i = 0; i < 100; i ++ )
    {
        string += getEmptyDiv( ID_ITEM + i, S_APP_NAME[giLanguageIndex] );
    }
  
    if ( !postMapExisted() )
    {
        updateData();
    }
    sortPostMap();

    // first page
    // exist scroll problem if we use ID_P_NEW_RESULT_1,2,3 on first page 
    string += getPrefixDiv( ID_P_NEW_RESULT_FIRST, "" );
    string += getHTMLOfListDiv();
    string += "</div>";
    string += "</div>";

    // navbar (footer)
    string += "<div id='" + ID_NAVBAR + "'>";
    string += getHTMLOfNavbarDiv();
    string += "</div>";

    // left side nav menu
    string += "<nav id='" + ID_NAV + "'>";
    string += getHTMLOfNavDiv();
    string += "</nav>";
    
    setStyle();

    //eAfui.innerHTML = string;
    updateDiv( "afui", string );
}

// ex. <ul><li ><a class='button next icon home' href='#main'>Home</a></li></ul>
function getHTMLOfListItem( sClass, sHashTag, sText )
{
    return "<ul class='list' style='font-size:" + giFontRatio + "%' ><li><a class='" + sClass + "' href='#" + sHashTag + "' data-transition='" + gsTransition + "' >" + sText + "</a></li></ul>";
}

function getHTMLOfListItemWithTitle( sClass, sHashTag, sText, sTitle )
{
    if ( !sText )
        return "";
    
    return "<ul class='list' style='font-size:" + giFontRatio + "%' ><strong style='font-size:" + Math.floor( giFontRatio * 3 / 6 )  + "%'>" + sTitle + "</strong><li><a class='" + sClass + "' href='#" + sHashTag + "' data-transition='" + gsTransition + "' >" + sText + "</a></li></ul>";
}

function getHTMLOfListClickItem( sClass, sOnClick, sText )
{
    return "<ul class='list' style='font-size:" + giFontRatio + "%' ><li><a class='" + sClass + "' onclick='" + sOnClick + "' data-transition='" + gsTransition + "' >" + sText + "</a></li></ul>";
}

function getHTMLOfListLinkItem( sClass, sHref, sText )
{
    return "<ul class='list' style='font-size:" + giFontRatio + "%' ><li><a class='" + sClass + "' href='" + sHref + "' data-transition='" + gsTransition + "' >" + sText + "</a></li></ul>";
}

function getHTMLOfListLinkItemWithTitle( sClass, sHref, sText, sTitle )
{
    if ( !sText )
        return "";

    return "<ul class='list' style='font-size:" + giFontRatio + "%' ><li><strong style='font-size:" + Math.floor( giFontRatio * 3 / 6 )  + "%'>" + sTitle + "</strong><a class='" + sClass + "' href='" + sHref + "' data-transition='" + gsTransition + "' >" + sText + "</a></li></ul>";
}

function getHTMLOfListItemWithColor( sClass, sHashTag, sColor )
{
    return "<ul class='list' style='color:" + sColor + "; font-size:" + giFontRatio + "%'><li><a class='" + sClass + "' href='#" + sHashTag + "'><strong>" + " " + sColor + "</strong></a></li></ul>";
}

// list item without link
function getHTMLOfListText( sClass, sText )
{
    return "<ul class='list'><li><p class='" + sClass + "' style='font-size:" + giFontRatio + "%'>" + sText + "</p></li></ul>";
}

function getHTMLOfListTextWithTitle( sClass, sText, sTitle )
{
    if ( !sText )
    {
        return "";
    }
    
    return "<ul class='list'><li><strong style='font-size:" + Math.floor( giFontRatio * 3 / 6 )  + "%'>" + sTitle + "</strong><p class='" + sClass + "' style='font-size:" + giFontRatio + "%'>" + sText + "</p></li></ul>";
}


function getHTMLOfListTextWithSameLine( sClass, sLeftText, sRightText )
{
    return "<h3><strong><ul class='list'><li><p class='" + sClass + "' style='text-align:left;font-size:" + ( giFontRatio * 3 / 4 ) + "%'>" + sLeftText + "<span style='float:right;'>" + sRightText + "</span></p></li></ul></strong></h3>";
}

// ex. <div title='Title' id='search' class='panel' selected='true' style='word-wrap:break-word;'>
function getPrefixDiv( sID, sTitle )
{
    return "<div title='" + sTitle + "' id='" + sID + "' class='panel' selected='false' style='word-wrap:break-word;'>";
}

// ex. <div id='search'></div>
function getEmptyDiv( sID, sTitle )
{
    return getPrefixDiv( sID, sTitle ) + "</div>";
    //return "<div id='empty_" + sID + "'><div id='" + sID + "'></div></div>";
}

function getHTMLOfHeaderDiv()
{
    var string = "";

    if ( needConfirmHeader( gsNowDivID ) || 
         ( gsLastDivID === ID_P_LOCATION && 
           gsNowDivID !== ID_P_SEARCH && 
           gsNowDivID !== ID_P_NEW ) )
    {
        var sNextPageID = ID_P_SEARCH;
        
        if ( isPageAboutOtpion( gsNowDivID ) )
        {
            sNextPageID = ID_OPTION;
        }
        
        string += "<a href='#" + sNextPageID + "' class='button icon stack'  style='float:right'>" + S_CONFIRM[giLanguageIndex] + "</a>";
    }
    else if ( navSupported() )
    {   
        if ( gsNowDivID )
        {
            string += "<a href='javascript:clickGoBack()' class='button icon upload' style='float:left'>" + S_BACK[giLanguageIndex] + "</a>";
        }
        
        string += "<a href='javascript:toggleNormalSideMenu( true )' class='button icon folder' style='float:right'>" + S_MENU[giLanguageIndex] + "</a>";

        if ( isListPageID( gsNowDivID ) )
        {   
            string += "<a href='javascript:toggleSortSideMenu( true )' class='button icon graph' style='float:right'>" + S_SORT_BY[giLanguageIndex] + "</a>";
        }
        
        if ( isNewListPageID( gsNowDivID ) )
        {
            string += "<a href='javascript:updateData();' class='button icon refresh' style='float:right'>" + S_UPDATE[giLanguageIndex] + "</a>";
        }
        
        if ( isMarkListPageID( gsNowDivID ) )
        {
            if ( gbCheckBoxShowed )
            {
                string += "<a href='javascript:onClinkBatchUnmarkPost();' class='button icon trash' style='float:right'>" + S_REMOVE[giLanguageIndex] + "</a>";
            }
            else
            {
                string += "<a href='javascript:onClinkBatchUnmarkPost();' class='button icon add' style='float:right'>" + S_BATCH[giLanguageIndex] + "</a>";
            }
        }
    }
    else
    {
        string += "<a href='#" + ID_MENU + "' class='button icon stack' style='float:right' data-transition='up'>" + S_MENU[giLanguageIndex] + "</a>";
    }

    return string;
}


// should enable Navbar (footer menu) if the platorm does not support Nav
function navSupported()
{
    return true;

    var sStyle = S_STYLE_ARRAY[getStyleIndex()].toString();
    
    // not support nav for Win UI Style or WP7/8 platform 
    return ( sStyle != S_WINDOWS_8.toString() && 
             sStyle != S_WINDOWS_8_LIGHT.toString() &&
             giPlatform != PLATFORM_WP &&
             giPlatform != PLATFORM_FIREFOXOS );
}

function toggleNormalSideMenu( bReflash )
{
    if ( bReflash && navSupported() )
    {
        updateDiv( ID_NAV, getHTMLOfNavDiv() );
    }

    $.ui.toggleSideMenu();
}

function toggleSortSideMenu( bReflash )
{
    if ( bReflash && navSupported() )
    {
        updateDiv( ID_NAV, getHTMLOfNavSortDiv() );
    }

    $.ui.toggleSideMenu();
}

function getHTMLOfLinkItem( sClass, sHashTag, sText )
{
    return "<a href='#" + sHashTag+ "' id='" + sHashTag + "_id' class='" + sClass + "'>" + sText + "</a>";
}

function getHTMLOfLinkItemWithUpdateNumber( sClass, sHashTag, sText, iUpdateNumber )
{
    return "<a href='#" + sHashTag+ "' id='" + sHashTag + "_id' class='" + sClass + "'><span class='af-badge' id='BADGE_" + ID_P_NEW + "'></span>" + sText + "</a>";
}

// for those platforms which do not support Nav
function getHTMLOfLinkItemInHeader( sClass, sHashTag, sText )
{
    return "<a href='#" + sHashTag+ "' id='" + sHashTag + "_id' class='" + sClass + "' style='float:right'>" + sText + "</a>";
}

// for footer menu
function getHTMLOfNavbarDiv()
{
    var string = "";
    
    if ( gbFooterShowed )
    {
        if ( giUpdateNumber > 0 )
            string += getHTMLOfLinkItemWithUpdateNumber( "icon new mini", getListPrevID( NEW_POST ), S_NEWEST[giLanguageIndex], giUpdateNumber );
        else
            string += getHTMLOfLinkItem( "icon new mini", getListPrevID( NEW_POST ), S_NEWEST[giLanguageIndex] );
            
        string += getHTMLOfLinkItem( "icon magnifier mini", ID_P_SEARCH, S_SEARCH[giLanguageIndex] );
        string += getHTMLOfLinkItem( "icon heart mini", getListPrevID( MARK_POST ), S_MARK[giLanguageIndex] );
        string += getHTMLOfLinkItem( "icon settings mini", ID_OPTION, S_OPTION[giLanguageIndex] );
    }
    
    return string;
}

function getHTMLOfNavDiv()
{
    var string = "";

    string += getHTMLOfListItem( "icon new mini", getListPrevID( NEW_POST ), S_NEWEST[giLanguageIndex] );
    string += getHTMLOfListItem( "icon magnifier mini", ID_P_SEARCH, S_SEARCH[giLanguageIndex] );
    string += getHTMLOfListItem( "icon heart mini", getListPrevID( MARK_POST ), S_MARK[giLanguageIndex] );
    string += getHTMLOfListItem( "icon settings mini", ID_OPTION, S_OPTION[giLanguageIndex] );
    
    if ( isMarkListPageID( gsNowDivID ) )
    {
        string += getHTMLOfListLinkItem( "icon trash mini", "javascript:showCheckBoxOnList();", S_BATCH[giLanguageIndex] );
    }
    
    if ( !navSupported() )
    {
        string += getHTMLOfListItem( "icon refresh mini", gsLastDivID, S_BACK[giLanguageIndex] );
    }
    
    return string;
}

function getHTMLOfNavSortDiv()
{
    var string = "";

    for ( var i = 0; i < S_SORT_ARRAY.length; i ++ )
    {
        var sIcon = i == getSortByIndex() ? "icon check" : "icon target";
        string += getHTMLOfListLinkItem( sIcon, "javascript:sortPostList(" + i + ");", S_SORT_ARRAY[i][giLanguageIndex] );
    }

    return string;
}

// ----------------------







// -------------------------





function getHTMLOfQAndADiv()
{
    var string = "";

    for ( var i = 0; i < S_QUESTION_ARRAY.length; i ++ )
    {
        string += "<p></p>";
        string += getHTMLOfListText( "icon question", S_QUESTION_ARRAY[i][giLanguageIndex] );
        string += "<p></p>";
        string += getHTMLOfListText( "icon lamp", S_ANSWER_ARRAY[i][giLanguageIndex] );
        string += "<p></p>";
        //string += "<p></p>";
    }


    return string;
}

// ex. <div title='Welcome' id="main" class="panel" selected="true">This is a basic skeleton UI sample</div>
function getHTMLOfOptionDiv()
{
    var string = "";
    
    setBadge( ID_P_NEW, giUpdateNumber++ );

    // display
    string += getHTMLOfListText( "icon tag", S_DISPLAY[giLanguageIndex] );
    string += "<p></p>";
    string += getHTMLOfListItem( "icon settings", ID_STYLE, S_STYLE[giLanguageIndex] );
    //string += getHTMLOfListItem( "icon settings", ID_LANGUAGE, S_LANGUAGE[giLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_FONT_SIZE, S_FONT_SIZE[giLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_P_POST_COUNT_PER_PAGE, S_POST_COUNT_PER_PAGE[giLanguageIndex] );


    if ( giPlatform == PLATFORM_DESKTOP )
    {
        string += getHTMLOfListItem( "icon settings", ID_FONT_COLOR, S_FONT_COLOR[giLanguageIndex] );
        //string += getHTMLOfListItem( "icon settings", ID_BACKGROUND_COLOR, S_BACKGROUND_COLOR[giLanguageIndex] );
        string += getHTMLOfListItem( "icon settings", ID_BACKGROUND_IMAGE, S_BACKGROUND_IMAGE[giLanguageIndex] );
    }

    string += "<br>";

    //if ( giPlatform != PLATFORM_WP )
    {
        // recovery
        string += getHTMLOfListText( "icon tag", S_RECOVERY[giLanguageIndex] );
        string += "<p></p>";
        string += getHTMLOfListLinkItem( "icon settings", "javascript:onClickBackToDefault();", S_BACK_TO_DEFAULT_SETTING[giLanguageIndex] );
        string += "<br>";
    }
    
   
    if ( giPlatform == PLATFORM_DESKTOP )
    {
        // about
        string += getHTMLOfListText( "icon tag", S_ABOUT[giLanguageIndex] );
        string += "<p></p>";
        string += getHTMLOfListItem( "icon info", ID_ABOUT_APP, S_ABOUT_APP[giLanguageIndex] );
    
        string += getHTMLOfListItem( "icon info", ID_ABOUT_AUTHOR, S_ABOUT_AUTHOR[giLanguageIndex] );
        string += getHTMLOfListItem( "icon info", ID_RELATED_LINKS, S_RELATED_LINKS[giLanguageIndex] );
        string += "<br>";
    }

    return string;
}

function getHTMLOfDoneDiv()
{
    var string = "";

    string += getHTMLOfListText( "icon tag", S_SETTING_DONE[giLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", gsLastDivID, S_BACK[giLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_OPTION, S_GO_BACK_TO[giLanguageIndex] + S_OPTION[giLanguageIndex] );
    string += getHTMLOfListItem( "icon key", ID_MAIN, S_GO_BACK_TO[giLanguageIndex] + S_MAIN[giLanguageIndex] );

    return string;
}


// ex. current month is 9 and index=2 -> 2014.11
function getYearAndMonth( index )
{
    var date = new Date();
    var iYear = date.getFullYear();
    var iMonth = date.getMonth() + 1;
    var iTargetMonth = iMonth;
    
    for ( var i = iMonth; i < iMonth + index; i ++ )
    {
        if ( iTargetMonth == 12 )
        {
            iTargetMonth = 1;
            iYear++;
        }
        else
        {
            iTargetMonth++;
        }
    }
    
    return "" + iYear + DATE_DIVISION + iTargetMonth;
}



function getHTMLOfDateDiv()
{
    var string = "";

    var date = new Date();
    
    for ( var i = 0; i < 13; i ++ )
    {
        if ( i === 0 )
        {
            string += getHTMLOfListLinkItem( "icon calendar", "javascript:clickDate(" + i + ");", S_NOT_LIMIT[giLanguageIndex] );
        }
        else
        {
            var asTempText = getYearAndMonth( i - 1 ).split( DATE_DIVISION );
            var sYear = asTempText[0];
            var sMonth = asTempText[1];
            var text = sYear + S_YEAR[giLanguageIndex] + " " + sMonth + S_MONTH[giLanguageIndex];
            
            string += getHTMLOfListLinkItem( "icon calendar", "javascript:clickDate(" + i + ");", text );
        }
    }
    
    
    return string;
}

function getHTMLOfSameLine( sLeftText, sRightText )
{
    return "<strong><p style='text-align:left;font-size:" + ( giFontRatio * 3 / 4 ) + "%'>" + sLeftText + "<span style='float:right;'>" + sRightText + "</span></p></strong>";
}

function getHTMLOfLoadImageDiv()
{
    var string = "";

    string += "<br><br><input type='file' onchange='loadImageFile( this )'></input>";

    string += "<br>";

    for ( var i = 0; i < gasImageInfo.length; i ++ )
    {
        string += getHTMLOfListText( "icon info", gasImageInfo[i] );
    }

    string += "<br>";

    string += getHTMLOfListItem( "icon settings", ID_DELETE_BACKGROUND_IMAGE, S_DELETE_BACKGROUND_IMAGE[giLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_OPTION, S_GO_BACK_TO[giLanguageIndex] + S_OPTION[giLanguageIndex] );
    string += getHTMLOfListItem( "icon key", ID_MAIN, S_GO_BACK_TO[giLanguageIndex] + S_MAIN[giLanguageIndex] );

    return string;
}

function getHTMLOfColorDiv()
{
    var sColor = "";
    var string = "";

    for ( var i = 0; i < 20; i ++ )
    {
        if ( i == 0 )
            sColor = "#000000"; // black
        else if ( i == 1 )
            sColor = "#FFFFFF"; // white
        else
            sColor = getRandomColor();

        gasTempColor[i] = sColor;
        string += getHTMLOfListItemWithColor( "icon settings", ID_ITEM + i, gasTempColor[i] );
    }
    return string;
}

function getHTMLOfAppDiv()
{
    var string = "";

    string += "<br>";


    var sInfo = "<br><ul>";

    for ( var i = 0; i < S_APP_INFO_ARRAY.length; i ++ )
    {
        sInfo += "<li><p style='font-size:" + giFontRatio + "%'>" + S_APP_INFO_ARRAY[i][giLanguageIndex] + "</p></li>";
    }

    sInfo += "</ul><br>";

    string += getHTMLOfListText( "", sInfo );

    return string;
}

function getHTMLOfAuthorDiv()
{
    var string = "";

    string += "<br>";

    /*
    var sInfo = "<br><ul>";
    for ( var i = 0; i < S_AUTHOR_INFO_ARRAY.length; i ++ )
    {
        sInfo += "<li><p style='font-size:" + giFontRatio + "%'>" + S_AUTHOR_INFO_ARRAY[i][giLanguageIndex] + "</p></li>";
    }

    sInfo += "</ul><br>";

    string += getHTMLOfListText( "", sInfo );
    */
    string += getHTMLOfListLinkItemWithTitle( "icon mail", "javascript:goEmailOfAuthor();", gsEmailOfAuthor, S_EMAIL_TO_AUTHOR[giLanguageIndex] );

    return string;
}



function getHTMLOfRelatedLinkDiv()
{
    var string = "";
    var iCount = S_RELATED_LINKS_ARRAY.length;
    var abSelected = getSelectArrayByID( ID_STYLE );
    
    var string = "";

    for ( var i = 0; i < iCount; i ++ )
    {
        var sIcon = abSelected[i] ? "icon check" : "icon target";
        string += getHTMLOfListLinkItem( sIcon, "javascript:clickStyle(" + i + ");", S_RELATED_LINKS_ARRAY[i][giLanguageIndex] );
    }
    
    return string;
}



// ex. markIndexs = { 2, 4 } -> items[2] & items[4] will be marked
function getHTMLOfTable( theads, items, markIndexs )
{
    var string = "";

    string += "<table width='100%' border='1' cellspacing='0' cellpadding='0' style='text-align:center;font-size:" + giFontRatio + "%;'><tbody>";

    string += "<thead><tr>";
    for ( var i = 0; i < theads.length; i ++ )
    {
        string+= "<th>" + theads[i] + "</th>";
    }
    string += "</tr></thead>";

    for ( var i = 0; i < items.length; i ++ )
    {
        string += "<tr>";

        if ( theads[0] === S_ORDER[giLanguageIndex] )
            string += "<th>" + ( i + 1 ) + "</th>";

        var marked = false;
        for ( var k = 0; k < markIndexs.length; k ++ )
        {
            if ( i == markIndexs[k] )
            {
                marked = true;
            }

        }

        for ( var j = 0; j < items[i].length; j ++ )
        {
            var tag1 = j == 0 ? "<th>" : "<td>";
            var tag2 = j == 0 ? "</th>" : "</td>";
            var item = items[i][j];

            if ( marked ) // start station & end station
            {
                if ( j == 0 ) // station name
                {
                    item = "★" + item + "";
                }
                item = "<strong>" + item + "</strong>";
            }

            string += tag1 + item + tag2;
        }

        string += "</tr>";
    }

    string += "</tbody></table>";

    return string;
}

// used for those common items (ex. S_DISPLAY_ARRAY)
function getHTMLOfCommonDiv( asItem, sIconClass, indexOffset )
{
    var string = "";

    for ( var i = 0; i < asItem.length; i ++ )
    {
        string += getHTMLOfListItem( sIconClass, ID_ITEM + ( indexOffset + i ), asItem[i][giLanguageIndex] );
    }

    return string;
}

// used for those option items (ex. S_RECORD_MAX_COUNT_ARRAY)
function getHTMLOfCommonSettingDiv( asSettingItem, abSelected )
{
    var string = "";
    
    for ( var i = 0; i < asSettingItem.length; i ++ )
    {
        var sIcon = abSelected[i] ? "icon check" : "icon target";
        string += getHTMLOfListItem( sIcon, ID_ITEM + i, asSettingItem[i][giLanguageIndex] );
    }

    return string;
}

function getHTMLOfFontSizeDiv()
{
    var string = "";
    var index = 0;

    for ( var i = 0; i <= 10; i ++ )
    {
        var icon = i == giFontSizeSelectedIndex ? "icon check" : "icon target";
        string += getHTMLOfListItem( icon, ID_ITEM + i, "" + ( 100 + i * 10 ) + "%" );
    }

    return string;
}

function setStyle()
{
    giStyleSelectedIndex = getStyleIndex();

    var sStyleClass = "ios7"; // default UI style
    var sStyle = S_STYLE_ARRAY[giStyleSelectedIndex].toString();

    if ( sStyle === S_WINDOWS_8.toString() )
    {
        sStyleClass = "win8";
    }
    else if ( sStyle === S_WINDOWS_8_LIGHT.toString() )
    {
        sStyleClass = "win8 light";
    }
    else if ( sStyle === S_ANDROID.toString() )
    {
        sStyleClass = "android";
    }
    else if ( sStyle === S_ANDROID_LIGHT.toString() )
    {
        sStyleClass = "android light";
    }
    else if ( sStyle === S_IOS.toString() )
    {
        sStyleClass = "ios";
    }
    else if ( sStyle === S_IOS_7.toString() )
    {
        sStyleClass = "ios7";
    }
    else if ( sStyle === S_BLACK_BERRY_10.toString() )
    {
        sStyleClass = "bb";
    }
    else if ( sStyle === S_TIZEN.toString() )
    {
        sStyleClass = "tizen";
    }
    
    var eAfui = document.getElementById("afui");
    eAfui.className = sStyleClass;
}

function loadImageFile( controller )
{
    var sImageType = "";
    var iCount = 0;
    gasImageInfo[iCount++] = S_IMAGE_NAME[giLanguageIndex] + ": " + controller.files[0].name;
    gasImageInfo[iCount++]  = S_IMAGE_TYPE[giLanguageIndex] + ": " + controller.files[0].type;
    gasImageInfo[iCount++] = S_IMAGE_SIZE[giLanguageIndex] + ": " + controller.files[0].size;

    if ( gasImageInfo[0].split( "." ).length == 2 )
    {
        sImageType = "image/" + gasImageInfo[0].split( "." )[1] + ";";
    }

    var reader = new FileReader();
    reader.readAsDataURL( controller.files[0] );

    reader.onloadend = function( event )
    {
        gsBackgroundImage = event.target.result;

        if ( gsBackgroundImage.indexOf( "image" ) < 0 )
        {
            var sBase64 = "base64";
            var sToken = gsBackgroundImage.split( sBase64 );

            if ( sToken.length == 2 )
                gsBackgroundImage = sToken[0] + sImageType + sBase64 + sToken[1];

            gasImageInfo[1]  = S_IMAGE_TYPE[giLanguageIndex] + ": " + sImageType;
        }

        setBackgroundImage( gsBackgroundImage );
        showBackgroundImage( gsBackgroundImage );
        updateDiv( ID_BACKGROUND_IMAGE, getHTMLOfLoadImageDiv() );

        if ( giPlatform == PLATFORM_FIREFOXOS )
        {
            setStyeIndex( INDEX_STYLE_WINDOWS_8 );
            window.location.reload(); // update the theme
        }
        else if ( giPlatform != PLATFORM_WP && // WP could show the background image
                  giStyleSelectedIndex != INDEX_STYLE_ANDROID )
        {
            setStyeIndex( INDEX_STYLE_ANDROID );
            window.location.reload(); // update the theme
        }
    }
}

function showFontColor( sColor )
{
    if ( sColor == null || sColor == "" )
        return;

    $("#afui").css("color", sColor );
}

function showBackgroundColor( sColor )
{
    if ( sColor == null || sColor == "" )
        return;

    $("#afui").css("background", sColor );
}

function showBackgroundImage( sBase64 )
{
    if ( sBase64 == null || sBase64 == "" )
        return;

    if ( true )
    {
        $("#afui").css("background", "url(" + sBase64 + ") no-repeat center center fixed" );
        /*
        $("#afui").css("-webkit-background-size", "cover" );
        $("#afui").css("-moz-background-size", "cover" );
        $("#afui").css("-o-background-size", "cover" );
        */
        //$("#afui").css("background-size", "100%" );
    }
    else
    {
        var eAfui = document.getElementById( "afui" );
        eAfui.style.backgroundImage = "url(" + sBase64 + ")";
        eAfui.style.backgroundPosition = "center center";
        eAfui.style.backgroundRepeat="no-repeat";
        eAfui.style.backgroundAttachment="fixed";
        eAfui.style.background.size="cover";
    }




}


// --------------GWAI-----------------

function getQuestionID()
{
    if ( gsQuestinID == ID_QUESTION ) 
        gsQuestinID = ID_QUESTION_2;
    else
        gsQuestinID = ID_QUESTION;
        
    return gsQuestinID;
}


function getHTMLOfMainDiv()
{
    var string = "";

    //restoreIndexPath();
    
    string += getHTMLOfImage( "resource/pic_question_mark_5.png", false );
    
    //string += getHTMLOfImage( "x-wmapp0:www/resource/pic_question_mark_2.png", false );

    string += getHTMLOfListItem( "icon lamp", getQuestionID(), S_NEW_GAME[giLanguageIndex] );
    string += getHTMLOfListItem( "icon settings", ID_OPTION, S_OPTION[giLanguageIndex] );

    return string;
}

function getHTMLOfQuestionDiv()
{
    var string = "";
    
    if ( navSupported() )
    {
        updateDiv( ID_NAV, getHTMLOfNavDiv() );
    }
    else
    {
        updateDiv( ID_MENU, getHTMLOfNavDiv() );
    }
    
    // cannot get picture, so go back to main page
    if ( !gbOnline )
    {
        deviceAlert( "Please connect to the Internet" );
        return getHTMLOfMainDiv();
    }
    
    if ( gbOnReady && !gbAdShowed )
    {
        gbAdShowed = true;
        showAD();
    }

    // do not change current name if we just up/down menu
    if ( gsLastDivID != ID_MENU )
    {
        setCurrentName();
    }

    addJS( getCurrentDirectory() + "/" + getCurrentFileName() );
    
    string += getHTMLOfCover();

    //string += getHTMLOfTextDetail( "Who am I ?<br><br>", giFontRatio, "text-align:center", true );

    var answerIndex = getRandom( giSelectionCount );
    var asAnotherName = getAnotherNames( giSelectionCount - 1 );
    var iAnotherIndex = 0;
    for ( var i = 0; i < giSelectionCount; i ++ )
    {
        if ( i == answerIndex )
            gasSelectionItem[i] = getCurrentName();
        else
            gasSelectionItem[i] = asAnotherName[iAnotherIndex++];
    }

    gsDebug += getCurrentName() + "__" + asAnotherName + "\n";
    //alert( gsDebug );

    giCorrectSelection = answerIndex;

    for ( var i = 0; i < giSelectionCount; i ++ )
    {
        string += getHTMLOfListItem( "icon location", ID_SELECTION_ARRAY[i], gasSelectionItem[i] );
    }
    string += getHTMLOfNewLine( 3 );

    return string;
}

function getHTMLOfText( sText, iFontSizeRatio )
{
    return getHTMLOfTextDetail( sText, iFontSizeRatio, "", true );
}

function getHTMLOfTextDetail( sText, iFontSizeRatio, sOtherStyle, bNewLine )
{
    var sHTML = "<p style='font-size:" + iFontSizeRatio + "% ; line-height: 160%;" + sOtherStyle + ";'>";
    
    sHTML += bNewLine ? "<br>" : "";
   
    return sHTML + sText + "</p>";
}

function getHTMLOfCover()
{
    //alert( getScreenHeight() + "x" + getScreenWidth() );
    return getHTMLOfImage( getCurrentCover(), true );
}

function getHTMLOfImage( sImageURL, bBorder )
{
    //alert( sImageURL );
    
    var iMarginLeft = Math.floor( ( 100 - giPicWidthRatio ) / 2 );
    
    // 960 x 540

    var reduceMultiple = 3;//getScreenHeight() > 1023 ? 3 : 4;

    var iMaxHeight = Math.floor( getScreenHeight() / reduceMultiple );

    if ( bBorder )
    {
        return "<div style='margin-left: " + iMarginLeft + "%; margin-top: 5%; margin-bottom: 5%; width:50%; height:" + iMaxHeight + "px; overflow:hidden; border:12px #E0E0E0 double'><img src='" + sImageURL + "' alt='Loading...' style='width:100%; height:100%;' ></div>";
    }

    return "<div style='margin-left: " + iMarginLeft + "%; margin-top: 5%; width:" + giPicWidthRatio + "%; height:" + iMaxHeight + "px;'><img src='" + sImageURL + "' style='width:100%; height:100%;' alt='Loading...'></div>";
}

function getHTMLOfImageCombine( sImageURL1, sImageURL2, iOverlapRatio )
{
    var iMarginLeft = Math.floor( ( 100 - giPicWidthRatio ) / 2 );

    return "<div style='margin-left: " + iMarginLeft + "%; margin-top: 5%; margin-bottom: 5%;'><img src='" + sImageURL1 + "' style='position:absolute; z-index:1; top:1%; width=" + giPicWidthRatio + "%; height:" + ( giPicHeightRatio * 1.5 ) + "%;' alt='Loading...'><img src='" + sImageURL2 + "' style='position:absolute; z-index:2; top:20%; margin-left: " + iOverlapRatio + "%; width=" + giPicWidthRatio + "%; height:" + Math.floor( giPicHeightRatio / 2.5 ) + "%;' alt='Loading...'></div>";
}

function getHTMLOfNewLine( iCount )
{
    var sHTML = "";
    for ( var i = 0; i < iCount; i ++ )
    {
        sHTML += getHTMLOfText( "", giFontRatio );
    }

    return sHTML;
}

function getContentIndex( sPageID )
{
    var iOrder = -1;

    for ( var i = 0; i < ID_CONTENT_ARRAY.length; i ++ )
    {
        if ( sPageID == ID_CONTENT_ARRAY[i] )
        {
            iOrder = i;
            break;
        }
    }

    if ( iOrder < 0 || iOrder >= gaiNavTitleRelatedIndex.length )
    {
        //alert( " -> " + sPageID + "(" + iOrder + "):" );
        return -1;
    }

    return gaiNavTitleRelatedIndex[iOrder];
}

// -------------------------------
/*

protected override void OnBackKeyPress(System.ComponentModel.CancelEventArgs e) {
            e.Cancel = true;
            this.Dispatcher.BeginInvoke(() => { 
                MessageBoxList result = MessageBox.Show("Do you want to exit ?", "Notification", MessageBoxButton.OKCancel);
                if (result == MessageBoxList.OK) {
                    Application.Current.Terminate();
                }
            });
        }

*/




// part-time king
function getHTMLOfListMessage( idString, title, firstMessage, secondMessage, note )
{
    var string = "";
    
    string += getHTMLOfSameLine( title, note );

    string += "<div>";
    string += "<strong>&ensp;" + firstMessage + " </strong>" + secondMessage + "";
    string += "</div>";
    
    return getHTMLOfListItem( "", idString, string );
}

function getHTMLOfListDiv()
{
    checkInitialData();
    updateMatchTable();

    var string = "";
    
    var iPostCountPerPage = getPostCountPerPage();
    var iMaxIndex = getPostCount( giPostKind ) - 1;
    var iBaseIndex = getPostAbsoluteIndex( 0 );
    var iValidPostCount = 0;
    var bFirstPostIndexRecorded = false;
    var sTemp = "";
    var sLastSortFlag = "";
    
    // only show update message on NEW_POST list
    if ( giPostKind === NEW_POST )
    {
        if ( giUpdateState === STATE_UPDATING )
        {
            //alert( "LOCK" );
            lockWait();
        }
        else if ( giUpdateState === STATE_UPDATE_FINISHED )
        {
            //alert( "UNLOCK" );
            unlockWait();
        }
    
    }

    for ( var i = iBaseIndex; i <= iMaxIndex; i ++ )
    {
        if ( !gabMatchPostTable[i] )
        {
            continue;
        }
        
        if ( !bFirstPostIndexRecorded )
        {
            giFirstPostIndexInCurrentListPage = iBaseIndex;
            bFirstPostIndexRecorded = true;
        }
    
        var aaPTData = getPTData( giPostKind, i );
        if ( !aaPTData )
        {
            continue;
        }
        
        var bOutdatePost = false;
        var sDate = getFirstDate( getValidText( aaPTData[PT_WORK_TIME][1] ) );
        if ( isOutdatePost( sDate ) )
        {
            if ( giPostKind === MARK_POST )
            {
                bOutdatePost = true; // mark the post as outdate
            }
            else
            {
                continue; // do not show outdate posts
            }
        }
        
        var bRemovedPost = false;
        var sPostID = getPostID( aaPTData );
        if ( gbRemovedDataCheck &&  isRemovedPost( sPostID ) )
        {
            if ( giPostKind === MARK_POST )
            {
                bRemovedPost = true; // mark the post as removed
            }
            else
            {
                continue; // do not show removed posts
            }
        }
        
        if ( gasSortFlag && gasSortFlag[i] != sLastSortFlag )
        {
            sLastSortFlag = gasSortFlag[i];
            string += getHTMLOfListText( "icon tag", sLastSortFlag );
        }    
        
        var sTitle = getPostTitle( aaPTData );
        var sDebugTitle = sTitle;
        if ( bOutdatePost )
        {
            sDebugTitle = "[" + S_OUTDATE[giLanguageIndex] + "]" + sDebugTitle;
        }
        if ( bRemovedPost )
        {
            sDebugTitle = "[" + S_REMOVED[giLanguageIndex] + "]" + sDebugTitle;
        }
        
        //sDebugTitle = "" + i + "_" + sDebugTitle;

        if ( gbCheckBoxShowed )
        {
            var sIcon = gabCheckBox[i] ? "icon check" : "icon target";
        
            string += getHTMLOfListLinkItem( sIcon, "javascript:clickPost(" + i + ");", sDebugTitle );
        }
        else
        {
            string += getHTMLOfListLinkItem( "icon paper", "javascript:clickPost(" + i + ");", sDebugTitle );
        }

        iValidPostCount++;
        giLastPostIndexInCurrentListPage = i;
        
        if ( iValidPostCount >= iPostCountPerPage )
        {
            if ( giPostKind === SEARCH_POST )
            {
                gaiFirstSearchPageIndex[giCurrentSearchListPage+1] = i;
            }
            
            break;
        }
    }
    
    if ( iValidPostCount == 0 )
    {
        if ( giPostKind === MARK_POST )
        {
            string += getHTMLOfListText( "icon warning", S_NOT_MARK_POST_YET[giLanguageIndex] );
        }
        else
        {
            string += getHTMLOfListText( "icon warning", S_NOT_FOUND_FOR_SEARCH[giLanguageIndex] );
        }
    }
    
    string += getHTMLOfNewLine( 1 );
    
    if ( existPrevListPage() )
    {
        string += getHTMLOfListItem( "icon left", getListPrevID( giPostKind ), S_PREV_PAGE[giLanguageIndex] );
    }
    if ( existNextListPage() )
    {
        string += getHTMLOfListItem( "icon right", getListNextID( giPostKind ), S_NEXT_PAGE[giLanguageIndex] );
    }
    
    string += getHTMLOfNewLine( 1 );

    return string;
}

function existNextListPage()
{
    return getNextMatchPostIndex( giLastPostIndexInCurrentListPage ) != INIT_INDEX ;
}

function existPrevListPage()
{
    return getPrevMatchPostIndex( giFirstPostIndexInCurrentListPage ) != INIT_INDEX ;
}

function clickPost( iPostIndex )
{
    updateCurrentPostIndex( iPostIndex );
    
    if ( gbCheckBoxShowed )
    {
        //alert( "checkbox " + iPostIndex );
        gabCheckBox[iPostIndex] = gabCheckBox[iPostIndex] ? false : true;
        
        updateListDiv( MARK_POST );
        
    }
    else
    {
        loadPage( getPostDivID() );
    }
}

function isNewListPageNow()
{
    return isNewListPageID( gsNowDivID );
}

function isListPageNow()
{
    return isListPageID( gsNowDivID );
}

function isListPageID( sDivID )
{
    return ( isSearchListPageID( sDivID ) ||
             isMarkListPageID( sDivID ) ||
             isNewListPageID( sDivID ) );
}

function isNewListPageID( sDivID )
{
    if ( sDivID === ID_P_NEW_RESULT_1 || 
         sDivID === ID_P_NEW_RESULT_2 || 
         sDivID === ID_P_NEW_RESULT_3 ||
         sDivID === ID_P_NEW_RESULT_FIRST )
        return true;
    else
        return false;
}

function isSearchListPageID( sDivID )
{
    if ( sDivID === ID_P_SEARCH_RESULT_1 || 
         sDivID === ID_P_SEARCH_RESULT_2 || 
         sDivID === ID_P_SEARCH_RESULT_3 )
        return true;
    else
        return false;
}

function isMarkListPageID( sDivID )
{
    if ( sDivID === ID_P_MARK_RESULT_1 || 
         sDivID === ID_P_MARK_RESULT_2 || 
         sDivID === ID_P_MARK_RESULT_3 )
        return true;
    else
        return false;
}

function updateListDiv( iPostKind )
{
    var iBackupPostKind = giPostKind;
    
    giPostKind = iPostKind;
    updateDiv( getListCurrentID( iPostKind ), getHTMLOfListDiv() );
    giPostKind = iBackupPostKind;
}

function updateAllListDiv()
{
    updateListDiv( MARK_POST );
    updateListDiv( SEARCH_POST );
    updateListDiv( NEW_POST );
    
    //alert( gsSearchListCurrentID );
}

function getListCurrentID( iPostKind )
{
    if ( iPostKind == MARK_POST )
        return gsMarkListCurrentID;
    else if ( iPostKind == NEW_POST )
        return gsNewListCurrentID;
    else if ( iPostKind == SEARCH_POST )
        return gsSearchListCurrentID;
    else
        error( "getListCurrentID: " + iPostKind );
        
    return null;
}

function setListCurrentID( sPageID )
{
    if ( giPostKind == MARK_POST )
        gsMarkListCurrentID = sPageID;
    else if ( giPostKind == NEW_POST )
        gsNewListCurrentID = sPageID;
    else if ( giPostKind == SEARCH_POST )
        gsSearchListCurrentID = sPageID;
    else
        error( "setListCurrentID: " + giPostKind );
}

function isListNowID( sPageID )
{
    return ( getPostKindByListPage( sPageID ) != null );
}

function getPostKindByListPage( sPageID )
{
    if ( isListNowIDByPostKind( MARK_POST, sPageID ) )
        return MARK_POST;
    else if ( isListNowIDByPostKind( SEARCH_POST, sPageID ) )
        return SEARCH_POST;
    else if ( isListNowIDByPostKind( NEW_POST, sPageID ) )
        return NEW_POST;
        
    //error( "getPostKindByListPage: " + sPageID );
    return null;
}

function isListNowIDByPostKind( iPostKind, sPageID )
{
    if ( iPostKind == MARK_POST )
        return ( gsMarkListCurrentID === sPageID );
    else if ( iPostKind == NEW_POST )
        return ( gsNewListCurrentID === sPageID );
    else if ( iPostKind == SEARCH_POST )
        return ( gsSearchListCurrentID === sPageID );

    error( "isListNowID: " + iPostKind );
    return null;
}

function isPostDivNow()
{
    return isPostDivID( gsNowDivID );
}

function isPostDivID( sDivID )
{
    return ( sDivID === ID_P_POST_NOW || sDivID === ID_P_POST_NEXT );
}

function getPostDivID()
{
    if ( gsNowPostID === ID_P_POST_NOW )
        gsNowPostID = ID_P_POST_NEXT;
    else    
        gsNowPostID = ID_P_POST_NOW;
        
    return gsNowPostID;
}



function getListPrevID( iPostKind )
{
    if ( iPostKind == MARK_POST )
    {
        if ( gsMarkListCurrentID == ID_P_MARK_RESULT_1 )
            return ID_P_MARK_RESULT_3;
        else if ( gsMarkListCurrentID == ID_P_MARK_RESULT_2 )
            return ID_P_MARK_RESULT_1;
        else
            return ID_P_MARK_RESULT_2;    
    }
    else if ( iPostKind == SEARCH_POST )
    {
        if ( gsSearchListCurrentID == ID_P_SEARCH_RESULT_1 )
            return ID_P_SEARCH_RESULT_3;
        else if ( gsSearchListCurrentID == ID_P_SEARCH_RESULT_2 )
            return ID_P_SEARCH_RESULT_1;
        else
            return ID_P_SEARCH_RESULT_2;
    }
    else if ( iPostKind == NEW_POST )
    {
        if ( gsNewListCurrentID == ID_P_NEW_RESULT_1 )
            return ID_P_NEW_RESULT_3;
        else if ( gsNewListCurrentID == ID_P_NEW_RESULT_2 )
            return ID_P_NEW_RESULT_1;
        else
            return ID_P_NEW_RESULT_2;
    }
    
    error( "getListPrevID: " + giPostKind );
    return null;
}

function isListNextID( sPageID )
{
    return ( sPageID === getListNextID( MARK_POST ) ||
             sPageID === getListNextID( SEARCH_POST ) ||
             sPageID === getListNextID( NEW_POST ) );
}

function isListPrevID( sPageID )
{
    return ( sPageID === getListPrevID( MARK_POST ) || 
             sPageID === getListPrevID( SEARCH_POST ) ||
             sPageID === getListPrevID( NEW_POST ) ); 
}

function getListNextID( iPostKind )
{
    if ( iPostKind == MARK_POST )
    {
        if ( gsMarkListCurrentID == ID_P_MARK_RESULT_1 )
            return ID_P_MARK_RESULT_2;
        else if ( gsMarkListCurrentID == ID_P_MARK_RESULT_2 )
            return ID_P_MARK_RESULT_3;
        else
            return ID_P_MARK_RESULT_1;
    }
    else if ( iPostKind == SEARCH_POST )
    {
        if ( gsSearchListCurrentID == ID_P_SEARCH_RESULT_1 )
            return ID_P_SEARCH_RESULT_2;
        else if ( gsSearchListCurrentID == ID_P_SEARCH_RESULT_2 )
            return ID_P_SEARCH_RESULT_3;
        else
            return ID_P_SEARCH_RESULT_1;
    }
    else if ( iPostKind == NEW_POST )
    {
        if ( gsNewListCurrentID == ID_P_NEW_RESULT_1 )
            return ID_P_NEW_RESULT_2;
        else if ( gsNewListCurrentID == ID_P_NEW_RESULT_2 )
            return ID_P_NEW_RESULT_3;
        else
            return ID_P_NEW_RESULT_1;
    }
    
    error( "getListNextID: " + iPostKind );
    return null;
}

function getHTMLOfSearchDiv()
{
    var string = "";
    
    string += getHTMLOfListItem( "icon location", ID_P_LOCATION, getLocationText() );
    string += getHTMLOfListItem( "icon calendar", ID_P_DATE, getDateText() );
    string += getHTMLOfListItem( "icon clock", ID_P_PERIOD, getPeriodText() );
    string += getHTMLOfListLinkItem( "icon clock", "javascript:clickKeyword();", getKeywordText() );
    string += getHTMLOfListItem( "icon magnifier", getListCurrentID( SEARCH_POST ), S_START_SEARCH[giLanguageIndex] );
    
    //alert( gsKeyword + "," + getKeywordText() );

    return string;
}

function getDateText()
{
    var date = new Date();
    var sYear = "" + date.getFullYear();
    var sMonth = "" + ( date.getMonth() + 1 );
    
    var sDate = getDateString();
    
    if ( sDate )
    {
        sYear = sDate.split( DATE_DIVISION )[0];
        sMonth = sDate.split( DATE_DIVISION )[1];
        
        return S_DATE[giLanguageIndex] + COLON_WORD + sYear + S_YEAR[giLanguageIndex] + " " + sMonth + S_MONTH[giLanguageIndex];
    }
    else
    {
        return S_DATE[giLanguageIndex] + COLON_WORD + S_NOT_LIMIT[giLanguageIndex];
    }
}

function getPeriodText()
{
    var index = getPeriodIndex();

    return S_PERIOD[giLanguageIndex] + COLON_WORD + getPeriodName( index );
}

function getKeywordText()
{
    return S_KEYWORD[giLanguageIndex] + COLON_WORD + gsKeyword;
}

function getLocationText()
{
    var sLocation = "";
    var iCount = getLocationCount();
    
    for ( var i = 0; i < iCount; i ++ )
    {
        if ( isSelectedLocation( i ) )
        {
            if ( sLocation != "" )
                sLocation += ", ";
            sLocation += getLocationName( i );
        }
    }

    return S_REGION[giLanguageIndex] + COLON_WORD + sLocation;
}

function getHTMLOfCategoryDiv()
{
    var string = "";
    
    string += getHTMLOfListItem( "icon location", ID_P_LOCATION, getLocationText() );
    
    return string;
}

function getGmapURL( sLocationName )
{
    return "http://maps.google.com/maps?q=" + sLocationName + "&z=15";
}

function getEmailURL( sEmail )
{
    return "mailto:" + sEmail;
}

function getPhoneURL( sPhoneNumber )
{
    return "tel:" + sPhoneNumber;
}

function getHTMLOfLocationDiv()
{
    var string = "";    
    var iLocationCount = getLocationCount();
    
    for ( var i = 0; i < iLocationCount; i ++ )
    {
        var sIcon = isSelectedLocation( i ) ? "icon check" : "icon target";
        string += getHTMLOfListLinkItem( sIcon, "javascript:clickLocation(" + i + ");", getLocationName( i ) );
    }
    
    return string;
}

function getHTMLOfStyleDiv()
{
    var iCount = S_STYLE_ARRAY.length;
    var abSelected = getSelectArrayByID( ID_STYLE );
    
    var string = "";

    for ( var i = 0; i < iCount; i ++ )
    {
        var sIcon = abSelected[i] ? "icon check" : "icon target";
        string += getHTMLOfListLinkItem( sIcon, "javascript:clickStyle(" + i + ");", S_STYLE_ARRAY[i][giLanguageIndex] );
    }
    
    return string;
}

function getHTMLOfFontSizeDiv()
{
    var iCount = 10;
    
    var string = "";

    for ( var i = 0; i < iCount; i ++ )
    {
        var sIcon = i == giFontSizeSelectedIndex ? "icon check" : "icon target";
        var sText = "" + ( 100 + i * 10 ) + "%";
        string += getHTMLOfListLinkItem( sIcon, "javascript:clickFontSize(" + i + ");", sText );
    }
    
    return string;
}

function getHTMLOfPostCountPerPageDiv()
{
    var string = "";
    var iCount = 5;
                                 
    var iPostCountPerPageIndex = getPostCountPerPageIndex();

    for ( var i = 0; i < iCount; i ++ )
    {
        var sIcon = i == iPostCountPerPageIndex ? "icon check" : "icon target";
        var sText = "" + ( 10 + i * 10 ) + S_POSTS[giLanguageIndex];
        string += getHTMLOfListLinkItem( sIcon, "javascript:clickPostCountPerPage(" + i + ");", sText );
    }

    return string;
}



function getHTMLOfPeriodDiv()
{
    var string = "";
    
    var iPeriodCount = Math.floor( PERIOD_ARRAY.length / 3 );
    
    for ( var i = 0; i < iPeriodCount; i ++ )
    {
        string += getHTMLOfListLinkItem( "icon calendar", "javascript:clickPeriod(" + i + ");", getPeriodName( i ) );
    }
    
    return string;
}



function getLocationName( index )
{
    return LOCATION_ARRAY[1 + giLanguageIndex + ( 1 + gStationNameSupportLanguageCount ) * index];
}

function getPeriodName( index )
{
    return PERIOD_ARRAY[1 + giLanguageIndex + ( 1 + gStationNameSupportLanguageCount ) * index];
}

function getCategoryName( index )
{
    return CATEGORY_ARRAY[1 + giLanguageIndex + ( 1 + gStationNameSupportLanguageCount ) * index];
}

function getHTMLOfPostDiv()
{
    var string = "";
    
    var sTempText = "";
    var aaPTData = getCurrentPTData();
    
    if ( !aaPTData )
    {
        string += getHTMLOfListItem( "icon folder", gsLastDivID, S_BACK_TO_LIST[giLanguageIndex] );
        
        return string;
    }
    
    // title
    gsTitle = getPostTitle( aaPTData );
    string += getHTMLOfListTextWithTitle( "icon tag", gsTitle, S_TITLE[giLanguageIndex] );
    string += "<p></p><p></p>";
    // time
    string += getHTMLOfListTextWithTitle( "icon clock", aaPTData[PT_WORK_TIME][0], S_TIME[giLanguageIndex] );
    gsDate = getValidText( aaPTData[PT_WORK_TIME][1] );
    string += getHTMLOfListTextWithTitle( "icon calendar", gsDate, S_DATE[giLanguageIndex] );
    string += "<p></p><p></p>";
    // location
    gsLocation = getValidText( aaPTData[PT_WORK_ADDRESS][0] );
    string += getHTMLOfListLinkItemWithTitle( "icon location", "javascript:goLocation();", gsLocation, S_LOCATION[giLanguageIndex] );
    string += "<p></p><p></p>";
    // pay
    //string += getHTMLOfListText( "icon tag", S_PAY[giLanguageIndex] );
    for ( var i = 0; i < S_PT_WORK_PAY_ARRAY.length; i ++ )
    {
        string += getHTMLOfListTextWithTitle( "icon lamp", aaPTData[PT_WORK_PAY][i], S_PT_WORK_PAY_ARRAY[i][giLanguageIndex] );
    }
    string += "<p></p><p></p>";
    // work
    gsNote = aaPTData[PT_WORK_DETAIL][0];
    string += getHTMLOfListTextWithTitle( "icon tools", gsNote, S_WORK[giLanguageIndex] );
    string += "<p></p><p></p>";
    // contact
    string += getHTMLOfListTextWithTitle( "icon user", aaPTData[PT_WORK_CONTACT][0], S_CONTACT_NAME[giLanguageIndex] );
    gsEmail = getValidText( aaPTData[PT_WORK_CONTACT][2] );
    if ( gsEmail && gsEmail != "" )
    {
        string += getHTMLOfListLinkItemWithTitle( "icon mail", "javascript:goEmail();", getOriginalText( aaPTData[PT_WORK_CONTACT][2] ), S_EMAIL[giLanguageIndex]  );
    }
    
    sTempText = getValidText( aaPTData[PT_WORK_CONTACT][1] );
    // remove it if this text exists email address
    gsPhoneNumber = sTempText.indexOf( "@" ) < 0 ? sTempText : "";
    if ( gsPhoneNumber != "" )
    {
        string += getHTMLOfListLinkItemWithTitle( "icon phone", "javascript:goPhoneNumber();", getOriginalText( aaPTData[PT_WORK_CONTACT][1] ), S_PHONE_NUMBER[giLanguageIndex] );
    }
    string += "<p></p><p></p>";

    // reference
    //string += getHTMLOfListText( "icon tag", S_REFERENCE[giLanguageIndex] );
    //string += "<p></p>";
    
    if ( calendarSupported() )
    {
        string += getHTMLOfListLinkItem( "icon calendar", "javascript:addCalendar();", S_ADD_TO_CALENDAR[giLanguageIndex] );
    }
    
    var sJavaScriptString;
    var sMarkIcon;
    var sMarkText;
    
    if ( postExisted( getPostMap( MARK_POST ), getPostID( aaPTData ) ) )
    {
        sJavaScriptString = "javascript:unmarkCurrentPost();";
        sMarkIcon = "icon remove";
        sMarkText = S_UNMARK_THIS_POST[giLanguageIndex];
    }
    else
    {
        sJavaScriptString = "javascript:markCurrentPost();";
        sMarkIcon = "icon add";
        sMarkText = S_MARK_THIS_POST[giLanguageIndex];
    }
    
    string += getHTMLOfListLinkItem( sMarkIcon, sJavaScriptString, sMarkText );
    
    gsOriginalPostURL = aaPTData[PT_WORK_SUMMARY][3];
    string += getHTMLOfListLinkItem( "icon upload", "javascript:goOriginalURL();", S_ORIGINAL_POST[giLanguageIndex] );
    string += getHTMLOfNewLine( 2 );

    
    var iCurrentPostIndex = getCurrentPostIndex();
    var iNextPostIndex = getNextMatchPostIndex( iCurrentPostIndex );
    var iPrevPostIndex = getPrevMatchPostIndex( iCurrentPostIndex );    
    
    if ( iNextPostIndex != INIT_INDEX )
    {
        string += getHTMLOfListLinkItem(  "icon right", "javascript:clickPost(" + iNextPostIndex + ");", S_NEXT_POST[giLanguageIndex] );
    }
    if ( iPrevPostIndex != INIT_INDEX )
    {
        string += getHTMLOfListLinkItem(  "icon left", "javascript:clickPost(" + iPrevPostIndex + ");", S_PREV_POST[giLanguageIndex] );
    }

    string += getHTMLOfListLinkItem( "icon up", "javascript:scrollToTop();", S_SCROLL_TO_TOP[giLanguageIndex] );
        
    string += getHTMLOfListItem( "icon folder", gsLastDivID, S_BACK_TO_LIST[giLanguageIndex] );
    
    string += getHTMLOfNewLine( 2 );
    
    return string;
}


// used for those common items (ex. S_DISPLAY_ARRAY)
function getHTMLOfCommonDiv( asItem, sIconClass, indexOffset )
{
    var string = "";
    
    for ( var i = 0; i < asItem.length; i ++ )
    {
        string += getHTMLOfListItem( sIconClass, ID_ITEM + ( indexOffset + i ), asItem[i][giLanguageIndex] );
    }

    return string;
}

// used for those option items (ex. S_RECORD_MAX_COUNT_ARRAY)
function getHTMLOfCommonSettingDiv( asSettingItem, abSelected )
{
    var string = "";
    
    var bRemoveIOS = false,
        bRemoveAndroid = false,
        bRemoveWindows8 = false;
        
    if ( asSettingItem[0].toString() == S_STYLE_ARRAY[0].toString() )
    {
        if ( giPlatform != PLATFORM_DESKTOP )
            bRemoveIOS = true; // IOS style exists some problems in some platforms
        if ( giPlatform == PLATFORM_ANDROID )
            bRemoveWindows8 = true; // win8 style exists no nav on Android device
        if ( giPlatform == PLATFORM_FIREFOXOS )
            bRemoveAndroid = true; // footer shakes on the Firefox OS device
    }

    for ( var i = 0; i < asSettingItem.length; i ++ )
    {
        if ( ( bRemoveIOS && i == PLATFORM_IOS ) ||
             ( bRemoveAndroid && i == PLATFORM_ANDROID ) ||
             ( bRemoveWindows8 && i == PLATFORM_WP ) )
            continue;
    
        var sIcon = abSelected[i] ? "icon check" : "icon target";
        string += getHTMLOfListItem( sIcon, ID_ITEM + i, asSettingItem[i][giLanguageIndex] );
    }

    return string;
}









function getOriginalText( sText )
{
    var VALID_TEXT_LENGTH = 2;
    var iEnd = sText.indexOf( "<new>" );

    // return the text before <new> if <new> is existed
    if ( iEnd > VALID_TEXT_LENGTH )
    {
        return sText.substring( 0, iEnd ).trim();
    }
    
    // return the text without <new> and </new>
    sText = sText.replace( "<new>", "" );
    sText = sText.replace( "</new>", "" );

    return sText.trim();
}

// ex. "8/19、8/28<new>8/19,8/28</new>" -> "8/19,8/28"
function getValidText( sText )
{
    var VALID_TEXT_LENGTH = 2;

    var iBegin = sText.indexOf( "<new>" ) + 5;
    var iEnd = sText.indexOf( "</new>", iBegin );
    
    // 1. exist two tag <new> and </new> 
    // 2. the text between <new> and </new> should be valid(length >= 2)
    if ( iBegin >= 5 && iEnd > 0 && iEnd > iBegin + VALID_TEXT_LENGTH )
    {
        return sText.substring( iBegin, iEnd ).trim();
    }
    // return the text before <new> if <new> is existed
    else if ( iBegin >= ( 5 + VALID_TEXT_LENGTH ) )
    {
        iEnd = iBegin - 5;
        return sText.substring( 0, iEnd ).trim();
    }
    // return the text without <new> and </new>
    else
    {
        sText = sText.replace( "<new>", "" );
        sText = sText.replace( "</new>", "" );
    
        return sText.trim();
    }
}

// ex. 0830~1730  午休1200~1330<new></new> -> TRUE
function noValidText( sText )
{
    return sText.indexOf( "<new></new>" ) >= 0;
}

// ex. input : "[一般] 萬芳醫院 代倒垃圾500<new>萬芳醫院 代倒垃圾500</new>"
//     output: "萬芳醫院 代倒垃圾500"
function getValidTitle( sText )
{
    var sValidText = getValidText( sText );
    
    var iBegin = sValidText.indexOf( "[" );
    var iEnd = sValidText.indexOf( "]", iBegin );
    
    if ( iBegin >= 0 && iEnd > 0 )
    {
        var sTagText = sValidText.substring( iBegin, iEnd );
        
        return sValidText.replace( sTagText, "" ).trim();
    }

    return sValidText;
}

function setBadge( sDivID, iNumber )
{
    $.ui.updateBadge( "#BADGE_" + sDivID, "" + iNumber, 'tr', 'red');
}

function initCheckBoxRecord()
{
    var iCount = getPostCount();
    
    for ( var i = 0; i < iCount; i ++ )
    {
        gabCheckBox[i] = false;
    }
}

function showCheckBoxOnList()
{
    gbCheckBoxShowed = true;
    initCheckBoxRecord();
    updateListDiv( MARK_POST );
    
    $.ui.toggleSideMenu( false ); // always call this function by menu
}


// --------------


/*
1. search
    1. region
    2. date
    3. category
    4. period
    5. search
2. content
    1. title
    2. time
        date
        time
    2. region
        1. county
        2. address (native map ?) ex. http://maps.google.com/maps?q=台北車站&z=15
    pay
    work
        1. category
        2. detail
    contact
        1. email (native email ?) ex. mailto:an@email.address?subject=My Subject Line
        2. phone number (native contact ?) ex. <a href="tel:+1-555-1234">call this number</a>
    reference
        1. add to calendar
        2. add to favourite
        3. original


*/    


/*
2014.9.12 :
    1. tag on list page :
        1. County
        2. date
        3. category
        
    2. remove the outdated postExisted
        1. remove these posts in NEW_POST, SEARCH_POST
        2. mark these posts in MARK_POST
    
    3. load js file :
        1. ptt_data.js
        2. fb_data.js
        3. outdate_data.js
            isRemovedPost( sPostID )
            isOutdatePost( getValidText( aaPTData[PT_WORK_TIME][1] ) )
    4. backbutton :
        1. ask quit or not in list page
        2. go back to list in post page
        
提供整合且即時更新的打工資訊，讓使用者可以快速地尋著最適合自己的工作，讓表列、篩選、聯絡、應徵等諸多步驟順暢完成，大大節約了打工族的時間與精力。

cordova create hello com.example.hello HelloWorld
cordova plugin add org.apache.cordova.inappbrowser


2014..9.13 :
    1. Always sort list after search
    2. Add catalogy on sort type
    3. Remove site on sort type
    4. Update data.js to google code, and test the update option
    5. Add the icon in project
    6. Add cordova plugin for daily
    7. 

    
    // prep some variables
  var startDate = new Date(2014,2,15,18,30,0,0,0); // beware: month 0 = january, 11 = december
  var endDate = new Date(2014,2,15,19,30,0,0,0);
  var title = "My nice event";
  var location = "Home";
  var notes = "Some notes about this event.";
  var success = function(message) { alert("Success: " + JSON.stringify(message)); };
  var error = function(message) { alert("Error: " + message); };
    window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);


*/