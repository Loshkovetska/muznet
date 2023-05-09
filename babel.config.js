module.exports = function (api) {
  api.cache(true);
  const rootImportOpts = {
    paths: [
      {
        root: __dirname,
        rootPathPrefix: "@/",
        rootPathSuffix: "src",
      },
    ]
  };
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin",
      ["babel-plugin-root-import", rootImportOpts]
    ],
  };

};
