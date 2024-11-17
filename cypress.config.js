const { defineConfig } = require("cypress");
const { merge } = require("webpack-merge");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: merge(
        {},
        {
          module: {
            rules: [
              {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                  },
                },
              },
              {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
              },
            ],
          },
          resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
        }
      ),
    },
  },

  e2e: {
    setupNodeEvents(on, config) {

    },
  },
});
