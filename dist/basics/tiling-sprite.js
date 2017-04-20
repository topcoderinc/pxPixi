const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const IMAGE_PATH = ASSET_URL + '/assets/p2.jpeg';

px.configImport({"pxFramework:": "http://127.0.0.1:8000/"});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

    var scene = imports.scene;
    var app = new PIXI.Application(800, 600, {view: scene});

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage(IMAGE_PATH);

    /* create a tiling sprite ...
     * requires a texture, a width and a height
     * in WebGL the image size should preferably be a power of two
     */
    var tilingSprite = new PIXI.extras.TilingSprite(
        texture,
        app.renderer.width,
        app.renderer.height
    );
    app.stage.addChild(tilingSprite);

    var count = 0;

    app.ticker.add(function() {

        count += 0.006;
        tilingSprite.tileScale.x = 2 + Math.sin(count);
        tilingSprite.tileScale.y = 2 + Math.cos(count);

        tilingSprite.tilePosition.x += 1;
        tilingSprite.tilePosition.y += 1;
    });

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
