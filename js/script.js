/* begin Page */
// css helper
(function($) {
    var data = [
        {str:navigator.userAgent,sub:'Chrome',ver:'Chrome',name:'chrome'},
        {str:navigator.vendor,sub:'Apple',ver:'Version',name:'safari'},
        {prop:window.opera,ver:'Opera',name:'opera'},
        {str:navigator.userAgent,sub:'Firefox',ver:'Firefox',name:'firefox'},
        {str:navigator.userAgent,sub:'MSIE',ver:'MSIE',name:'ie'}];
    for (var n=0;n<data.length;n++)	{
        if ((data[n].str && (data[n].str.indexOf(data[n].sub) != -1)) || data[n].prop) {
            var v = function(s){var i=s.indexOf(data[n].ver);return (i!=-1)?parseInt(s.substring(i+data[n].ver.length+1)):'';};
            $('html').addClass(data[n].name+' '+data[n].name+v(navigator.userAgent) || v(navigator.appVersion)); break;			
        }
    }
})(jQuery);
/* end Page */

/* begin Menu */
jQuery(function () {
    jQuery('ul.webhmenu>li:not(:first-child)').each(function () { jQuery(this).prepend('<span class="webhmenu-separator"> </span>'); });
    jQuery('ul.webhmenu li').each(function () {
        this.j = jQuery(this);
        this.UL = this.j.children('ul:first');
        if (this.UL.length == 0) return;
        this.A = this.j.children('a:first');
        this.onmouseenter = function () {
            this.j.addClass('webhmenuhover');
            this.UL.addClass('webhmenuhoverUL');
            this.A.addClass('webhmenuhoverA');
        };
        this.onmouseleave = function() {
            this.j.removeClass('webhmenuhover');
            this.UL.removeClass('webhmenuhoverUL');
            this.A.removeClass('webhmenuhoverA');
        };
    });
});

jQuery(function() { setHMenuOpenDirection({container: "div.websheet-body", defaultContainer: "#webmain", menuClass: "webhmenu", leftToRightClass: "webhmenu-left-to-right", rightToLeftClass: "webhmenu-right-to-left"}); });

function setHMenuOpenDirection(menuInfo) {
    var defaultContainer = jQuery(menuInfo.defaultContainer);
    defaultContainer = defaultContainer.length > 0 ? defaultContainer = jQuery(defaultContainer[0]) : null;

    jQuery("ul." + menuInfo.menuClass + ">li>ul").each(function () {
        var submenu = jQuery(this);
        var submenuWidth = submenu.outerWidth();
        var submenuLeft = submenu.offset().left;

        var mainContainer = submenu.parents(menuInfo.container);
        mainContainer = mainContainer.length > 0 ? mainContainer = jQuery(mainContainer[0]) : null;

        var container = mainContainer || defaultContainer;
        if (container != null) {
            var containerLeft = container.offset().left;
            var containerWidth = container.outerWidth();

            if (submenuLeft + submenuWidth >=
                    containerLeft + containerWidth) 
                /* right to left */
                submenu.addClass(menuInfo.rightToLeftClass).find("ul").addClass(menuInfo.rightToLeftClass);
            if (submenuLeft <= containerLeft)
                /* left to right */
                submenu.addClass(menuInfo.leftToRightClass).find("ul").addClass(menuInfo.leftToRightClass);
        }
    });
}
/* end Menu */

/* begin VMenu */
jQuery(function() {
    if (!jQuery('html').hasClass('ie7')) return;
    jQuery('ul.webvmenu li:not(:first-child),ul.webvmenu li li li:first-child,ul.webvmenu>li>ul').each(function () { jQuery(this).append('<div class="webvmenu-separator"> </div><div class="webvmenu-separator-bg"> </div>'); });
});


/* end VMenu */



jQuery(function() {
    jQuery.each(jQuery('button'), function(i, button) {
        button.buttonName = button.getAttribute('name');
        button.buttonValue = button.getAttribute('value');
        button.prevOnClick = button.onclick;
        if (button.outerHTML) {
            var re = /\bvalue="([^"]+)"/i;
            button.buttonValue = re.test(button.outerHTML) ? re.exec(button.outerHTML)[1] : button.buttonValue;
        }
        button.setAttribute("name", "_" + button.buttonName);
        button.onclick = function() {
            if (this.prevOnClick) this.prevOnClick.apply(this);
            var f = this;
            while (f.tagName.toLowerCase() != "body") {
                if (f.tagName.toLowerCase() == "form") {
                    var subButton = document.createElement("input");
                    subButton.setAttribute("type", "hidden");
                    subButton.setAttribute("name", this.buttonName);
                    subButton.setAttribute("value", this.buttonValue);
                    f.appendChild(subButton);
                    return true;
                }
                f = f.parentNode;
            }
            return false;
        };
    });
});
