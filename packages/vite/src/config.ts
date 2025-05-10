import type { TheemoOptions } from '@theemo/theme';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type Options = WithRequired<TheemoOptions, 'defaultTheme'>;

export type PluginOptions = Required<TheemoOptions>;
