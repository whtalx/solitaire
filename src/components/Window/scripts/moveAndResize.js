export default function moveAndResize(event) {
  if (
    this.props.name === 'solitaire'
    && this.props.game.status.isCelebrating
  ) {
    this.props.stopCelebrating();
    return;
  }
  
  if (this.props.window.activity[this.props.window.activity.length - 1] !== this.props.name) {
    this.props.activate(this.props.name);
  }

  if (event.button !== 0 || this.props.window[this.props.name].isBlocked) {
    return;
  }

  let currentWindow = null;

  if (event.target.classList.contains('window')) {
    currentWindow = event.target;
  } else if (
    event.target.classList.contains('window__header')
    || event.target.classList.contains('window__icon')
    || event.target.classList.contains('window__caption')
  ) {
    currentWindow = event.target.parentElement;
  } else {
    return;
  }

  const shiftX = event.pageX;
  const shiftY = event.pageY;
  const shiftLeft = currentWindow.offsetLeft;
  const shiftTop = currentWindow.offsetTop;
  const setListeners = (func) => {
    !this.props.window.isCursorFreezed && this.props.freezeCursor(true);
    document.addEventListener('mousemove', func);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', func);
      this.props.window.isCursorFreezed && this.props.freezeCursor(false);
    }, { once: true });
  }

  if (this.props.window.cursor) {
    if (!this.props.window[this.props.name].isResizable) { return; }

    const shiftHeight = currentWindow.clientHeight;
    const shiftWidth = currentWindow.clientWidth;
    const resizeBottom = (event) => {
      if (
        event.pageY > document.documentElement.clientHeight
        || event.pageY < 0
      ) {
        return;
      }

      this.props.resize({
        window: this.props.name,
        top: currentWindow.offsetTop,
        height: event.pageY - shiftY + shiftHeight
      });
    }
  
    const resizeTop = (event) => {
      if (
        event.pageY > document.documentElement.clientHeight
        || event.pageY < 0
      ) {
        return;
      }
  
      if (shiftY - event.pageY + shiftHeight > 37) {
        this.props.resize({
          window: this.props.name,
          top: event.pageY - shiftY + shiftTop,
          height: shiftY - event.pageY + shiftHeight,
        });
      }
    }
  
    const resizeRight = (event) => {
      if (
        event.pageX > document.documentElement.clientWidth
        || event.pageX < 0
        ) {
        return;
      }

      this.props.resize({
        window: this.props.name,
        left: currentWindow.offsetLeft,
        width: event.pageX - shiftX + shiftWidth,
      });
    }
  
    const resizeLeft = (event) => {
      if (
        event.pageX > document.documentElement.clientHeight
        || event.pageX < 0
      ) {
        return;
      }
  
      if (shiftX - event.pageX + shiftWidth > 145) {
        this.props.resize({
          window: this.props.name,
          left: event.pageX - shiftX + shiftLeft,
          width: shiftX - event.pageX + shiftWidth,
        });
      }
    }
  
    const resizeLeftTop = (event) => {
      resizeLeft(event);
      resizeTop(event);
    }
  
    const resizeRightBottom = (event) => {
      resizeRight(event);
      resizeBottom(event);
    }
  
    const resizeLeftBottom = (event) => {
      resizeLeft(event);
      resizeBottom(event);
    }
  
    const resizeRightTop = (event) => {
      resizeRight(event);
      resizeTop(event);
    }

    const centrer = {
      x: currentWindow.offsetLeft + currentWindow.clientLeft + currentWindow.clientWidth / 2,
      y: currentWindow.offsetTop + currentWindow.clientTop + currentWindow.clientHeight / 2,
    };

    switch (this.props.window.cursor) {
      case 'nwse-resize':
        if (event.pageX < centrer.x && event.pageY < centrer.y) {
          setListeners(resizeLeftTop);
        } else if (event.pageX > centrer.x && event.pageY > centrer.y) {
          setListeners(resizeRightBottom);
        }
        break;
    
      case 'nesw-resize':
        if (event.pageX < centrer.x && event.pageY > centrer.y) {
          setListeners(resizeLeftBottom);
        } else if (event.pageX > centrer.x && event.pageY < centrer.y) {
          setListeners(resizeRightTop);
        }
        break;
    
      case 'ns-resize':
        if (event.pageY > centrer.y) {
          setListeners(resizeBottom);
        } else if (event.pageY < centrer.y) {
          setListeners(resizeTop);
        }
        break;
    
      case 'ew-resize':
        if (event.pageX < centrer.x) {
          setListeners(resizeLeft);
        } else if (event.pageX > centrer.x) {
          setListeners(resizeRight);
        }
        break;

      default:
        break;
    }
  } else if (
    event.target.classList.contains('window__header')
    || event.target.classList.contains('window__icon')
    || event.target.classList.contains('window__caption')
  ) {
    if (
      this.props.window[this.props.name].isMaximized
      || this.props.window[this.props.name].isMinimized
    ) {
      return;
    }

    const move = (event) => {
      this.props.move({
        window: this.props.name,
        left: event.pageX - shiftX + shiftLeft,
        top: event.pageY - shiftY + shiftTop,
      });
    }

    setListeners(move);
  }
}
