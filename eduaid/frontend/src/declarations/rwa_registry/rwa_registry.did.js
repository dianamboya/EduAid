export const idlFactory = ({ IDL }) => {
  const Error = IDL.Variant({
    'NotVerified' : IDL.Null,
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
    'BadInput' : IDL.Text,
    'InvalidState' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const NeedId = IDL.Nat;
  const TokenId = IDL.Nat;
  const Result_3 = IDL.Variant({ 'ok' : TokenId, 'err' : Error });
  const NeedStatus = IDL.Variant({
    'Open' : IDL.Null,
    'Closed' : IDL.Null,
    'Proposed' : IDL.Null,
    'Funded' : IDL.Null,
    'Cancelled' : IDL.Null,
  });
  const Need = IDL.Record({
    'id' : NeedId,
    'status' : NeedStatus,
    'funded_e8s' : IDL.Nat,
    'title' : IDL.Text,
    'token' : IDL.Opt(TokenId),
    'createdAt' : IDL.Nat64,
    'tags' : IDL.Vec(IDL.Text),
    'subaccount' : IDL.Vec(IDL.Nat8),
    'description' : IDL.Text,
    'updatedAt' : IDL.Nat64,
    'category' : IDL.Text,
    'target_e8s' : IDL.Nat,
    'student' : IDL.Principal,
    'proofs' : IDL.Vec(IDL.Text),
  });
  const ContributionId = IDL.Nat;
  const Contribution = IDL.Record({
    'id' : ContributionId,
    'createdAt' : IDL.Nat64,
    'needId' : NeedId,
    'amount_e8s' : IDL.Nat,
    'donor' : IDL.Principal,
  });
  const Result_2 = IDL.Variant({ 'ok' : NeedId, 'err' : Error });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Record({
      'contributionId' : ContributionId,
      'accepted_e8s' : IDL.Nat,
      'remaining_e8s' : IDL.Nat,
    }),
    'err' : Error,
  });
  return IDL.Service({
    'add_admin' : IDL.Func([IDL.Principal], [Result], []),
    'add_sponsor' : IDL.Func([IDL.Principal], [Result], []),
    'add_student' : IDL.Func([IDL.Principal], [Result], []),
    'add_verifier' : IDL.Func([IDL.Principal], [Result], []),
    'approve_need' : IDL.Func([NeedId, IDL.Opt(IDL.Text)], [Result_3], []),
    'cancel_need' : IDL.Func([NeedId], [Result], []),
    'close_need' : IDL.Func([NeedId], [Result], []),
    'get_need' : IDL.Func([NeedId], [IDL.Opt(Need)], ['query']),
    'is_admin' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'is_sponsor' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'is_student_role' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'is_student_verified' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'is_verifier_role' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'list_contributions' : IDL.Func(
        [NeedId],
        [IDL.Vec(Contribution)],
        ['query'],
      ),
    'list_needs' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(Need)], ['query']),
    'list_needs_by_student' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(Need)],
        ['query'],
      ),
    'need_subaccount' : IDL.Func([NeedId], [IDL.Vec(IDL.Nat8)], ['query']),
    'propose_need' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Vec(IDL.Text),
          IDL.Vec(IDL.Text),
        ],
        [Result_2],
        [],
      ),
    'record_deposit' : IDL.Func(
        [NeedId, IDL.Principal, IDL.Nat],
        [Result_1],
        [],
      ),
    'register_sponsor' : IDL.Func([], [], []),
    'register_student' : IDL.Func([], [], []),
    'remove_admin' : IDL.Func([IDL.Principal], [Result], []),
    'remove_sponsor' : IDL.Func([IDL.Principal], [Result], []),
    'remove_student' : IDL.Func([IDL.Principal], [Result], []),
    'remove_verifier' : IDL.Func([IDL.Principal], [Result], []),
    'token_of_need' : IDL.Func([NeedId], [IDL.Opt(TokenId)], ['query']),
    'token_owner' : IDL.Func([TokenId], [IDL.Opt(IDL.Principal)], ['query']),
    'verify_student' : IDL.Func([IDL.Principal], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
