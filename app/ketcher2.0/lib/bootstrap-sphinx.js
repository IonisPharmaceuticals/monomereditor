(function ($) {
    /**
     * Patch TOC list.
     *
     * Will mutate the underlying span to have a correct ul for nav.
     *
     * @param $span: Span containing nested UL's to mutate.
     * @param minLevel: Starting level for nested lists. (1: global, 2: local).
     */
    var patchToc = function ($ul, minLevel) {
        var findA,
            patchTables,
            $localLi;

        // Find all a "internal" tags, traversing recursively.
        findA = function ($elem, level) {
            level = level || 0;
            var $items = $elem.find("> li > a.internal, > ul, > li > ul");

            // Iterate everything in order.
            $items.each(function (index, item) {
                var $item = $(item),
                    tag = item.tagName.toLowerCase(),
                    $childrenLi = $item.children('li'),
                    $parentLi = $($item.parent('li'), $item.parent().parent('li'));

                // Add dropdowns if more children and above minimum level.
                if (tag === 'ul' && level >= minLevel && $childrenLi.length > 0) {
                    $parentLi
                        .addClass('dropdown-submenu')
                        .children('a').first().attr('tabindex', -1);

                    $item.addClass('dropdown-menu');

                }

                findA($item, level + 1);

            });
        };

        findA($ul);
    };

    var fixGlobalToc = function ($ul) {
        var findA,
            $localLi;

        // Find all a "internal" tags, traversing recursively.
        findA = function ($elem, level) {
            level = level || 0;
            var $items = $elem.find("> ul, > li");

            // Iterate everything in order.
            $items.each(function (index, item) {
                var $item = $(item),
                    tag = item.tagName.toLowerCase(),
                    $childrenUl = $item.children('ul');


                if (tag === 'li' && $childrenUl.length === 0) {
                    $item.remove();
                }  else {
                    findA($item, level + 1);
                }

            });
        };
        var findB = function ($elem, level) {
            level = level || 0;
            var $items = $elem.find("> ul, > li");

            // Iterate everything in order.
            $items.each(function (index, item) {
                var $item = $(item),
                    tag = item.tagName.toLowerCase(),
                    $childrenLi = $item.children('li');

                if (tag === 'ul' && $childrenLi.length === 0) {
                    $parentLi = $item.parent('li');
                    $parentLi.removeClass('dropdown-submenu');
                    $item.remove();
                } else {
                    findB($item, level + 1);
                }
            });
        };
        findA($ul);
        findB($ul);
    };

    /**
     * Patch all tables to remove ``docutils`` class and add Bootstrap base
     * ``table`` class.
     */
    patchTables = function () {
        $("table.docutils")
            .removeClass("docutils")
            .addClass("table")
            .attr("border", 0);
    };

    $(document).ready(function () {

        /*
         * Scroll the window to avoid the topnav bar
         * https://github.com/twitter/bootstrap/issues/1768
         */
        if ($("#navbar.navbar-fixed-top").length > 0) {
            var navHeight = $("#navbar").height(),
                shiftWindow = function() { scrollBy(0, -navHeight - 10); };

            if (location.hash) {
                shiftWindow();
            }

            window.addEventListener("hashchange", shiftWindow);
        }

        // Add styling, structure to TOC's.
        $(".dropdown-menu").each(function () {
            $(this).find("ul").each(function (index, item){
                var $item = $(item);
                $item.addClass('unstyled');
            });
        });

        // Global TOC.
        if ($("ul.globaltoc li").length) {
            patchToc($("ul.globaltoc"), 1);
            fixGlobalToc($("ul.globaltoc"));
        } else {
            // Remove Global TOC.
            $(".globaltoc-container").remove();
        }

        // Local TOC.
        $(".bs-sidenav ul").addClass("nav nav-list");
        $(".bs-sidenav > ul > li > a").addClass("nav-header");

        // Local TOC.
        patchToc($("ul.localtoc"), 2);

        // Mutate sub-lists (for bs-2.3.0).
        $(".dropdown-menu ul").not(".dropdown-menu").each(function () {
            var $ul = $(this),
                $parent = $ul.parent(),
                tag = $parent[0].tagName.toLowerCase(),
                $kids = $ul.children().detach();

            // Replace list with items if submenu header.
            if (tag === "ul") {
                $ul.replaceWith($kids);
            } else if (tag === "li") {
                // Insert into previous list.
                $parent.after($kids);
                $ul.remove();
            }
        });

        // Add divider in page TOC.
        $localLi = $("ul.localtoc li");
        if ($localLi.length > 2) {
            $localLi.first().after('<li class="divider"></li>');
        }

        // Enable dropdown.
        $('.dropdown-toggle').dropdown();

        // Patch tables.
        patchTables();

        // Add Note, Warning styles. (BS v2,3 compatible).
        $('div.note').addClass('alert alert-info');
        $('div.warning').addClass('alert alert-danger alert-error');

        // Inline code styles to Bootstrap style.
        $('tt.docutils.literal').not(".xref").each(function (i, e) {
            // ignore references
            if (!$(e).parent().hasClass("reference")) {
                $(e).replaceWith(function () {
                    return $("<code />").text($(this).text());
                });
            }});
    });
}($jqTheme || window.jQuery));/**
 * Created by jmilton on 7/6/2016.
 */
