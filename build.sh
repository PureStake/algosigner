rm -r dist
mkdir dist

cd packages/extension\-common && npm install
cd ../..

# extension-library
cd packages/extension\-dapp && npm install && npm run bundle
cp dist/AlgoSigner.min.js ../../dist
rm -r dist

# extension
cd ../../packages/extension && npm install && webpack && cd build
cp ./content.js ../../../dist # content
cp ./background.js ../../../dist # background
cp ../manifest.json ../../../dist # manifest
cp ../public/images/icon.png ../../../dist # icon
cd .. && rm -r build

# extension-ui
cd ../../packages/extension\-ui && npm install && tsc && cd build
cp popup.js ../../../dist # popup
cp authorization.js ../../../dist # authorization script
cp ../popup.html ../../../dist # popup html
cp ../authorization.html ../../../dist # authorization html
cd .. && rm -r build
