import type { IconType } from "@react-icons/all-files";

import styles from "./index.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
  Icon: IconType;
}

export const IconBox = ({
  Icon,
  children,
  className,
  ...props
}: Props) => (
  <div className={`${styles.container} ${className}`} {...props}>
    {Icon && <Icon/>}
    {children}
  </div>
);
