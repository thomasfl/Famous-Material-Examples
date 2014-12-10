define(function(require, exports, module) {
    'use strict';

    // import famous material
    var Paper = require('famous-material/components/Paper');
    var TouchEffect = require('famous-material/mixins/TouchEffect');
    var ButtonEffect = require('famous-material/mixins/ButtonEffect');

    // import vanilla famo.us
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');

    // start creating components
    var context = Engine.createContext();

    // create the header with z-index 20
    var header = new Paper({
        depth : 20,
        size : [undefined, 48],
        type : Paper.TYPE_TILE,
        content : 'Famous Material Examples',
        attributes : {
            id : 'skelware-header'
        }
    });

    // create the footer with z-index 20
    var footer = new Paper({
        depth : 20,
        size : [undefined, 32],
        type : Paper.TYPE_TILE,
        content : 'Famous Material Examples',
        attributes : {
            id : 'skelware-footer'
        }
    });

    // create a button with z-index 30
    var button = new Paper({
        depth : 30,
        size : [48, 48],
        content : '+'
    });

    // do something (or nothing) on click
    button.on('click', function() {

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
        origin : [0.0, 1.0],
        align : [0.0, 1.0]
    })).add(footer);
});
