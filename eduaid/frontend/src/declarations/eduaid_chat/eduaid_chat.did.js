export const idlFactory = ({ IDL }) => {
  const Message = IDL.Record({
    'at' : IDL.Nat64,
    'text' : IDL.Text,
    'sender' : IDL.Variant({ 'bot' : IDL.Null, 'user' : IDL.Null }),
  });
  const Reply = IDL.Record({
    'suggestions' : IDL.Vec(IDL.Text),
    'reply' : IDL.Text,
  });
  return IDL.Service({
    'history' : IDL.Func([IDL.Nat], [IDL.Vec(Message)], ['query']),
    'ping' : IDL.Func([], [IDL.Text], ['query']),
    'sendWebMessage' : IDL.Func([IDL.Text], [Reply], []),
  });
};
export const init = ({ IDL }) => { return []; };
