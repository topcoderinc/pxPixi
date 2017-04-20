const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const SPINEBOY_JSON_PATH = ASSET_URL + '/assets/spine/spineboy.json';

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

    // load spine data
    PIXI.loader
        .initAppSceneContext(module.appSceneContext)
        .add('spineboy', SPINEBOY_JSON_PATH)
        .load(onAssetsLoaded);

    app.stage.interactive = true;

    function onAssetsLoaded(loader, res)
    {
        // create a spine boy
        var spineBoy = new PIXI.spine.Spine(res.spineboy.spineData);

        // set the position
        spineBoy.x = app.renderer.width / 2;
        spineBoy.y = app.renderer.height;

        spineBoy.scale.set(1.5);

        // set up the mixes!
        spineBoy.stateData.setMix('walk', 'jump', 0.2);
        spineBoy.stateData.setMix('jump', 'walk', 0.4);

        // play animation
        spineBoy.state.setAnimation(0, 'walk', true);

        app.stage.addChild(spineBoy);

        app.stage.on('pointerdown', function() {
            spineBoy.state.setAnimation(0, 'jump', false);
            spineBoy.state.addAnimation(0, 'walk', true, 0);
        });
    }

}).catch(function importFailed(err) {
    console.error("Import failed: ", err);
});
