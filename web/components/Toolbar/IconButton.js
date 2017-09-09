import React from 'react'
import styled from 'react-emotion'
import Link from 'next/link'

import Icon from '../Icon'

const makeIconWrapper = tag => styled(tag)`
  display: flex;
  cursor: pointer;
  background: transparent;
  text-decoration: none;
  cursor: pointer;

  border: none;
  outline: none;
  appearance: none;

  transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  opacity: ${props => props.opacity || 0.85};
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.30));

  &:hover {
    transform: scale(1.2);
    opacity: 1;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
  }

`

const IconLinkAnchor = makeIconWrapper('a')
const IconButtonWrapper = makeIconWrapper('div')

export const IconLink = ({icon, href, prefetch, size, opacity}) => (
  <Link href={href} passHref prefetch={prefetch}>
    <IconLinkAnchor size={size} opacity={opacity}>
      <Icon i={icon} />
    </IconLinkAnchor>
  </Link>
)

export const IconButton = ({icon, size = 1.5, opacity}) => (
  <IconButtonWrapper opacity={opacity}>
    <Icon i={icon} size={size} />
  </IconButtonWrapper>
)
