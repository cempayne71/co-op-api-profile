const pop = function (kvp, template) {
  kvp.forEach((kv) => {
    template = template.replace(kv[0], kv[1]);
  });
  return template;
};

module.exports.pop = pop;
