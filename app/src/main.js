define(function(require, exports, module) {
    'use strict';

    // import famous material
    var Paper = require('famous-material/components/Paper');
    var TouchEffect = require('famous-material/mixins/TouchEffect');
    var ButtonEffect = require('famous-material/mixins/ButtonEffect');

    // import famous flex
    var LayoutController = require('famous-flex/LayoutController');
    var NavBarLayout = require('famous-flex/layouts/NavBarLayout');

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
        }
    });

    // create a search button for the footer
    var search_button = new Paper({
        depth : 20,
        size : [64],
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

    // create a button with z-index 30
    var button = new Paper({
        depth : 30,
        size : [48, 48],
        content : '+'
    });

    // make the button emit the ripple/touch effect
    button.mixin(TouchEffect);

    // make the button actually look like a button
    button.mixin(ButtonEffect, {
        type : ButtonEffect.TYPE_FLOATING
    });

    // add everything to the context
    context.add(header);

    context.add(new Modifier({
        transform : Transform.translate(12, 24)
    })).add(button);

    context.add(new Modifier({
        size : [undefined, 32],
        origin : [0.0, 1.0],
        align : [0.0, 1.0]
    })).add(footer);
});
