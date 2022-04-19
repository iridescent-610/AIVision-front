const productionPlugin = []
productionPlugin.push("@babel/plugin-syntax-dynamic-import");
if (process.env.NODE_ENV === 'production') {
  productionPlugin.push('transform-remove-console');
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: productionPlugin
}