module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem-exclude': {
      remUnit: 62,
      exclude: /node_modules|folder_name/i
    }
  }
};
