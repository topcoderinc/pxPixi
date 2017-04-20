const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BUNNY_IMAGE_PATH = ASSET_URL + '/assets/basic/bunny.png';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, { transparent: true, view: scene});

  // create a new Sprite from an image path.
  var bunny = PIXI.Sprite.fromImage(BUNNY_IMAGE_PATH);

  // center the sprite's anchor point
  bunny.anchor.set(0.5);

  // move the sprite to the center of the screen
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  app.stage.addChild(bunny);

  app.ticker.add(function() {

      // just for fun, let's rotate mr rabbit a little
      bunny.rotation += 0.1;
  });

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
