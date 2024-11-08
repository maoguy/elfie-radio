import * as React from 'react';
import { View,StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text,Switch,Banner,ActivityIndicator } from 'react-native-paper';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Audio } from 'expo-av';
import Sharingan from '@/components/Sharingan';

const DATA = [
  {
    id: 'gdmsfm',
    title: '广东音乐之声',
    uri:'https://satellitepull.cnr.cn/live/wxgdyyzs/playlist.m3u8'
  },
  // {
  //   id: 'gdzjjj',
  //   title:'广东珠江经济',
  //   uri:"https://ytcastmp3.radio.cn/62/stream_10493.mp3?type=1&key=2b10ba2a5a4b90a09a144696b5c950a1&time=6721d4e3"
  // },
  {
    id: 'gdxwfm',
    title: '广东新闻广播',
    uri:'https://satellitepull.cnr.cn/live/wxgdxwgb/playlist.m3u8'
  },
  {
    id: 'hk1',
    title: '香港电台第一台',
    uri: 'https://rthkaudio1-lh.akamaihd.net/i/radio1_1@355864/master.m3u8'
  },
  {
    id: 'hk2',
    title: '香港电台第二台',
    uri: 'https://rthkaudio2-lh.akamaihd.net/i/radio2_1@355865/master.m3u8'
  },
  {
    id:'hk3',
    title:'香港电台第三台',
    uri: 'https://rthkaudio3-lh.akamaihd.net/i/radio3_1@355866/master.m3u8'
  },
  {
    id:'hk4',
    title:'香港电台第四台',
    uri: 'https://rthkaudio4-lh.akamaihd.net/i/radio4_1@355867/master.m3u8'
  },
  {
    id:'hk5',
    title:'香港电台第五台',
    uri: 'https://rthkaudio5-lh.akamaihd.net/i/radio5_1@355868/master.m3u8'
  }
];

const LeftContent = (props:any) => <Avatar.Icon {...props} icon="radio" />

const RadioPage = () => {
  const soundRef = React.useRef<Audio.Sound | null>(null);
  const soundObject = soundRef?.current;
  const [activeIndex,setActiveIndex] = React.useState<number|undefined>();
  const [isLoading,setIsLoading] = React.useState<boolean>(false);
  
  const setSoundObject = (newSoundObject: Audio.Sound | null) => {
    soundRef.current = newSoundObject;
  }

  const playRadio = async (index=0) => {
    setIsLoading(true);
    pauseRadio();
    const radioUrl = {
      uri:DATA[index].uri // 替换为你的电台流地址
    }
    await Audio.setAudioModeAsync({ //后台播放
      playThroughEarpieceAndroid: false,
      staysActiveInBackground:true
    });
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(radioUrl);
      await sound.playAsync();
      setSoundObject(sound); // 保存对音频对象的引用
      setActiveIndex(index); //成功才设置
      // console.error(`开始播放${radioUrl.uri}`)
    } catch (error) {
      console.error(`播放音频时出错${radioUrl.uri}:`, error);
    }
    setIsLoading(false);
  }

  const pauseRadio = async () => {
    if (soundObject) {
      try{
        await soundObject.pauseAsync();
        setActiveIndex(undefined);
      }catch(error){
        console.error("暂停出错:",error);
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.header}>
          <Sharingan index={activeIndex!==undefined?activeIndex+1:0}/>
        </View>
      }>

      {
        DATA.map(({
          id,title,uri
        },index)=>{
          return (
            <Card key={id}>
              <Card.Title
                title={title}
                // subtitle="☕"
                left={LeftContent}
              />
              {/* <Card.Content>
                <Text variant="titleLarge">Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
              <Card.Actions>
                {
                  activeIndex===index
                  ?
                  <Button
                    // disabled
                    icon="pause"
                    onPress={pauseRadio}
                    // loading={isLoading}
                    disabled={isLoading}
                    style={styles.playPauseButton}
                  >
                    暂停
                  </Button>
                  :
                  <Button
                    icon="play"
                    onPress={() => playRadio(index)}
                    // loading={isLoading}
                    disabled={isLoading}
                    mode="contained"
                    style={styles.playPauseButton}
                  >
                    播放
                  </Button>
                }
                
                
              </Card.Actions>
            </Card>
          );
        })
      }
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header:{
    bottom: 0,
    left: 0,
  },
  playPauseButton:{
    width:"100%"
  }
})

export default RadioPage;