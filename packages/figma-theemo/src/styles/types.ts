export type COLLECTION = 'paint' | 'effect' | 'text';

export enum StyleTypes {
  Fill = 'fill',
  Stroke = 'stroke',
  Effect = 'effect',
  Text = 'text'
}

export const STYLES = [StyleTypes.Text, StyleTypes.Fill, StyleTypes.Stroke, StyleTypes.Effect];