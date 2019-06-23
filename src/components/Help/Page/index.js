import React from 'react';
import './index.scss';
import overview from './overview';
import play from './play';
import options from './options';
import scoring from './scoring';

const pages = {
  book: overview,
  overview,
  play,
  options,
  scoring,
};

export default function Page(props) {
  const show = props.history.length > 0
      ? props.history[props.index]
      : 'overview';

  return (
    <div className="page">
      {pages[show]}
    </div>
  );
}
