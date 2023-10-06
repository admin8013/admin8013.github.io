import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const ZkEVM: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.3944 9.53278L13.7152 7.61529C13.8912 7.51343 14 7.32455 14 7.12182V3.28683C14 3.0841 13.8912 2.89522 13.7152 2.79337L10.3944 0.875873C10.2184 0.774016 9.99986 0.775005 9.82481 0.875873L6.50406 2.79337C6.32803 2.89522 6.21925 3.0841 6.21925 3.28683V10.14L3.89037 11.4839L1.56149 10.14V7.45113L3.89037 6.1072L5.42614 6.99425V5.19048L4.17517 4.46759C4.08914 4.41814 3.99025 4.39144 3.89037 4.39144C3.79049 4.39144 3.6916 4.41814 3.60556 4.46759L0.284806 6.38508C0.10878 6.48694 0 6.67582 0 6.87855V10.7135C0 10.9163 0.10878 11.1051 0.284806 11.207L3.60556 13.1245C3.78159 13.2254 3.99915 13.2254 4.17517 13.1245L7.49593 11.207C7.67196 11.1051 7.78074 10.9163 7.78074 10.7135V3.8604L7.82227 3.83666L10.1086 2.51647L12.4375 3.8604V6.54924L10.1086 7.89317L8.57483 7.0081V8.81187L9.82383 9.53278C9.99986 9.63365 10.2184 9.63365 10.3934 9.53278H10.3944Z" />
    </Svg>
  );
};

export default ZkEVM;