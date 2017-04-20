const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const MC_IMAGE_PATH = ASSET_URL + '/assets/demo/mc.json';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.min.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {view: scene});

  app.stop();

  PIXI.loader
      .initAppSceneContext(module.appSceneContext)
      .add('spritesheet', MC_IMAGE_PATH)
      .load(onAssetsLoaded);

  function onAssetsLoaded() {

      // create an array to store the textures
      var explosionTextures = [],
          i;

      for (i = 0; i < 26; i++) {
           var texture = PIXI.Texture.fromFrame('Explosion_Sequence_A ' + (i+1) + '.png');
           explosionTextures.push(texture);
      }

      for (i = 0; i < 50; i++) {
          // create an explosion AnimatedSprite
          var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);

          explosion.x = Math.random() * app.renderer.width;
          explosion.y = Math.random() * app.renderer.height;
          explosion.anchor.set(0.5);
          explosion.rotation = Math.random() * Math.PI;
          explosion.scale.set(0.75 + Math.random() * 0.5);
          explosion.gotoAndPlay(Math.random() * 27);
          app.stage.addChild(explosion);
      }

      // start animating
      app.start();
  }

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
