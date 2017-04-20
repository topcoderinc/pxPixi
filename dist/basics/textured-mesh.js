const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const SNAKE_IMAGE_PATH = ASSET_URL + '/assets/basic/snake.png';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.min.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {view: scene});

  var count = 0;

  // build a rope!
  var ropeLength = 918 / 20;
  var ropeLength = 45;

  var points = [];

  for (var i = 0; i < 25; i++) {
      points.push(new PIXI.Point(i * ropeLength, 0));
  }

  var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage(SNAKE_IMAGE_PATH), points);

  strip.x = -40;
  strip.y = 300;

  // app.stage.addChild(strip);

  var g = new PIXI.GraphicsV8();
  g.x = strip.x;
  g.y = strip.y;
  app.stage.addChild(g);

  // start animating
  app.ticker.add(function() {
      count += 0.1;

      // make the snake
      for (var i = 0; i < points.length; i++) {
          points[i].y = Math.sin((i * 0.5) + count) * 30;
          points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
      }
      renderPoints();
  });

  function renderPoints () {

      g.clear();

      g.lineStyle(2,0xffc2c2);
      g.moveTo(points[0].x,points[0].y);

      for (var i = 1; i < points.length; i++) {
          g.lineTo(points[i].x,points[i].y);
      }

      for (var i = 1; i < points.length; i++) {
          g.beginFill(0xff0022);
          g.drawCircle(points[i].x,points[i].y,10);
          g.endFill();
      }
  }

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
