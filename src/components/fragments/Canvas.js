import React, { useRef, useState, useEffect } from 'react';

import { encode, guess } from '../../services/utils';

function Canvas () {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);

  let mouseDown = false;
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };
  let canvasOffsetLeft = 0;
  let canvasOffsetTop = 0;
  let res = '';
  let up = 0;
  let dataX;
  let dataY;

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        // canvasRef.current.addEventListener('click', cleanup());
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        canvasRef.current.addEventListener('mousemove', handleMouseMove);

        canvasOffsetLeft = canvasRef.current.offsetLeft;
        canvasOffsetTop = canvasRef.current.offsetTop;

        setContext(renderCtx);
      }
    }

  }, [context]);

  const handleMouseDown = evt => {
    mouseDown = true;

    res += 'd';

    dataX = [start.x];
    dataY = [start.y];

    start = {
      x: evt.clientX - canvasOffsetLeft,
      y: evt.clientY - canvasOffsetTop,
    };

    end = {
      x: evt.clientX - canvasOffsetLeft,
      y: evt.clientY - canvasOffsetTop,
    };
  };

  const handleMouseUp = () => {
    mouseDown = false;

    res += encode(dataX, dataY);
    up += 1;

    if (res === 'dpoint') {
      res = 'point';
    } else {
      res += 'u';
    }

    guess(res, up);

    res = '';
  };

  const handleMouseMove = evt => {
    if (mouseDown && context) {
      start = {
        x: end.x,
        y: end.y,
      };

      end = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };

      dataX.push(end.x);
      dataY.push(end.y);

      // Draw our path
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.strokeStyle = 'black';
      context.lineWidth = 3;
      context.stroke();
      context.closePath();
    }
  };

  const cleanup = () => {
    res = '';
    mouseDown = false;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    up = 0;
  };

  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={500}
        height={500}
        style={{
          border: '2px solid #000',
          marginTop: 10,
        }}
      ></canvas>
      <button onClick={() => cleanup()}>reset</button>
    </div>
  );
}

export default Canvas;
