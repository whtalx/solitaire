import React, { Component } from 'react';
import './index.scss';
import overview from './overview';
import play from './play';
import options from './options';
import scoring from './scoring';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastIndex: this.props.index,
    }

    this.isPageScrollable = () => {
      this.refs.page.clientHeight === this.refs.page.parentElement.clientHeight
        ? this.props.isPageScrollable(false)
        : this.props.isPageScrollable(true);
    }

    this.pages = {
      book: overview,
      overview,
      play,
      options,
      scoring: scoring(this.isPageScrollable.bind(this)),
    };
  }

  componentDidUpdate() {
    if (this.refs.page) {
      if (
        this.props.index !== this.state.lastIndex
        && this.refs.page.parentElement.scrollTop !== 0
      ) {
        this.refs.page.parentElement.scrollTop = 0;
      }
    }

    this.isPageScrollable();
    this.props.index !== this.state.lastIndex
      && this.setState({ lastIndex: this.props.index });
  }

  render() {
    const show = this.props.history.length > 0
      ? this.props.history[this.props.index]
      : 'overview';

    return (
      <div className="page" ref="page">
        {this.pages[show]}
      </div>
    );
  }
}
