// import React from 'react';

export function getBackgroundColor(priority) {
  const wellDone = '#F74D4D'; // high priority
  const mediumWell = '#F78B4D';
  const medium = '#F6A94D'; // medium priority
  const rare = '#F8C74E';
  const raw = '#CDBD34'; // low priority

  switch(priority) {
    case 1: return wellDone;
    case 2: return mediumWell;
    case 3: return medium;
    case 4: return rare;
    case 5: return raw;
    default: return medium;

  }
}

export function makeID() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
