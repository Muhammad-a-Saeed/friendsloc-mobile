import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../utils/theme';
import {bottomTabHeight, hp, isAndroid, isIOS, wp} from '../../helpers';
import globalStyles from '../../../globalStyles';

export const mainCommonStyles = StyleSheet.create({
  flex1: {flex: 1},
  flexGrow1: {flexGrow: 1},
  contentContainer: {paddingHorizontal: '5%', flexGrow: 1, paddingBottom: '3%'},
  itemSeperator: {marginVertical: 10},
  bottomButton: {marginTop: 40},
  paragraphText: {fontSize: 12},
});

export const homeStyles = StyleSheet.create({
  picture: {width: 50, height: 50, borderRadius: 100},
  welcomeText: {fontSize: 12},
  username: {fontFamily: FONTS.semiBold},
  userContainer: {flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: isAndroid ? 15 : undefined},
  gap3: {gap: 3},
  searchInput: {marginTop: 10, marginBottom: 7, width: '90%', alignSelf: 'center'},
  searchListView: {position: 'absolute', top: 45},
  headerAndInputContainer: {
    zIndex: 1,
    backgroundColor: COLORS.white,
    position: 'absolute',
    width: '100%',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  flex1: {flex: 1},
  addLocationIcon: {position: 'absolute', bottom: bottomTabHeight + (isIOS ? 0 : 20), right: 20},
  mapMarkerImage: {height: '100%', width: '100%', borderRadius: 100},
  marker: {width: 70, height: 70},
  makerImageTriangle: {position: 'absolute', bottom: 2, left: 20},
  sideBarContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    width: '55%',
    top: 60,
    backgroundColor: COLORS.white,
    height: hp(67),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.grey3,
  },
  sideBarTitle: {fontFamily: FONTS.semiBold, fontSize: 18},
  friendsContainer: {marginTop: 15, gap: 15},
  friend: {flexDirection: 'row', alignItems: 'center', gap: 10},
  friendImage: {width: 35, height: 35, borderRadius: 100},
  friendName: {fontFamily: FONTS.medium, fontSize: 12},
  reviewContainer: {width: '90%', alignSelf: 'center', marginTop: 15, gap: 7, flex: 1},
  locationCard: {position: 'absolute', zIndex: 1, bottom: 0, width: '90%', alignSelf: 'center', bottom: '2%'},
  noFriendText: {textAlign: 'center', fontSize: 12},
  noReviewContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  selecLocationContent: {zIndex: -1, marginTop: 60},
});

export const locationStyles = StyleSheet.create({
  desctitle: {fontFamily: FONTS.semiBold, fontSize: 16},
  mainImage: {height: 300, width: wp(100), borderBottomLeftRadius: 50, borderBottomRightRadius: 50},
  paginatedDots: {marginTop: 10},
  dotsContainer: {flexDirection: 'row', alignSelf: 'center', gap: 8},
  dotActive: {width: 25, height: 8, borderRadius: 100},
  dotInActive: {width: 8, height: 8, borderRadius: 100},
  backButton: {position: 'absolute', top: 50, left: 20},
  heartIcon: {position: 'absolute', bottom: -35, right: 10},
  locationName: {fontFamily: FONTS.semiBold, fontSize: 18},
  reviewContainer: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  reviewTitle: {fontFamily: FONTS.semiBold, fontSize: 16},
  starContainer: {flexDirection: 'row', gap: 3, alignItems: 'center'},
  locationAndShare: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10},
  locationAndtext: {flexDirection: 'row', alignItems: 'center', gap: 3, flex: 1},
  sectionMarginGap: {marginTop: 20, gap: 10},
  picturesTitle: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  pictureTitle: {fontFamily: FONTS.semiBold, fontSize: 16},
  addPicButton: {borderWidth: 1, borderRadius: 100, padding: 5, alignItems: 'center', borderColor: COLORS.primary},
  imagesContainer: {flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'space-between', marginTop: 10},
  pictureContainer: {width: wp(43), height: wp(43), borderRadius: 30},
  picture: {width: '100%', height: '100%', borderRadius: 20},
  imageViewHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: 20,
  },
  sliderFooter: {marginTop: undefined, marginBottom: 20},
  slideradduser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 10,
    padding: 5,
  },
  slideruserImage: {width: 35, height: 35, borderRadius: 100},
  sliderusername: {color: COLORS.white, fontFamily: FONTS.semiBold},
  currentLocationContainer: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  selectionLocationMapText: {fontFamily: FONTS.medium, color: 'rgba(18, 111, 207, 1)'},
  greyCircle: {backgroundColor: COLORS.grey2, padding: 10, borderRadius: 100},
  currentLocation: {position: 'absolute', bottom: 120, right: 20},
  doneBtn: {position: 'absolute', bottom: 40, width: '90%', alignSelf: 'center'},
  mapLocationHeaderContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  selectedImage: {width: '100%', height: '100%', borderRadius: 15},
  selectedImageContainer: {width: '100%', height: 150},
  imageCross: {position: 'absolute', right: 10, top: 10},
  cameraAndPublishBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
    marginTop: 30,
    alignSelf: 'center',
  },
  noPicContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  rowItem: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  reportText: {fontSize: 12, textDecorationLine: 'underline'},
  font12: {fontSize: 12, marginBottom: 15},
});

