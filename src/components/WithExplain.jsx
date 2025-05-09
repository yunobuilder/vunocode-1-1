import React from 'react';
import ExplainButton from './ExplainButton';
export default function WithExplain({ children, code }) {
  return (
    <div className="relative">
      {children}
      <div className="absolute top-2 right-2">
        <ExplainButton code={code} />
      </div>
    </div>
  );
}
