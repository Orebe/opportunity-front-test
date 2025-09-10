import React, { memo } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export interface MailNodeProps {
  id: string;
  data: { isSelected: boolean };
}

const MailNode: React.FC<MailNodeProps> = ({ id, data: { isSelected = false } }) => {
  return (
    <BaseNode
      id={id}
      label={'Mail'}
      sourcePosition={Position.Bottom}
      targetPosition={Position.Top}
      isSelected={isSelected}
    ></BaseNode>
  );
};

export default memo(MailNode);
