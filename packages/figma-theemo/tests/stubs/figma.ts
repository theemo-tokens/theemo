// @ts-ignore
import { createFigma as baseCreateFigma } from 'figma-api-stub';

export function createFigma(config = {}) {

  let majorId = 1;
  let minorId = 1;
  const allocateId = (node, shouldIncreaseMajor?: boolean) => {
    minorId += 1;
    if (!shouldIncreaseMajor) {
      node.id = `${majorId}:${minorId}`;
    } else {
      node.id = `${majorId}:${1}`;
      majorId += 1;
    }
  };

  class BaseStyleStub implements BaseStyle {
    id: string;
    type: StyleType;
    name: string;
    description: string;
    remote: boolean = false;
    key: string;

    constructor() {
      
    }

    remove(): void {
      // throw new Error('Method not implemented.');
    }

    async getPublishStatusAsync(): Promise<PublishStatus> {
      return await 'UNPUBLISHED';
    }

  }

  class PaintStyleStub extends BaseStyleStub implements PaintStyle {
    // @ts-ignore
    type = 'PAINT' as StyleType;
    paints: readonly Paint[];
  }

  const figma = baseCreateFigma(config);
  const styles = new Map<string, BaseStyle>();
  const paintStyles = [];

  figma.getStyleById = (id) => {
    if (styles.has(id)) {
      return styles.get(id);
    }

    return null;
  };

  figma.getLocalPaintStyles = () => {
    return paintStyles;
  };

  figma.createPaintStyle = () => {
    const style = new PaintStyleStub();
    allocateId(style);
    styles.set(style.id, style);
    paintStyles.push(style);
    return style;
  };

  return figma;
}