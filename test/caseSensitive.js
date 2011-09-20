var seek = require('../');

seek(process.cwd(), 'Sensitive', { caseSensitive: true },
    function(file, matches) {
  console.log('\nMatched: '+file+'\nMatches:');
  console.log(matches);
  console.log();
});
