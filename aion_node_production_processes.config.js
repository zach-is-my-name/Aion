module.exports = {
  apps : [
{
    name: 'mongodb',
    script: 'mongod',
    args: '--dbpath /var/lib/mongodb'
  },
	{
    name: 'aion executor',
    cwd: './executor',
    script: 'index.js',
    watch: true
  } 
  ]
};
