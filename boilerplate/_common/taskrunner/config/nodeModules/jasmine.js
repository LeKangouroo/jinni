import reporters from 'jasmine-reporters';

export default {
  random: false,
  reporter: new reporters.TerminalReporter({
    color: true,
    showStack: false,
    verbosity: 3
  }),
  stopSpecOnExpectationFailure: false
};
