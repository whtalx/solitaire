export default function getStatistics() {
  return {
    played: {
      standard: localStorage.getItem('played_standard')
        ? parseInt(localStorage.getItem('played_standard'))
        : 0,

      vegas: localStorage.getItem('played_vegas')
        ? parseInt(localStorage.getItem('played_vegas'))
        : 0,

      none: localStorage.getItem('played_none')
        ? parseInt(localStorage.getItem('played_none'))
        : 0,
    },

    won: {
      standard: localStorage.getItem('won_standard')
        ? parseInt(localStorage.getItem('won_standard'))
        : 0,

      vegas: localStorage.getItem('won_vegas')
        ? parseInt(localStorage.getItem('won_vegas'))
        : 0,

      none: localStorage.getItem('won_none')
        ? parseInt(localStorage.getItem('won_none'))
        : 0,
    },

    hiScore: {
      standard: {
        normal: localStorage.getItem('hiScore_standard_normal')
          ? parseInt(localStorage.getItem('hiScore_standard_normal'))
          : 0,

        timed: localStorage.getItem('hiScore_standard_timed')
          ? parseInt(localStorage.getItem('hiScore_standard_timed'))
          : 0,
      },

      vegas: localStorage.getItem('hiScore_vegas')
        ? parseInt(localStorage.getItem('hiScore_vegas'))
        : 0,
    },

    bestTime: localStorage.getItem('bestTime')
      ? parseInt(localStorage.getItem('bestTime'))
      : Infinity,
  };
}