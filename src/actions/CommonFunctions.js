import React from 'react';

export function getBackgroundColor(priority) {
  const green = '#34A853';
  const blue = '#4286F4';
  const yellow = '#FCCA3F';
  const orange = '#FF7F00';
  const red = '#EA4335';

  switch(priority) {
    case 1: return green;
    case 2: return blue;
    case 3: return yellow;
    case 4: return orange;
    case 5: return red;
    default: return yellow;

  }
}
