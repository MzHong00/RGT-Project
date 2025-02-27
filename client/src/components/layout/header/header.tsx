import { Logo } from "@/components/common/logo/logo";

import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
};
