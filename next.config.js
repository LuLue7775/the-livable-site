
const path = require("path");
const allowedImageWordPressDomain = new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).hostname

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
  })

module.exports = withBundleAnalyzer({
    reactStrictMode: true,

    /**
     *  @see https://dev.to/ekafyi/first-impressions-on-next-js-automatic-font-optimization-32a1
     */
    optimizeFonts: false,
    
    trailingSlash: true,
    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //     config.module.rules.push(
    //         {
    //             test: /\.(glsl|frag|vert)$/,
    //             exclude: /node_modules/,
    //             use: [
    //             'raw-loader',
    //             'glslify-loader',
    //             ],
    //         },
    //         {
    //             test: /\.(dae|obj|gltf)$/,
    //             loader: 'file-loader',
    //             options: {
    //             name: 'assets/objects/[name].[ext]',
    //         },
    //       },
    //     )

    //     return config
    //   },
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };

        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    /**
     * We specify which domains are allowed to be optimized.
     * This is needed to ensure that external urls can't be abused.
     * @see https://nextjs.org/docs/basic-features/image-optimization#domains
     */
    images: {
        domains: [ allowedImageWordPressDomain, 'via.placeholder.com' ],
    },
});
