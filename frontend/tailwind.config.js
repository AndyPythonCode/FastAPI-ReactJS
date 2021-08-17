module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
        mini: "8rem",
      },
      maxWidth: {
        maxi: "12rem",
      },
      height: {
        "my-screen": "80vh",
        "my-screen-2": "75vh",
        "my-screen-3": "65vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
