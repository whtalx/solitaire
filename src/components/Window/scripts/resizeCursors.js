/*  _____________________
 * |_tl_|_____t_____|_tr_|
 * |    |           |    |
 * | l  |           |  r |
 * |____|___________|____|
 * |_bl_|_____b_____|_br_|
 * 
 */

export default function resizeCursors(event) {
  if (
    this.props.window[this.props.name].isBlocked
    || this.props.window[this.props.name].isMaximized
    || this.props.window[this.props.name].isMinimized
    || this.props.window.isCursorFreezed
  ) {
      return;
    }

  let currentWindow = null;
  if (event.target.classList.contains('window')) {
    currentWindow = event.target
  } else if (event.target.classList.contains('window__header')) {
    currentWindow = event.target.offsetParent;
  } else {
    this.props.window.cursor !== null
      && this.props.changeCursor({ window: this.props.name, cursor: null });
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

  const cursorDirection = (x, y) => {
    if (
      x >= l.right
      && x <= r.left
      && y >= t.bottom
      && y <= b.top
    ) {
      return;
    } else if (
      (
        x >= t.left
        && x <= t.right
        && y >= t.top
        && y <= t.bottom
      ) || (
        x >= b.left
        && x <= b.right
        && y >= b.top
        && y <= b.bottom
      )
    ) {
      return 'ns-resize';
    } else if (
      (
        x >= l.left
        && x <= l.right
        && y >= l.top
        && y <= l.bottom
      ) || (
        x >= r.left
        && x <= r.right
        && y >= r.top
        && y <= r.bottom
      )
    ) {
      return 'ew-resize';
    } else if (
      (
        x >= tl.left
        && x <= tl.right
        && y >= tl.top
        && y <= tl.bottom
      ) || (
        x > br.left
        && x <= br.right
        && y >= br.top
        && y <= br.bottom
      )
    ) {
      return 'nwse-resize';
    } else if (
      (
        x >= bl.left
        && x <= bl.right
        && y >= bl.top
        && y <= bl.bottom
      ) || (
        x >= tr.left
        && x <= tr.right
        && y >= tr.top
        && y <= tr.bottom
      )
    ) {
      return 'nesw-resize';
    }
  }

  const cursor = cursorDirection(event.pageX, event.pageY);

  if (cursor !== undefined) {
    this.props.window.cursor !== cursor
      && this.props.changeCursor({ window: this.props.name, cursor });
  } else {
    this.props.window.cursor !== null
      && this.props.changeCursor({ window: this.props.name, cursor: null });
  }
}
