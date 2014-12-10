require.config({
    shim : {

    },
    paths : {
        famous : '../lib/famous/src',
        requirejs : '../lib/requirejs/require',
        almond : '../lib/almond/almond',
        'famous-material' : '../lib/famous-material/src',
        'famous-flex' : '../lib/famous-flex/src'
    },
    packages : [

    ]
});
require(['main']);
