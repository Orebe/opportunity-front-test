import React, { memo } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export interface SmsNodeProps {
  id: string;
  data: { isSelected: boolean };
}

const SmsNode: React.FC<SmsNodeProps> = ({ id, data: { isSelected = false } }) => {
  return (
    <BaseNode
      id={id}
      label={'Sms'}
      sourcePosition={Position.Bottom}
      targetPosition={Position.Top}
      isSelected={isSelected}
    ></BaseNode>
  );
};

export default memo(SmsNode);
