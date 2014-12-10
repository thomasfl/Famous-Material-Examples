define(function(require, exports, module) {
    'use strict';

    // import famous material
    var Paper = require('famous-material/components/Paper');
    var TouchEffect = require('famous-material/mixins/TouchEffect');
    var ButtonEffect = require('famous-material/mixins/ButtonEffect');

    // import famous flex
    var FlexScrollView = require('famous-flex/FlexScrollView');
    var LayoutController = require('famous-flex/LayoutController');
    var NavBarLayout = require('famous-flex/layouts/NavBarLayout');
    var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
    var HeaderFooterLayout = require('famous-flex/layouts/HeaderFooterLayout');

    // import vanilla famo.us
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var InputSurface = require('famous/surfaces/InputSurface');

    // start creating components
    var context = Engine.createContext();

    // create the header
    var header = new Paper({
        depth : 20,
        size : [undefined, 48],
        type : Paper.TYPE_TILE,
        content : 'Famous Material Examples',
        attributes : {
            id : 'skelware-header'
        },
        properties: {
            backgroundColor: '#FF4080',
            color: 'white'
        }
    });

    // create a search button for the footer
    var search_button = new Paper({
        depth : 20,
        size : [80],
        type : Paper.TYPE_TILE,
        content : 'Search',
        properties : {
            lineHeight : '32px'
        }
    });

    // create a search input field for the footer
    var search_input = new Paper({
        depth : 20,
        type : Paper.TYPE_TILE,
        backing : new InputSurface({
            placeholder : 'Search doesn\'t search, but whatever'
        })
    });

    // make the button emit the ripple/touch effect
    search_button.mixin(TouchEffect);

    // make the button actually look like a button
    search_button.mixin(ButtonEffect, {
        type : ButtonEffect.TYPE_RAISED
    });

    // clear the search input on click
    search_button.on('click', function() {
        search_input.getBacking().setValue('');
    });

    // create the footer from its components
    var footer = new LayoutController({
        layout : NavBarLayout,
        layoutOptions : {
            margins : 0,
            itemSpacer : 0
        },
        dataSource : {
            title : search_input,
            leftItems : [search_button]
        }
    });

    // create scrollable content
    var content = new FlexScrollView({
        flow : true,
        autoPipeEvents : true,
        layout : CollectionLayout,
        layoutOptions : {
            itemSize : [50, 75],
            spacing : [5, 5],
            margins : [5, 5, 5, 5],
            justify : [1, 1]
        }
    });

    // create a button to insert new content
    var button = new Paper({
        depth : 30,
        size : [48, 48],
        content : '+',
        properties : {
            lineHeight : '48px'
        }
    });

    // make the button emit the ripple/touch effect
    button.mixin(TouchEffect);

    // make the button actually look like a button
    button.mixin(ButtonEffect, {
        type : ButtonEffect.TYPE_FLOATING
    });

    // add new content to the scroller on click
    button.on('click', function() {
        var index = 0;
        var paper = new Paper({
            type : Paper.TYPE_CARD
        });
        var animation = {
            opacity : 0
        }
        content.insert(index, paper, animation)
    });

    // create a layout for this page
    var layout = new LayoutController({
        layout : HeaderFooterLayout,
        layoutOptions : {
            headerSize : 48,
            footerSize : 32,
            margins : 0
        },
        dataSource : {
            header : header,
            content : content,
            footer : footer
        }
    });

    // add the layout to the context
    context.add(layout);

    // add the button to the context
    context.add(new Modifier({
        transform : Transform.translate(12, 24)
    })).add(button);
});
