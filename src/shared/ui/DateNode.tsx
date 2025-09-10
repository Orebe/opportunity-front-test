import React from 'react';
import BaseNode from './BaseNode';

export interface DateNodeProps {
  id: string;
  data: { isSelected: boolean };
}

const DateNode: React.FC<DateNodeProps> = ({ id, data: { isSelected = false } }) => {
  return (
    <BaseNode id={id} label={'Date'} isSelected={isSelected}>
      <div style={{ textAlign: 'center', marginTop: 8, fontWeight: 'bold', color: 'black' }}>
        {new Date().toLocaleDateString()}
      </div>
    </BaseNode>
  );
};

export default DateNode;
