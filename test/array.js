var seek = require('../');

seek(process.cwd(), [ 'cwd', 'process', /seek\(?/ ], {},
    function(file, matches) {
  console.log('\nMatched: '+file+'\nMatches:');
  console.log(matches);
  console.log();
});
