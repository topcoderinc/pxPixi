const ASSET_URL = 'http://pxscene-pixi-dev.herokuapp.com';
const PIXI_PATH = ASSET_URL + '/pixi/';
const GREEN_IMAGE_PATH = ASSET_URL + '/assets/layer/square_green.png';
const BLUE_IMAGE_PATH = ASSET_URL + '/assets/layer/square_blue.png';

px.configImport({ "pxFramework:": PIXI_PATH });
px.import({
    scene: 'px:scene.1.js',
    pixi: 'pxFramework:pixi.min.js',
}).then(function(imports){
    return px.import({
        pixiDisplay: 'pxFramework:pixi-display.js'
    }).then(function(){
        return imports.scene;
    })
}).then(function(scene) {
    var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb, view: scene });

    //specify display list component
    app.stage.displayList = new PIXI.DisplayList();

    // z-index = 0, sorting = true;
    var greenLayer = new PIXI.DisplayGroup(0, true);
    greenLayer.on('add', function (sprite) {
        //green bunnies go down
        sprite.zOrder = -sprite.y;
    });

    // z-index = 1, sorting = true, we can provide zOrder function directly in constructor
    var blueLayer = new PIXI.DisplayGroup(1, function (sprite) {
        //blue bunnies go up
        sprite.zOrder = +sprite.y;
    });

    // Drag is the best layer, dragged element is above everything else
    var dragLayer = new PIXI.DisplayGroup(2, false);

    // Shadows are the lowest
    var shadowLayer = new PIXI.DisplayGroup(-1, false);


    var blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 0.5;

    // create a texture from an image path
    var texture_green = PIXI.Texture.fromImage(GREEN_IMAGE_PATH);
    var texture_blue = PIXI.Texture.fromImage(BLUE_IMAGE_PATH);

    var bunniesOdd = new PIXI.Container();
    var bunniesEven = new PIXI.Container();
    var bunniesBlue = new PIXI.Container();
    app.stage.addChild(bunniesOdd);
    app.stage.addChild(bunniesEven);
    app.stage.addChild(bunniesBlue);

    var ind = [];
    for (var i = 0; i < 15; i++) {
        var bunny = new PIXI.Sprite(texture_green);
        bunny.width = 50;
        bunny.height = 50;
        bunny.position.set(100 + 20 * i, 100 + 20 * i);
        bunny.anchor.set(0.5);
        // that thing is required
        bunny.displayGroup = greenLayer;
        if (i % 2 == 0) {
            bunniesEven.addChild(bunny);
        } else {
            bunniesOdd.addChild(bunny);
        }
        subscribe(bunny);
    }

    for (var i = 9; i >= 0; i--) {
        var bunny = new PIXI.Sprite(texture_blue);
        bunny.width = 50;
        bunny.height = 50;
        bunny.position.set(400 + 20 * i, 400 - 20 * i);
        bunny.anchor.set(0.5);
        // that thing is required
        bunny.displayGroup = blueLayer;
        bunniesBlue.addChild(bunny);
        subscribe(bunny);
    }

    function subscribe(obj) {
        obj.interactive = true;
        obj
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
    }


    function onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
        this.oldGroup = this.displayGroup;
        this.displayGroup = dragLayer;
        forceCreate();
    }

    function onDragEnd() {
        if(this.dragging){
            this.displayGroup = this.oldGroup;
            forceCreate();
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
        }
    }

    function onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }

    function forceCreate(){
        for(var i = 0; i < greenLayer.computedChildren.length; ++i){
            greenLayer.computedChildren[i].forceCreate();
        }
        for(var i = 0; i < blueLayer.computedChildren.length; ++i){
            blueLayer.computedChildren[i].forceCreate();
        }
        for(var i = 0; i < dragLayer.computedChildren.length; ++i){
            dragLayer.computedChildren[i].forceCreate();
        }
    }
}).catch(function importFailed(err) {
    console.error("Import failed: ", err);
});
