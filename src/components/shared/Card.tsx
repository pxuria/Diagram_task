interface Props {
  imageUrl: string;
  companyName: string;
  customSize?: string;
}

const Card = ({ imageUrl, companyName, customSize }: Props) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg text-center">
      <img
        src={imageUrl}
        alt={companyName}
        className={`max-w-full ${customSize || "w-[200px] h-[70px]"} rounded mb-2`}
      />
      <h2 className="text-lg">{companyName}</h2>
    </div>
  );
};

export default Card;
