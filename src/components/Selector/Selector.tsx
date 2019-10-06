import React, { useState } from "react";

import "./Selector.css";

type Props = {
  character: string;
  onClick: (selected: boolean) => void;
};

const Selector: React.FC<Props> = (props: Props) => {
  const [selected, setSelected] = useState(false);
  const color = selected ? "#f00" : "black";

  const onClick = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    props.onClick(newSelected);
  };

  return (
    <div className="selector" style={{ color }} onClick={onClick}>
      {props.character}
    </div>
  );
};

export default Selector;
