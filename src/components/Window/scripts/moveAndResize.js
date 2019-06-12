export default function moveAndResize(event) {
  if (
    this.props.window.activity[this.props.window.activity.length - 1] !== this.props.name
  ) {
    this.props.activate(this.props.name);
  }

  if (
    event.button !== 0
    || this.props.window[this.props.name].isBlocked
  ) {
    return;
  }

  let currentWindow;

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

  if (this.props.window.solitaire.cursor) {
    this.props.startResizing();
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

    switch (this.props.window.solitaire.cursor) {
      case 'nwse-resize':
        if (event.pageX < centrer.x && event.pageY < centrer.y) {
          document.addEventListener('mousemove', resizeLeftTop);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeLeftTop);
            this.props.endResizing();
          }, { once: true });
        } else if (event.pageX > centrer.x && event.pageY > centrer.y) {
          document.addEventListener('mousemove', resizeRightBottom);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeRightBottom);
            this.props.endResizing();
          }, { once: true });
        }
        break;
    
      case 'nesw-resize':
        if (event.pageX < centrer.x && event.pageY > centrer.y) {
          document.addEventListener('mousemove', resizeLeftBottom);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeLeftBottom);
            this.props.endResizing();
          }, { once: true });
        } else if (event.pageX > centrer.x && event.pageY < centrer.y) {
          document.addEventListener('mousemove', resizeRightTop);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeRightTop);
            this.props.endResizing();
          }, { once: true });
        }
        break;
    
      case 'ns-resize':
        if (event.pageY > centrer.y) {
          document.addEventListener('mousemove', resizeBottom);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeBottom);
            this.props.endResizing();
          }, { once: true });
        } else if (event.pageY < centrer.y) {
          document.addEventListener('mousemove', resizeTop);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeTop);
            this.props.endResizing();
          }, { once: true });
        }
        break;
    
      case 'ew-resize':
        if (event.pageX < centrer.x) {
          document.addEventListener('mousemove', resizeLeft);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeLeft);
            this.props.endResizing();
          }, { once: true });
        } else if (event.pageX > centrer.x) {
          document.addEventListener('mousemove', resizeRight);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeRight);
            this.props.endResizing();
          }, { once: true });
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
      this.props.name === 'solitaire'
      && (
        this.props.window.solitaire.isMaximized
        || this.props.window.solitaire.isMinimized
      )
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
    
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move);
    }, { once: true });
  }
}
