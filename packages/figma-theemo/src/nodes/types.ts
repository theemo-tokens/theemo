// there is a mismatch between types and documentation
// according to docs: `GroupNode` has styles
// according to types: `GroupNode` does NOT have styles
// type RefNode = GroupNode | ComponentNode | InstanceNode | VectorNode | StarNode | LineNode | EllipseNode | PolygonNode | RectangleNode | TextNode;
export type RefNode = ComponentNode | InstanceNode | VectorNode | StarNode | LineNode | EllipseNode | PolygonNode | RectangleNode | TextNode;
