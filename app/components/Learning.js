/**
 * @flow
 */
import React from 'react';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Asset, Audio, Font, Video } from 'expo';

import DataContain from "./MyData";

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

// class PlaylistItem {
//   constructor(name,fontpic, pic, uril, isVideo) {
//     this.name = name;
//     this.fontpic = fontpic;
//     this.pic = pic;
//     this.uril = uril;
//     this.isVideo = isVideo;
//   }
// }

// const PLAYLIST = [
//   new PlaylistItem(
//     'Ka',
//     require('../../assets/img/letter/1.png'),
//     require('../../assets/img/character/kaxhuwa.png'),
//     require('../../assets/sounds/words/Ka.m4a'),  
//     false
//   ),

//   new PlaylistItem(
//     'Kha',
//     require('../../assets/img/letter/2.png'),
//     require('../../assets/img/character/kharayo.png'),
//     require('../../assets/sounds/words/kha.m4a'),
//     false
//   ),
//   new PlaylistItem(
//     'Ga',
//     require('../../assets/img/letter/3.png'),
//     require('../../assets/img/character/cow.png'),
//     require('../../assets/sounds/words/Ga.m4a'),
//     false
//   ),
//   new PlaylistItem(
//     'Gha',
//     require('../../assets/img/letter/4.png'),
//     require('../../assets/img/character/house.png'),
//     require('../../assets/sounds/2.m4a'),
//     false
//   ),
//   new PlaylistItem(
//     'Iga',
//     require('../../assets/img/letter/5.png'),
//     require('../../assets/img/character/house.png'),
//     require('../../assets/sounds/2.m4a'),
//     false
//   ),
  
 
// ];

