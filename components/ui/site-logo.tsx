import Image from "next/image";
import React from "react";

type SiteLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
  alt?: string;
};

export function SiteLogo({
  className = "",
  size = 100,
  priority = false,
  alt = "Cyril Financial Group logo",
}: SiteLogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`.trim()}>
      <Image
        src="/images/Logo.png"
        alt={alt}
        width={size}
        height={size}
        style={{ width: "auto", height: "auto" }}
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}