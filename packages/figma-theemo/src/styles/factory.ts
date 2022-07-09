import { RefNode } from '../nodes/types';
import StyleAdapter from './adapter';
import { EffectStyleAdapter } from './effect';
import { FillStyleAdapter } from './fill';
import { StrokeStyleAdapter } from './stroke';
import { TextStyleAdapter } from './text';
import { StyleTypes } from './types';
import Container from '../container/index';

export default class StyleFactory {
  static create(type: StyleTypes, node: RefNode, container: Container): StyleAdapter {
    switch (type) {
      case StyleTypes.Fill:
        return new FillStyleAdapter(node, container);

      case StyleTypes.Stroke:
        return new StrokeStyleAdapter(node, container);

      case StyleTypes.Effect:
        return new EffectStyleAdapter(node, container);
      
      case StyleTypes.Text:
        return new TextStyleAdapter(node, container);
    }
  }
}