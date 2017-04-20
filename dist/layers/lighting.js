const ASSET_URL = 'http://127.0.0.1:8081';
const PIXI_PATH = ASSET_URL + '/pixi/';
const BG_IMAGE_PATH = ASSET_URL + '/assets/p2.jpeg';
const BUNNY_IMAGE_PATH = ASSET_URL + '/assets/basic/bunny.png';

px.configImport({ "pxFramework:": PIXI_PATH });
px.import({
    scene: 'px:scene.1.js',
    pixi: 'pxFramework:pixi.min.js',
}).then(function(imports) {
    return px.import({
        pixiDisplay: 'pxFramework:pixi-layers.js'
    }).then(function() {
        return imports.scene;
    })
}).then(function(scene) {
    var WIDTH = 800, HEIGHT = 600, PAD = 80;

    var app = new PIXI.Application(WIDTH, HEIGHT, {view: scene });

    //create the stage instead of container
    app.stage = new PIXI.display.Stage();

    var background = new PIXI.extras.TilingSprite(
        PIXI.Texture.fromImage(BG_IMAGE_PATH),
        WIDTH,
        HEIGHT);
    app.stage.addChild(background);

    //make container for bunnies
    var bunnyWorld = new PIXI.Container();
    app.stage.addChild(bunnyWorld);

    var lighting = new PIXI.display.Layer();
    lighting.on('display', function(element) {
        element.blendMode = PIXI.BLEND_MODES.ADD
    });
    lighting.filters = [new PIXI.filters.VoidFilter()];
    lighting.filters[0].blendMode = PIXI.BLEND_MODES.MULTIPLY;

    lighting.filterArea = new PIXI.Rectangle(0, 0, WIDTH, HEIGHT);
    // lighting.filterArea = new PIXI.Rectangle(100, 100, 600, 400); //<-- try uncomment it

    app.stage.addChild(lighting);

    var ambient = new PIXI.GraphicsV8();
    ambient.beginFill(0x808080, 0.5);
    ambient.drawRect(0, 0, WIDTH, HEIGHT);
    ambient.endFill();
    lighting.addChild(ambient); //<-- try comment it

    var bunnyTexture = PIXI.Texture.fromImage(BUNNY_IMAGE_PATH);

    function updateBunny(bunny) {
        bunny.x += bunny.vx;
        bunny.y += bunny.vy;
        if (bunny.x > WIDTH + PAD) {
            bunny.x -= WIDTH + 2 * PAD;
        }
        if (bunny.x < -PAD) {
            bunny.x += WIDTH + 2 * PAD;
        }
        if (bunny.y > HEIGHT + PAD) {
            bunny.y -= HEIGHT + 2 * PAD;
        }
        if (bunny.y < -PAD) {
            bunny.y += HEIGHT + 2 * PAD;
        }
    }

    function createBunny() {
        var container = new PIXI.Container();

        var bunny = new PIXI.Sprite(bunnyTexture);
        bunny.update = updateBunny;
        bunny.anchor.set(0.5, 0.5);


        var angle = Math.random() * Math.PI * 2;
        var speed = 200.0; //px per second
        container.vx = Math.cos(angle) * speed / 60.0;
        container.vy = Math.sin(angle) * speed / 60.0;
        container.position.set(Math.random() * WIDTH, Math.random() * HEIGHT);

        var lightbulb = new PIXI.GraphicsV8();
        var rr = Math.random() * 0x80 | 0;
        var rg = Math.random() * 0x80 | 0;
        var rb = Math.random() * 0x80 | 0;
        var rad = 50 + Math.random() * 20;

        lightbulb.lineStyle(0);
        lightbulb.beginFill((rr << 16) + (rg << 8) + rb, 1.0);
        lightbulb.drawCircle(0, 0, rad);
        lightbulb.endFill();
        lightbulb.parentLayer = lighting; //<-- try comment it

        container.addChild(lightbulb);

        container.addChild(bunny);

        return container;
    }

    for (var i = 0; i < 10; i++) {
        bunnyWorld.addChild(createBunny());
    }

    app.ticker.add(function() {
        bunnyWorld.children.forEach(updateBunny);
        lighting.renderedObject.moveToFront();
        bunnyWorld.renderedObject.moveToFront();
    });

}).catch(function importFailed(err) {
    console.error("Import failed: ", err);
});
