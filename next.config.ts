import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Handling CSS files (already there)
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    });

    // Handling font files (.woff, .woff2, .eot, .ttf, .otf)
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/fonts/", // Path used for serving the fonts
          outputPath: "static/fonts/", // Path where the fonts will be emitted
        },
      },
    });

    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
