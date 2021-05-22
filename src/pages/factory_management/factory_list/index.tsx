import { FC, memo, useState } from 'react';
import {
  Button,
  Form,
  Table,
  Input,
  DatePicker,
  Cascader,
  Col,
  Row,
  Modal,
  Select,
  Upload,
  message,
} from 'antd';
import Tags from '@/components/Tags';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import options from '@/utils/address';
import styles from './index.less';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const dataSource = [
  {
    factory_id: '961180319019',
    order_date: '2021-03-25',
    name: 'zh张三',
    factory_name: 'xxxxx公司',
    phone: '13600001234',
    address: '广东省珠海市香洲区港乐路8号B区110室',
    order_num: 1000,
    price: 2000,
    status: 0,
  },
];

const orderTimeList = [
  {
    id: 0,
    text: '今天',
  },
  {
    id: 3,
    text: '近3天',
  },
  {
    id: 7,
    text: '近7天',
  },
];

interface Result {
  total: number;
  list: any[];
}

const getTableData = (
  { current, pageSize }: PaginatedParams[0],
  formData: Object,
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  console.log(1111, formData);
  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const FactoryList: FC<any> = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });
  const { submit, reset } = search;
  const columns: any[] = [
    {
      title: '工厂名称',
      dataIndex: 'factory_name',
      render: (text: any, record: any) => {
        return <span>{text}</span>;
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '主体负责人',
      dataIndex: 'name',
      render: (text, record) => {
        return (
          <div>
            <p>{text}</p>
            <p>{record.phone}</p>
          </div>
        );
      },
    },
    {
      title: '接单情况',
      dataIndex: 'price',
      render: (text: any, record: any) => {
        return (
          <div>
            <p>累计接单金额：¥{text}</p>
            <p>累计接单次数：{record.order_num}</p>
            <p>上次接单时间：{record.order_date}</p>
          </div>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any) => <span>启用</span>,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      align: 'center',
      render: (text: any) => {
        return (
          <div className={styles.action}>
            <p>详情</p>
            <span></span>
            <p>禁用</p>
          </div>
        );
      },
    },
  ];
  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onCancel = () => {
    setVisible(false);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="86">
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div className={styles['factory-list']}>
      <Form
        form={form}
        className={styles.filter}
        initialValues={{ type: '2', payAway: '0' }}
      >
        <Row justify="space-between">
          <Col span={12}>
            <Button type="primary" onClick={() => setVisible(true)}>
              添加工厂
            </Button>
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Form.Item name="search" style={{ width: 230 }}>
              <Search placeholder="工厂名称或工厂编号" enterButton />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item name="registeredTime" label="入驻时间">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="registeredTimeTag">
              <Tags list={orderTimeList} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label="接单频次"></Form.Item>
          </Col>
          <Col>
            <Form.Item name="lowTimes">
              <Input
                addonAfter="次"
                placeholder="最低"
                style={{ width: 140 }}
              />
            </Form.Item>
          </Col>
          <Col>
            <span style={{ padding: '0 13px', marginTop: 10 }}>-</span>
          </Col>
          <Col>
            <Form.Item name="highTimes">
              <Input
                addonAfter="次"
                placeholder="最高"
                style={{ width: 140 }}
              />
            </Form.Item>
          </Col>
          <Col style={{ marginLeft: 28 }}>
            <Form.Item name="orderPrice" label="接单金额"></Form.Item>
          </Col>
          <Col>
            <Form.Item name="lowPrice">
              <Input
                addonAfter="元"
                placeholder="最低"
                style={{ width: 140 }}
              />
            </Form.Item>
          </Col>
          <Col>
            <span style={{ padding: '0 13px', marginTop: 10 }}>-</span>
          </Col>
          <Col>
            <Form.Item name="highPrice">
              <Input
                addonAfter="元"
                placeholder="最高"
                style={{ width: 140 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles.table}>
        <div className={styles.top}>
          <Button>删除</Button>
          <p>
            当前共{dataSource.length}位工厂，已选择{selectedRowKeys.length}
            位工厂
          </p>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey="factory_id"
          dataSource={dataSource}
        />
      </div>
      <Modal
        className={styles.add}
        visible={visible}
        title="新增工厂"
        onCancel={onCancel}
        onOk={() => {
          modalForm
            .validateFields()
            .then((values) => {
              form.resetFields();
              console.log(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={modalForm}
          {...formItemLayout}
          initialValues={{ prefix: '86', special: '针织、梭织、毛织' }}
        >
          <Form.Item
            name="name"
            label="工厂名称"
            rules={[
              {
                required: true,
                message: '请输入工厂名称！',
              },
            ]}
          >
            <Input placeholder="请输入工厂名称" />
          </Form.Item>
          <Form.Item
            name="linkman"
            label="联系人"
            rules={[{ required: true, message: '请输入联系人！' }]}
          >
            <Input placeholder="请输入联系人" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号！' }]}
          >
            <Input addonBefore={prefixSelector} placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="no" label="工厂编号">
            <Input placeholder="不填则默认按系统规则生成" />
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '请选择地址！' }]}
          >
            <Cascader options={options} placeholder="请选择省/市/区" />
          </Form.Item>
          <Form.Item
            name="addresDetail"
            label="详细地址"
            rules={[{ required: true, message: '请输入详细地址！' }]}
          >
            <Input.TextArea placeholder="请输入详细地址" />
          </Form.Item>
          <Form.Item
            name="special"
            label="擅长类型"
            rules={[{ required: true, message: '请输入擅长类型！' }]}
          >
            <Input placeholder="针织、梭织、毛织" />
          </Form.Item>
          <Form.Item
            name="scale"
            label="工厂规模"
            rules={[{ required: true, message: '请输入工厂规模！' }]}
          >
            <Input placeholder="30-50人" />
          </Form.Item>
          <Form.Item
            name="contract"
            label="租赁合同"
            rules={[{ required: true, message: '请上传租赁合同图片' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
            >
              <img
                src={require('@/assets/img/factory/upload-bg1.svg')}
                alt=""
              />
            </Upload>
          </Form.Item>
          <Form.Item
            name="license"
            label="营业执照"
            rules={[{ required: true, message: '请上传营业执照图片' }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
            >
              <img
                src={require('@/assets/img/factory/upload-bg2.png')}
                alt=""
                style={{ width: 63 }}
              />
            </Upload>
          </Form.Item>
          <Row>
            <Col offset={4}>
              <Form.Item
                name="frontId"
                rules={[{ required: true, message: '请上传身份证正面图片' }]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                >
                  <img
                    src={require('@/assets/img/factory/upload-bg3.svg')}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Upload>
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: 26 }}>
              <Form.Item
                name="backId"
                rules={[{ required: true, message: '请上传身份证反面图片' }]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                >
                  <img
                    src={require('@/assets/img/factory/upload-bg4.svg')}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default memo(FactoryList);
