import StyleAdapter from './adapter';
import { StyleTypes } from './types';
import { EffectStyleAdapter } from './effect';
import { RefNode } from '../handler';
import { FillStyleAdapter } from './fill';
import { StrokeStyleAdapter } from './stroke';

export default class StyleFactory {
  static create(type: StyleTypes, node: RefNode): StyleAdapter {
    switch (type) {
      case StyleTypes.Fill:
        return new FillStyleAdapter(node);

      case StyleTypes.Stroke:
        return new StrokeStyleAdapter(node);

      case StyleTypes.Effect:
        return new EffectStyleAdapter(node);
    }
  }
}