var append = require('append'),
    dive = require('dive'),
    fs = require('fs'),
    seek;

seek = function(dir, query, opt, found, filter) {
  var optDefault, scan, checkOrder, i;

  // If `filter` is not defined, use a filter that always returns `true`
  if (typeof filter == 'undefined')
    filter = function(file) { return true; };

  // Default options
  optDefault = {
    recursive: true,      // Recursive file walking
    caseSensitive: false, // Case insensitive search
    dotFiles: true,       // Look for "dot files" like '.gitignore'
    requireAll: true,     // Require to find all keywords so that file is
                          // matched.
    findAll: false,       // Only the first occurrence of a keyword is matched
    ignoreOrder: true,    // Ignore the order of the keywords
    separator: ' '        // String, which separates the keywords in query if
                          // query is a string.
  };

  // Override default settings
  opt = append(optDefault, opt);

  // If query is a string, split it into an array
  if (typeof query == 'string')
    query = query.split(opt.separator);

  // If case insensitive, make `query` lowercase
  if (!opt.caseSensitive)
    for (i = 0; i < query.length; i++) {
      // only for strings
      if (typeof query[i] == 'string')
        query[i] = query[i].toLowerCase();
    }

  // Checks if `match` comes after the last match in `matches`
  checkOrder = function(matches, match) {
    return matches[matches.length - 1].firstIndex < match.firstIndex
  };

  // Scan the file's `data` with `query`
  scan = function(file, data) {
    var required, i, j, fromIndex, matches, match, firstIndex, lastIndex;

    // If the file must contain all keywords
    if (opt.requireAll)
      required = query.length;
    else
      required = 0;

    // If case insensitive, make `data` lower case
    if (!opt.caseSensitive)
      data = data.toLowerCase();

    // Find keywords
    matches = [];
    for (i = 0, j = 0; i < query.length; i++, j = 0) {
      fromIndex = 0;

      // If keyword is a string
      if (typeof query[i] == 'string') {
        // If all occurrences of a keyword shall be found
        // While query is found
        while ((firstIndex = data.indexOf(query[i], fromIndex)) != -1) {
          lastIndex = firstIndex + query[i].length - 1;

          match = {
            keyword: query[i],
            firstIndex: firstIndex,
            lastIndex: lastIndex
          };

          // If the order is important, check, if the new match is not in the
          // right order, return false
          if (!opt.ignoreOrder && matches.length > 0
              && !checkOrder(matches, match))
            return false;

          // Add to `matches`
          matches.push(match);

          // decrease `required` if it's the first match of query[i]
          if (j++ == 0)
            required--;

          // If NOT all occurrences of a keyword shall be found, break the loop
          if (!opt.findAll)
            break;


          // Set fromIndex to lastIndex
          fromIndex = lastIndex;
        }
      }
      // If pattern matched data
      else if (match = data.match(query[i])) {
        // Add to matches
        matches.push(match);

        // Check order, s.o.
        if (!opt.ignoreOrder && matches.length > 0
            && !checkOrder(matches, match))
          return false;

        // decrease required
        required--;
      }
    }

    // Return the array only, if matches is longer and required is smaller than
    // zero. Otherwise return false.
    return (matches.length > 0 && required <= 0) ? matches : false;
  };

  dive(dir, { all: opt.dotFiles }, function(err, file) {
    if (err) throw err;

    // If a file is filtered out, return
    if (!filter(file)) return;

    // Open the file
    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) throw err;

      var matches;

      // Scan the file and return
      if (matches = scan(file, data))
        found(file, matches);
    });
  });
};

module.exports = seek;
