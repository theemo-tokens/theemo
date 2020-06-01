export type COLLECTION = 'paint' | 'effect' | 'text';
export type STYLES = 'text' | 'fill' | 'stroke' | 'effect';

export enum StyleTypes {
  Fill = 'fill',
  Stroke = 'stroke',
  Effect = 'effect',
  Text = 'text'
}

export const ALL_STYLES = [StyleTypes.Text, StyleTypes.Fill, StyleTypes.Stroke, StyleTypes.Effect];