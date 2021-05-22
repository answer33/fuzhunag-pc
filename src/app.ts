import { history, getDvaApp, RequestConfig } from 'umi';
import routes from '@/config/roures';

// export const request: RequestConfig = {
//   errorConfig: {
//     adaptor: (resData) => {
//       return {
//         ...resData,
//         errorMessage: resData.message,
//       };
//     },
//   },
// };

export function onRouteChange() {
  const dispatch = getDvaApp()._store.dispatch;
  const currPathname = history.location.pathname;
  const index = routes.findIndex((item) =>
    currPathname.includes(item.pathname),
  );
  if (index !== -1 && routes[index].childrens) {
    dispatch({
      type: 'global/setSubmenu',
      payload: {
        subMenu: routes[index].childrens,
        submenuTitle: routes[index].submenuTitle,
      },
    });
  } else {
    dispatch({
      type: 'global/setSubmenu',
      payload: { subMenu: [] },
    });
  }
}
