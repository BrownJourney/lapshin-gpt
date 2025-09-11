module.exports = {
  theme: {
    extend: {
      padding: {
        safe: 'env(safe-area-inset-top)', // Safari notch compensation
      },
      margin: {
        safe: 'env(safe-area-inset-top)',
      },
    },
  },
};