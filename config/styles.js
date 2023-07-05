import colors from './colors';

export default {
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: colors.dark,
  },
  colors,
  heading: {
    backgroundColor: colors.yellow,
  },
  headingText: {
    fontSize: 25,
    color: colors.primaryOpacity,
    padding: 10,
    textAlign: 'center',
  },
};
