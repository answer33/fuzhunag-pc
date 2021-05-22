import { FC, memo, useState } from 'react';
import { EnvironmentOutlined, RightOutlined } from '@ant-design/icons';
import { Input, Upload, Modal, Button, Form, Table } from 'antd';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import styles from './index.less';

const { TextArea, Search } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const dataSource = [
  {
    order_no: '961180319019',
    name: '张三',
    phone: '13600001234',
    address: '广东省珠海市香洲区港乐路8号B区110室',
  },
];

const style = {
  colors: '',
  sizes: '',
  quantity: '',
  fee: '',
  images: [],
};

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

const Add: FC<any> = () => {
  const [styleList, setStyleList] = useState([style]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const handleChange = (fileList, i) => {
    styleList[i].images = fileList;
    setStyleList(styleList);
  };

  const handleCancel = () => setPreviewVisible(false);

  const onAdd = () => {
    setStyleList((pre) => {
      return [...pre, style];
    });
  };

  const [form] = Form.useForm();
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
      render: (text, record) => {
        return (
          <div>
            <p>
              {record.name} {record.phone}
            </p>
            <p>{text}</p>
          </div>
        );
      },
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
            <p>选择</p>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.add}>
      <div className={styles['left-con']}>
        <div className={styles.address}>
          <div className={styles.con}>
            <div>
              <EnvironmentOutlined
                style={{ fontSize: 12, color: '#000', marginTop: 3 }}
              />
              <div className={styles.info}>
                <p>广东珠海市香洲区唐家湾镇</p>
                <p>港乐路8号B区110室</p>
                <p>xx 138****1380</p>
              </div>
            </div>
            <RightOutlined style={{ fontSize: 12, color: '#000' }} />
          </div>
        </div>
        <p className={styles.title}>订单要求</p>
        <TextArea placeholder="淘宝链接或其它" style={{ height: 85 }} />
        <div className={styles.list}>
          {styleList.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.title}>
                <span>{i + 1}</span>款式
              </div>
              <div className={styles.images}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={item.images}
                  onPreview={handlePreview}
                  onChange={({ fileList }) => handleChange(fileList, i)}
                >
                  <img
                    src={require('@/assets/img/order/upload1.svg')}
                    alt=""
                    style={{ width: '100%' }}
                  />
                </Upload>
              </div>
              <div className={styles.property}>
                <div className={styles.item}>
                  <p className={styles.name}>
                    颜色<span>*</span>
                  </p>
                  <Input placeholder="米色" bordered={false} />
                </div>
                <div className={styles.item}>
                  <p className={styles.name}>
                    码数<span>*</span>
                  </p>
                  <Input placeholder="66、73、80、90、100" bordered={false} />
                </div>
                <div className={styles.item}>
                  <p className={styles.name}>打样数量</p>
                  <Input placeholder="每个码数各1件" bordered={false} />
                </div>
                <div className={styles.item}>
                  <p className={styles.name}>样板费（元）</p>
                  <Input placeholder="200" bordered={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.btn}>
          <Button onClick={onAdd}>
            <img src={require('@/assets/img/order/+.svg')} alt="" />
            添加款式
          </Button>
          <Button>
            <img src={require('@/assets/img/order/cloth.svg')} alt="" />
            从款式库选择
          </Button>
        </div>
        <div className={styles.operation}>
          <Button type="primary">确定</Button>
          <Button>取消</Button>
        </div>
      </div>
      <div className={styles['right-con']}>
        <Form form={form} className={styles.top}>
          <Form.Item name="search">
            <Search
              placeholder="输入客户名称、联系人或手机号"
              enterButton
              style={{ width: 340 }}
            />
            <Button type="primary" style={{ marginLeft: 12 }}>
              新建客户
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.table}>
          <Table columns={columns} rowKey="order_no" dataSource={dataSource} />
        </div>
      </div>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default memo(Add);
