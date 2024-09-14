import { useDiagram } from "../../store/useDiagram";

interface Props {
  imageUrl: string;
  body: string;
  companyName: string;
  customSize?: string;
  nodeId: string;
}

const Card = ({ imageUrl, companyName, body, customSize, nodeId }: Props) => {
  const { deleteNode } = useDiagram();
  return (
    <div className="bg-white rounded-lg py-2 px-3 text-center flex flex-col items-center gap-4">
      <img src={imageUrl} alt={companyName} className={`w-full ${customSize || "h-[70px] object-cover"} rounded`} />
      <h2 className="text-lg font-semibold text-nowrap">{companyName}</h2>

      <p className="text-xs font-normal text-gray-600">{body}</p>

      <div className="flex w-full justify-end">
        {nodeId !== "1" && (
          <button
            onClick={() => deleteNode(nodeId)}
            type="button"
            className="outline-none border-none bg-red-600 text-white py-1 w-1/2 rounded hover:bg-red-500 transition-all ease-in duration-200 font-medium text-sm"
          >
            حذف
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
