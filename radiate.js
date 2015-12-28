'use strict';

const fs = require('fs');
const env = process.env.NODE_ENV;

if (!env) {
  console.error('ENV must be defined');
  process.exit();
}

module.exports = {
  build: function(r) {
    r.exec('./node_modules/gulp/bin/gulp.js', ['build']);
  },
  deploy: function(r) {
    r.set('development', {
      host: '< Hostname >',
      user: 'www',
      destination: '/www/',
      baseDir: '/www/',
      flags: ['archive', 'verbose', 'delete-before'],
      key: fs.readFileSync('./config/keys/www_rsa'),
      shell: 'ssh -i ./config/keys/www_rsa -oIdentitiesOnly=yes -oStrictHostKeyChecking=no',
      exclude: ['./config/keys'],
      source: [
        'server',
        'node_modules',
        'build',
        'config',
        'package.json',
        'compose-development.yml'
      ]
    });

    r.deploy(env, function() {
      let cmd = [
        'NODE_ENV=' + env,
        'COMPOSE_FILE=compose-' + env + '.yml',
        'docker-compose up -d --force-recreate'
      ];
      r.remote(env, cmd.join(' '));
    });
  }
}
