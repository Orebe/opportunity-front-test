import React, { memo, ReactNode } from 'react';
import './BaseNode.css';
import { Handle, Position } from 'reactflow';
import clsx from 'clsx';

export interface BaseNodeProps {
  id: string;
  label: string;
  sourcePosition?: Position;
  targetPosition?: Position;
  isSelected?: boolean;
  children?: ReactNode;
}

const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  label,
  targetPosition,
  sourcePosition,
  isSelected = false,
  children,
}) => {
  return (
    <div className={clsx('base-node-container', { selected: isSelected })} id={id}>
      {targetPosition && <Handle type="target" position={targetPosition} />}
      <span className="base-node-label">{label}</span>
      {children}
      {sourcePosition && <Handle type="source" position={sourcePosition} />}
    </div>
  );
};

export default memo(BaseNode);
