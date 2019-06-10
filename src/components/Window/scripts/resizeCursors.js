/*  _____________________
 * |_tl_|_____t_____|_tr_|
 * |    |           |    |
 * | l  |           |  r |
 * |____|___________|____|
 * |_bl_|_____b_____|_br_|
 * 
 */

export default function resizeCursors(event) {
  if (this.props.window.solitaire.isResizing) { return; }

  let currentWindow = null;
  if (event.target === document.getElementsByClassName('solitaire')[0]) {
    currentWindow = event.target
  } else if (event.target === document.getElementsByClassName('solitaire')[0].firstElementChild) {
    currentWindow = event.target.offsetParent;
  } else {
    this.props.window.solitaire.cursor && this.props.cursor();
    return;
  }

  const t = {
    left: currentWindow.offsetLeft + currentWindow.clientLeft,
    right: currentWindow.offsetLeft + currentWindow.clientLeft + currentWindow.clientWidth,
    top: currentWindow.offsetTop - 26,
    bottom: currentWindow.offsetTop - 26 + currentWindow.clientTop,
  };

  const b = {
    left: t.left,
    right: t.right,
    top: currentWindow.offsetTop + currentWindow.clientTop + currentWindow.clientHeight,
    bottom: currentWindow.offsetTop + 2 * currentWindow.clientTop + currentWindow.clientHeight,
  };

  const l = {
    left: currentWindow.offsetLeft,
    right: t.left,
    top: t.bottom,
    bottom: b.top,
  };

  const r = {
    left: t.right,
    right: t.right + currentWindow.clientLeft,
    top: t.bottom,
    bottom: b.top,
  };

  const tl = {
    left: l.left,
    right: l.right,
    top: t.top,
    bottom: t.bottom,
  }

  const tr = {
    left: r.left,
    right: r.right,
    top: t.top,
    bottom: t.bottom,
  }

  const bl = {
    left: l.left,
    right: l.right,
    top: b.top,
    bottom: b.bottom,
  }

  const br = {
    left: r.left,
    right: r.right,
    top: b.top,
    bottom: b.bottom,
  }

  const coordinates = {
    isInCenter: (x, y) => {
      return (
        x > l.right
        && x < r.left
        && y > t.bottom
        && y < b.top
      );
    },

    isInTop: (x, y) => {
      return (
        x > t.left
        && x < t.right
        && y > t.top
        && y < t.bottom
      );
    },

    isInBottom: (x, y) => {
      return (
        x > b.left
        && x < b.right
        && y > b.top
        && y < b.bottom
      );
    },

    isInLeft: (x, y) => {
      return (
        x > l.left
        && x < l.right
        && y > l.top
        && y < l.bottom
      );
    },

    isInRight: (x, y) => {
      return (
        x > r.left
        && x < r.right
        && y > r.top
        && y < r.bottom
      );
    },

    isInTopLeft: (x, y) => {
      return (
        x > tl.left
        && x < tl.right
        && y > tl.top
        && y < tl.bottom
      );
    },

    isInTopRight: (x, y) => {
      return (
        x > tr.left
        && x < tr.right
        && y > tr.top
        && y < tr.bottom
      );
    },

    isInBottomLeft: (x, y) => {
      return (
        x > bl.left
        && x < bl.right
        && y > bl.top
        && y < bl.bottom
      );
    },

    isInBottomRight: (x, y) => {
      return (
        x > br.left
        && x < br.right
        && y > br.top
        && y < br.bottom
      );
    },
  }

  const direction = (x, y) => {
    if (coordinates.isInCenter(x, y)) {
      return;
    } else if (coordinates.isInTop(x, y) || coordinates.isInBottom(x, y)) {
      return 'ns-resize';
    } else if (coordinates.isInLeft(x, y) || coordinates.isInRight(x, y)) {
      return 'ew-resize';
    } else if (coordinates.isInTopLeft(x, y) || coordinates.isInBottomRight(x, y)) {
      return 'nwse-resize';
    } else if (coordinates.isInTopRight(x, y) || coordinates.isInBottomLeft(x, y)) {
      return 'nesw-resize';
    }
  }

  const cursor = direction(event.pageX, event.pageY);
  if (cursor) {
    this.props.window.solitaire.cursor !== cursor && this.props.cursor(cursor);
  } else {
    this.props.window.solitaire.cursor && this.props.cursor();
  }
}
