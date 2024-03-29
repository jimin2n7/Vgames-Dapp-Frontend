import TradingViewChart from 'components/TradingView'
import { useConfig } from '../context/ConfigProvider'

const TRADING_VIEW_COMPONENT_ID = 'tradingview_b239c'

const TradingView = () => {
  const config = useConfig()
  return <TradingViewChart id={TRADING_VIEW_COMPONENT_ID} symbol={`BINANCE:${config?.token.symbol}USD`} />
}

export default TradingView
