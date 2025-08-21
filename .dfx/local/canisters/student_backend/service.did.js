export const idlFactory = ({ IDL }) => {
  const Donation = IDL.Record({
    'date' : IDL.Int,
    'amount' : IDL.Nat,
    'donor' : IDL.Text,
  });
  const Notification = IDL.Record({
    'createdAt' : IDL.Int,
    'message' : IDL.Text,
  });
  const Request = IDL.Record({
    'id' : IDL.Nat,
    'status' : IDL.Text,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
  });
  const Profile = IDL.Record({
    'institution' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'fundingStatus' : IDL.Text,
    'updatedAt' : IDL.Int,
    'course' : IDL.Text,
  });
  const Update = IDL.Record({ 'content' : IDL.Text, 'createdAt' : IDL.Int });
  return IDL.Service({
    'addDonation' : IDL.Func([IDL.Text, IDL.Nat], [Donation], []),
    'addNotification' : IDL.Func([IDL.Text], [Notification], []),
    'createRequest' : IDL.Func([IDL.Text], [Request], []),
    'getDonations' : IDL.Func([], [IDL.Vec(Donation)], []),
    'getNotifications' : IDL.Func([], [IDL.Vec(Notification)], []),
    'getProfile' : IDL.Func([], [IDL.Opt(Profile)], []),
    'getRequests' : IDL.Func([], [IDL.Vec(Request)], []),
    'getUpdates' : IDL.Func([], [IDL.Vec(Update)], []),
    'postUpdate' : IDL.Func([IDL.Text], [Update], []),
    'saveProfile' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [Profile],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
