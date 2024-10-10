// DEVELOPMENT
// export const BASE_URL = '';
// export const SOCKET_BASE_URL = '';

// PRODUCTION
export const BASE_URL = '';
export const SOCKET_BASE_URL = '';

export const IMAGE_BASE_URL = '';
export const GOOGLE_API_KEY = '';

export const API = {
  sendOTP: 'user/sendOTP',
  verifyOTP: 'user/verify',
  verifyOTPResetPassword: 'user/verifyOTPResetPassword',
  signUp: 'user/signup',
  signIn: 'user/login',
  accountSetup: 'user/acount-setup',
  forgotPassword: 'user/forgotpassword',
  resetPassword: 'user/resetPassword',
  userMe: 'user/me',
  user: 'user/',
  updateMyPassword: 'user/updateMyPassword',
  faqGetAll: 'faq/getAll',
  logout: 'user/logout',
  getMyFavoriteLocations: 'location/myfavourite', // ?limit=10&page=1
  myNotifications: 'user/mynotifications', // ?limit=10&page=1
  mapLocations: 'location/user', // ?location=72.343361,32.046680&km=10000&search=vehari
  createLocation: 'location/create',
  reviews: 'review/', // ?page=1&limit=10&service=64bf7486a23ba6d5d80341c4
  createGallery: 'gallery/create', // /id
  createFriend: 'friend/create', // /id
  location: 'location', // /id
  getOneLocationInfo: 'location/one/user/', // /id
  favourite: 'favourite', // /id
  likePicture: 'like', // /id
  friend: 'friend', // /id
  getUserProfile: 'user/profile/', // /id
  createNotInterested: 'not-interested/create', // /id
  deleteMe: 'user/deleteMe',
  reportPost: 'report/create',
  socialLogin: 'user/socialLogin',
  myFavoriteLocation: 'location/myfavourite',
  blockUnBlock: 'block/block-user', // :id
  getBlockUser: 'block/get-all-blocked-users',
  userSearch: 'user/search',
  updateMe: 'user/updateMe',
};
