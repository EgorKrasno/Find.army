import { SVGProps } from 'react';

const FindArmyLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <path
      fill={props.fill ?? 'currentColor'}
      fillRule="evenodd"
      d="M82 41.22H51.561l-17.17 17.17H82V41.22Z"
      clipRule="evenodd"
    />
    <path
      fill={props.fill ?? 'currentColor'}
      d="M82 27.17V10H51.561l-17.17 17.17H82ZM34.39 58.39V27.17L18 43.562v14.83h16.39Z"
    />
    <path
      fill={props.fill ?? 'currentColor'}
      d="M34.39 88.83V58.39L18 74.78v14.05h16.39Z"
    />
  </svg>
);
export default FindArmyLogo;
