import scoreFactor from './scoreFactor';

export default function setScore(state, type) {
  let score = state.status.score;  
  score += scoreFactor[state.options.scoring][type];

  if (
    state.options.scoring === 'vegas'
    && state.options.cumulative
  ) {
    localStorage.setItem('score', score);
  }

  if (state.options.scoring === 'standard' && score < 0) {
    score = 0;
  }

  return score;
}
