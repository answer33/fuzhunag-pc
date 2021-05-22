import { FC, memo, useState } from 'react';
import {
  Button,
  Form,
  Table,
  Input,
  Select,
  DatePicker,
  Cascader,
  Col,
  Row,
  Modal,
} from 'antd';
import Tags from '@/components/Tags';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import options from '@/utils/address';
import { list } from '../services';
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
    order_no: '961180319019',
    order_date: '2021-03-25',
    name: '张三',
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
  let query = `pageNo=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  console.log(1111, formData);
  return list(query).then((res) => ({
    total: res.total,
    list: res.records,
  }));
};

const MemberList: FC<any> = () => {
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
      title: '会员信息',
      dataIndex: 'name',
      render: (text: any, record: any) => {
        return (
          <div className={styles['member-info']}>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <p>{text}</p>
              <p>{record.phone}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: '收货信息',
      dataIndex: 'address',
    },
    {
      title: '下单情况',
      dataIndex: 'price',
      render: (text: any, record: any) => {
        return (
          <div>
            <p>累计下单金额：¥{text}</p>
            <p>累计下单次数：{record.order_num}</p>
            <p>上次下单时间：{record.order_date}</p>
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

  return (
    <div className={styles['member-list']}>
      <Form
        form={form}
        className={styles.filter}
        initialValues={{ type: '2', payAway: '0' }}
      >
        <Row justify="space-between">
          <Col span={12}>
            <Button type="primary" onClick={() => setVisible(true)}>
              添加会员
            </Button>
          </Col>
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Form.Item name="search" style={{ width: 230 }}>
              <Search placeholder="名字、手机号或客户编号" enterButton />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item name="registeredTime" label="注册时间">
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
            <Form.Item label="下单频次"></Form.Item>
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
            <Form.Item name="orderPrice" label="下单金额"></Form.Item>
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
            当前共{dataSource.length}位会员，已选择{selectedRowKeys.length}
            位会员
          </p>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey="order_no"
          dataSource={dataSource}
        />
      </div>
      <Modal
        className={styles.add}
        visible={visible}
        title="新增会员"
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
          initialValues={{ prefix: '86' }}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名！',
              },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号！' }]}
          >
            <Input addonBefore={prefixSelector} placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="no" label="会员编号">
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
        </Form>
      </Modal>
    </div>
  );
};

export default memo(MemberList);
