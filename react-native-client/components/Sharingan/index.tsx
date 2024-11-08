// 写轮眼
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing 
} from 'react-native';

const imgList = [
  require(`@/assets/images/sharingan-imgs/normal.png`),
  require(`@/assets/images/sharingan-imgs/xly_one.png`),
  require(`@/assets/images/sharingan-imgs/xly_two.png`),
  require(`@/assets/images/sharingan-imgs/xly_three.png`),
  require(`@/assets/images/sharingan-imgs/xly1.png`),
  require(`@/assets/images/sharingan-imgs/xly2.png`),
  require(`@/assets/images/sharingan-imgs/xly3.png`),
  require(`@/assets/images/sharingan-imgs/xly4.png`),
  require(`@/assets/images/sharingan-imgs/xly5.png`),
  require(`@/assets/images/sharingan-imgs/xly6.png`),
  require(`@/assets/images/sharingan-imgs/xly7.png`),
  require(`@/assets/images/sharingan-imgs/xly8.png`),
  require(`@/assets/images/sharingan-imgs/xly9.png`),
  require(`@/assets/images/sharingan-imgs/xly10.png`),
  require(`@/assets/images/sharingan-imgs/xly11.png`),
  require(`@/assets/images/sharingan-imgs/xly12.png`),
  require(`@/assets/images/sharingan-imgs/xly13.png`),
  require(`@/assets/images/sharingan-imgs/xly14.png`),
  require(`@/assets/images/sharingan-imgs/xly15.png`),
];

interface TProps {
  index?:number,
}

const Sharingan = (props:TProps) => {
  const {index=0} = props;
  // 创建一个Animated.Value，初始值为0
  const spinValue = React.useRef(new Animated.Value(0)).current;
  
  // 定义旋转动画
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  
  // 定义动画配置
  const spinAnimation = Animated.timing(spinValue, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true, // 使用原生驱动来提高性能
    easing: Easing.linear // 使用线性缓动
  });

  // 使用Animated.loop来循环动画
  const loopAnimation = Animated.loop(spinAnimation, {
    iterations: -1 // 无限循环
  });

  // 在组件加载时开始动画
  React.useEffect(() => {
    loopAnimation.reset();
    loopAnimation.start();
  }, [loopAnimation,index]);

  return (
    <View
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={require('@/assets/images/sharingan-imgs/background.jpg')}
      />
      <Animated.View
        style={{
          position:"absolute",
          top:64,
          left:205,
          transform: [{ rotate: spin }] // 应用旋转动画
        }}
      >
        <Image
          style={styles.eye}
          // source={require('@/assets/images/sharingan-imgs/normal.png')}
          source={imgList[Math.min(index,imgList.length-1)]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    // position:"relative",
    // position: 'relative', // 相对定位
    // top: 0, // 贴顶
    // height:00,
    // backgroundColor:"green",
    // backgroundColor:"grey"
  },
  image:{
    // position:"absolute",
    top:0,
    left:0,
    width:500,
    height:280,
    resizeMode:"contain"
  },
  eye:{
    width:90,
    height:90,
    borderRadius:45,
    // transform: [{ rotate: '102deg' }]
  }
})

export default Sharingan;