const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const DRAGON_JSON_PATH = ASSET_URL + '/assets/spine/dragon.json';

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

    PIXI.loader
        .initAppSceneContext(module.appSceneContext)
        .add('dragon', DRAGON_JSON_PATH)
        .load(onAssetsLoaded);

    var dragon = null;

    function onAssetsLoaded(loader,res)
    {
        // instantiate the spine animation
        dragon = new PIXI.spine.Spine(res.dragon.spineData);
        dragon.skeleton.setToSetupPose();
        dragon.update(0);
        dragon.autoUpdate = false;

        // create a container for the spine animation and add the animation to it
        var dragonCage = new PIXI.Container();
        dragonCage.addChild(dragon);

        // // measure the spine animation and position it inside its container to align it to the origin
        var localRect = dragon.getLocalBounds();
        dragon.position.set(-localRect.x, -localRect.y);

        // now we can scale, position and rotate the container as any other display object
        var scale = Math.min(
            (app.renderer.width * 0.7) / dragonCage.width,
            (app.renderer.height * 0.7) / dragonCage.height
        );
        dragonCage.scale.set(scale, scale);
        dragonCage.position.set(
            (app.renderer.width - dragonCage.width) * 0.5,
            (app.renderer.height - dragonCage.height) * 0.5
        );

        // // add the container to the stage
        app.stage.addChild(dragonCage);

        // // once position and scaled, set the animation to play
        dragon.state.setAnimation(0, 'flying', true);

        app.start();
    }

    app.ticker.add(function() {
        // update the spine animation, only needed if dragon.autoupdate is set to false
        dragon.update(0.01666666666667); // HARDCODED FRAMERATE!
    });

}).catch(function importFailed(err) {
    console.error("Import failed: ", err);
});
