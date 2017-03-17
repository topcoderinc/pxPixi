## Description

This project is an additional drawing target to Pixi.js (pixijs.com) that adds pxscene drawing in addition to WebGL and Canvas2D.


Pixi.js Patch apply
==============
### Build pixi

(1) Clone the pixi project
```
git clone https://github.com/pixijs/pixi.js.git
cd pixi.js
git checkout bed84b9ff04cf98c536401d36841d447b74917fe
```

(2) Copy /pxscene_pixi.patch into the repository folder (pixi.js) and patch
```
git apply pxscene_pixi.patch
```

(3) Install dependencies and build pixi
```
npm i
npm run dist -- --exclude deprecation
```

The pixi will be built and generated in pixi.js/dist

## Install pxscene

pxscene can be downloaded from http://pxscene.org

## Deployment

Two separate projects are available:
-  pxPixi: for hosting pixi.js and assets (https://github.com/topcoderinc/pxPixi)
-  pxPixi-examples: the other for hosting examples (https://github.com/topcoderinc/pxPixi-examples)

The deployment instructions are easy, switch to just type the following command:
```
git init
git add .
git commit -m "init"
heroku create
git push heroku master
```

**Note**:
(1) If you modified and built pixi.js, please copy pixi.js/dist/* to /pixi-server/dist/pixi and update it on Heroku.
(2) When you have deployed <submission>/pixi-server to Heroku, you should replace `ASSET_URL` in /example-server/dist/.js (all the example files) to the host URL of pixi-server. And also note that use the protocol to `http://` instead of `https://`.

## Heroku examples

- Basic: http://pxscene-pixi-examples.herokuapp.com/basics/basic.js
- Container: http://pxscene-pixi-examples.herokuapp.com/basics/container.js
- Container Pivot: http://pxscene-pixi-examples.herokuapp.com/basics/container-pivot.js
- Spritesheet Animation: http://pxscene-pixi-examples.herokuapp.com/basics/spritesheet.js
- Click: http://pxscene-pixi-examples.herokuapp.com/basics/click.js
- Tiling Sprite: http://pxscene-pixi-examples.herokuapp.com/basics/tiling-sprite.js
- Text: http://pxscene-pixi-examples.herokuapp.com/basics/text.js
- Textured Mesh: http://pxscene-pixi-examples.herokuapp.com/basics/textured-mesh.js
- Graphics: http://pxscene-pixi-examples.herokuapp.com/basics/graphics.js
- Render Texture: http://pxscene-pixi-examples.herokuapp.com/basics/render-texture.js
- Display Z Order: http://shrouded-castle-71808.herokuapp.com/display/z-order.js
- Layers Z Order: http://shrouded-castle-71808.herokuapp.com/layers/z-order.js
- Layers Lighting: http://shrouded-castle-71808.herokuapp.com/layers/lighting.js
- Spine Dragon: http://shrouded-castle-71808.herokuapp.com/spine/dragon.js
- Spine Goblin: http://shrouded-castle-71808.herokuapp.com/spine/goblins.js
- Spine Dragon: http://shrouded-castle-71808.herokuapp.com/spine/pixie.js
- Spine Spineboy: http://shrouded-castle-71808.herokuapp.com/spine/spineboy.js

Open pxscene and enter the URL of each example to the input box and press return, you will see the results.

## Plugins
Some examples need extra plugins' support, and there're extra patchs for these plugins to work with pxscene.

Examples|plugin|plugin source|patch file|patch base
--------|------|-------------|----------|----------
Display Z Order |pixi-display |https://github.com/pixijs/pixi-display/tree/master |pixi-display.patch | branch master and commit b0898bf208431badfd2448cf2dc965a24de39ef8
Layers Z Order and Layers Lighting |pixi-layers |https://github.com/pixijs/pixi-display/tree/layers |pixi-layers.patch | branch layers and commit 0f812e3e6a16c6883c278aae6f1d719f12052862
All Spine examples |pixi-spine |https://github.com/pixijs/pixi-spine |pixi-spine.patch |branch master and commit bc64e3e6f3784f5eda1094ddc283561eb63ab3d3

## Limitations

(1) When hover on clickable object, the cursor cannot be changed in pxscene.
(2) Pxscene text doesn't support stroke and gradient color. The shadow doesn't support blue effect.
(3) Pxscene text doesn't support to use font family name directly. Instead, we need to design a font URL to it. So we cannot assign `BOLD` or `ITALIC` style to the text.

For complying with the given text usage, I added a map to mapping fontFamily names to the font URL. Please check the pixi.js/text/TextV8.js

```
// Map: font family name -> fontUrl
// Set key lowercase
const fontFamilyUrlMap = {
    dejavusans: 'http://www.pxscene.org/examples/px-reference/fonts/DejaVuSans.ttf',
    arial: 'http://www.pxscene.org/examples/px-reference/fonts/DejaVuSans.ttf',
};
```
Currently, it only supports Arial and DejaVuSans.

(4) Layers Lighting example lack of lighting effect, because PXScene does not support filter yet.

## Remarks
(1) If you use the example in Heroku, you may need to wait several seconds for the resource downloading.
(2) For showing text, you may still need to wait several seconds because the font URL is remote.
(3) The updated pixi.js supports both browsers and pxscene.
