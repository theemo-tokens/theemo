import { RefNode } from '../manager/node-manager';
import StyleAdapter from './adapter';
import { EffectStyleAdapter } from './effect';
import { FillStyleAdapter } from './fill';
import { StrokeStyleAdapter } from './stroke';
import { StyleTypes } from './types';

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