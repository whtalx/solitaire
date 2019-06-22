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
  return (
    <div className="page">
      {pages[props.selected]}
    </div>
  );
}
