export const idlFactory = ({ IDL }) => {
  const Timestamp = IDL.Nat64;
  const Profile = IDL.Record({
    'country' : IDL.Opt(IDL.Text),
    'username' : IDL.Text,
    'createdAt' : Timestamp,
    'email' : IDL.Opt(IDL.Text),
    'phone' : IDL.Opt(IDL.Text),
    'lastLogin' : Timestamp,
    'roles' : IDL.Vec(IDL.Text),
  });
  const ProfileInput = IDL.Record({
    'country' : IDL.Opt(IDL.Text),
    'username' : IDL.Text,
    'email' : IDL.Opt(IDL.Text),
    'phone' : IDL.Opt(IDL.Text),
    'roles' : IDL.Opt(IDL.Vec(IDL.Text)),
  });
  const UserProfiles = IDL.Service({
    'bootstrapAdmin' : IDL.Func([], [IDL.Bool], []),
    'getProfile' : IDL.Func([IDL.Principal], [IDL.Opt(Profile)], ['query']),
    'grantRole' : IDL.Func([IDL.Principal, IDL.Text], [IDL.Opt(Profile)], []),
    'listProfiles' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, Profile))],
        [],
      ),
    'registerUser' : IDL.Func([ProfileInput], [Profile], []),
    'updateLastLogin' : IDL.Func([], [IDL.Opt(Profile)], []),
  });
  return UserProfiles;
};
export const init = ({ IDL }) => { return []; };
