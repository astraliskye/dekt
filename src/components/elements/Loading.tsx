import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center py-12">
      <Image
        src="/images/loading-icon.png"
        width={64}
        height={64}
        alt="loading icon"
        className="animate-spin"
      />
    </div>
  );
};

export default Loading;
