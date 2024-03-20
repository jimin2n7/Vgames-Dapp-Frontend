import CollectibleCardBody from './CollectibleCardBody'
import { StyledCollectibleCard } from './styles'

const NftCard = ({ nft, ...props }) => {
  return (
    <StyledCollectibleCard {...props}>
      <CollectibleCardBody nft={nft} />{' '}
    </StyledCollectibleCard>
  )
}

export default NftCard
