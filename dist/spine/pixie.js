const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const PIXIE_JSON_PATH = ASSET_URL + '/assets/spine/Pixie.json';
const BG_IMAGE_PATH = ASSET_URL + '/assets/spine/iP4_BGtile.jpg';
const FRONT_IMAGE_PATH = ASSET_URL + '/assets/spine/iP4_ground.jpg';

px.configImport({ "pxFramework:": ASSET_URL });
px.import({
    scene: 'px:scene.1.js',
    pixi: 'pxFramework:/pixi/pixi.min.js'
}).then(function(imports) {
    return px.import({
        pixiSpine: 'pxFramework:/pixi/pixi-spine.js'
    }).then(function() {
        return imports;
    })
}).then(function(imports) {
    var app = new PIXI.Application(800, 600, { view: imports.scene });

    app.stop();

    // load spine data
    PIXI.loader
        .initAppSceneContext(module.appSceneContext)
        .add('pixie', PIXIE_JSON_PATH)
        .load(onAssetsLoaded);

    var postition = 0,
        background,
        background2,
        foreground,
        foreground2;

    app.stage.interactive = true;

    function onAssetsLoaded(loader,res) {

        background = PIXI.Sprite.fromImage(BG_IMAGE_PATH);
        background2 = PIXI.Sprite.fromImage(BG_IMAGE_PATH);

        foreground = PIXI.Sprite.fromImage(FRONT_IMAGE_PATH);
        foreground2 = PIXI.Sprite.fromImage(FRONT_IMAGE_PATH);
        foreground.y = foreground2.y = 640 - foreground2.height;

        app.stage.addChild(background, background2, foreground, foreground2);

        var pixie = new PIXI.spine.Spine(res.pixie.spineData);

        var scale = 0.3;

        pixie.x = 1024 / 3;
        pixie.y = 500;

        pixie.scale.x = pixie.scale.y = scale;

        app.stage.addChild(pixie);

        pixie.stateData.setMix('running', 'jump', 0.2);
        pixie.stateData.setMix('jump', 'running', 0.4);

        pixie.state.setAnimation(0, 'running', true);

        app.stage.on('pointerdown', onTouchStart);

        function onTouchStart() {
            pixie.state.setAnimation(0, 'jump', false);
            pixie.state.addAnimation(0, 'running', true, 0);
        }

        app.start();
    }

    app.ticker.add(function() {

        postition += 10;

        background.x = -(postition * 0.6);
        background.x %= 1286 * 2;
        if(background.x < 0)
        {
            background.x += 1286 * 2;
        }
        background.x -= 1286;

        background2.x = -(postition * 0.6) + 1286;
        background2.x %= 1286 * 2;
        if(background2.x < 0)
        {
            background2.x += 1286 * 2;
        }
        background2.x -= 1286;

        foreground.x = -postition;
        foreground.x %= 1286 * 2;
        if(foreground.x < 0)
        {
            foreground.x += 1286 * 2;
        }
        foreground.x -= 1286;

        foreground2.x = -postition + 1286;
        foreground2.x %= 1286 * 2;
        if(foreground2.x < 0)
        {
            foreground2.x += 1286 * 2;
        }
        foreground2.x -= 1286;
    });

}).catch(function importFailed(err) {
    console.error("Import failed: ", err);
});