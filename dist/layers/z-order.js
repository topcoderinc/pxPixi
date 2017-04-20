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
        pixiDisplay: 'pxFramework:pixi-layers.js'
    }).then(function(){
        return imports.scene;
    })
}).then(function(scene) {
    var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb, view: scene });

    var greenGroup = new PIXI.display.Group(0, true);
    greenGroup.on('sort', function (sprite) {
        //green bunnies go down
        sprite.zOrder = -sprite.y;
    });

    // z-index = 1, sorting = true, we can provide zOrder function directly in constructor
    var blueGroup = new PIXI.display.Group(1, function (sprite) {
        //blue bunnies go up
        sprite.zOrder = +sprite.y;
    });

    // Drag is the best layer, dragged element is above everything else
    var dragGroup = new PIXI.display.Group(2, false);

    //specify display list component
    app.stage = new PIXI.display.Stage();
    app.stage.group.enableSort = true;
    //sorry, group cant exist without layer yet :(
    app.stage.addChild(new PIXI.display.Layer(greenGroup));
    app.stage.addChild(new PIXI.display.Layer(blueGroup));
    app.stage.addChild(new PIXI.display.Layer(dragGroup));

    // create a texture from an image path
    var texture_green = PIXI.Texture.fromImage(GREEN_IMAGE_PATH);
    var texture_blue = PIXI.Texture.fromImage(BLUE_IMAGE_PATH);

    var bunniesOdd = new PIXI.Container();
    var bunniesEven = new PIXI.Container();
    var bunniesBlue = new PIXI.Container();
    bunniesOdd.noRender = true;
    bunniesEven.noRender = true;
    bunniesBlue.noRender = true;
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
        bunny.parentGroup = greenGroup;
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
        bunny.parentGroup = blueGroup;
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
        this.data = event.data;
        this.dragging = true;
        this.oldGroup = this.parentGroup;
        this.parentGroup = dragGroup;
        forceCreate();
    }

    function onDragEnd() {
        if(this.dragging){
            forceCreate();
            this.parentGroup = this.oldGroup;
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
        for(var i = 0; i < greenGroup._activeLayer._sortedChildren.length; ++i){
            greenGroup._activeLayer._sortedChildren[i].forceCreate();
        }
        for(var i = 0; i < blueGroup._activeLayer._sortedChildren.length; ++i){
            blueGroup._activeLayer._sortedChildren[i].forceCreate();
        }
        for(var i = 0; i < dragGroup._activeLayer._sortedChildren.length; ++i){
            dragGroup._activeLayer._sortedChildren[i].forceCreate();
        }
    }

}).catch(function importFailed(err) {
    console.error("Import failed: ", err);
});
