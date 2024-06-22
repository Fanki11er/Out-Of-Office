export const theme: Theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    orange: "#FF622F",
    lightOrange: "#FFE9DF",
    lightGray: "#F7F7F7",
    darkGray: "#818992",
    blue: "#18BCC6",
    lightRed: "#F8DDE0",
    red: "#FF4444",
    lightGreen: "#DEF5EE",
    purple: "#E8E9F3",
  },
  defaultFontFamily: "Helvetica, Arial, Sans-Serif",
  defaultFontSize: "16px",
  fontSizes: {
    textNormal: "0.8rem",
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
    darkGray: string;
    blue: string;
    lightRed: string;
    red: string;
    lightGreen: string;
    purple: string;
  };
  fontSizes: {
    textNormal: string;
    h1: string;
    h2: string;
    h3: string;
  };
  defaultFontSize: string;
  defaultFontFamily: string;
};
