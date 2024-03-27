export default function button() {
  return {
    defaultProps: {
      disableElevation: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        fontWeight: 500,
        borderRadius: 24,
      },
    },
  }
}
