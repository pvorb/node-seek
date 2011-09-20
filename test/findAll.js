var seek = require('../');

seek(process.cwd(), 'cwd console', { findAll: true }, function(file, matches) {
  console.log('\nMatched: '+file+'\nMatches:');
  console.log(matches);
  console.log();
});
