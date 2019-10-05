import React from "react";
import "./HanziBox.css";

type Props = {
  character: string;
};

const HanziBox: React.FC<Props> = ({ character }: Props) => {
  return <div className="hanzi-box">{character}</div>;
};

export default HanziBox;
