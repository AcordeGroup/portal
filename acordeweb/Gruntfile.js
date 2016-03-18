//ESTA ES LA FUNCION CONTENEDORA - Contiene todo nuestro código GRUNT
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig(
    //Este es el objeto config que define cada una de las tareas a ejecutar
    {
        pkg: grunt.file.readJSON('package.json'),
        clean: ["build"],
        uglify: {
            options: {
                //Comentario que aparece en el encabezado del archivo mini de salida
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            destino: {
                files: {
                    'build/js/acorde.min.js': ['src/js/acorde.js'],
                    'build/js/bootstrap.min.js': ['src/js/bootstrap.js'],
                    'build/js/snap.svg.min.js': ['src/js/snap.svg.js']
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "build/css/acorde.css": "src/css/acorde.less" // destination file and source file
                }
            }
        },
        copy: {
            main: {
                files: 
                [
                    {
						'build/index.html':'src/index.html',
						'build/en/index.html':'src/en/index.html'
						
						},
                    {
						expand: true,
						flatten: true,
						src: ['src/documentos/**'],
						dest: 'build/documentos', filter: 'isFile'}
                ]
            },
            jquery: {
                files: [{
                    expand: true, flatten: true, filter: 'isFile',
                    src: ['bower_components/jquery/dist/jquery.min*js'],
                    dest: 'build/js'
                }]
            },
            jqueryui: {
                files: [{
                    expand: true, flatten: true, filter: 'isFile',
                    src: ['bower_components/jquery-ui/jquery-ui.min.js'],
                    dest: 'build/js'
                }]
            },
            css: {
                files: 
                [
                    {'build/css/bootstrap.css': ['src/css/bootstrap.css']},
                    {'build/css/bootstrap-theme.css': ['src/css/bootstrap-theme.css']},                    
                ]
            },
            "font-awesome": {
                files:
                [
                    {'build/css/font-awesome.min.css': ['src/font-awesome/css/font-awesome.min.css']},
                    {expand: true, flatten: true, src: ['src/font-awesome/fonts/**'], dest: 'build/fonts', filter: 'isFile'}
                ]
            },
            images: {
                files: 
                [
                    {expand: true, cwd: 'src/', src: ['images/**'], dest: 'build/', filter: 'isFile'}
                ]
                    
            }
        }
    });

    //CARGA LOS PLUGINS
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');    
    //SE REGISTRA LAS TAREAS
    grunt.registerTask('default', ['clean','less','copy','uglify']);

};