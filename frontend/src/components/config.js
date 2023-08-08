module.exports = {
    backendUrl: process.env.NODE_ENV === 'docker' ? 'http://backend:5000' : 'http://localhost:5000',
  };
  