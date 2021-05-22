import { FC, memo } from 'react';
import MatchFactory from '../../components/MatchFactory';

const Match: FC<any> = () => {
  return (
    <>
      <MatchFactory />
    </>
  );
};

export default memo(Match);
