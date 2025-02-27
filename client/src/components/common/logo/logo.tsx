import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      alt="logo"
      src="/logo.png"
      width={100}
      height={50}
      priority
      style={{ width: "100px", height: "auto" }}
    />
  );
};
