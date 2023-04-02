import React from 'react';
import { Utils } from 'alchemy-sdk';
import { useHistory } from 'react-router-dom';

function BlockTransactions({ block }) {
    const history = useHistory();

    const handleTransactionClick = (txHash) => {
        history.push(`/transaction/${txHash}`);
    };
    return (
        <div className="pl-12 overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tx Hash</th>
                        <th>From</th>
                        <th>To</th>
                        <th className="flex justify-end items-end pl-5">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {!block.transactions.isEmpty &&
                        block.transactions.map((tx, index) => {
                            return (
                                <tr
                                    key={index}
                                    onClick={() => handleTransactionClick(tx.hash)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <th>{index + 1}</th>
                                    <td>{tx.hash.slice(0, 15)}...</td>
                                    <td>
                                        {tx.from.slice(0, 7)}...{tx.from.slice(-7)}
                                    </td>
                                    <td>
                                        {tx.to.slice(0, 7)}...{tx.to.slice(-7)}
                                    </td>
                                    <td className="flex justify-end items-end">
                                        {parseFloat(Utils.formatEther(tx.value)).toFixed(3)}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Tx Hash</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default BlockTransactions;
