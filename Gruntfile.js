var fs = require('fs');

var dstDir = '../kumabook.github.io/javascripts/';

var components = {
  vector: {
          src: 'src/vector.c',
         name: 'vector',
    functions: ['vector_construct',
                'vector_array',
                'vector_capacity',
                'vector_destruct',
                'vector_is_empty',
                'vector_size',
                'vector_push',
                'vector_pop',
                'vector_peek',
                'vector_get'
               ]
  }
};

function emccCommand(component) {
  var funcStr = component.functions.map(function(f) {
    return "'_" + f + "'";
  } ).join(",");
  return 'emcc ' + component.src + ' -o ' + dstDir + component.name + '.js' +
         ' -Iinclude' +
         ' -s EXPORTED_FUNCTIONS="[' + funcStr + ']"';
}

for (var key in components) {
  components[key].cmd = emccCommand(components[key]);
}

module.exports = function(grunt) {
  function generateBindings() {
    var objName = '__';
    var code = 'var ' + objName + ' = {};';
    code += '\n\n';
    for (var c in components) {
      var component = components[c];
      var name = component.name;
      component.functions.forEach(function(func) {
        code += objName + '["' + func + '"] = _' + func + ';\n';
      });
      var filepath = 'js/' + name + '_binding.js';
      grunt.file.write(filepath, code);
    }
  }

  grunt.loadNpmTasks('grunt-exec');
  grunt.initConfig({
    exec: components
  });
  grunt.registerTask('buildings', 'Create js building code', generateBindings);
  grunt.registerTask('vector');
  grunt.registerTask('build', ['exec', 'buildings']);
};
