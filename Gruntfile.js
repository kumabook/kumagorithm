var fs = require('fs');

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
                'vector_peek']
  }
};

function emccCommand(component) {
  var funcStr = component.functions.map(function(f) {
    return "'_" + f + "'";
  } ).join(",");
  return 'emcc ' + component.src + ' -o ' + 'js/' + component.name + '.js' +
         ' -Iinclude' +
         ' -s EXPORTED_FUNCTIONS="[' + funcStr + ']"';
}

for (var key in components) {
  components[key].cmd = emccCommand(components[key]);
}

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-exec');
  grunt.initConfig({
    exec: components
  });
  grunt.registerTask('vector');
  grunt.registerTask('build', 'exec');
};
