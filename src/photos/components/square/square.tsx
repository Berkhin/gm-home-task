import React, { useEffect, useRef, useState } from "react";
import { Region } from "../../../shared/types/Photo.types";
import classes from "./square.module.scss";

type Props = {
  region: Region;
  isEditMode: boolean;
  onUpdateRegion: (region: Region) => void;
};

const Square: React.FC<Props> = ({
  region,
  onUpdateRegion,
  isEditMode,
}) => {
  const cornerRef = useRef<"topLeft" | "bottomRight" | null>(null);
  const [state, setState] = useState({
    startX: 0,
    startY: 0,
  });

  const width = Math.abs(region.points[2] - region.points[0]);
  const height = Math.abs(region.points[3] - region.points[1]);

  const handleMouseMove = (e: MouseEvent) => {
    if (cornerRef.current && isEditMode && width > 5 && height > 5) {
      const deltaX = e.clientX - state.startX;
      const deltaY = e.clientY - state.startY;
      const newPoints: number[] = [...region.points];

      switch (cornerRef.current) {
        case "topLeft":
          newPoints[0] += deltaX;
          newPoints[1] += deltaY;
          break;
        case "bottomRight":
          newPoints[2] += deltaX;
          newPoints[3] += deltaY;
          break;
        default:
          break;
      }

      onResize(newPoints);
      setState((prev) => ({ ...prev, startX: e.clientX, startY: e.clientY }));
    }
  };

  const handleMouseUp = () => {
    cornerRef.current = null;
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    newCorner: "topLeft" | "bottomRight" | null
  ) => {
    e.preventDefault();
    if (newCorner) {
      setState((prevState) => ({
        ...prevState,
        startX: e.clientX,
        startY: e.clientY,
      }));
      cornerRef.current = newCorner;
    }
  };

  const onResize = (newPoints: number[]) => {
    setState((prev) => ({ ...prev, pointsState: newPoints }));
    onUpdateRegion({ ...region, points: newPoints });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cornerRef.current]);

  return (
    <div
      style={{
        left: `${region.points[0]}%`,
        top: `${region.points[1]}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
      className={classes.square_container}
    >
      {isEditMode && (
        <>
          <div
            className={classes.topLeft}
            onMouseDown={(e) => handleMouseDown(e, "topLeft")}
          ></div>
          <div
            className={classes.bottomRight}
            onMouseDown={(e) => handleMouseDown(e, "bottomRight")}
          ></div>
        </>
      )}
    </div>
  );
};

export default Square;
