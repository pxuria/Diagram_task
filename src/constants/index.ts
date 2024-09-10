import { departman1, departman2, departman3, rira } from "../assets";

export const initialNodes = [
  {
    id: "1",
    type: "cardNode",
    position: { x: 0, y: 0 },
    data: {
      imageUrl: rira,
      companyName: "Company Name",
      customSize: "w-full h-[50px]",
    },
  },
  {
    id: "2",
    type: "cardNode",
    position: { x: 200, y: 250 },
    data: {
      imageUrl: departman1,
      companyName: "departman 1",
    },
  },
  {
    id: "3",
    type: "cardNode",
    position: { x: -200, y: 250 },
    data: {
      imageUrl: departman2,
      companyName: "departman 2",
    },
  },
  {
    id: "4",
    type: "cardNode",
    position: { x: 0, y: 250 },
    data: {
      imageUrl: departman3,
      companyName: "departman 3",
    },
  },
];
