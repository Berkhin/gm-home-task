import { ChangeEvent, useState } from "react";
import classes from "./PhotoForm.module.scss";
import PhotoService from "../../../shared/api/PhotoService";

type Props = {
  updateEvent: () => void;
}

const PhotoForm: React.FC<Props> = ({updateEvent}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingState, setUploadingState] = useState<string | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("regions", JSON.stringify([]));
      await PhotoService.addNewImage(formData).then((res) => {
        setUploadingState(res.statusText);
      });
      updateEvent();
    } catch (error) {
      setUploadingState(`${error.message}(${error.code})`);
    }
  };

  return (
    <div className={classes.uploadPhotoForm}>
      {previewUrl && (
        <img className={classes.photoPreview} src={previewUrl} alt="Preview" />
      )}
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      {uploadingState && <p>{uploadingState}</p>}
    </div>
  );
};

export default PhotoForm;
