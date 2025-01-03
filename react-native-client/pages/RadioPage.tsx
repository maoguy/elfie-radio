import * as React from 'react';
import { View,StyleSheet,Image,ScrollView,FlatList } from 'react-native';
import { Avatar, Button, Card, Text,Switch,Banner,ActivityIndicator,MD2Colors} from 'react-native-paper';
import ParallaxScrollView from '@/components/ParallaxScrollView';
// @ts-ignore
import { Audio } from 'expo-av';
import Sharingan from '@/components/Sharingan';
import getRandomInteger from '@/libs/getRandomInteger';
import radioList from '@/configs/radio-list.json';

const DATA = radioList;

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
    await soundObject?.stopAsync();
    const radioUrl = {
      uri:DATA[index].uri // 替换为你的电台流地址
    }
    await Audio.setAudioModeAsync({ //后台播放
      // playThroughEarpieceAndroid: false,
      // staysActiveInBackground:true
    });
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(radioUrl);
      await sound.playAsync();
      setSoundObject(sound); // 保存对音频对象的引用
      setActiveIndex(index); // 成功则设置
      // console.error(`开始播放${radioUrl.uri}`)
    } catch (error) {
      console.error(`播放音频时出错${radioUrl.uri}:`, error);
    }
    setIsLoading(false);
  }

  const pauseRadio = async () => {
    if (soundObject) {
      try{
        await soundObject.stopAsync();
      }catch(error){
        console.error("停止出错:",error);
      }
      setActiveIndex(undefined);
    }
  };

  React.useEffect(()=>{
    return ()=>{
      // 确保音频停止播放
      soundObject?.stopAsync().then(() => {
        // 卸载音频资源
        soundObject?.unloadAsync();
      });
    }
  },[soundObject]);

  return (
    <ParallaxScrollView
      contentStyle={styles.content}
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.header}>
          <Sharingan index={activeIndex!==undefined?activeIndex+1:0}/>
        </View>
      }
    >
      <Banner
        visible={true}
        style={{
          backgroundColor:"#ffffff",
          marginBottom:0
        }}
        actions={[
          {
            label: '暂停',
            icon:"pause",
            onPress: pauseRadio,
          },
          {
            label: "随机播放",
            icon:"play",
            disabled:isLoading,
            loading:isLoading,
            onPress: ()=>playRadio(getRandomInteger(DATA.length)-1),
          },
          {
            label:"上一个",
            disabled:isLoading,
            onPress: ()=>playRadio(activeIndex===undefined?0:(activeIndex-1+DATA.length)%(DATA.length)),
          },
          {
            label: "下一个",
            disabled:isLoading,
            onPress: ()=>playRadio(activeIndex===undefined?0:(activeIndex+1)%(DATA.length)),
          },
        ]}
        icon={({size}) => (
          <Image
            source={require('@/assets/images/orange-radio.png')}
            style={{
              width: size,
              height: size,
              borderRadius:size/2
            }}
          />
        )}
      >
          <Text style={{fontSize:32,color:"#666666"}}>
          {
            activeIndex!==undefined
            ?
            `${DATA[activeIndex].title}`
            :
            "随便听点啥~ ☕️"
          }
          </Text>
      </Banner>
      
      <View
        style={styles.cardList}
      >
        {
          DATA.map((item)=>{
            const {id,title} = item;
            const index = DATA.findIndex((item)=>item.id===id);
            const isActived = activeIndex===index;
            return (
              <Card
                style={styles.card}
                key={id}
                mode={"elevated"}
              >
                <Card.Title
                  title={title}
                  left={LeftContent}
                />
                {/* <Card.Content>
                  <Text variant="titleLarge">Card title</Text>
                  <Text variant="bodyMedium">Card content</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                <Card.Actions>
                  {
                    isActived
                    ?
                    <Button
                      // disabled
                      icon="pause"
                      onPress={pauseRadio}
                      // loading={isLoading}
                      // disabled={isLoading}
                      style={styles.playPauseButton}
                    >
                      暂停
                    </Button>
                    :
                    <Button
                      icon="play"
                      onPress={() => !isLoading&&playRadio(index)}
                      // loading={isLoading}
                      // disabled={isLoading}
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
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container:{

  },
  content:{
    padding:0,
  },
  header:{
    alignItems:"center"
  },
  cardList:{
    // paddingBottom:18,
  },
  card:{
    marginVertical:5,
    marginHorizontal:10,
  },
  playPauseButton:{
    width:"100%",
    borderRadius:10
  },
})

export default RadioPage;