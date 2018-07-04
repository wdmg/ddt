/*!
 * Main gruntfile
 * Homepage: http://wdmg.com.ua/
 * Author: Vyshnyvetskyy Alexsander (alex.vyshyvetskyy@gmail.com)
 * Copyright 2017 W.D.M.Group, Ukraine
 * Licensed under MIT
*/

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
			jquery: {
				src: [
					'node_modules/jquery/dist/jquery.js'
				],
				dest: 'assets/js/jquery.js'
			},
			helper: {
				src: [
					'node_modules/jquery-helper/jquery.helper.js',
					'node_modules/imagesloaded/imagesloaded.pkgd.js',
					'node_modules/jquery-helper/jquery.touch.js'
				],
				dest: 'assets/js/helper.js'
			},
			popper: {
				src: [
					'node_modules/popper.js/dist/umd/popper.js'
				],
				dest: 'assets/js/popper.js'
			},
			bootstrap: {
				src: [
					'node_modules/bootstrap/dist/js/bootstrap.js'
				],
				dest: 'assets/js/bootstrap.js'
			},
			affix: {
				src: [
					'node_modules/bootstrap-affix/assets/js/affix.js'
				],
				dest: 'assets/js/affix.js'
			},
			slider: {
				src: [
					'node_modules/bootstrap-slider/dist/bootstrap-slider.js'
				],
				dest: 'assets/js/slider.js'
			},
			qrcode: {
				src: [
					'node_modules/qr-code-and-vcard/dist/QrCode.js'
				],
				dest: 'assets/js/qrcode.js'
			},
			lightbox: {
				src: [
					'node_modules/ekko-lightbox/dist/ekko-lightbox.js'
				],
				dest: 'assets/js/lightbox.js'
			}
        },
		copy: {
			bootstrap: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/bootstrap/scss',
						src: ['**'],
						dest: 'assets/scss',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'node_modules/bootstrap/scss',
						src: 'mixins/*.scss',
						dest: 'assets/scss',
						filter: 'isFile'
					}
				]
			},
			awesome: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/font-awesome/scss',
						src: '*.scss',
						dest: 'assets/scss/font-awesome',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'node_modules/font-awesome',
						src: 'fonts/*',
						dest: 'assets/',
						filter: 'isFile'
					}
				]
			},
			roboto: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/roboto-fontface/css',
						src: ['**'],
						dest: 'assets/scss/roboto-fontface'
					},
					{
						expand: true,
						cwd: 'node_modules/roboto-fontface/fonts',
						src: ['**'],
						dest: 'assets/fonts/',
						rename: function (dest, src) {
							return dest + src.replace('-webfont', '');
						},
						filter: 'isFile'
					}
				]
			}
        },
        uglify: {
            jquery: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/jquery.js.map'
                },
                files: {
                    'assets/js/jquery.min.js': ['assets/js/jquery.js']
                }
            },
            helper: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/helper.js.map'
                },
                files: {
                    'assets/js/helper.min.js': ['assets/js/helper.js']
                }
            },
            popper: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/popper.js.map'
                },
                files: {
                    'assets/js/popper.min.js': ['assets/js/popper.js']
                }
            },
            bootstrap: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/bootstrap.js.map'
                },
                files: {
                    'assets/js/bootstrap.min.js': ['assets/js/bootstrap.js']
                }
            },
            affix: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/affix.js.map'
                },
                files: {
                    'assets/js/affix.min.js': ['assets/js/affix.js']
                }
            },
            slider: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/slider.js.map'
                },
                files: {
                    'assets/js/slider.min.js': ['assets/js/slider.js']
                }
            },
            qrcode: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/qrcode.js.map'
                },
                files: {
                    'assets/js/qrcode.min.js': ['assets/js/qrcode.js']
                }
            },
            lightbox: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/ekko-lightbox.js.map'
                },
                files: {
                    'assets/js/lightbox.min.js': ['assets/js/lightbox.js']
                }
            },
            core: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'assets/js/core.js.map'
                },
                files: {
                    'assets/js/core.min.js': ['assets/js/core.js']
                }
            }
        },
		sass: {
			style: {
				files: {
					'assets/css/ie.css': ['assets/css/ie.scss'],
					'assets/css/style.css': ['assets/css/style.scss']
				}
			}
		},
        autoprefixer: {
            dist: {
                files: {
                    'assets/css/ie.css': ['assets/css/ie.css'],
                    'assets/css/style.css': ['assets/css/style.css']
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'assets/css/ie.min.css': ['assets/css/ie.css'],
                    'assets/css/style.min.css': ['assets/css/style.css']
                }
            }
        },
		watch: {
			styles: {
				files: ['assets/css/ie.scss', 'assets/css/style.scss'],
				tasks: ['sass:style', 'cssmin'],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ['assets/js/core.js'],
				tasks: ['uglify:core'],
				options: {
					spawn: false
				},
			}
		}
    });
	
    grunt.loadNpmTasks('grunt-contrib-concat'); // npm install -g grunt-contrib-concat --save
	grunt.loadNpmTasks('grunt-contrib-uglify'); // npm install -g grunt-contrib-uglify --save
	grunt.loadNpmTasks('grunt-contrib-copy'); // npm install -g grunt-contrib-copy --save
	grunt.loadNpmTasks('grunt-contrib-sass'); // npm install -g grunt-contrib-sass --save
	grunt.loadNpmTasks('grunt-contrib-watch'); // npm install -g grunt-contrib-watch --save
	grunt.loadNpmTasks('grunt-css'); // npm install -g grunt-css --save
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // npm install -g grunt-contrib-cssmin --save
	grunt.loadNpmTasks('grunt-autoprefixer'); // npm install -g grunt-autoprefixer --save
    grunt.registerTask('default', ['concat', 'copy', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
};