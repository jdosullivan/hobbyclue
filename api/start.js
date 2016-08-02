#!/usr/bin/env node

/*Rubymine debugging doesn't work when piping is enabled. We set an environment variables
 in it the debug configuration to detect it and skip piping altogether*/
if (process.env.NODE_ENV !== 'production'  && !process.env.ISRUBYMINE) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}
require('../server.babel'); // babel registration (runtime transpilation for node)
require('./index');