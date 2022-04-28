import React from "react";

import { AntdIconType } from "../custom-components/Icon";

interface IAppRoute {
  name: string;
  link: string;
  path: string;
  icon: AntdIconType;
  key: string;
  component: React.FC;
}
export default IAppRoute;
