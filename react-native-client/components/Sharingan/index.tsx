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
  require(`@/assets/images/sharingan-imgs/xly_normal.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_one.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_two.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_three.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_1.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_2.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_3.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_4.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_5.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_6.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_7.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_8.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_9.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_10.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_11.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_12.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_13.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_14.jpg`),
  require(`@/assets/images/sharingan-imgs/xly_15.jpg`),
];

interface TProps {
  index?:number,
}

function getRandomInteger(n:number) {
  return 1 + Math.floor(Math.random() * n);
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
    duration: 2000,
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
          // source={require('@/assets/images/sharingan-imgs/normal.jpg')}
          // source={imgList[Math.min(index,imgList.length-1)]}
          source={
            imgList[
              index===0
              ?
              0
              :
              getRandomInteger(imgList.length-1)
            ]
          }
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