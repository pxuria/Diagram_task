import { useState } from "react";
import ImageUploader from "../ImageUploader";

interface Props {
  onClose: () => void;
}

const AddCard = ({ onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (title && imageFile) {
      // You can process the form data (title and imageFile) here
      console.log({ title, imageFile });
    } else {
      console.log("Please fill out all fields.");
    }
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file); // Save the uploaded file in the form state
  };

  return (
    <div className="container mx-auto p-14" onSubmit={submitHandler}>
      <form action="" className="flex flex-col gap-8">
        {/* title */}
        <div className="input-group">
          <label htmlFor="title">عنوان</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-[46px] border-2 border-solid border-primary rounded-md outline-none px-2 text-base"
            required
          />
        </div>

        {/* image */}
        <div className="input-group">
          <label htmlFor="image">آپلود عکس</label>
          <ImageUploader onImageUpload={handleImageUpload} />
          <span className="text-[#535353] text-sm -mt-2">* فقط یک عکس آپلود نمایید.</span>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="form-btn bg-primary hover:bg-secondary">
            افزودن
          </button>

          <button onClick={onClose} type="button" className="form-btn bg-[#FF0000] hover:bg-[#ee3535]">
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
