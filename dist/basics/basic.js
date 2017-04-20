const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BUNNY_IMAGE_PATH = ASSET_URL + '/assets/basic/bunny.png';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.min.js' }).then( function ready(imports) {

    var scene = imports.scene;
    var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb, view: scene});

    var bunny = PIXI.Sprite.fromImage(BUNNY_IMAGE_PATH);

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    console.log(app.renderer.width);

    app.stage.addChild(bunny);

    app.ticker.add(function(delta) {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent tranformation
        bunny.rotation += 0.1 / delta;
    });

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
