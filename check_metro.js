const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
console.log('Asset Exts:', config.resolver.assetExts.includes('ttf'));
console.log('Source Exts:', config.resolver.sourceExts.includes('ttf'));
