rm -r dist
mkdir dist

cd packages/extension\-common && npm install
cd ../..

# extension-library
cd packages/extension\-dapp && npm install && npm run bundle
cp dist/AlgoSigner.min.js ../../dist
rm -r dist

# extension
cd ../../packages/extension && npm install && tsc && cd build
cp content/content.js ../../../dist # content
cp background/background.js ../../../dist # background
cp ../manifest.json ../../../dist # manifest
cp ../public/images/icon.png ../../../dist # icon
cd .. && rm -r build

# extension-ui
cd ../../packages/extension\-ui && npm install && tsc && cd build
cp popup.js ../../../dist # popup
cp ../popup.html ../../../dist # popup html
cd .. && rm -r build
