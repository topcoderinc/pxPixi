const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BASE_IMAGE_PATH = ASSET_URL + '/assets/demo/';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {view: scene});

  // create two render textures... these dynamic textures will be used to draw the scene into itself
  var renderTexture = PIXI.RenderTexture.create(
      app.renderer.width,
      app.renderer.height
  );
  
  var renderTexture2 = PIXI.RenderTexture.create(
      app.renderer.width,
      app.renderer.height
  );

  var currentTexture = renderTexture;


  // create a new sprite that uses the render texture we created above
  var outputSprite = new PIXI.Sprite(currentTexture);

  // align the sprite
  outputSprite.x = 400;
  outputSprite.y = 300;
  outputSprite.anchor.set(0.5);

  // add to stage
  app.stage.addChild(outputSprite);

  var stuffContainer = new PIXI.Container();

  stuffContainer.x = 400;
  stuffContainer.y = 300;

  app.stage.addChild(stuffContainer);
  // create an array of image ids..
  var fruits = [
      BASE_IMAGE_PATH + 'spinObj_01.png',
      BASE_IMAGE_PATH + 'spinObj_02.png',
      BASE_IMAGE_PATH + 'spinObj_03.png',
      BASE_IMAGE_PATH + 'spinObj_04.png',
      BASE_IMAGE_PATH + 'spinObj_05.png',
      BASE_IMAGE_PATH + 'spinObj_06.png',
      BASE_IMAGE_PATH + 'spinObj_07.png',
      BASE_IMAGE_PATH + 'spinObj_08.png'
  ];

  // create an array of items
  var items = [];

  // now create some items and randomly position them in the stuff container
  for (var i = 0; i < 20; i++) {
      var item = PIXI.Sprite.fromImage(fruits[i % fruits.length]);
      item.x = Math.random() * 400 - 200;
      item.y = Math.random() * 400 - 200;
      item.anchor.set(0.5);
      stuffContainer.addChild(item);
      items.push(item);
  }

  var count = 0;
  app.ticker.add(function() {
      for (var i = 0; i < items.length; i++) {
          // rotate each item
          var item = items[i];
          item.rotation += 0.1;
      }

      count += 0.01;

      // swap the buffers ...
      var temp = renderTexture;
      renderTexture = renderTexture2;
      renderTexture2 = temp;

      // set the new texture
      outputSprite.texture = renderTexture;

      // twist this up!
      stuffContainer.rotation -= 0.01;
      outputSprite.scale.set(1 + Math.sin(count) * 0.2);

      // render the stage to the texture
      // the 'true' clears the texture before the content is rendered
      app.renderer.render(app.stage, renderTexture2, false);
  });

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
