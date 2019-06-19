export default function setStatistics(state, ...rest) {
  const newState = { ...state };
  rest.forEach((item) => {
    switch (item) {
      case 'won': {
        newState.statistics.won[newState.options.scoring] += 1;
        localStorage.setItem(
          `won_${newState.options.scoring}`,
          newState.statistics.won[newState.options.scoring]
        );
        break;
      }

      case 'played': {
        newState.statistics.played[newState.options.scoring] += 1;
        localStorage.setItem(
          `played_${newState.options.scoring}`,
          newState.statistics.played[newState.options.scoring]
        );
        break;
      }

      case 'score': {
        if (newState.options.scoring === 'standard') {
          if (newState.options.timed) {
            if (newState.status.time > 30) {
              newState.status.bonus = Math.floor(700000 / newState.status.time);
              newState.status.score += newState.status.bonus;
            }
  
            if (newState.statistics.hiScore.standard.timed < newState.status.score) {
              newState.statistics.hiScore.standard.timed = newState.status.score;
              localStorage.setItem(
                'hiScore_standard_timed',
                newState.statistics.hiScore.standard.timed
              );
            }
          } else if (
            !newState.options.timed
            && newState.statistics.hiScore.standard.normal < newState.status.score
          ) {
            newState.statistics.hiScore.standard.normal = newState.status.score;
            localStorage.setItem(
              'hiScore_standard_normal',
              newState.statistics.hiScore.standard.normal
            );
          }
        } else if (
          newState.options.scoring === 'vegas'
          && newState.statistics.hiScore.vegas < newState.status.score
        ) {
          newState.statistics.hiScore.vegas = newState.status.score;
          localStorage.setItem('hiScore_vegas', newState.statistics.hiScore.vegas);
        }
        break;
      }

      case 'time': {
        if (
          newState.options.timed
          && newState.statistics.bestTime > newState.status.time
        ) {
          newState.statistics.bestTime = newState.status.time;
          localStorage.setItem('bestTime', newState.statistics.bestTime);
        }

        break;
      }
    
      default:
        break;
    }
  });
  
  return newState;
}
