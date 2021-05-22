import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import BasicLayout from './BasicLayout';

export default function (props: any) {
  const pathname = props.location.pathname;
  const backList = ['/login', '/forget'];
  if (backList.includes(pathname)) {
    return (
      <ConfigProvider locale={zhCN}>
        <>{props.children}</>
      </ConfigProvider>
    );
  } else {
    return (
      <ConfigProvider locale={zhCN}>
        <BasicLayout {...props} />
      </ConfigProvider>
    );
  }
}
