interface Props {
  imageUrl: string;
  companyName: string;
  customSize?: string;
}

const Card = ({ imageUrl, companyName, customSize }: Props) => {
  return (
    <div className="bg-white rounded-lg py-2 px-3 text-center flex flex-col items-center gap-4">
      <img src={imageUrl} alt={companyName} className={`w-full ${customSize || "h-[70px] object-cover"} rounded`} />
      <h2 className="text-lg font-semibold text-nowrap">{companyName}</h2>
    </div>
  );
};

export default Card;
