import React from "react";

type Props = {
  color: string;
};

const AddCardIcon = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={38}
      height={38}
    >
      <g style={{ display: "inline" }}>
        <path
          d="M67.02 23C59.253 23 53 28.182 53 34.62v186.76c0 6.438 6.253 11.62 14.02 11.62h121.96c7.767 0 14.02-5.183 14.02-11.62V34.62c0-6.438-6.253-11.62-14.02-11.62zm55.73 65h10.5c2.632 0 4.75 2.902 4.75 6.505V118h25.251c2.63 0 4.75 2.901 4.75 6.505v6.99c0 3.604-2.12 6.505-4.75 6.505H138v23.495c0 3.604-2.118 6.505-4.75 6.505h-10.5c-2.632 0-4.75-2.901-4.75-6.505V138H92.749c-2.631 0-4.75-2.901-4.75-6.505v-6.99c0-3.604 2.119-6.505 4.75-6.505H118V94.505c0-3.603 2.118-6.505 4.75-6.505z"
          style={{
            display: "inline",
            fill: color,
            fillOpacity: 1,
            strokeWidth: 0.264583,
          }}
        />
      </g>
    </svg>
  );
};

export default AddCardIcon;
