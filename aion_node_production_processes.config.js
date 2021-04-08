module.exports = {
  apps : [{
    name: 'aion executor',
    cwd: './executor',
    script: 'index.js',
    watch: true
  }, 
  {
    name: 'mongodb',
    script: 'mongod',
    args: '--dbpath /var/lib/mongodb'
  }]
};
