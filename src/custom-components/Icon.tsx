import React, { FC } from "react";
import * as AllIcons from "@ant-design/icons";

export type AntdIconType = keyof typeof AllIcons;

interface IIConProps {
  className: string;
  name: AntdIconType;
}

const Icon: FC<IIConProps> = (_props) => {
  const { className, name } = _props;

  return (
    <>{React.createElement(AllIcons[name] as any, { className: className })}</>
  );
};

export default Icon;
