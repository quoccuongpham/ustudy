// ----------------------------------------------------------------------

let data = window.localStorage.getItem('account') ?? '{}';
data = JSON.parse(data);

export const account = {
  displayName: data?.name ?? 'Demo User',
  email: data?.email ?? 'demo@minimals.cc',
  photoURL: data?.avatarUrl ?? '/assets/images/avatars/avatar_25.jpg',
};
