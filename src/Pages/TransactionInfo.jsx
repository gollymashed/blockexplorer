import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlchemyContext } from '../AlchemyContext';
import { Utils } from 'alchemy-sdk';

function TransactionInfo() {
    const [transaction, setTransaction] = useState();
    const [block, setBlock] = useState();
    const { transactionHash } = useParams();
    const alchemy = React.useContext(AlchemyContext);

    useEffect(() => {
        async function getTransaction() {
            setTransaction(await alchemy.core.getTransactionReceipt(transactionHash));
        }
        getTransaction();
    }, [transactionHash, alchemy]);

    // prevent this from running on initial render
    useEffect(() => {
        async function getBlock() {
            setBlock(await alchemy.core.getBlockWithTransactions(transaction.blockNumber));
        }
        transaction && getBlock();
    }, [transaction, alchemy]);

    console.log(transaction);

    if (transaction && block) {
        return (
            <>
                <div className="flex justify-center">
                    <div className="flex flex-col px-10 py-5">
                        <h1 className="pb-5 text-2xl stat-value">Transaction Info:</h1>
                        <table className="table table-compact">
                            <tbody>
                                <tr>
                                    <th>Transaction Hash:</th>
                                    <td>{transactionHash}</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td>{transaction?.status ? 'Success' : 'Failed'}</td>
                                </tr>
                                <tr>
                                    <th>Block Number:</th>
                                    <td>{transaction.blockNumber}</td>
                                </tr>
                                <tr>
                                    <th>Block Hash:</th>
                                    <td>{transaction.blockHash}</td>
                                </tr>
                                <tr>
                                    <th>Timestamp:</th>
                                    <td>{new Date(block.timestamp * 1000).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th>From:</th>
                                    <td>{transaction.from}</td>
                                </tr>
                                <tr>
                                    <th>To:</th>
                                    <td>{transaction.to}</td>
                                </tr>
                                <tr>
                                    <th>Gas Used:</th>
                                    <td>{parseInt(transaction.cumulativeGasUsed)}</td>
                                </tr>
                                <tr>
                                    <th>Gas Price:</th>
                                    <td>{parseFloat(Utils.formatUnits(transaction.effectiveGasPrice, 'gwei')).toFixed(3)} gwei</td>
                                </tr>
                                {/* <tr>
                                    <th>Value:</th>
                                    <td>{parseFloat(Utils.formatEther(transaction.value)).toFixed(3)}</td>
                                </tr> */}
                                <tr>
                                    <th>Confirmations:</th>
                                    <td>{transaction.confirmations}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    } else {
        return <h1>Loading...</h1>;
    }
}

export default TransactionInfo;
