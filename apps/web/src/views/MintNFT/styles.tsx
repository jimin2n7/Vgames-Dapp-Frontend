import { styled } from 'styled-components'
import { Image, Card } from '@pancakeswap/uikit'

export const RoundedImage = styled(Image)`
  height: max-content;
  border-radius: ${({ theme }) => theme.radii.default};
  overflow: hidden;
  & > img {
    object-fit: contain;
  }
`

export const CardWrapper = styled(Card)`
  border-radius: 24px;
  max-width: 320px;
  width: 100%;
  z-index: 1;
`
