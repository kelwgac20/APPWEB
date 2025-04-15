const path = require('path');

module.exports = {
  entry: './src/index.js', // O la ruta de tu archivo de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Para procesar archivos .js
        exclude: /node_modules/, // No procesar los archivos de node_modules
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Para procesar archivos .css
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolución de archivos
  },
};
