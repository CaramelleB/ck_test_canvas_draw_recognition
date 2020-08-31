import React, { useState, useRef, useEffect } from 'react';
import NeonButton from './NeonButton'


function Canvas() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const width = 500
  const height = 400

  const up = 0

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = '#f321e9'
    context.lineWidth = 20
    contextRef.current = context;
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
   contextRef.current.closePath()
   setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const reset = () => { 
    contextRef.current.closePath()
    setIsDrawing(false)
    contextRef.current.clearRect(0, 0, width, height);
  }

  return (
    <div>
    <NeonButton action={reset} text='Clear All' />
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      style={{
            border: '2px solid #000',
            marginTop: 10,
          }}
    />
    </div>
  );
}

export default Canvas;