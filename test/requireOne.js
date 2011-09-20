var seek = require('../');

seek(process.cwd(), 'seek console', { requireAll: false },
    function(file, matches) {
  console.log('\nMatched: '+file+'\nMatches:');
  console.log(matches);
  console.log();
});
