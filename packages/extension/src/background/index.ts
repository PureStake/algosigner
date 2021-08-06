'use strict';

(BigInt as any).prototype.toJSON = function () {
  return this.toString();
};

import Background from './background';
Background.start();
