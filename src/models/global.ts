export interface GlobalModelState {
  subMenu: { name: string; pathname: string }[];
  submenuTitle?: string;
}
export default {
  state: {
    subMenu: [],
    submenuTitle: '',
    headerTitle: '',
    userInfo: {},
  },
  reducers: {
    setSubmenu(state, { payload }) {
      return {
        ...state,
        subMenu: payload?.subMenu,
        submenuTitle: payload?.submenuTitle,
      };
    },
    setHeaderTitle(state, { payload }) {
      return {
        ...state,
        headerTitle: payload,
      };
    },
    setUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};
