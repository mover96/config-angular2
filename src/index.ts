import {WebpackConfig, get} from '@easy-webpack/core'
import * as path from 'path'
import {ForkCheckerPlugin} from 'awesome-typescript-loader'

/**
 * Typescript loader support for .ts
 * See: https://github.com/s-panferov/awesome-typescript-loader
 */
export function typescript(options = {}, exclude: Array<string> = null) {
  return function typescript(this: WebpackConfig): WebpackConfig {
    return {
      resolve: {
        extensions: ['', '.ts', '.js']
        //get(this, 'resolve.extensions', ['', '.js']).concat(['.ts'])
      },
      module: {
        loaders: get(this, 'module.loaders', []).concat([{
          test: /\.tsx?$/,
          loader: 'awesome-typescript',
          exclude: exclude || this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : [],
          query: options
        }])
      },
      plugins: [
        /*
        * Plugin: ForkCheckerPlugin
        * Description: Do type checking in a separate process, so webpack don't need to wait.
        *
        * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
        */
        new ForkCheckerPlugin()
      ].concat(get(this, 'plugins', []))
    }
  }
}