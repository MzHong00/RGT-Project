import Link from "next/link";

import { Logo } from "@/components/common/logo/logo";

import styles from "./homeCard.module.scss";

export const HomeCard = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <Link href={'/book'} className={styles.entryLink}>입장</Link>
    </div>
  );
};
