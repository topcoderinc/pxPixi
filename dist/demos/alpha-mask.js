const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BKG_IMAGE_PATH = ASSET_URL + '/assets/demo/bkg.jpg';
const CELLS_IMAGE_PATH = ASSET_URL + '/assets/demo/cells.png';
const FLOWER_TOP_IMAGE_PATH = ASSET_URL + '/assets/demo/flowerTop.png';

px.configImport({"pxFramework:": PIXI_PATH });
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, { view: scene});

  app.stage.interactive = true;

  var bg = PIXI.Sprite.fromImage(BKG_IMAGE_PATH);

  app.stage.addChild(bg);

  var cells = PIXI.Sprite.fromImage(CELLS_IMAGE_PATH);
  cells.name = 'cells';
  cells.scale.set(1.5);

  var mask = PIXI.Sprite.fromImage(FLOWER_TOP_IMAGE_PATH);
  mask.anchor.set(0.5);
  mask.name = 'mask';
  mask.x = 310;
  mask.y = 190;

  cells.mask = mask;

  app.stage.addChild(mask, cells);

  var target = new PIXI.Point();

  reset();

  function reset () {
      target.x = Math.floor(Math.random() * 550);
      target.y = Math.floor(Math.random() * 300);
  }

  app.ticker.add(function() {

      mask.x += (target.x - mask.x) * 0.1;
      mask.y += (target.y - mask.y) * 0.1;

      if (Math.abs(mask.x - target.x) < 1) {
          reset();
      }
  });
}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
