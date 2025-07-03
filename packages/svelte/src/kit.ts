import fs from 'node:fs';
import path from 'node:path';

import { mergeConfig } from 'vite';

import {
  DEFAULT_OPTIONS,
  type PackageTheme,
  type TheemoOptions,
  type TheemoPackage
} from '@theemo/theme';
import { theemo as theemoVite } from '@theemo/vite';
import { getResolvedTheemoPackages, transformIndexHtml } from '@theemo/vite/-internal';

import type { Config, Handle } from '@sveltejs/kit';
import type { LoggingFunction, ResolvedId } from 'rollup';
import type { HtmlTagDescriptor, Plugin } from 'vite';

type Options = Parameters<typeof theemoVite>[0];
type PluginOptions = Required<TheemoOptions>;

interface ResolvedTheme extends PackageTheme {
  filePath?: string;
}

type ResolvedTheemoPackage = TheemoPackage & {
  theemo?: ResolvedTheme;
};

interface TheemoHook {
  currentHook: string;
  previousHook: string;
  packages?: ResolvedTheemoPackage[];
  options?: Options;
}

interface GlobalThis {
  __theemoHook?: TheemoHook;
}

// taken from /@sveltejs/kit/src/utils/filesystem.js
function resolveEntry(entry: string) {
  if (fs.existsSync(entry)) {
    const stats = fs.statSync(entry);
    const index = path.join(entry, 'index');

    if (stats.isDirectory() && fs.existsSync(index)) {
      return resolveEntry(index);
    }

    return entry;
  } else {
    const dir = path.dirname(entry);

    if (fs.existsSync(dir)) {
      const base = path.basename(entry);
      const files = fs.readdirSync(dir);
      const found = files.find((file) => file.replace(/\.(js|ts)$/, '') === base);

      if (found) return path.join(dir, found);
    }
  }

  return;
}

/**
 * Add theemo to your svelte config
 *
 * @param svelteKitConfig your svelte config
 * @returns your svelte config with theemo config
 */
export function theemoSvelteConfig(svelteKitConfig: Config = {}): Config {
  const outDir = svelteKitConfig.kit?.outDir ?? '.svelte-kit';
  const currentHook = `${outDir}/generated/theemo-hook.server.mjs`;
  const previousHook = svelteKitConfig.kit?.files?.hooks?.server ?? 'src/hooks.server';

  (globalThis as GlobalThis).__theemoHook = {
    currentHook,
    previousHook
  };

  /** @type {import('@sveltejs/kit').Config} */
  const overrides = {
    kit: {
      files: {
        hooks: {
          server: currentHook
        }
      }
    }
  };

  return mergeConfig(svelteKitConfig, overrides) as Config;
}

function makeResolver(resolve: (source: string) => Promise<ResolvedId | null>) {
  return async (source: string): Promise<string | null> => {
    const result = await resolve(source);

    // eslint-disable-next-line unicorn/no-null
    return result ? result.id : null;
  };
}

function generateServerHook(
  packages: ResolvedTheemoPackage[],
  options: Options & { fingerprint?: boolean },
  previousHook: string | undefined
): string {
  const serverHooksContent = ['// this file is auto-generated'];

  if (previousHook) {
    serverHooksContent.push(
      `import { sequence } from '@sveltejs/kit/hooks';`,
      `import * as userHooks from ${JSON.stringify(previousHook)};`,
      `import { makeHandler } from '@theemo/svelte/kit';`,
      `export const handle = sequence(makeHandler(${JSON.stringify(packages)}, ${JSON.stringify(options)}), userHooks.handle);`,
      `export default { ...userHooks, handle };`
    );
  } else {
    serverHooksContent.push(
      `import { makeHandler } from '@theemo/svelte/kit';`,
      `export const handle = sequence(makeHandler(${JSON.stringify(packages)}, ${JSON.stringify(options)}), userHooks.handle);`
    );
  }

  return serverHooksContent.join('\n');
}

function writeServerHook(contents: string, filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

function hookServerHookPlugin(options: Options): Plugin {
  let buildEnvironment = false;
  let currentHook = '';
  let previousHook: string | undefined = undefined;
  let theemoPackages: ResolvedTheemoPackage[] = [];

  return {
    name: '@theemo/svelte:hook-sveltekit',
    enforce: 'pre',

    config(_config, env) {
      buildEnvironment = env.command === 'build';

      const hookConfig = (globalThis as GlobalThis).__theemoHook;

      if (!hookConfig) {
        throw new Error(
          `[Theemo] Hook weren't hooked. Did you forget to add theemoSvelteConfig to svelte.config.js ?`
        );
      }

      currentHook = path.resolve(hookConfig.currentHook);
      previousHook = resolveEntry(hookConfig.previousHook);
    },

    async buildStart() {
      theemoPackages = await getResolvedTheemoPackages(
        makeResolver((source: string) => this.resolve(source)),
        this.warn.bind(this) as LoggingFunction
      );

      if (previousHook && fs.existsSync(previousHook)) {
        const currentDir = path.dirname(currentHook);

        previousHook = path.relative(currentDir, previousHook).replaceAll('\\', '/');
      } else {
        previousHook = undefined;
      }

      const serverHooksContent = generateServerHook(
        theemoPackages,
        { ...options, fingerprint: buildEnvironment },
        previousHook
      );

      writeServerHook(serverHooksContent, currentHook);
    }
  };
}

export function makeHandler(packages: ResolvedTheemoPackage[], options: Options): Handle {
  return async ({ event, resolve }) => {
    return await resolve(event, {
      transformPageChunk: async ({ html }) => {
        const opts = {
          ...DEFAULT_OPTIONS,
          ...options
        } as PluginOptions;
        const transforms = (await transformIndexHtml(html, opts, packages)) as {
          html: string;
          tags: HtmlTagDescriptor[];
        };

        // transform tags
        const head = [];

        for (const tag of transforms.tags) {
          const attrs = Object.entries(tag.attrs ?? {})
            .map(([k, v]) => `${k}="${v as string}"`)
            .join(' ');

          head.push(`<${tag.tag} ${attrs} />`);
        }

        return html.replace('</head>', head.join('\n') + '</head>');
      }
    });
  };
}

/**
 * Adds theemo to your vite
 * @param options Theemo options
 * @returns Theemo vite plugins
 */
export function theemoPlugin(options: Options): Plugin[] {
  return [...theemoVite(options), hookServerHookPlugin(options)];
}
