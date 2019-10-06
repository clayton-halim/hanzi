import React, { useState } from "react";

import "./Selector.css";

type Props = {
  character: string;
};

const Selector: React.FC<Props> = (props: Props) => {
  const [selected, setSelected] = useState(false);
  const color = selected ? "#f00" : "black";
  return (
    <div className="selector" style={{ color }}>
      {props.character}
    </div>
  );
};

export default Selector;
