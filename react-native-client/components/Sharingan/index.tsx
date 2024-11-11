// 写轮眼
import * as React from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Animated,
  Easing 
} from 'react-native';
import getRandomInteger from '@/libs/getRandomInteger';

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

const Sharingan = (props:TProps) => {
  const {index=0} = props;
  // 创建一个Animated.Value，初始值为0
  const spinValue = React.useRef(new Animated.Value(0)).current;
  
  // 定义旋转动画
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg']
  });
  
  // 定义动画配置
  const spinAnimation = Animated.timing(spinValue, {
    toValue: 1,
    duration: 5000,
    useNativeDriver: true, // 使用原生驱动来提高性能
    easing: Easing.linear // 使用线性缓动
  });

  // 使用Animated.loop来循环动画
  const loopAnimation = Animated.loop(spinAnimation, {
    iterations: -1 // 无限循环
  });

  const activeImgIndex = React.useMemo(()=>{
    return index===0?0:getRandomInteger(imgList.length-1);//随机获取
  },[index]);

  // 在组件加载时开始动画
  React.useEffect(() => {
    loopAnimation.reset();
    loopAnimation.start();
  }, [loopAnimation,index]);

  return (
    <ImageBackground
      style={styles.container}
      source={require('@/assets/images/sharingan-imgs/background.jpg')}
    >
      <Animated.View
        style={{
          position:"absolute",
          top:64,
          left:206,
          transform: [{ rotate: spin }] // 应用旋转动画
        }}
      >
        <Image
          style={styles.eye}
          source={imgList[Math.min(index,imgList.length-1)]}
          // source={
          //   imgList[activeImgIndex]
          // }
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container:{
    width:500,
    height:280,
    resizeMode:"contain",
  },
  eye:{
    width:90,
    height:90,
    borderRadius:45,
  }
})

export default React.memo(Sharingan);