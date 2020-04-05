import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledLink = styled.a`
  color: #454a5d;
  text-decoration: none;

  :hover {
    text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
    color: #f65445;
  }
`;

const CustomLink = (props) => {
  const slug = props.slug || '';
  const href = `/${slug}`;

  return (
    <Link href={href}>
      <StyledLink href={href} {...props}>
        {props.children}
      </StyledLink>
    </Link>
  );
};

export default CustomLink;
