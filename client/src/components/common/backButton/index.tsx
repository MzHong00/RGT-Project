"use client";

import { useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";

import styles from "./index.module.scss";
import { IconBox } from "../iconBox";

export const BackButton = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      className={`${className} ${styles.button}`}
      onClick={handleBack}
      {...props}
    >
      <IconBox Icon={RiArrowLeftSLine}>{children}</IconBox>
    </button>
  );
};
