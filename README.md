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

## Local Deployment

you don't need wait network if you deployment examples on local , sometimes Heroku return timeout if your network not very good.

```javascript
npm install -g http-server
cd pxPixi
node update_assets_url.js http://127.0.0.1:8081
cd dist
http-server -p 8081
```

## Deployment
-  pxPixi: for hosting pixi.js,assets and examples (https://github.com/topcoderinc/pxPixi)
-  The deployment instructions are easy, switch to just type the following command:

```shell
git init
git add .
git commit -m "init"
heroku create
git push heroku master
```

After you have deployed <submission>/pxPixi to Heroku,you need use `node update_assets_url.js http://you-heroku-url.com` to update all examples ASSSETS_URL,note that use the protocol to `http://` instead of `https://`, then push again

```shell
node update_assets_url.js <your-Heroku-host>
git add .
git commit -m "update assets url"
git push heroku master
```



**Note**:
(1) If you modified and built pixi.js, please copy pixi.js/dist/* to pxPixi/dist/pixi and update it on Heroku.
(2) make sure you use the protocol to `http://` instead of `https://`.


## Heroku examples
- Basic: http://agile-depths-26078.herokuapp.com/basics/basic.js
- Container: http://agile-depths-26078.herokuapp.com/basics/container.js
- Container Pivot: http://agile-depths-26078.herokuapp.com/basics/container-pivot.js
- Spritesheet Animation: http://agile-depths-26078.herokuapp.com/basics/spritesheet.js
- Click: http://agile-depths-26078.herokuapp.com/basics/click.js
- Tiling Sprite: http://agile-depths-26078.herokuapp.com/basics/tiling-sprite.js
- Text: http://agile-depths-26078.herokuapp.com/basics/text.js
- Textured Mesh: http://agile-depths-26078.herokuapp.com/basics/textured-mesh.js
- Graphics: http://agile-depths-26078.herokuapp.com/basics/graphics.js
- Render Texture: http://agile-depths-26078.herokuapp.com/basics/render-texture.js
- Display Z Order: http://agile-depths-26078.herokuapp.com/display/z-order.js
- Layers Z Order: http://agile-depths-26078.herokuapp.com/layers/z-order.js
- Layers Lighting: http://agile-depths-26078.herokuapp.com/layers/lighting.js
- Spine Dragon: http://agile-depths-26078.herokuapp.com/spine/dragon.js
- Spine Goblin: http://agile-depths-26078.herokuapp.com/spine/goblins.js
- Spine Dragon: http://agile-depths-26078.herokuapp.com/spine/pixie.js
- Spine Spineboy: http://agile-depths-26078.herokuapp.com/spine/spineboy.js

Open pxscene and enter the URL of each example to the input box and press return, you will see the results.

## Plugins
Some examples need extra plugins' support, and there're extra patchs for these plugins to work with pxscene.

| Examples                           | plugin       | plugin source                            | patch file         | patch base                               |
| ---------------------------------- | ------------ | ---------------------------------------- | ------------------ | ---------------------------------------- |
| Display Z Order                    | pixi-display | https://github.com/pixijs/pixi-display/tree/master | pixi-display.patch | branch master and commit b0898bf208431badfd2448cf2dc965a24de39ef8 |
| Layers Z Order and Layers Lighting | pixi-layers  | https://github.com/pixijs/pixi-display/tree/layers | pixi-layers.patch  | branch layers and commit 0f812e3e6a16c6883c278aae6f1d719f12052862 |
| All Spine examples                 | pixi-spine   | https://github.com/pixijs/pixi-spine     | pixi-spine.patch   | branch master and commit bc64e3e6f3784f5eda1094ddc283561eb63ab3d3 |

## Limitations

(1) When hover on clickable object, the cursor cannot be changed in pxscene.
(2) Layers Lighting example lack of lighting effect, because PXScene does not support filter yet.

## Remarks
(1) If you use the example in Heroku, you may need to wait several seconds for the resource downloading.
(2) The updated pixi.js supports both browsers and pxscene.
