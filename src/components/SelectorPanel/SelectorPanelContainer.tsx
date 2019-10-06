import React from "react";

import data from "../../data/hanzi.json";
import SelectorPanel from "./SelectorPanel";
import { Props } from "./SelectorPanel";

type ContainerProps = Omit<Props, "data">;

const SelectorPanelContainer: React.FC<ContainerProps> = (
  props: ContainerProps
) => <SelectorPanel data={data} {...props} />;

export default SelectorPanelContainer;
