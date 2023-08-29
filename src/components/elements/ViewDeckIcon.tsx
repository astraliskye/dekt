import React from "react";

type Props = {
  color: string;
};

const ViewDeckIcon = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="32"
      height="32"
    >
      <rect
        width="200"
        height="40"
        x="28"
        y="138"
        rx="9.829"
        ry="8.111"
        style={{ fill: color, fillOpacity: 1, strokeWidth: 0.236236 }}
      />
      <rect
        width="200"
        height="40"
        x="28"
        y="198"
        rx="9.829"
        ry="8.111"
        style={{ fill: color, fillOpacity: 1, strokeWidth: 0.236236 }}
      />
      <rect
        width="200"
        height="40"
        x="28"
        y="78"
        rx="9.829"
        ry="8.111"
        style={{ fill: color, fillOpacity: 1, strokeWidth: 0.236236 }}
      />
      <rect
        width="200"
        height="40"
        x="28"
        y="18"
        rx="9.829"
        ry="8.111"
        style={{ fill: color, fillOpacity: 1, strokeWidth: 0.236236 }}
      />
    </svg>
  );
};

export default ViewDeckIcon;
