import { useState } from "react";
import { nodeData } from "../../types";
import ImageUploader from "../ImageUploader";

interface Props {
  onClose: () => void;
  onAddCard: (newNode: nodeData) => void;
}

const AddCard = ({ onClose, onAddCard }: Props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (title && imageFile && body) {
      const imageUrl = URL.createObjectURL(imageFile);
      onAddCard({ companyName: title, body, imageUrl, position: "Bottom" });
    } else {
      console.log("Please fill out all fields.");
    }
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  return (
    <div className="container mx-auto p-14">
      <form className="flex flex-col gap-8" onSubmit={submitHandler}>
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

        {/* body text */}
        <div className="input-group">
          <label htmlFor="body">متن دپارتمان</label>
          <input
            type="text"
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
