module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/weather',
        permanent: true, // Set to true for a 308 permanent redirect
      },
    ];
  },
};