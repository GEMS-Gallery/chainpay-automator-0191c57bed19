export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const WalletInfo = IDL.Record({
    'id' : IDL.Text,
    'balance' : IDL.Float64,
    'createdAt' : Time,
  });
  const Result_1 = IDL.Variant({ 'ok' : WalletInfo, 'err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Float64, 'err' : IDL.Text });
  const Transaction = IDL.Record({
    'id' : IDL.Text,
    'recipient' : IDL.Text,
    'timestamp' : Time,
    'amount' : IDL.Float64,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Vec(Transaction), 'err' : IDL.Text });
  return IDL.Service({
    'createWallet' : IDL.Func([], [Result_1], []),
    'fundWallet' : IDL.Func([IDL.Float64], [Result_2], []),
    'getTransactionHistory' : IDL.Func([], [IDL.Vec(Transaction)], ['query']),
    'getWalletInfo' : IDL.Func([], [Result_1], ['query']),
    'sendMassPayout' : IDL.Func([IDL.Vec(IDL.Text), IDL.Float64], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
