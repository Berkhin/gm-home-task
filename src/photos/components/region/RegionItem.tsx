import { memo, useState } from "react";
import classes from "./RegionItem.module.scss";
import Square from "../square/square";
import { Region } from "../../../shared/types/Photo.types";
import Input from "../../../shared/ui/input/Input";
import Button from "../../../shared/ui/button/Button";

type Props = {
  region: Region;
  onDeleteClick: (id: number) => void;
  onUpdateRegion: (region: Region) => void;
};

const RegionItem: React.FC<Props> = ({
  region,
  onDeleteClick,
  onUpdateRegion,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [lableValue, setLableValue] = useState(region.label);

  const handleDoneClick = () => {
    setIsEditMode(false);
    onUpdateRegion({ ...region, label: lableValue });
  };

  const toolTipPosition = {
    left: `${region.points[0] + Math.abs(region.points[2] - region.points[0])}%`,
    top: `${region.points[1]}%`,
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          className={classes.region}
          style={{
            left: toolTipPosition.left,
            top: toolTipPosition.top,
          }}
        >
          <p>id: {region.id}</p>
          <p>label: {lableValue}</p>
          {isEditMode && (
            <Input
              type="text"
              placeholder="label"
              value={lableValue}
              onChange={(e) => setLableValue(e.target.value)}
            />
          )}
          <div className={classes.buttonsBlock}>
            <Button
              isActive={isEditMode}
              onClick={isEditMode ? handleDoneClick : () => setIsEditMode(true)}
            >
              {isEditMode ? "Done" : "Edit"}
            </Button>
            <Button onClick={() => onDeleteClick(region.id)}>Delete</Button>
          </div>
        </div>
      )}
      <Square
        key={region.id}
        region={region}
        onUpdateRegion={onUpdateRegion}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default memo(RegionItem);
