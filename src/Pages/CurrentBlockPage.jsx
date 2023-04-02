import React from 'react';
import { useEffect, useState } from 'react';
import { AlchemyContext } from '../AlchemyContext';
import BlockInfo from '../Components/BlockInfo';

function CurrentBlockPage() {
    const [blockNumber, setBlockNumber] = useState();
    const [block, setBlock] = useState();

    const alchemy = React.useContext(AlchemyContext);

    useEffect(() => {
        async function getBlockNumber() {
            setBlockNumber(await alchemy.core.getBlockNumber());
        }
        getBlockNumber();
    });

    useEffect(() => {
        async function getBlock() {
            setBlock(await alchemy.core.getBlockWithTransactions(blockNumber));
        }
        getBlock();
    }, [blockNumber, alchemy]);

    return (
        <div className="flex justify-center">
            {block ? <BlockInfo blockNumber={blockNumber} block={block} /> : <h1>Loading...</h1>}
        </div>
    );
}

export default CurrentBlockPage;
