import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.4,
  headerFontFamily: ["Bebas Neue", "Merriweather"],
  bodyFontFamily: ["Source Sans Pro"],
  headerGray: 10,
  bodyGray: 15,
  scaleRatio: 2
});

// Output CSS as string.
typography.toString();

export default typography;
