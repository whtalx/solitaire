import React from 'react';
import './index.scss';

export default function Bsod() {
  return (
    <div className="bsod">
      <p>A problem has been detected and Solitaire has been shut down to prevent damage to your computer.</p>
      <p>If this is the first time you've seen this stop error screen, do not attempt to close Solitaire further.</p>
      <p>Press F5 or refresh this page in any other way to make it as it should be.</p>
      <p>If problems continue, you have to admit that you are nasty and you shouldn't do such things that surely will break some other things.</p>
      <p>Technical information:</p>
      <p>*** STOP: 0x00000007 (0x00000000, 0x00000000, 0x00000000, 0x00000000)</p>
      <p>*** sol.exe -  STOP PRESSING RANDOM BUTTONS FOR PITY'S SAKE</p>
    </div>
  );
}
