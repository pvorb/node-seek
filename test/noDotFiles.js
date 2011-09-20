var seek = require('../');

seek(process.cwd(), 'cwd console', { dotFiles: false },
    function(file, matches) {
  console.log('\nMatched: '+file+'\nMatches:');
  console.log(matches);
  console.log();
});
