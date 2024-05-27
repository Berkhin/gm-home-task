import { useCallback, useState } from "react";
import classes from "./Photo.module.scss";
import PhotoForm from "../../components/photoForm/PhotoForm";
import PhotoView from "../../components/photoView/PhotoView";
import { Image } from "../../../shared/types/Photo.types";
import PhotoService from "../../../shared/api/PhotoService";
import useFetching from "../../../shared/hooks/useFetching";
import Modal from "../../../shared/ui/modal/Modal";
import Loader from "../../../shared/ui/loader/Loader";

function Photos() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [actualPhoto, setActualPhoto] = useState<Image>();
  const [preparedPhotos, setPreparedPhotos] = useState<Image[]>([])
  const fetchData = useCallback(async () => {
    const res = await PhotoService.getAll();
    const newPraperedPhoto = res?.map((photo) => ({
      ...photo,
      image: `api/${photo.image}`,
    }));
    setPreparedPhotos(newPraperedPhoto)
    setActualPhoto(newPraperedPhoto[0]);
    return res;
  }, []);
  const  [ , isLoading, error] = useFetching(fetchData);


  const handleAddPhoto = () => {
    setIsModalVisible(true);
  };

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleChildUpdateEvent = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <Modal visible={isModalVisible} onCloseClick={onCloseModal}>
        <PhotoForm updateEvent={handleChildUpdateEvent} />
      </Modal>
      {isLoading ? (
        <div className={classes.Loader}>
          <Loader />
        </div>
      ) : (
          <>
            <div className={classes.List}>
              <h1>Photos</h1>
              <ul>
                {preparedPhotos && preparedPhotos.map((photo) => (
                  <li key={photo.id}>
                    <img
                      alt="Photo"
                      className={classes.img}
                      onClick={() => setActualPhoto(photo)}
                      src={photo.image}
                    />
                  </li>
                ))}
              </ul>
              <button onClick={handleAddPhoto}>Add</button>
            </div>
            {actualPhoto && <PhotoView photo={actualPhoto} updateEvent={handleChildUpdateEvent} />}
            {error && <h1>Error {error}</h1>}
          </>
      )}
    </div>
  );
}

export default Photos;
