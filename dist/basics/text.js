const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';

px.configImport({"pxFramework:": PIXI_PATH });
px.import({ scene: 'px:scene.1.js',
            pixi: 'pxFramework:pixi.js' }).then( function ready(imports) {

    var scene = imports.scene;
    var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb, view: scene});

    // var basicText = new PIXI.Text('Basic text in pixi', new PIXI.TextStyle({fontFamily: 'DejaVuSans'}));
    var basicText = new PIXI.Text('Basic text in pixi');
    basicText.x = 30;
    basicText.y = 90;

    app.stage.addChild(basicText);

    var style = new PIXI.TextStyle({
        // fontFamily: 'Arial',
        fontFamily: 'DejaVuSans',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });

    var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
    richText.x = 30;
    richText.y = 180;

    app.stage.addChild(richText);

}).catch( function importFailed(err){
  console.error("Import failed: ", err);
});
