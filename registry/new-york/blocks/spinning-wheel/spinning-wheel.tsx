import { Button } from "@/components/button";
import { useState, useRef } from "react";

export type Reward =
  | {
      reward: string;
      weight?: number;
      bgColor: string;
      textColor: string;
    }
  | {
      reward: string;
      weight?: number;
    };

export function SpinningWheel({
  rewardDetails,
  disabled = false,
  radius = 200,
  setReward,
}: {
  rewardDetails: Reward[];
  disabled?: boolean;
  radius?: number;
  setReward?: (reward: string | null) => void;
}) {
  // Seperate all the properties
  const rewards = rewardDetails.map((reward) => reward.reward);
  const bgColors = rewardDetails.every((reward) => "bgColor" in reward)
    ? rewardDetails.map((reward) => reward.bgColor)
    : ["#FFF", "#000"];

  const textColors = rewardDetails.every((reward) => "textColor" in reward)
    ? rewardDetails.map((reward) => reward.textColor)
    : ["#000", "#FFF"];
  let weights = rewardDetails.map((reward) => reward?.weight || 1);
  if (!weights) {
    weights = new Array(rewards.length).fill(1);
  }

  // State variables
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [finalRotation, setFinalRotation] = useState(0);
  const wheelRef = useRef(null);

  // internal calculation variables
  const totalWeights = weights.reduce((a, b) => a + b, 0);
  const segmentAngle = 360 / rewards.length;
  const calcSegmentAngle = 360 / totalWeights;
  const calcRewards = rewards
    .map((reward, index) => new Array(weights[index]).fill(reward))
    .flat();

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    if (setReward) setReward(null);

    // Determine a random position to stop (between 2 and 5 full rotations + random segment)
    const minRotations = 5;
    const maxRotations = 7;
    const randomRotations =
      minRotations + Math.random() * (maxRotations - minRotations);
    const randomRewardIndex = Math.floor(Math.random() * totalWeights);
    const randomAngle =
      segmentAngle * rewards.indexOf(calcRewards[randomRewardIndex]);

    const totalRotation = randomRotations * 360 + randomAngle;

    // Determine the final rotation
    const newFinalRotation = rotation + totalRotation;
    setFinalRotation(newFinalRotation);

    // Determine the selected reward based on where the wheel stops
    const normalizedRotation = newFinalRotation % 360;
    const selectedIndex =
      Math.floor((360 - normalizedRotation) / calcSegmentAngle) % totalWeights;

    // Delay setting the reward to match the animation completion
    setTimeout(() => {
      if (setReward) setReward(calcRewards[selectedIndex]);
      setRotation(newFinalRotation);
      setIsSpinning(false);
    }, 5000);
  };

  // Generate wheel segments
  const renderWheel = () => {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${2 * radius} ${2 * radius}`}
        className="rounded-full"
      >
        {/* Background circle */}
        <circle cx={`${radius}`} cy={`${radius}`} r={`${radius}`} fill="#FFF" />

        {/* Segments */}
        {rewards.map((reward, index) => {
          const startAngle = index * segmentAngle;
          const endAngle = (index + 1) * segmentAngle;

          // Convert angles to radians for SVG calculations
          const startRad = ((startAngle - 90) * Math.PI) / 180;
          const endRad = ((endAngle - 90) * Math.PI) / 180;

          // Calculate points on the circle
          const x1 = radius + radius * Math.cos(startRad);
          const y1 = radius + radius * Math.sin(startRad);
          const x2 = radius + radius * Math.cos(endRad);
          const y2 = radius + radius * Math.sin(endRad);

          // Create path for segment
          const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
          const path = `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

          // Calculate text position
          const textAngle = (startAngle + endAngle) / 2;
          const textRad = ((textAngle - 90) * Math.PI) / 180;
          const textX = radius + radius * 0.7 * Math.cos(textRad);
          const textY = radius + radius * 0.7 * Math.sin(textRad);
          const textRotation =
            textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle;

          return (
            <g key={index}>
              <path
                d={path}
                fill={bgColors[index % bgColors.length]}
                stroke={textColors[index % textColors.length]}
                strokeWidth="2"
              />
              <text
                x={textX}
                y={textY}
                fontSize="16"
                fontWeight="bold"
                fill={textColors[index % textColors.length]}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${textRotation}, ${textX}, ${textY})`}
              >
                {reward}
              </text>
            </g>
          );
        })}

        {/* Center circle */}
        <circle cx={`${radius}`} cy={`${radius}`} r="30" fill="#333" />
        <text
          x={`${radius}`}
          y={`${radius}`}
          fontSize="14"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          SPIN
        </text>
      </svg>
    );
  };

  if (weights !== null && weights.length !== rewards.length) {
    throw new Error(
      "`weights` should either be null or an array with same length as the `rewards`."
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <div className="relative w-64 h-64">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full relative"
          style={{
            transform: `rotate(${finalRotation}deg)`,
            transition: isSpinning
              ? "transform 5s cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "none",
          }}
        >
          {renderWheel()}
        </div>

        {/* Pointer/Ticker */}
        <div className="absolute top-0 left-1/2 w-6 h-8 -ml-3 z-10">
          <svg width="100%" height="100%" viewBox="0 0 24 32">
            <polygon points="12,32 0,0 24,0" fill="#ffd700" />
          </svg>
        </div>
      </div>

      {/* Controls */}
      <Button onClick={spinWheel} disabled={isSpinning || disabled}>
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </Button>
    </div>
  );
}
