import Image from "next/image";
import Link from "next/link";
import React from "react";
interface props {
  imagUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
}
const Metric = ({
  imagUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor,
}: props) => {
  const metricContent = (
    <div className="flex items-center gap-1"> {/* Wrap the content in a flex container */}
      <Image
        src={imagUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain h-[16px] w-[16px] ${href && "rounded-full"}`}
      />
      <p className={`flex items-center gap-1 ${textStyles}`}>
        {value}
        <span className={`small-regular gap-1 line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}>
          {title}
        </span>
      </p>
    </div>
  );

  if (href) {
    return <Link href={href}>{metricContent}</Link>;
  }
  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
