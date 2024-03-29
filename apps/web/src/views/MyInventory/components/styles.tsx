import { Card } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const RoundedImage = styled.div`
  border-radius: ${({ theme }) => theme.radii['8px']};
  overflow: hidden;
  & > img {
    object-fit: contain;
  }
`

export const StyledCollectibleCard = styled(Card)`
  border-radius: 8px;
  transition: opacity 200ms;

  & > div {
    border-radius: 8px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`
