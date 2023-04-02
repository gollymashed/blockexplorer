import React from 'react';
import { useEffect, useState } from 'react';
import { Utils } from 'alchemy-sdk';
import BlockTransactions from './BlockTransactions';

function BlockInfo({ blockNumber, block }) {
    const [date, setDate] = useState();
    const [gasPrice, setGasPrice] = useState();

    // log all keys of block
    console.log(Object.keys(block.transactions[0]));

    useEffect(() => {
        setDate(
            new Date(block.timestamp * 1000)
                .toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                })
                .toLowerCase(),
        );
        setGasPrice(Math.round(Utils.formatUnits(parseInt(block.baseFeePerGas), 'gwei')));
    }, [block]);

    return (
        <div className="flex flex-col px-10 py-5">
            <h1 className="pb-5 text-2xl stat-value">Current Block:</h1>
            <div className="flex flex-row justify-start items-start">
                <div className="stats stats-vertical shadow">
                    <div className="stat">
                        <div className="stat-title">Block Number</div>
                        <div className="stat-value text-2xl">{blockNumber}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Timestamp</div>
                        <div className="stat-value text-2xl">{date}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Gas Price</div>
                        <div className="stat-value text-2xl">{gasPrice} gwei</div>
                    </div>
                </div>
                <BlockTransactions block={block} />
            </div>
        </div>
    );
}

export default BlockInfo;
