import React, { memo } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export interface EndNodeProps {
  id: string;
  data: { isSelected: boolean };
}

const EndNode: React.FC<EndNodeProps> = ({ id, data: { isSelected = false } }) => {
  return (
    <BaseNode
      id={id}
      label={'End'}
      isSelected={isSelected}
      targetPosition={Position.Top}
    ></BaseNode>
  );
};

export default memo(EndNode);
