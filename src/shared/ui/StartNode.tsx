import React, { memo } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export interface StartNodeProps {
  id: string;
  data: { isSelected: boolean };
}

const StartNode: React.FC<StartNodeProps> = ({ id, data: { isSelected = false } }) => {
  return (
    <BaseNode
      id={id}
      label={'Start'}
      sourcePosition={Position.Bottom}
      isSelected={isSelected}
    ></BaseNode>
  );
};

export default memo(StartNode);
