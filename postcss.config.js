module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem-exclude': {
      remUnit: 41.4,
      exclude: /node_modules|folder_name/i
    }
  }
};
