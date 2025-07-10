# Changelog

## Release (2025-07-10)

* @theemo/build 1.0.1 (patch)
* @theemo/cli 1.0.1 (patch)
* @theemo/core 1.0.1 (patch)
* @theemo/ember 1.0.1 (patch)
* @theemo/figma 1.0.1 (patch)
* @theemo/style-dictionary 1.0.1 (patch)
* @theemo/svelte 1.0.1 (patch)
* @theemo/sync 1.0.1 (patch)
* @theemo/theme 1.0.1 (patch)
* @theemo/tokens 1.0.1 (patch)
* @theemo/vite 1.0.1 (patch)
* @theemo/vue 1.0.1 (patch)

#### :bug: Bug Fix
* `@theemo/theme`
  * [#1490](https://github.com/theemo-tokens/theemo/pull/1490) Fix theme manager handler ([@gossi](https://github.com/gossi))

#### :memo: Documentation
* `@theemo/ember`, `@theemo/svelte`, `@theemo/theme`, `@theemo/vite`, `@theemo/vue`
  * [#1480](https://github.com/theemo-tokens/theemo/pull/1480) Correct Links to playground ([@gossi](https://github.com/gossi))

#### :house: Internal
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/ember`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/svelte`, `@theemo/sync`, `@theemo/theme`, `@theemo/tokens`, `@theemo/vite`, `@theemo/vue`
  * [#1492](https://github.com/theemo-tokens/theemo/pull/1492) Go back to non-major-releasing ([@gossi](https://github.com/gossi))
  * [#1482](https://github.com/theemo-tokens/theemo/pull/1482) Update to `@gossi/config-*` v1 ([@gossi](https://github.com/gossi))

#### Committers: 1
- Thomas Gossmann ([@gossi](https://github.com/gossi))

## Release (2025-06-12)

* @theemo/build 1.0.0 (minor)
* @theemo/cli 1.0.0 (patch)
* @theemo/core 1.0.0 (patch)
* @theemo/ember 1.0.0 (minor)
* @theemo/figma 1.0.0 (patch)
* @theemo/style-dictionary 1.0.0 (minor)
* @theemo/svelte 1.0.0 (minor)
* @theemo/sync 1.0.0 (patch)
* @theemo/theme 1.0.0 (minor)
* @theemo/tokens 1.0.0 (minor)
* @theemo/vite 1.0.0 (minor)
* @theemo/vue 1.0.0 (minor)

#### :boom: Breaking Change
* [#1339](https://github.com/theemo-tokens/theemo/pull/1339) Build theme ([@gossi](https://github.com/gossi))
* [#1312](https://github.com/theemo-tokens/theemo/pull/1312) Drop CJS ([@gossi](https://github.com/gossi))
* [#1311](https://github.com/theemo-tokens/theemo/pull/1311) Drop support for `node@18` ([@gossi](https://github.com/gossi))

#### :rocket: Enhancement
* `@theemo/svelte`, `@theemo/theme`, `@theemo/vite`
  * [#1414](https://github.com/theemo-tokens/theemo/pull/1414) Support Svelte + SvelteKit ([@gossi](https://github.com/gossi))
* `@theemo/vite`
  * [#1409](https://github.com/theemo-tokens/theemo/pull/1409) Improve Vite, drop `{{theemo}}` replacement ([@gossi](https://github.com/gossi))
* `@theemo/vue`
  * [#1403](https://github.com/theemo-tokens/theemo/pull/1403) Add Vue integration ([@gossi](https://github.com/gossi))
* `@theemo/theme`, `@theemo/tokens`
  * [#1380](https://github.com/theemo-tokens/theemo/pull/1380) Polish API and enhance APIdocs ([@gossi](https://github.com/gossi))
* `@theemo/style-dictionary`
  * [#1378](https://github.com/theemo-tokens/theemo/pull/1378) Enhance API and APIdocs ([@gossi](https://github.com/gossi))
  * [#1370](https://github.com/theemo-tokens/theemo/pull/1370) Rename Transforms, Remove obsolete ones ([@gossi](https://github.com/gossi))
* `@theemo/ember`, `@theemo/theme`
  * [#1366](https://github.com/theemo-tokens/theemo/pull/1366) Clearer API for theme manager ([@gossi](https://github.com/gossi))
* `@theemo/theme`, `@theemo/vite`
  * [#1365](https://github.com/theemo-tokens/theemo/pull/1365) Don't expose filePath html file ([@gossi](https://github.com/gossi))
* `@theemo/theme`
  * [#1361](https://github.com/theemo-tokens/theemo/pull/1361) Validate feature default option against allowed options ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/ember`, `@theemo/theme`
  * [#1358](https://github.com/theemo-tokens/theemo/pull/1358) Rework theme API ([@gossi](https://github.com/gossi))
* `@theemo/ember`
  * [#1352](https://github.com/theemo-tokens/theemo/pull/1352) Introduce `@theemo/ember` package ([@gossi](https://github.com/gossi))
* Other
  * [#1339](https://github.com/theemo-tokens/theemo/pull/1339) Build theme ([@gossi](https://github.com/gossi))
  * [#1335](https://github.com/theemo-tokens/theemo/pull/1335) Add option to `skipTypeForReferences` when sync from figma ([@gossi](https://github.com/gossi))
  * [#1308](https://github.com/theemo-tokens/theemo/pull/1308) Support Style Dictionary v4 ([@gossi](https://github.com/gossi))
  * [#1305](https://github.com/theemo-tokens/theemo/pull/1305) Establish Theme Handling ([@gossi](https://github.com/gossi))
  * [#1296](https://github.com/theemo-tokens/theemo/pull/1296) Add vite package ([@gossi](https://github.com/gossi))

#### :bug: Bug Fix
* `@theemo/style-dictionary`
  * [#1435](https://github.com/theemo-tokens/theemo/pull/1435) Fix `theemo` transform group ([@gossi](https://github.com/gossi))

#### :memo: Documentation
* `@theemo/build`, `@theemo/cli`, `@theemo/ember`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/svelte`, `@theemo/sync`, `@theemo/theme`, `@theemo/tokens`, `@theemo/vite`, `@theemo/vue`
  * [#1436](https://github.com/theemo-tokens/theemo/pull/1436) Docs for v1 ([@gossi](https://github.com/gossi))
* `@theemo/theme`, `@theemo/tokens`
  * [#1380](https://github.com/theemo-tokens/theemo/pull/1380) Polish API and enhance APIdocs ([@gossi](https://github.com/gossi))
* `@theemo/style-dictionary`
  * [#1378](https://github.com/theemo-tokens/theemo/pull/1378) Enhance API and APIdocs ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/theme`, `@theemo/vite`
  * [#1364](https://github.com/theemo-tokens/theemo/pull/1364) More API docs comments ([@gossi](https://github.com/gossi))

#### :house: Internal
* Other
  * [#1441](https://github.com/theemo-tokens/theemo/pull/1441) Update release-plan workflows ([@gossi](https://github.com/gossi))
  * [#1439](https://github.com/theemo-tokens/theemo/pull/1439) Version internal packages (required for `pnpm publish`) ([@gossi](https://github.com/gossi))
  * [#1405](https://github.com/theemo-tokens/theemo/pull/1405) Fix Github Action Setup ([@gossi](https://github.com/gossi))
  * [#1350](https://github.com/theemo-tokens/theemo/pull/1350) Fix turbo ([@gossi](https://github.com/gossi))
  * [#1349](https://github.com/theemo-tokens/theemo/pull/1349) Make `@theemo/theme` public ([@gossi](https://github.com/gossi))
  * [#1328](https://github.com/theemo-tokens/theemo/pull/1328) Use native declaration map support from tsdown ([@gossi](https://github.com/gossi))
  * [#1327](https://github.com/theemo-tokens/theemo/pull/1327) Update typedoc ([@gossi](https://github.com/gossi))
  * [#1313](https://github.com/theemo-tokens/theemo/pull/1313) Clean up Deps and `package.json` files ([@gossi](https://github.com/gossi))
  * [#1310](https://github.com/theemo-tokens/theemo/pull/1310) Add support for declaration maps ([@gossi](https://github.com/gossi))
  * [#1309](https://github.com/theemo-tokens/theemo/pull/1309) Use `tsdown` for `tsup` ([@gossi](https://github.com/gossi))
  * [#1297](https://github.com/theemo-tokens/theemo/pull/1297) fix release-plan ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/ember`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/svelte`, `@theemo/sync`, `@theemo/theme`, `@theemo/tokens`, `@theemo/vite`, `@theemo/vue`
  * [#1438](https://github.com/theemo-tokens/theemo/pull/1438) Revert "Prepare Release (#1026)" ([@gossi](https://github.com/gossi))
  * [#1026](https://github.com/theemo-tokens/theemo/pull/1026) Prepare Release ([@github-actions[bot]](https://github.com/apps/github-actions))
  * [#1437](https://github.com/theemo-tokens/theemo/pull/1437) Prepare 1.0 ([@gossi](https://github.com/gossi))
* `@theemo/theme`
  * [#1407](https://github.com/theemo-tokens/theemo/pull/1407) Reactivate lint for `@theemo/theme` package ([@gossi](https://github.com/gossi))
  * [#1360](https://github.com/theemo-tokens/theemo/pull/1360) Fix test types ([@gossi](https://github.com/gossi))
  * [#1359](https://github.com/theemo-tokens/theemo/pull/1359) Reorganize Playground ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/ember`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `@theemo/theme`, `@theemo/tokens`, `@theemo/vite`, `@theemo/vue`
  * [#1406](https://github.com/theemo-tokens/theemo/pull/1406) Update node version to `>=20.11` ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `@theemo/theme`, `@theemo/tokens`, `@theemo/vite`
  * [#1404](https://github.com/theemo-tokens/theemo/pull/1404) Update to `vitest@3.2.1` and improve test organization ([@gossi](https://github.com/gossi))
  * [#1351](https://github.com/theemo-tokens/theemo/pull/1351) Move packages ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/ember`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `@theemo/theme`, `@theemo/tokens`, `@theemo/vite`
  * [#1362](https://github.com/theemo-tokens/theemo/pull/1362) Tidy things up ([@gossi](https://github.com/gossi))

#### Committers: 2
- Thomas Gossmann ([@gossi](https://github.com/gossi))
- [@github-actions[bot]](https://github.com/apps/github-actions)

## Release (2024-08-04)

@theemo/build 0.2.4 (patch)
@theemo/cli 0.2.4 (patch)

#### :bug: Bug Fix
* `@theemo/build`, `playground-theme`
  * [#1022](https://github.com/theemo-tokens/theemo/pull/1022) Fix value duplication in `package.json` for `theemo build` ([@gossi](https://github.com/gossi))

#### Committers: 1
- Thomas Gossmann ([@gossi](https://github.com/gossi))

## Release (2024-08-04)

@theemo/build 0.2.3 (patch)
@theemo/cli 0.2.3 (patch)
@theemo/core 0.0.2 (patch)
@theemo/figma 0.2.3 (patch)
@theemo/style-dictionary 0.2.3 (patch)
@theemo/sync 0.2.3 (patch)
@theemo/tokens 0.2.3 (patch)

#### :bug: Bug Fix
* `@theemo/build`, `@theemo/cli`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `playground-theme`
  * [#1020](https://github.com/theemo-tokens/theemo/pull/1020) Remove glibberish in package.json for theemo build ([@gossi](https://github.com/gossi))

#### :house: Internal
* `@theemo/core`, `playground-theme`, `super-theemo-theme`
  * [#1016](https://github.com/theemo-tokens/theemo/pull/1016) Use release-plan ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `@theemo/theme`, `@theemo/tokens`, `@theemo/fixtures`
  * [#1014](https://github.com/theemo-tokens/theemo/pull/1014) Update Configs ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `@theemo/tokens`, `playground-theme`, `super-theemo-theme`
  * [#1013](https://github.com/theemo-tokens/theemo/pull/1013) From volta to corepack ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `@theemo/theme`, `@theemo/tokens`
  * [#903](https://github.com/theemo-tokens/theemo/pull/903) Update Configs ([@gossi](https://github.com/gossi))

#### Committers: 1
- Thomas Gossmann ([@gossi](https://github.com/gossi))




## v0.2.2 (2024-01-23)

#### :rocket: Enhancement
* `@theemo/figma`
  * [#730](https://github.com/theemo-tokens/theemo/pull/730) Publish Types for Config ([@gossi](https://github.com/gossi))
* `@theemo/style-dictionary`
  * [#729](https://github.com/theemo-tokens/theemo/pull/729) Publish W3C Token Parser ([@gossi](https://github.com/gossi))

#### :bug: Bug Fix
* `@theemo/sync`
  * [#733](https://github.com/theemo-tokens/theemo/pull/733) Remove Lexer Defaults ([@gossi](https://github.com/gossi))

#### :memo: Documentation
* `@theemo/build`, `@theemo/cli`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `@theemo/tokens`
  * [#736](https://github.com/theemo-tokens/theemo/pull/736) API Documentation ([@gossi](https://github.com/gossi))
  * [#731](https://github.com/theemo-tokens/theemo/pull/731) Use vitepress + typedoc for api docs ([@gossi](https://github.com/gossi))

#### :house: Internal
* `theemo`
  * [#727](https://github.com/theemo-tokens/theemo/pull/727) Remove Outdated Stuff ([@gossi](https://github.com/gossi))

#### Committers: 1
- Thomas Gossmann ([@gossi](https://github.com/gossi))

## v0.2.1 (2023-11-06)

#### :bug: Bug Fix
* `@theemo/figma`
  * [#718](https://github.com/theemo-tokens/theemo/pull/718) Fix parsing `0` value ([@gossi](https://github.com/gossi))

#### Committers: 1
- Thomas Gossmann ([@gossi](https://github.com/gossi))

## v0.2.0 (2023-09-28)

#### :rocket: Enhancement
* `@theemo/style-dictionary`
  * [#705](https://github.com/theemo-tokens/theemo/pull/705) Provide `theemo` as `transformGroup` to Style Dictionary ([@gossi](https://github.com/gossi))
  * [#704](https://github.com/theemo-tokens/theemo/pull/704) Provide style dictionary transform for shadows to css ([@gossi](https://github.com/gossi))

#### :bug: Bug Fix
* `@theemo/style-dictionary`
  * [#706](https://github.com/theemo-tokens/theemo/pull/706) Create references for constrained values ([@gossi](https://github.com/gossi))
  * [#699](https://github.com/theemo-tokens/theemo/pull/699) Omit `comment` in Style Dictionary Writer ([@gossi](https://github.com/gossi))
* `@theemo/figma`, `@theemo/tokens`
  * [#703](https://github.com/theemo-tokens/theemo/pull/703) Parse all variable types value + type ([@gossi](https://github.com/gossi))
* `@theemo/build`, `@theemo/cli`, `@theemo/core`, `@theemo/figma`, `@theemo/style-dictionary`, `@theemo/sync`, `@theemo/tokens`
  * [#702](https://github.com/theemo-tokens/theemo/pull/702) Enable intellisense for `defineConfig()` ([@gossi](https://github.com/gossi))

#### :house: Internal
* `@theemo/style-dictionary`
  * [#701](https://github.com/theemo-tokens/theemo/pull/701) Switch Testing Theme to Playground ([@gossi](https://github.com/gossi))

#### Committers: 1
- Thomas Gossmann ([@gossi](https://github.com/gossi))

