import { memo, forwardRef } from 'react';
import { Button } from 'antd';

interface TagsProps {
  onChange?: (value) => void; // 值改变回调
  value?: any; // 值
  list?: { id: number; text: string }[];
}
const Tags = forwardRef<any, TagsProps>(
  ({ onChange, value, list = [] }, ref) => {
    const changeBtn = (data) => {
      onChange && onChange(data);
    };
    return (
      <div ref={ref}>
        {list.map((item) => (
          <Button
            key={item.id}
            style={{ marginLeft: 14 }}
            onClick={() => changeBtn(item.id)}
            type={value === item.id ? 'primary' : 'default'}
          >
            {item.text}
          </Button>
        ))}
      </div>
    );
  },
);

export default memo(Tags);
