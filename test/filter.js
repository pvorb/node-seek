var seek = require('../');

seek(process.cwd(), 'cwd console', {}, function(file, matches) {
  console.log('\nMatched: '+file+'\nMatches:');
  console.log(matches);
  console.log();
}, function(file) { // filter function
  // only look for files that end with 'filter.js'
  return /filter\.js$/.test(file);
});
