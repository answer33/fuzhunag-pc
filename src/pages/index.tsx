import './index.less';
import { Redirect } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <Redirect to="/dashboard" />
    </div>
  );
}
