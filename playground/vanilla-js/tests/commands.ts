/// <reference types="@vitest/browser/providers/playwright" />
/// <reference types="@vitest/browser/providers/webdriverio" />

import { ColorScheme } from '@theemo/theme'
import { BrowserCommand } from 'vitest/node'

function isEmulationSupported(providerName: string) {
  return ['playwright', 'webdriverio'].includes(providerName);
}

export const canEmulateColorScheme: BrowserCommand<[]> = (ctx) => {
  return isEmulationSupported(ctx.provider.name);
}

export const emulateColorScheme: BrowserCommand<[colorScheme: ColorScheme]> = async (ctx, colorScheme) => {
  if (ctx.provider.name === 'playwright') {
    await ctx.page.emulateMedia({ colorScheme: colorScheme });
  }

  else if (ctx.provider.name === 'webdriverio') {
    await ctx.browser.emulate('colorScheme', colorScheme);
  }
}

declare module '@vitest/browser/context' {
  interface BrowserCommands {
    canEmulateColorScheme: () => Promise<boolean>;
    emulateColorScheme: (colorsScheme: ColorScheme) => Promise<void>;
  }
}