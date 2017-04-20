const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BUNNY_IMAGE_PATH = ASSET_URL + '/assets/basic/bunny.png';

px.configImport({"pxFramework:": 'http://127.0.0.1:8000/'});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb, view: scene});

  var container = new PIXI.Container();
  app.stage.addChild(container);

  var texture = PIXI.Texture.fromImage(BUNNY_IMAGE_PATH);

  for (var i = 0; i < 25; i++) {
      var bunny = new PIXI.Sprite(texture);
      bunny.x = (i % 5) * 30 + 100;
      bunny.y = Math.floor(i / 5) * 30 + 60;
      bunny.rotation = Math.random() * (Math.PI * 2)
      container.addChild(bunny);
  }

  var brt = new PIXI.BaseRenderTexture(300, 300, PIXI.SCALE_MODES.LINEAR, 1);
  var rt = new PIXI.RenderTexture(brt);

  var sprite = new PIXI.Sprite(rt);

  sprite.x = 450;
  sprite.y = 60;
  app.stage.addChild(sprite);
  
  app.ticker.add(function() {
      app.renderer.render(container, rt);
  });

}).catch( function importFailed(err) {
  console.error("Import failed: ", err);
});
