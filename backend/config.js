module.exports = {
    djangoUrl: process.env.NODE_ENV === 'docker' ? 'http://django:8000' : 'http://localhost:8000',
    mongodbUrl: process.env.NODE_ENV === 'docker' ? 'mongodb://mongodb/ngramdb' : 'mongodb://localhost/ngramdb',
  };
  