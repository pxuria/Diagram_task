import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onImageUpload: (file: File) => void;
}

export default function ImageUploader({ onImageUpload }: Props) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setUploadedImage(imageUrl);
        onImageUpload(file);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded p-4 cursor-pointer w-full min-h-[150px] flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {!uploadedImage ? (
        <p className="text-xl text-[#333]">عکس خود را اینجا بارگذاری کنید.</p>
      ) : (
        <div>
          <p>Image Uploaded</p>
          <img src={uploadedImage} alt="Uploaded" className="w-full h-auto mt-2" />
        </div>
      )}
    </div>
  );
}
