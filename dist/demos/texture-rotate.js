const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const FLOWER_TOP_IMAGE_PATH = ASSET_URL + '/assets/demo/flowerTop.png';

px.configImport({"pxFramework:": PIXI_PATH });
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, { view: scene});

  // create a new background sprite
  var background = new PIXI.Sprite.fromImage(FLOWER_TOP_IMAGE_PATH);

  //load imageResource and get size to texture
  var texture = null;
  scene.create({
      t: 'imageResource',
      url: FLOWER_TOP_IMAGE_PATH,
  }).ready.then((imgResource) =>{
      texture = PIXI.Texture.fromImage(FLOWER_TOP_IMAGE_PATH);
      texture.baseTexture.source = {width:imgResource.w, height:imgResource.h, src:FLOWER_TOP_IMAGE_PATH};
      texture.baseTexture._sourceLoaded();
      texture.baseTexture.emit('loaded',texture.baseTexture);
      init();
  });

  function init() {
  // create rotated textures
      var textures = [texture];
      var D8 = PIXI.GroupD8;
      for (var rotate = 1; rotate < 16; rotate++) {
          var h = D8.isSwapWidthHeight(rotate) ? texture.frame.width : texture.frame.height;
          var w = D8.isSwapWidthHeight(rotate) ? texture.frame.height : texture.frame.width;
          var frame = texture.frame;
          var crop = new PIXI.Rectangle(texture.frame.x, texture.frame.y, w, h);
          var trim = crop;
          if (rotate%2==0) {
              var rotatedTexture = new PIXI.Texture(texture.baseTexture, frame, crop, trim, rotate);
          } else {
              //HACK to avoid exception
              //PIXI doesnt like diamond-shaped UVs, because they are different in canvas and webgl
              var rotatedTexture = new PIXI.Texture(texture.baseTexture, frame, crop, trim, rotate - 1);
              rotatedTexture.rotate++;
          }
          textures.push(rotatedTexture);
      }

      var offsetX = app.renderer.width / 16 | 0;
      var offsetY = app.renderer.height / 8 | 0;
      var gridW = app.renderer.width / 4 | 0;
      var gridH = app.renderer.height / 5 | 0;

      //normal rotations and mirrors
      for (var i = 0; i < 16; i++) {
          // create a new Sprite using rotated texture
          var dude = new PIXI.Sprite(textures[i < 8 ? i*2 : (i-8)*2+1]);
          dude.scale.x = 0.5;
          dude.scale.y = 0.5;
          // show it in grid
          dude.x = offsetX + gridW * (i % 4);
          dude.y = offsetY + gridH * (i / 4 | 0);
          app.stage.addChild(dude);
          var text = new PIXI.Text("rotate = "+dude.texture.rotate, { fontFamily: 'Arial' /*'Courier New'*/, fontSize:'12px', fill: 'white', align: 'left' });
          text.x = dude.x;
          text.y = dude.y - 20;
          app.stage.addChild(text);
      }
  }

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
