import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './animbutton'
import jsonData from './Files/jsonData.json'



const { width, height } = Dimensions.get('window')
let arrnew = []

export default class Quiz extends Component {
  constructor(props){
    super(props);
    this.qno = 0
    this.score = 0

    const jdata = jsonData.quiz.quiz1
    arrnew = Object.keys(jdata).map( function(k) { return jdata[k] });
    this.state = {
      question : arrnew[this.qno].question,
      options : arrnew[this.qno].options,
      correctoption : arrnew[this.qno].correctoption,
      countCheck : 0,
      
      isHidden:false,
      myReslt:'',
      
      
    }
    obj = new Animbutton; 
    
    this._popView= this._popView.bind(this);

  }

//hiding statusBar
componentDidMount() {
  StatusBar.setHidden(true);
  // this.setState({isHidden: false})
}
// componentWillUnmount(){
//   this.setState({isHidden: true})
// }

  prev(){
    if(this.qno > 0){
      this.qno--
      this.setState({ question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})
    }
  }
  next(){
    if(this.qno < arrnew.length-1){
      this.qno++

      this.setState({ countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption})
    }else{
      
      this.props.quizFinish(this.score*100/5)
     }
  }
  _answer(status,ans){

    if(status == true){
        const count = this.state.countCheck + 1
        this.setState({ countCheck: count })
        if(ans == this.state.correctoption ){
          this.score += 1
        }
      }else{
        const count = this.state.countCheck - 1
        this.setState({ countCheck: count })
        if(this.state.countCheck < 1 || ans == this.state.correctoption){
        this.score -= 1
       }
      }

  }

  _popView(stat,myAns){

   this.setState({ isHidden: stat});
   
   if(myAns == this.state.correctoption ){
    this.setState({myReslt : "true"})
  }else{
    this.setState({myReslt : "wrong"})
  }
  
  }

  _changeStat(){
    obj._onChange();
  }
  


  render() {
    let _this = this
    const currentOptions = this.state.options;

    const options = Object.keys(currentOptions).map( function(k) {
      return (  
        
           <View key={k} style={{margin:10}}>
           
              <Animbutton isHidden={(stat)=>_this._popView(stat,k)} countCheck={_this.state.countCheck} onColor={"green"} effect={"tada"} _onPress={(status) => _this._answer(status,k)} text={currentOptions[k]} />
            
          </View> 
      
      
      )
    });
    
    return (
     
      <View style={styles.container}>
      <View style={styles.ques} >
        <Text style={styles.quesText}>{/*question*/}
          {this.state.question}
        </Text>
        </View>
        
        <View style={{flexDirection:"column", justifyContent:'center',}}>
           <View style={{flexDirection:"row", }}>
             <View >{/*for answers1*/}
               { options [0]}
              </View>
             <View >{/*for answers2*/}
                { options [1]}
             </View>
            </View>
            <View style={{flexDirection:"row",}}>
            <View >{/*for answers3*/}
             { options [2]}
            </View>
            <View >{/*for answers4*/}
             { options [3]}
            </View></View>
           
           </View>
            {this.state.isHidden ? 
          <View style = { styles.buttonContainer }>
          <TouchableOpacity  onPress={() => {this.next();this.setState({ isHidden: false}); this._changeStat} }>        
                 <Image source={require('../../assets/img/playButton.png')} style={styles.buttonItem} />
                 <Text style={{color:"white",fontSize: 50 }}>{this.state.myReslt}</Text>
          </TouchableOpacity>
          </View>
            
             : null}
          
       
        <View style={{flexDirection:"row"}}>
      {/*   <Button
          onPress={() => this.prev()}
          title="Prev"
          color="#841584"
        />
        <View style={{margin:15}} />*/}
        
        
        {/* for toggling*/}   
    
        
        </View>
        
      </View>
   
    );
  }
}

const styles = StyleSheet.create({

  container:{
    height:height,
    width:width,
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor:"#6f1e1e",
    padding: 10,
   

  },
  
  
  ques: {
   
    flexDirection: 'column',
    borderRadius: 20,
    width:width/3,
    height:height/3,
    backgroundColor: 'grey',
    justifyContent:'center',
    alignItems: 'center',
    paddingLeft: 20,

  },
  quesText: {
    fontSize: 20,
    margin: 15,
    color: "white"
    
  },
  

  buttonContainer: {
    flex: 1,
    width:width,
    height:height,
    position: 'absolute',
    justifyContent: 'center',
   

    zIndex:2,
    alignItems: 'center',
    backgroundColor:'rgba(52, 52, 52, 0.8)'
    
 },
 buttonItem:{ 
  width:200,
  height:100,

},
});
