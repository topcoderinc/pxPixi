const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const FLOWER_TOP_IMAGE_PATH = ASSET_URL + '/assets/demo/flowerTop.png';
const EGG_HEAD_IMAGE_PATH = ASSET_URL + '/assets/demo/eggHead.png';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.min.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {view: scene});

  var bol = false;

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage(FLOWER_TOP_IMAGE_PATH);

  // create a second texture
  var secondTexture = PIXI.Texture.fromImage(EGG_HEAD_IMAGE_PATH);

  // create a new Sprite using the texture
  var dude = new PIXI.Sprite(texture);

  // center the sprites anchor point
  dude.anchor.set(0.5);

  // move the sprite to the center of the screen
  dude.x = app.renderer.width / 2;
  dude.y = app.renderer.height / 2;

  app.stage.addChild(dude);

  // make the sprite interactive
  dude.interactive = true;
  dude.buttonMode = true;

  dude.on('pointertap', function() {
      bol = !bol;
      if (bol) {
          dude.texture = secondTexture;
      }
      else {
          dude.texture = texture;
      }
  });

  app.ticker.add(function() {
      // just for fun, let's rotate mr rabbit a little
      dude.rotation += 0.1;
  });

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
