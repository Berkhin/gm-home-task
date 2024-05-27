import { useCallback, useState } from "react";
import classes from "./PhotoView.module.scss";
import RegionItem from "../region/RegionItem";
import { Image, Region } from "../../../shared/types/Photo.types";
import PhotoService from "../../../shared/api/PhotoService";
import useFetching from "../../../shared/hooks/useFetching";

type Props = {
  photo: Image;
  updateEvent: () => void;
};

const getNewSquare = () => {
  const newSquare = {
    id: Date.now(),
    label: "New Square",
    points: [45, 45, 55, 55],
  };
  return newSquare;
};


const PhotoView: React.FC<Props> = ({photo, updateEvent}) => {
  const [regions, setRegions] = useState<Region[]>([]);
  const globalClasses = classes.PhotoView;
  const fetchData = useCallback(async () => {
    const fetchedRegions = await PhotoService.getRegionsById(photo.id);
    setRegions(fetchedRegions.data);
    return fetchedRegions;
  }, [photo]);
  useFetching(fetchData);

  const handleCreateNewSquare = () => {
    setRegions((prev) => [...prev, getNewSquare()]);
  };

  const handleRegionsUpdate = async () => {
    const formData = new FormData();
    formData.append("id", photo.id);
    formData.append("regions", JSON.stringify(regions));
    try {
      await PhotoService.updateById(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRegion = useCallback((id: number) => {
    setRegions((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleUpdateRegion = useCallback((region: Region) => {
    setRegions((prev) =>
      prev.map((item) => (item.id === region.id ? region : item))
    );
  }, [regions]);

  const onDeleteImageClick = async () => {
    try {
      await PhotoService.deleteById(photo.id);
      updateEvent()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={globalClasses}>
      {photo && (
        <img className={classes.imgArea} src={photo.image} />
      )}
      <button onClick={handleRegionsUpdate}>Save</button>
      <button onClick={handleCreateNewSquare}>Add</button>
      <button onClick={onDeleteImageClick}>Delete</button>
      {regions.map((region) => {
        return (
          <RegionItem
            key={region.id}
            region={region}
            onDeleteClick={handleDeleteRegion}
            onUpdateRegion={handleUpdateRegion}
          />
        );
      })}
    </div>
  );
};

export default PhotoView;
