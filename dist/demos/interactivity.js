const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BUTTON_TEST_BG_IMAGE_PATH = ASSET_URL + '/assets/demo/button_test_BG.jpg';
const BUTTON_IMAGE_PATH = ASSET_URL + '/assets/demo/button.png';
const BUTTON_DOWN_IMAGE_PATH = ASSET_URL + '/assets/demo/buttonDown.png';
const BUTTON_OVER_IMAGE_PATH = ASSET_URL + '/assets/demo/buttonOver.png';

px.configImport({"pxFramework:": PIXI_PATH});
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

  var scene = imports.scene;
  var app = new PIXI.Application(800, 600, {view: scene});

  // create a background...
  var background = PIXI.Sprite.fromImage(BUTTON_TEST_BG_IMAGE_PATH);
  background.width = app.renderer.width;
  background.height = app.renderer.height;

  // add background to stage...
  app.stage.addChild(background);

  // create some textures from an image path
  var textureButton = PIXI.Texture.fromImage(BUTTON_IMAGE_PATH);
  var textureButtonDown = PIXI.Texture.fromImage(BUTTON_DOWN_IMAGE_PATH);
  var textureButtonOver = PIXI.Texture.fromImage(BUTTON_OVER_IMAGE_PATH);

  var buttons = [];

  var buttonPositions = [
      175, 75,
      655, 75,
      410, 325,
      150, 465,
      685, 445
  ];

  for (var i = 0; i < 5; i++) {

      var button = new PIXI.Sprite(textureButton);
      button.buttonMode = true;

      button.anchor.set(0.5);
      button.x = buttonPositions[i*2];
      button.y = buttonPositions[i*2 + 1];

      // make the button interactive...
      button.interactive = true;
      button.buttonMode = true;

      button
          // Mouse & touch events are normalized into
          // the pointer* events for handling different
          // button events.
          .on('pointerdown', onButtonDown)
          .on('pointerup', onButtonUp)
          .on('pointerupoutside', onButtonUp)
          .on('pointerover', onButtonOver)
          .on('pointerout', onButtonOut);

          // Use mouse-only events
          // .on('mousedown', onButtonDown)
          // .on('mouseup', onButtonUp)
          // .on('mouseupoutside', onButtonUp)
          // .on('mouseover', onButtonOver)
          // .on('mouseout', onButtonOut)

          // Use touch-only events
          // .on('touchstart', onButtonDown)
          // .on('touchend', onButtonUp)
          // .on('touchendoutside', onButtonUp)

      // add it to the stage
      app.stage.addChild(button);

      // add button to array
      buttons.push(button);
  }

  // set some silly values...
  buttons[0].scale.set(1.2);
  buttons[2].rotation = Math.PI / 10;
  buttons[3].scale.set(0.8);
  buttons[4].scale.set(0.8,1.2);
  buttons[4].rotation = Math.PI;

  function onButtonDown() {
      this.isdown = true;
      this.texture = textureButtonDown;
      this.alpha = 1;
  }

  function onButtonUp() {
      this.isdown = false;
      if (this.isOver) {
          this.texture = textureButtonOver;
      }
      else {
          this.texture = textureButton;
      }
  }

  function onButtonOver() {
      this.isOver = true;
      if (this.isdown) {
          return;
      }
      this.texture = textureButtonOver;
  }

  function onButtonOut() {
      this.isOver = false;
      if (this.isdown) {
          return;
      }
      this.texture = textureButton;
  }

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
