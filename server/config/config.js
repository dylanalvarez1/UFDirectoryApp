//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there
//old db = mongodb://CEN3031:CEN3031TA@ds111963.mlab.com:11963/uf-directory2
//new db = mongodb://<dbuser>:<dbpassword>@ds157522.mlab.com:57522/uf-directory
module.exports = {
  db: {
    uri: 'mongodb://CEN3031:CEN3031TA@ds157522.mlab.com:57522/uf-directory', 
  }, 
  port: process.env.PORT || 8080
};