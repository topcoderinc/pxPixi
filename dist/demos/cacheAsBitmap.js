const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const MONSTERS_IMAGE_PATH = ASSET_URL + '/assets/demo/monsters.json';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, { view: scene });


  app.stop();

  // load resources
  PIXI.loader
      .initAppSceneContext(module.appSceneContext)
      .add('spritesheet', MONSTERS_IMAGE_PATH)
      .load(onAssetsLoaded);

  // holder to store aliens
  var aliens = [];
  var alienFrames = [
      'eggHead.png',
      'flowerTop.png',
      'helmlok.png',
      'skully.png'
  ];

  var count = 0;

  // create an empty container
  var alienContainer = new PIXI.Container();
  alienContainer.x = 400;
  alienContainer.y = 300;

  // make the stage interactive
  app.stage.interactive = true;
  app.stage.addChild(alienContainer);

  function onAssetsLoaded() {
      // add a bunch of aliens with textures from image paths
      for (var i = 0; i < 100; i++) {

          var frameName = alienFrames[i % 4];

          // create an alien using the frame name..
          var alien = PIXI.Sprite.fromFrame(frameName);
          alien.tint = Math.random() * 0xFFFFFF;

          /*
           * fun fact for the day :)
           * another way of doing the above would be
           * var texture = PIXI.Texture.fromFrame(frameName);
           * var alien = new PIXI.Sprite(texture);
           */
          alien.x = Math.random() * 800 - 400;
          alien.y = Math.random() * 600 - 300;
          alien.anchor.x = 0.5;
          alien.anchor.y = 0.5;
          aliens.push(alien);
          alienContainer.addChild(alien);
      }
      app.start();
  }

  // Combines both mouse click + touch tap
  app.stage.on('pointertap', onClick);

  function onClick() {
      alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;
  }

  app.ticker.add(function() {

      // let's rotate the aliens a little bit
      for (var i = 0; i < 100; i++) {
          var alien = aliens[i];
          alien.rotation += 0.1;
      }

      count += 0.01;

      alienContainer.scale.x = Math.sin(count);
      alienContainer.scale.y = Math.sin(count);
      alienContainer.rotation += 0.01;
  });
}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
