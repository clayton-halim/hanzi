import React from "react";

import data from "../../data/hanzi.json";
import SelectorPanel from "./SelectorPanel";

const SelectorPanelContainer: React.FC = () => <SelectorPanel data={data} />;

export default SelectorPanelContainer;
