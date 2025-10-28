'use client'

import { useEffect, useRef } from "react"

export const Canvas = () => {

  const CanvasRef = useRef<HTMLCanvasElement | null>(null)


  useEffect(()=>{
    const canvas = CanvasRef.current;
    if(!canvas) return

    const ctx = canvas.getContext("2d")
    if(!ctx) return

    canvas.width = 1000;
    canvas.height = 1000;

    ctx.fillStyle = "skyblue";
    ctx.fillRect(100, 100, 200, 150);

    // Draw a circle
    ctx.beginPath();
    ctx.arc(400, 300, 75, 0, Math.PI * 2);
    ctx.fillStyle = "tomato";
    ctx.fill();


      },[])




  return (
    <div>
      <canvas
        ref={CanvasRef}
        className="w-full h-screen border border-gray-400"
      />
    </div>
  )
}
