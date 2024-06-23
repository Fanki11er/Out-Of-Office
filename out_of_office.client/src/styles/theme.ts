export const theme: Theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    orange: "#FF622F",
    lightOrange: "#FFE9DF",
    darkOrange: "#FB3E00",
    lightGray: "#F7F7F7",
    darkGray: "#818992",
    blue: "#18BCC6",
    lightRed: "#F8DDE0",
    red: "#FF4444",
    lightGreen: "#DEF5EE",
    green: "#13B17D",
    purple: "#E8E9F3",
    lightShadow: "rgba(0,0,0,0.1)",
    darkShadow: "rgba(0,0,0,0.5)",
  },
  defaultFontFamily: "Inter, Arial, Sans-Serif",
  defaultFontSize: "14px",
  fontSizes: {
    textSmall: "0.8rem",
    h1: "2rem",
    h2: "1.5rem",
    h3: "1.25rem",
  },
};

export type Theme = {
  colors: {
    white: string;
    black: string;
    orange: string;
    lightOrange: string;
    lightGray: string;
    darkOrange: string;
    darkGray: string;
    blue: string;
    lightRed: string;
    red: string;
    lightGreen: string;
    green: string;
    purple: string;
    lightShadow: string;
    darkShadow: string;
  };
  fontSizes: {
    textSmall: string;
    h1: string;
    h2: string;
    h3: string;
  };
  defaultFontSize: string;
  defaultFontFamily: string;
};
