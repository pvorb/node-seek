**seek** is a function that allows to recursively search through files in a
directory. It's perfect for providing a search form on your website if the
website does only consist of static files.

```javascript
seek(directory, query, options, found[, filter[, complete]]);
```

*   `directory` is the pathname of a readable directory.
*   `query` is either a string consisting of the keywords to search for or an
    array of strings and regular expressions.
*   `options` is an object that redefines some of the default properties.

    The default options are as follows:

    ```javascript
    {
      recursive: true,      // - Recursive file walking. If set to false,
                            //   subdirectories of directory will be ignored.
      caseSensitive: false, // - Case insensitive search
      dotFiles: true,       // - Don't ignore "dot files" like '.gitignore'
      requireAll: true,     // - Require to find all keywords so that a file is
                            //   matched.
      findAll: false,       // - Only the first occurrence of a keyword is
                            //   matched. Set this to true, if you want to match
                            //   all occurrences of a keyword in the file.
      ignoreOrder: true,    // - Ignore the order of the keywords. Use with
                            //   care! Only works with findAll set to false.
      separator: ' ',       // - String, which separates the keywords query if
                            //   query is a string.
      bufferSize: 64 * 1024 // - The buffer size used (twice) for a file.
                            //   Decrease this value for a smaller memory
                            //   footprint when you are seeking for large files.
    }
    ```
*   `found` is passed two arguments `(file, matches)` where `file` is the
    pathname of the file that has been found and `matches` is an array. The
    array may contain objects or arrays. The objects are returned when you
    search for strings. They look something like this:

    ```javascript
    {
      keyword: 'foo', // - the keyword that has been found
      firstIndex: 43, // - the index of the first character of the keyword in
                      //   the file
      lastIndex: 45,  // - the index of the last character of the keyword in the
                      //   file
    }
    ```

    The arrays look like the regular results of a regular expression match. They
    only occur when `query` is an array and contains a regular expression.
*   `filter [optional]` is passed one argument `(file)`. You may filter files
    out by providing a condition in this file. A file is left out, if `filter`
    returns `false`.
*   `complete [optional]` is passed no arguments. This callback is called, when
    the search is over.

## Installation

Using npm:

```bash
npm install -g seek
```

## Usage

```javascript
var seek = require('seek');

seek(process.cwd(), 'seek require', {}, function(file, matches) {
  console.log(file);
  console.log(matches);
}, function(file) {
  return /\.(html|txt|xml)$/i.test(file);
  // Only look for files that end with '.html', '.txt', or '.xml'.
});
```

For more examples, look at the
[tests](//github.com/pvorb/node-seek/tree/master/test).

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at
[github](//github.com/pvorb/node-seek/issues).

## License

MIT License
