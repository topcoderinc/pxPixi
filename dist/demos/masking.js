const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BG_ROTATE_IMAGE_PATH = ASSET_URL + '/assets/demo/BGrotate.jpg';
const SCENE_ROTATE_IMAGE_PATH = ASSET_URL + '/assets/demo/SceneRotate.jpg';
const LIGHT_ROTATE1_IMAGE_PATH = ASSET_URL + '/assets/demo/LightRotate1.png';
const LIGHT_ROTATE2_IMAGE_PATH = ASSET_URL + '/assets/demo/LightRotate2.png';
const PANDA_IMAGE_PATH = ASSET_URL + '/assets/demo/panda.png';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, { backgroundColor : 0x1099bb, view: scene});

  app.stage.interactive = true;

  var bg = PIXI.Sprite.fromImage(BG_ROTATE_IMAGE_PATH);

  bg.anchor.set(0.5);

  bg.x = app.renderer.width / 2;
  bg.y = app.renderer.height / 2;

  app.stage.addChild(bg);

  var container = new PIXI.Container();
  container.x = app.renderer.width / 2;
  container.y = app.renderer.height / 2;

  // add a bunch of sprites
  var bgFront = PIXI.Sprite.fromImage(SCENE_ROTATE_IMAGE_PATH);
  bgFront.anchor.set(0.5);

  var light2 = PIXI.Sprite.fromImage(LIGHT_ROTATE2_IMAGE_PATH);
  light2.anchor.set(0.5);

  var light1 = PIXI.Sprite.fromImage(LIGHT_ROTATE1_IMAGE_PATH);
  light1.anchor.set(0.5);

  var panda =  PIXI.Sprite.fromImage(PANDA_IMAGE_PATH);
  panda.anchor.set(0.5);

  container.addChild(bgFront, light2, light1, panda);

  app.stage.addChild(container);

  // let's create a moving shape
  var thing = new PIXI.GraphicsV8();
  app.stage.addChild(thing);
  thing.x = app.renderer.width / 2;
  thing.y = app.renderer.height / 2;
  thing.lineStyle(0);

  container.mask = thing;

  var count = 0;

  app.stage.on('pointertap', function() {
      if (!container.mask) {
          container.mask = thing;
      }
      else {
          container.mask = null;
      }
  });

  var help = new PIXI.Text('Click or tap to turn masking on / off.', {
      fontFamily: 'Arial',
      fontSize: 12,
      fontWeight:'bold',
      fill: 'white'
  });
  help.y = app.renderer.height - 26;
  help.x = 10;
   app.stage.addChild(help);

  app.ticker.add(function() {
      bg.rotation += 0.01;
      bgFront.rotation -= 0.01;

      light1.rotation += 0.02;
      light2.rotation += 0.01;

      panda.scale.x = 1 + Math.sin(count) * 0.04;
      panda.scale.y = 1 + Math.cos(count) * 0.04;

      count += 0.1;

      thing.clear();

      thing.beginFill(0x8bc5ff, 0.4);
      thing.drawRect(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20, 120, 120);
      // thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count)* 20);
      // thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count)* 20);
      // thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count)* 20);
      // thing.lineTo(-120 + Math.cos(count)* 20, 100 + Math.sin(count)* 20);
      thing.rotation = count * 0.1;
  });

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
