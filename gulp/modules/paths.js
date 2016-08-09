/*
 * Node Dependencies
 */
var Path = require("path");

/*
 * Internal functions
 */
function relocate(path)
{
  var relocatedPath;

  // note: if path is excluded
  if (path.charAt(0) === '!')
  {
    relocatedPath = "!" + Path.resolve("../", path.substring(1));
  }
  else
  {
    relocatedPath = Path.resolve("../", path);
  }
  return relocatedPath;
}

module.exports = {

  relocate: function(p) {

    if (typeof p === "string")
    {
      return relocate(p);
    }
    else if (p instanceof Array)
    {
      return p.map(function(item) {

        return relocate(item);

      }, this);
    }
    throw new Error("unexpected param type");
  }
};
