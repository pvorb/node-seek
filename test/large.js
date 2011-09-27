var seek = require('../');

seek(process.cwd(), [ 'something'/*, /something/*/ ], {},
    function(file, matches) {
  console.log('\nMatched: '+file+'\nMatches:');
  console.log(matches);
  console.log();
}, function(file) {
  return /large\.txt/.test(file);
});
