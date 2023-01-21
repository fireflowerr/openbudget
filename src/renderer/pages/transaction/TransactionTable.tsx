import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { ChangeEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { Transaction } from '../../../common/data/transaction';
import { useStateRef } from '../../useStateRef';

const columns = ['from', 'to', 'memo', 'description', 'date', 'pending'];

export const TransactionTable = () => {
  const [stagedTransaction, setStagedTransaction, stagedTransactionRef] = useStateRef({} as any | Transaction);

  useEffect(() => {
    const enterHandler = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Enter') {
        window.electron.addTransaction({...stagedTransactionRef.current, from: 0, to: 1});
      }
    };
    document.addEventListener('keyup', enterHandler);
    return () => {
      document.removeEventListener('keyup', enterHandler);
    };
  }, []);

  const makeEventHandler: (column: string) => ChangeEventHandler<HTMLInputElement> = (column) => {
    return (event) => {
      const value = (event.target as HTMLInputElement)?.value as string;
      setStagedTransaction({
        ...stagedTransaction,
        [column]: value,
      })
    };
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label='transaction table'>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => {
              return (<TableCell key={index}>{column}</TableCell>)
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {columns.map((column, index) => {
              return (
                <TableCell key={index}>
                  <TextField placeholder={column} value={stagedTransaction[column] ?? ''} onChange={makeEventHandler(column)}/>
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
};
