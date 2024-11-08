// 写轮眼
import { useState } from 'react'
import styles from './index.module.scss';
import xlyIcon1 from './imgs/xly1.png';
import xlyIcon2 from './imgs/xly2.png';
import xlyIcon3 from './imgs/xly3.png';
import xlyIcon4 from './imgs/xly4.png';
import xlyIcon5 from './imgs/xly5.png';
import xlyIcon6 from './imgs/xly6.png';
import xlyIcon7 from './imgs/xly7.png';
import xlyIcon8 from './imgs/xly8.png';
import xlyIcon9 from './imgs/xly9.png';
import xlyIcon10 from './imgs/xly10.png';
import xlyIcon11 from './imgs/xly11.png';
import xlyIcon12 from './imgs/xly12.png';
import xlyIcon13 from './imgs/xly13.png';
import xlyIcon14 from './imgs/xly14.png';
import xlyIcon15 from './imgs/xly15.png';
import xlyIconThree from './imgs/xly_three.png';
import xlyIconTwo from './imgs/xly_two.png';
import xlyIconOne from './imgs/xly_one.png';
import xlyIconNormal from './imgs/normal.png';
// import xlyIcon11 from './imgs/xly11.png';
// import xlyIcon12 from './imgs/xly12.png';

const xlyIconList = [
  xlyIconNormal,
  xlyIconOne,
  xlyIconTwo,
  xlyIconThree,
  xlyIcon1,
  xlyIcon2,
  xlyIcon3,
  xlyIcon4,
  xlyIcon5,
  xlyIcon6,
  xlyIcon7,
  xlyIcon8,
  xlyIcon9,
  xlyIcon10,
  xlyIcon11,
  xlyIcon12,
  xlyIcon13,
  xlyIcon14,
  xlyIcon15,
];

const Sharingan = () => {
  const [count, setCount] = useState(0);
  function updateCount (count:number) {
    if(count>=0&&count<xlyIconList.length){
      setCount(count);
    }
  }
  
  return (
    <div>
      <button onClick={()=>updateCount(count+1)}>+</button>
        {count}
      <button onClick={()=>updateCount(count-1)}>-</button>
      <div className={styles["background-img"]}>
        <div className={styles["box"]}>
          <ul>
            {
              count>0
              ?
              <li className={styles["sharingan-move-spin"]}>
                <img
                  src={xlyIconList[count]}
                  alt=""
                />
              </li>
              :
              <li>
                <img
                  src={xlyIconNormal}
                  alt=""
                />
              </li>
            }
            
          </ul>
          {/* <ul>
              <li><img src={xlyIcon1} alt=""/></li>
              <li><img src={xlyIcon2} alt=""/></li>
              <li><img src={xlyIcon3} alt=""/></li>
              <li><img src={xlyIcon4} alt=""/></li>
              <li><img src={xlyIcon5} alt=""/></li>
              <li><img src={xlyIcon6} alt=""/></li>
              <li><img src={xlyIconThree} alt=""/></li>
              <li><img src={xlyIconTwo} alt=""/></li>
              <li><img src={xlyIconOne} alt=""/></li>
              <li><img src={xlyIconNormal} alt=""/></li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default Sharingan;