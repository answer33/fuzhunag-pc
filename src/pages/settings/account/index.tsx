import { FC, memo } from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};

const Account: FC<any> = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <div
      className={styles.account}
      style={{
        width: '100%',
        margin: 28,
        padding: 18,
        backgroundColor: '#fff',
      }}
    >
      <Form onFinish={onFinish}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input style={{ width: 282 }} />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ required: true, message: '请输入手机号!' }]}
        >
          <Input style={{ width: 282 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button style={{ marginLeft: 15 }}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(Account);
