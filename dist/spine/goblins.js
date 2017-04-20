const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const GOBLINS_JSON_PATH = ASSET_URL + '/assets/spine/goblins.json';

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

    PIXI.loader
        .initAppSceneContext(module.appSceneContext)
        .add('goblins', GOBLINS_JSON_PATH)
        .load(onAssetsLoaded);

    app.stage.interactive = true;
    app.stage.buttonMode = true;

    function onAssetsLoaded(loader, res)
    {
        var goblin = new PIXI.spine.Spine(res.goblins.spineData);

        // set current skin
        goblin.skeleton.setSkinByName('goblin');
        goblin.skeleton.setSlotsToSetupPose();

        // set the position
        goblin.x = 400;
        goblin.y = 600;

        goblin.scale.set(1.5);

        // play animation
        goblin.state.setAnimation(0, 'walk', true);

        app.stage.addChild(goblin);

        app.stage.on('pointertap', function() {
            // change current skin
            var currentSkinName = goblin.skeleton.skin.name;
            var newSkinName = (currentSkinName === 'goblin' ? 'goblingirl' : 'goblin');
            goblin.skeleton.setSkinByName(newSkinName);
            goblin.skeleton.setSlotsToSetupPose();
        });
    }

}).catch(function importFailed(err) {
    console.error("Import failed: ", err);
});
