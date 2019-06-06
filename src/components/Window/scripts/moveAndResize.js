export default function moveAndResize(event) {
  this.props.window.active !== this.props.name && this.props.activate(this.props.name);
  let currentWindow;
  if (!event.target.classList) {
    return;
  } else if (event.target.classList.contains('window')) {
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
  const shiftLeft =
    (this.props.name === 'solitaire'
    && this.props.window.solitaire.lastStyle) ?
      shiftX - this.props.window.solitaire.lastStyle.width / 2
    :
      currentWindow.offsetLeft;
  const shiftTop = currentWindow.offsetTop;

  const move = (event) => {
    if (
      this.props.name === 'solitaire'
      && this.props.window.solitaire.isMaximized
    ) {
      this.props.maximize('solitaire');
    }

    currentWindow.style.left = `${event.pageX - shiftX + shiftLeft}px`;
    currentWindow.style.top = `${event.pageY - shiftY + shiftTop}px`;
  }
  
  const drop = () => {
    document.removeEventListener('mousemove', move);
    this.props.move({
      window: this.props.name,
      left: currentWindow.offsetLeft,
      top: currentWindow.offsetTop,
    });
  }

  if (this.state.resize && this.props.name === 'solitaire') {
    const shiftHeight = currentWindow.clientHeight;
    const shiftWidth = currentWindow.clientWidth;
    const centrer = {
      x: currentWindow.offsetLeft + currentWindow.clientLeft + currentWindow.clientWidth / 2,
      y: currentWindow.offsetTop + currentWindow.clientTop + currentWindow.clientHeight / 2,
    };

    const setSize = () => {
      this.props.resize({
        width: currentWindow.clientWidth,
        height: currentWindow.clientHeight,
        left: currentWindow.offsetLeft,
        top: currentWindow.offsetTop,
      });
    }
  
    const resizeBottom = (event) => {
      if (
        event.pageY > document.documentElement.clientHeight
        || event.pageY < 0
      ) {
        return;
      }
      currentWindow.style.height = event.pageY - shiftY + shiftHeight + 'px';
    }
  
    const resizeTop = (event) => {
      if (
        event.pageY > document.documentElement.clientHeight
        || event.pageY < 0
      ) {
        return;
      }
  
      if (shiftY - event.pageY + shiftHeight > 37) {
        currentWindow.style.top = event.pageY - shiftY + shiftTop + 'px';
        currentWindow.style.height = shiftY - event.pageY + shiftHeight + 'px';
      }
    }
  
    const resizeRight = (event) => {
      if (
        event.pageX > document.documentElement.clientWidth
        || event.pageX < 0
        ) {
        return;
      }
      currentWindow.style.width = event.pageX - shiftX + shiftWidth + 'px';
    }
  
    const resizeLeft = (event) => {
      if (
        event.pageX > document.documentElement.clientHeight
        || event.pageX < 0
      ) {
        return;
      }
  
      if (shiftX - event.pageX + shiftWidth > 145) {
        currentWindow.style.left = event.pageX - shiftX + shiftLeft + 'px';
        currentWindow.style.width = shiftX - event.pageX + shiftWidth + 'px';
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

    switch (this.state.resize) {
      case 'nwse_resize':
        if (event.pageX < centrer.x && event.pageY < centrer.y) {
          document.addEventListener('mousemove', resizeLeftTop);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeLeftTop);
            setSize();
          }, { once: true });
        } else if (event.pageX > centrer.x && event.pageY > centrer.y) {
          document.addEventListener('mousemove', resizeRightBottom);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeRightBottom);
            setSize();
          }, { once: true });
        }
        break;
    
      case 'nesw_resize':
        if (event.pageX < centrer.x && event.pageY > centrer.y) {
          document.addEventListener('mousemove', resizeLeftBottom);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeLeftBottom);
            setSize();
          }, { once: true });
        } else if (event.pageX > centrer.x && event.pageY < centrer.y) {
          document.addEventListener('mousemove', resizeRightTop);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeRightTop);
            setSize();
          }, { once: true });
        }
        break;
    
      case 'ns_resize':
        if (event.pageY > centrer.y) {
          document.addEventListener('mousemove', resizeBottom);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeBottom);
            setSize();
          }, { once: true });
        } else if (event.pageY < centrer.y) {
          document.addEventListener('mousemove', resizeTop);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeTop);
            setSize();
          }, { once: true });
        }
        break;
    
      case 'ew_resize':
        if (event.pageX < centrer.x) {
          document.addEventListener('mousemove', resizeLeft);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeLeft);
            setSize();
          }, { once: true });
        } else if (event.pageX > centrer.x) {
          document.addEventListener('mousemove', resizeRight);
          document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resizeRight);
            setSize();
          }, { once: true });
        }
        break;

      default:
        break;
    }
  } else {
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', drop, { once: true });
  }
}
