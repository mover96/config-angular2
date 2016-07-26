import {WebpackConfig, get} from '@easy-webpack/core'
import * as path from 'path'
import {ForkCheckerPlugin, TsConfigPathsPlugin} from 'awesome-typescript-loader'

/**
 * Typescript loader support for .ts
 * See: https://github.com/s-panferov/awesome-typescript-loader
 */
export = function typescript({options = undefined, exclude = null} = {}) {
  return function typescript(this: WebpackConfig): WebpackConfig {
    const loader = {
      test: /\.tsx?$/,
      loaders: ['awesome-typescript', 'angular2-template'],
      exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : [])
    } as any

    const htmlLoader = {
      test: /\.html$/,
      loader: 'raw'
    } as any

    const cssLoader = {
      test: /\.css$/,
      loader: 'raw'
    } as any

    if (options) {
      loader.query = options
    }

    return {
      resolve: {
        extensions: get(this, 'resolve.extensions', ['', '.js']).concat(['.ts'])
      },
      module: {
        loaders: get(this, 'module.loaders', []).concat([loader]).concat([htmlLoader]).concat([cssLoader])
      },
      plugins: [
        /*
        * Plugin: ForkCheckerPlugin
        * Description: Do type checking in a separate process, so webpack don't need to wait.
        *
        * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
        */
        new ForkCheckerPlugin(),
        new TsConfigPathsPlugin(options)
      ].concat(get(this, 'plugins', []))
    }
  }
}