export const shareStyles = StyleSheet.create({
  shareMember: {flexDirection: 'row', alignItems: 'center', maxWidth: '90%', flexWrap: 'wrap', flexGrow: 1},
  selectedUsername: {color: COLORS.white},
  shareContainer: {flexDirection: 'row', backgroundColor: COLORS.primary, padding: 15},
});

export const reviewStyles = StyleSheet.create({
  starContainer: {width: '100%', gap: 5},
  ratingContainer: {width: '100%', marginTop: 30},
  reviewButton: {marginBottom: 20, marginTop: 10},
  yourReviewText: {fontFamily: FONTS.semiBold, fontSize: 18},
  feedbackText: {fontFamily: FONTS.medium},
  feedbackInput: {textAlignVertical: 'top', fontSize: 12},
  feedbackInputContainer: {marginTop: 10, height: 120},
  count: {fontSize: 12, marginTop: 10},
});

export const notifyStyles = StyleSheet.create({
  notificationIconAndTitleContainer: {flexDirection: 'row', alignItems: 'center', gap: 12},
  desc: {fontSize: 12},
  title: {fontFamily: FONTS.medium},
  timestamp: {fontSize: 12},
  gap5: {gap: 5},
});

export const friendRequestStyles = StyleSheet.create({
  startType: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  marginBottom10: {marginBottom: 10},
  sectionTitle: {fontFamily: FONTS.semiBold, fontSize: 16},
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {alignSelf: 'center', alignItems: 'center'},
  frndAndfollow: {flexDirection: 'row', alignItems: 'center', gap: 50},
  fullname: {fontFamily: FONTS.medium, fontSize: 16},
  outlineButton: {backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.primary, width: '70%'},
  outlineButtonText: {color: COLORS.primary},
  headTitle: {fontFamily: FONTS.semiBold, fontSize: 16},
  noLocation: {alignItems: 'center', justifyContent: 'center', flex: 1},
  noRequestContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  refreshIcon: {marginTop: 10},
  username: {fontSize: 12, color: COLORS.textGray},
  namesContainer: {marginVertical: 10, alignItems: 'center', gap: 5},
});

export const inboxStyles = StyleSheet.create({
  rowItem: {flexDirection: 'row', alignItems: 'center', gap: 10},
  padEnd5: {paddingEnd: 5},
  image: {width: 40, height: 40, borderRadius: 100, borderWidth: 1, borderColor: COLORS.primary},
  myMessageContainer: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    maxWidth: '65%',
  },
  otherMessageContainer: {
    backgroundColor: COLORS.grey1,
    padding: 10,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    maxWidth: '65%',
  },
  myMessageText: {color: COLORS.white},
  otherMessageText: {},

  myMessageMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    maxWidth: '100%',
    gap: 10,
  },
  otherMessageMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
    gap: 10,
  },
  messageTime: {fontSize: 10, color: COLORS.textGray},
  chatHeading: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  chatHeadingText: {fontSize: 12},
  inputContainer: {flexDirection: 'row', alignItems: 'center', ...globalStyles.screenPadding},
  input: {flexGrow: 1, ...globalStyles.boxShadow1, borderRadius: 14, marginEnd: 5},
  textInput: {backgroundColor: COLORS.white},
  messageImage: {width: 100, height: 100, borderRadius: 15},
  audioLeftContainer: {
    alignSelf: 'flex-start',
  },
  audioRightContainer: {
    alignSelf: 'flex-end',
  },
  alertMsg: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
  },
  mySharePostContainer: {
    minWidth: 140,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 5,
    padding: 5,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  otherSharePostContainer: {
    minWidth: 140,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 5,
    padding: 5,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.grey1,
  },
  postLoader: {width: 30, height: 30},
  postOpenText: {fontSize: 10, fontFamily: FONTS.regular, includeFontPadding: false, color: COLORS.white},
  postText: {color: COLORS.white, includeFontPadding: false, fontFamily: FONTS.medium, fontSize: 12},
});

export const settingsStyles = StyleSheet.create({
  optionContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  redText: {color: COLORS.red, fontFamily: FONTS.medium},
});

export const helpCenterStyles = StyleSheet.create({
  tabContainer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  tab: {
    color: COLORS.red,
    fontFamily: FONTS.medium,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: COLORS.grey3,
  },
  activeTab: {
    color: COLORS.red,
    fontFamily: FONTS.medium,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: COLORS.black,
  },
  tabTextActive: {fontFamily: FONTS.medium, color: COLORS.black},
  tabTextInActive: {fontFamily: FONTS.medium, color: COLORS.textGray},
  faq: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: COLORS.grey3,
    paddingVertical: 7,
  },
  faqAns: {fontSize: 12, marginTop: 15, color: COLORS.textGray},
  contactUsContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 15, gap: 10},
  chatTitle: {fontFamily: FONTS.semiBold},
  secondaryText: {color: COLORS.textGray, fontSize: 12, marginTop: 6, marginBottom: 10},
});

export const deleteAccountStyles = StyleSheet.create({
  deleteAccountText: {fontFamily: FONTS.medium, color: COLORS.red},
  inputLabel: {fontFamily: FONTS.semiBold, marginBottom: 10, marginTop: 20},
});

export const chatRoomStyles = StyleSheet.create({
  flexGrow: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: '4%',
  },

  seperator: {marginVertical: 10},

  flatList: {
    marginTop: 20,
  },

  flatListContentContainer: {
    flexGrow: 1,
    // paddingTop: 50,
  },

  micIconContainer: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.grey3,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    right: 15,
    bottom: 15,
    position: 'absolute',
  },
  micIcon: {width: 22, height: 22},
});