const ICON_PLAY_BUTTON = new Icon(require('../../assets/images/play_button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('../../assets/images/pause_button.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('../../assets/images/stop_button.png'), 22, 22);
const ICON_FORWARD_BUTTON = new Icon(require('../../assets/images/forward_button.png'), 33, 25);
const ICON_BACK_BUTTON = new Icon(require('../../assets/images/back_button.png'), 33, 25);



const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#290123';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 5.0 - FONT_SIZE * 2;

let sourc =[];
export default class Learning extends React.Component {
 
  constructor(props) {
    super(props);
    this.index = 0;
    
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    
    sourc = Object.keys(DataContain).map(val => DataContain[val]);
    this.state = {
      //showVideo: false,
      //playbackInstanceName: LOADING_STRING,
      //loopingType: LOOPING_TYPE_ONE,
      //muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      shouldCorrectPitch: true,
      //volume: 1.0,
      //rate: 1.0,
      //fullscreen: false,
      
    };
  }

  static navigationOptions = {
    headerVisible: false,
    header: null
  };

  componentDidMount() {
    
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    (async () => {
      await Font.loadAsync({
        'cutive-mono-regular': require('../../assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
    		
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source =  sourc[this.index].uril;

    
    const initialStatus = {
      shouldPlay: false, //pause after ending and to make loop use playing as in documentation
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      //volume: this.state.volume,
      //isMuted: this.state.muted,
      //isLooping: this.state.loopingType === LOOPING_TYPE_ONE,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      androidImplementation: 'MediaPlayer',
    
    };

   
      const { sound, status } = await Audio.Sound.create(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
    // }

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this.setState({
       
        //playbackInstanceName: PLAYLIST[this.index].fontpic,
        
        showVideo: sourc[this.index].isVideo,
        isLoading: false,
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        //muted: status.isMuted,
        //volume: status.volume,
        // loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        // shouldCorrectPitch: status.shouldCorrectPitch,
      });
      if (status.didJustFinish) {
        this._advanceIndex(false);
        //this._updatePlaybackInstanceForIndex(false);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  
  _onFullscreenUpdate = event => {
    console.log(`FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`);
  };

  _advanceIndex(forward) {
    this.index = (this.index + (forward ? 1 : 0)) % sourc.length;
}
  _backwardIndex(backward){
    this.index = (this.index - (backward ? 1 : 0)) % sourc.length;
}

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if(this.index<sourc.length){
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  }else{
    this.index=0;
  }
  };

  _onBackPressed = () => {
    if(this.index>0){
    if (this.playbackInstance != null) {
      this._backwardIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  }else{
    this.index=0;
  }
  };
 
 render()
   {
    return !this.state.fontLoaded ? (
      <View style={styles.emptyContainer} />
    ) : (
      <View style={styles.container}>
        <View />
        <View style={styles.mycontainer}>
        <View style={styles.questionView}>
        <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}>
            <Image 
              source={sourc[this.index].fontpic}
              style={{
              width: DEVICE_WIDTH/4,
              height: DEVICE_HEIGHT/4,
              flex: 1,
              resizeMode: "contain",
              paddingTop: 50
            }}/>
            </TouchableHighlight>  
             <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onBackPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_BACK_BUTTON.module} />
          </TouchableHighlight>
         
          {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}>
            <Image
              style={styles.button}
              source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module}
            />
          </TouchableHighlight>    */}
        </View>
        <View style={styles.ansView}>
          {/* <View style={styles.nameContainer}>
          <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
            {this.state.playbackInstanceName}
          </Text>
        </View> */}
        {/* <View style={styles.space} /> */}
        {/* <View style={styles.videoContainer}>
          <Video
            ref={this._mountVideo}
            style={[
              styles.video,
              {
                opacity: this.state.showVideo ? 1.0 : 0.0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
                
              },
            ]}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            //onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            //onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            onFullscreenUpdate={this._onFullscreenUpdate}
            onReadyForDisplay={this._onReadyForDisplay}
            useNativeControls={this.state.useNativeControls}
          />
        </View> */}
        <View
          style={[
            styles.playbackContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}>
          <Image
              ref={this._mountVideo}
              source={sourc[this.index].pic}

              style={{
              width: DEVICE_WIDTH/4,
              height: DEVICE_HEIGHT/4,
              flex: 1,
              resizeMode: "contain",
              paddingTop: 50
            }}
            />
         
        </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerTopRow,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}>
          {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onBackPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_BACK_BUTTON.module} />
          </TouchableHighlight> */}
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
           
            disabled={this.state.isLoading}>
            <Image
              style={styles.button}
              source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module}
            />
          </TouchableHighlight>
          {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onStopPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_STOP_BUTTON.module} />
          </TouchableHighlight> */}
         
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onForwardPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_FORWARD_BUTTON.module} />
          </TouchableHighlight>
        </View>
        
         {/* for volume
        <View style={[styles.buttonsContainerBase, styles.buttonsContainerMiddleRow]}>
          <View style={styles.volumeContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onMutePressed}>
              <Image
                style={styles.button}
                source={this.state.muted ? ICON_MUTED_BUTTON.module : ICON_UNMUTED_BUTTON.module}
              />
            </TouchableHighlight>
            <Slider
              style={styles.volumeSlider}
              trackImage={ICON_TRACK_1.module}
              thumbImage={ICON_THUMB_2.module}
              value={1}
              onValueChange={this._onVolumeSliderValueChange}
            />
          </View>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onLoopPressed}>
            <Image
              style={styles.button}
              source={LOOPING_TYPE_ICONS[this.state.loopingType].module}
            />
          </TouchableHighlight>
        </View> */}


        
    
      
      </View>
      </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  wrapper: {},
  nameContainer: {
    height: FONT_SIZE,
  },
  space: {
    height: FONT_SIZE,
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT,
  },
  video: {
    maxWidth: DEVICE_WIDTH,
  },
  playbackContainer: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
   // backgroundColor:'white',
   
  },
  
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE,
  },
  buffering: {
    textAlign: 'left',
    paddingLeft: 20,
  },
  timestamp: {
    textAlign: 'right',
    paddingRight: 20,
  },
  button: {
    backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerMiddleRow: {
    //maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  // volumeContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   minWidth: DEVICE_WIDTH / 2.0,
  //   maxWidth: DEVICE_WIDTH / 2.0,
  // },
  // volumeSlider: {
  //   width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
  // },
  buttonsContainerBottomRow: {
    //maxHeight: ICON_THUMB_1.height,
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE,
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH,
  },
  mycontainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    alignItems: 'center',

  },
  questionView:{
    
   
    justifyContent: 'center',
    alignItems: 'center',
    flex:1

  },
  ansView:{
   flex:1,
   //backgroundColor:'blue',
  }
});
