// 写轮眼
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
// import xlyIcon11 from './imgs/xly11.png';
// import xlyIcon12 from './imgs/xly12.png';

const Sharingan = () => {
  return (
    <div className={styles["background-img"]}>
      <div className={styles["box1"]}>
        <ul>
            <li><img src={xlyIcon1} alt=""/></li>
            <li><img src={xlyIcon2} alt=""/></li>
            <li><img src={xlyIcon3} alt=""/></li>
            <li><img src={xlyIcon4} alt=""/></li>
            <li><img src={xlyIcon5} alt=""/></li>
            <li><img src={xlyIcon6} alt=""/></li>
            <li><img src={xlyIcon7} alt=""/></li>
            <li><img src={xlyIcon8} alt=""/></li>
            <li><img src={xlyIcon9} alt=""/></li>
            <li><img src={xlyIcon10} alt=""/></li>
            {/* <li><img src={xlyIcon11} alt=""/></li>
            <li><img src={xlyIcon12} alt=""/></li> */}

        </ul>
      </div>
      <div className={styles["box2"]}>
        <ul>
            <li><img src={xlyIcon1} alt=""/></li>
            <li><img src={xlyIcon2} alt=""/></li>
            <li><img src={xlyIcon3} alt=""/></li>
            <li><img src={xlyIcon4} alt=""/></li>
            <li><img src={xlyIcon5} alt=""/></li>
            <li><img src={xlyIcon6} alt=""/></li>
            <li><img src={xlyIcon7} alt=""/></li>
            <li><img src={xlyIcon8} alt=""/></li>
            <li><img src={xlyIcon9} alt=""/></li>
            <li><img src={xlyIcon10} alt=""/></li>
            {/* <li><img src={xlyIcon11} alt=""/></li>
            <li><img src={xlyIcon12} alt=""/></li> */}

        </ul>
      </div>
    </div>
  );
}

export default Sharingan;