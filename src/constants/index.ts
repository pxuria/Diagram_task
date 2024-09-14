import { departman1, departman2, departman3, rira } from "../assets";

export const initialNodes = [
  {
    id: "1",
    type: "cardNode",
    position: { x: 0, y: 0 },
    data: {
      imageUrl: rira,
      companyName: "ریرا فراگیر",
      body: "",
      customSize: "h-[45px] object-contain",
      position: "Bottom",
    },
  },
  {
    id: "2",
    type: "cardNode",
    position: { x: 200, y: 250 },
    data: {
      imageUrl: departman1,
      companyName: "دپارتمان 1",
      body: "",
      position: "Top",
    },
  },
  {
    id: "3",
    type: "cardNode",
    position: { x: -200, y: 250 },
    data: {
      imageUrl: departman2,
      companyName: "دپارتمان 2",
      body: "",
      position: "Top",
    },
  },
  {
    id: "4",
    type: "cardNode",
    position: { x: 0, y: 250 },
    data: {
      imageUrl: departman3,
      companyName: "دپارتمان 3",
      body: "",
      position: "Top",
    },
  },
];

export const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e1-4", source: "1", target: "4" },
];
