import React from "react";

import "./Selector.css";

type Props = {
  character: string;
  selected: boolean;
  onClick: (selected: boolean) => void;
};

const Selector: React.FC<Props> = (props: Props) => {
  const { character, selected, onClick } = props;
  const color = selected ? "#f00" : "black";

  const handleOnClick = () => onClick(!selected);

  return (
    <div className="selector" style={{ color }} onClick={handleOnClick}>
      {character}
    </div>
  );
};

export default Selector;
