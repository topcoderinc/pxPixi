const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BUNNY_IMAGE_PATH = ASSET_URL + '/assets/basic/bunny.png';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {backgroundColor: 0x1099bb, view: scene});

  var container = new PIXI.Container();

  app.stage.addChild(container);

  var texture = PIXI.Texture.fromImage(BUNNY_IMAGE_PATH);

  // Create a 5x5 grid of bunnies
  for (var i = 0; i < 25; i++) {
      var bunny = new PIXI.Sprite(texture);
      bunny.anchor.set(0.5);
      bunny.x = (i % 5) * 40;
      bunny.y = Math.floor(i / 5) * 40;
      container.addChild(bunny);
  }

  // Center on the screen
  container.x = (app.renderer.width - container.width) / 2;
  container.y = (app.renderer.height - container.height) / 2;

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
