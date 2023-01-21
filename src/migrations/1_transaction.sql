CREATE TABLE ob_transaction (
  transactionId INTEGER PRIMARY KEY,
  transactionTo INTEGER NOT NULL,
  transactionFrom INTEGER NOT NULL,
  transactionMemo VARCHAR(255),
  transactionDate INTEGER,
  transactionPending INTEGER
);
