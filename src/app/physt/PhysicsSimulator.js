"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Ball from "./ball";  
import { trainDynamicModel, predictLanding, suggestBetterLaunch } from "./AIModel";

const Sketch = dynamic(() => import("react-p5"), { ssr: false });

const PhysicsSimulator = () => {
  const ballRef = useRef(null);
  const [isLaunched, setIsLaunched] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState(null);
  const [userData, setUserData] = useState([]);  // ✅ Fix: Hooks inside the function
  const [aiSuggestion, setAiSuggestion] = useState({ suggestedVx: 0, suggestedVy: 0 });

  useEffect(() => {
    trainDynamicModel(setModel, userData);
  }, [userData]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 400).parent(canvasParentRef);
    if (!ballRef.current) { 
      ballRef.current = new Ball(50, 350, 10); 
    }
  };

  const draw = (p5) => {
    p5.background(220);

    if (isLaunched && ballRef.current) {
      const moving = ballRef.current.update();
      if (!moving) setIsLaunched(false);
    }

    if (ballRef.current) {
      ballRef.current.display(p5);
    }

    if (prediction) {
      p5.fill(255, 0, 0);
      p5.ellipse(prediction, p5.height - 20, 10, 10);
      p5.text("AI Predicted Landing", prediction - 30, p5.height - 30);
    }
  };

  const mousePressed = async () => {
    if (!isLaunched && ballRef.current) {
      setIsLaunched(true);
      if (model) {
        const predictedPosition = await predictLanding(model, ballRef.current.vx, ballRef.current.vy);
        setPrediction(predictedPosition);

        // Store user data for AI training
        setUserData([...userData, {
          vx: ballRef.current.vx,
          vy: ballRef.current.vy,
          landing: predictedPosition
        }]);

        // AI suggests a better launch next time
        const newSuggestion = await suggestBetterLaunch(ballRef.current.vx, ballRef.current.vy);
        setAiSuggestion(newSuggestion);
      }
    }
  };

  return (
    <div>
      <h2>Physics AI Simulation</h2>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
      <button onClick={mousePressed} disabled={isLaunched}>Launch Ball</button>

      {/* AI Suggestions */}
      <div>
        <h3>AI-Powered Launch Advice</h3>
        <p>Try launching with:</p>
        <p><strong>Velocity:</strong> {aiSuggestion.suggestedVx.toFixed(2)}</p>
        <p><strong>Angle:</strong> {aiSuggestion.suggestedVy.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PhysicsSimulator;
