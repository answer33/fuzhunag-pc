import { FC, memo } from 'react';
import { Form, Input, Button, Tooltip } from 'antd';
import styles from './index.less';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const tailLayout = {
  wrapperCol: { offset: 3, span: 21 },
};

const Psw: FC<any> = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <div
      className={styles.psw}
      style={{
        width: '100%',
        margin: 28,
        padding: 18,
        backgroundColor: '#fff',
      }}
    >
      <Form onFinish={onFinish}>
        <Form.Item
          label="原密码"
          name="username"
          rules={[{ required: true, message: '请输入原密码!' }]}
        >
          <Input style={{ width: 282 }} />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="phone"
          rules={[{ required: true, message: '请输入新密码!' }]}
        >
          <Tooltip
            title="8-20位字符，包含字母和数字，建议字母包含大小写组合。"
            visible={true}
            color="#FEEEE6"
            placement="right"
          >
            <Input style={{ width: 282 }} />
          </Tooltip>
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="phone"
          rules={[{ required: true, message: '请输入确认新密码!' }]}
        >
          <Input style={{ width: 282 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 95 }}>
            确定
          </Button>
          <Button style={{ marginLeft: 15 }}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(Psw);
