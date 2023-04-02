import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

const AlchemyContext = React.createContext();

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function AlchemyProvider({ children }) {
    return <AlchemyContext.Provider value={alchemy}>{children}</AlchemyContext.Provider>;
}

export { AlchemyContext, AlchemyProvider };
