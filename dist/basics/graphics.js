const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {view: scene});

  var graphics = new PIXI.GraphicsV8();

  // set a fill and line style
  graphics.beginFill(0xFF3300);
  graphics.lineStyle(4, 0xffd900, 1);

  // draw a shape
  graphics.moveTo(50,50);
  graphics.lineTo(250, 50);
  graphics.lineTo(100, 100);
  graphics.lineTo(50, 50);
  graphics.endFill();

  // set a fill and a line style again and draw a rectangle
  graphics.lineStyle(2, 0x0000FF, 1);
  graphics.beginFill(0xFF700B, 1);
  graphics.drawRect(50, 250, 120, 120);

  // draw a rounded rectangle
  graphics.lineStyle(2, 0xFF00FF, 1);
  graphics.beginFill(0xFF00BB, 0.25);
  graphics.drawRoundedRect(150, 450, 300, 100, 35);
  graphics.endFill();

  // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
  graphics.lineStyle(0);
  graphics.beginFill(0xFFFF0B, 0.5);
  graphics.drawCircle(470, 90,60);
  graphics.endFill();

  app.stage.addChild(graphics);

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
