import scoreFactor from './scoreFactor';

export default function getScore(options) {
  let score = scoreFactor[options.scoring].start;

  if (options.scoring === 'vegas' && options.cumulative) {
    localStorage.getItem('score')
      && (score += parseInt(localStorage.getItem('score')));
    localStorage.setItem('score', score);
  }

  return score;
}
