import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';

type Props = {
  href: string;
  children: any;
  activeClassName: string;
};

const ActiveLink = ({ href, children, activeClassName }: Props) => {
  const { locale } = useTranslation();

  const router = useRouter();
  const currentPath = `/${locale}/${router?.pathname?.split('/')[2]}`;
  let className = children?.props?.className || '';
  if (currentPath === href) {
    className = `${className} ${activeClassName}`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

ActiveLink.defaultProps = {
  activeClassName: 'active',
} as Partial<Props>;

export default ActiveLink;