import { FC, memo, useState } from 'react';
import numeral from 'numeral';
import {
  EnvironmentOutlined,
  RightOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { Input, Upload, Modal, Button, Form, Table, DatePicker } from 'antd';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import cloneDeep from 'lodash/cloneDeep';
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
    style_no: '961180319019',
    images: ['张三'],
    color: '米色',
    price: '29',
  },
];

const colorItem = {
  name: '',
  quantity: '',
};
const productAttrItem = {
  size: '',
  colors: [{ ...colorItem }],
};
const style = {
  productSn: '',
  productAttr: [{ ...productAttrItem }],
  productExpectPrice: '',
  expectedDeliveryDate: '',
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
  const [styleList, setStyleList] = useState([cloneDeep(style)]);
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
    let newStyleList = [...styleList];
    newStyleList.push(cloneDeep(style));
    setStyleList(newStyleList);
  };

  const onAddSize = (i) => {
    const colors = styleList[i].productAttr[0].colors.map((item) => {
      return {
        name: item.name,
        quantity: '',
      };
    });
    let newStyleList = [...styleList];
    newStyleList[i].productAttr.push({
      size: '',
      colors,
    });
    setStyleList(newStyleList);
  };

  const onRemoveSize = (i, i2) => {
    let newStyleList = [...styleList];
    newStyleList[i].productAttr.splice(i2, 1);
    setStyleList(newStyleList);
  };

  const onAddColor = (i) => {
    let newStyleList = [...styleList];
    newStyleList[i].productAttr.forEach((item) => {
      item.colors.push({ ...colorItem });
    });
    setStyleList(newStyleList);
  };

  const onRemove = (i, i2) => {
    let newStyleList = [...styleList];
    newStyleList[i].productAttr.forEach((item) => {
      item.colors.splice(i2, 1);
    });
    setStyleList(newStyleList);
  };

  const onChangeSize = (e, i, i2) => {
    let newStyleList = [...styleList];
    newStyleList[i].productAttr[i2].size = e.target.value.trim();
    setStyleList(newStyleList);
  };

  const onChangeColor = (e, i, i2) => {
    let newStyleList = [...styleList];
    newStyleList[i].productAttr.forEach((item) => {
      item.colors[i2].name = e.target.value.trim();
    });
    setStyleList(newStyleList);
  };

  const onChangeNum = (e, i, i2, i3) => {
    let newStyleList = [...styleList];
    newStyleList[i].productAttr[i2].colors[i3].quantity = e.target.value.trim();
    setStyleList(newStyleList);
  };

  const onChangePrice = (e, i) => {
    let newStyleList = [...styleList];
    newStyleList[i].productExpectPrice = e.target.value;
    setStyleList(newStyleList);
  };

  const [form] = Form.useForm();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });
  const { submit, reset } = search;

  const columns: any[] = [
    {
      title: '款号',
      dataIndex: 'style_no',
    },
    {
      title: '图片',
      dataIndex: 'images',
      render: (text) => {
        return (
          <div>
            {text.map((item) => (
              <img
                key={item}
                src={item}
                alt=""
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  marginRight: 10,
                }}
              />
            ))}
          </div>
        );
      },
    },
    {
      title: '颜色',
      dataIndex: 'color',
    },
    {
      title: '单价（元）',
      dataIndex: 'price',
      render: (text) => {
        return <p>¥{numeral(text).format('0,0.00')}</p>;
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
              <div className={styles.top}>
                <div className={styles.no}>
                  <p>款号</p>
                  <Input
                    placeholder="请填写"
                    bordered={false}
                    allowClear={true}
                  />
                </div>
                {/* <img
                  src={require('@/assets/img/order/disable-upload-icon.svg')}
                  alt=""
                /> */}
                <div className={styles.upload}>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    showUploadList={false}
                    onChange={({ fileList }) => handleChange(fileList, i)}
                  >
                    <div className={styles['upload-icon']}>
                      <CameraOutlined />
                    </div>
                  </Upload>
                  <p>我的相册</p>
                </div>
              </div>
              <div className={styles.images}>
                {item.images.map((item, i) => (
                  <div key={i}>
                    <img src={item} alt="" />
                  </div>
                ))}
              </div>
              <div className={styles.attr}>
                <div className={styles.sizes}>
                  <div className={styles['size-item']}>
                    <span>尺码</span>
                    <img
                      src={require('@/assets/img/order/add.svg')}
                      alt=""
                      onClick={() => onAddSize(i)}
                    />
                  </div>
                  {item.productAttr.map((item2, i2) => (
                    <div className={styles['size-item']} key={i2}>
                      {item.productAttr.length > 1 && (
                        <img
                          src={require('@/assets/img/order/add.svg')}
                          alt=""
                          onClick={() => onRemoveSize(i, i2)}
                        />
                      )}
                      <Input
                        placeholder="尺码"
                        bordered={false}
                        value={item2.size}
                        onChange={(e) => onChangeSize(e, i, i2)}
                        style={{
                          marginLeft: item.productAttr.length <= 1 ? 21 : 0,
                        }}
                      />
                    </div>
                  ))}
                  <div className={styles['size-item']}>
                    <span>数量：</span>
                  </div>
                </div>
                <div className={styles.colors}>
                  <div className={styles['color-item']}>
                    {item.productAttr[0]?.colors?.map((item2, i2) => (
                      <div className={styles.color} key={i2}>
                        {item.productAttr[0]?.colors.length > 1 && (
                          <img
                            src={require('@/assets/img/order/add.svg')}
                            alt=""
                            onClick={() => onRemove(i, i2)}
                          />
                        )}
                        <Input
                          placeholder="颜色"
                          bordered={false}
                          value={item2.name}
                          onChange={(e) => onChangeColor(e, i, i2)}
                          style={{
                            marginLeft:
                              item.productAttr[0]?.colors.length <= 1 ? 21 : 0,
                          }}
                        />
                      </div>
                    ))}
                    <img
                      src={require('@/assets/img/order/add.svg')}
                      alt=""
                      onClick={() => onAddColor(i)}
                    />
                  </div>
                  {item.productAttr.map((item2, i2) => (
                    <div className={styles['color-item']} key={i2}>
                      {item2?.colors.map((item3, i3) => (
                        <div className={styles.color} key={i3}>
                          <Input
                            placeholder="数量"
                            bordered={false}
                            value={item3.quantity}
                            onChange={(e) => onChangeNum(e, i, i2, i3)}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className={styles['color-item']}>
                    {item.productAttr[0]?.colors.map((item2, i2) => (
                      <div className={styles.color} key={i2}>
                        <span className={styles.total}>
                          {item.productAttr.reduce((pre, next) => {
                            return pre + +next.colors[i2].quantity;
                          }, 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.price}>
                <p>目标价（单价）</p>
                <Input
                  placeholder="目标价"
                  bordered={false}
                  value={item.productExpectPrice}
                  onChange={(e) => onChangePrice(e, i)}
                />
              </div>
              <div className={styles.date}>
                <p>期望交期</p>
                <DatePicker placeholder="期望交期" bordered={false} />
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
          </Form.Item>
        </Form>
        <div className={styles.table}>
          <Table columns={columns} rowKey="style_no" dataSource={dataSource} />
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
