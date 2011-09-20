var seek = require('../');

// console
seek(process.cwd(), 'console cwd', { ignoreOrder: false },
    function(file, matches) {
  console.log('\nMatched: '+file+'\nMatches:');
  console.log(matches);
  console.log();
});
