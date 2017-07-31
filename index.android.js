/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  TouchableHighlight
} from 'react-native';


/**
 *  获取屏幕宽高
 */
var Dimensions = require("Dimensions"); 
var {width,height} = Dimensions.get('window'); 


let pic = { //Map集合 key:value
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};


export default class Demo1 extends Component {
	
	//js
	constructor(props){
		super(props);
		
		this.state = {  //有点类似Map集合,这里非要用state，state内部变量？
            images :[
				pic,
				require('./image/image1.jpg'),
				require('./image/image2.jpg'),
				require('./image/image3.jpg'),
				require('./image/image4.jpg'),
				require('./image/image5.jpg'),
				require('./image/image6.jpg')
			], 
            selectedImageIndex: 0,
            isNeedRun: true,
        };

        this._index = 0;// 当前正在显示的图片
        this._max = this.state.images.length;// 图片总数
		
	} 

	//js里面嵌入html，放在render里面
	render() {
    return (
      <View style={styles.container}>
	  
	  {/*导航*/}
		<View style={styles.topView}>
			<Text style={styles.topTitile}> 天猫超市</Text>
		</View>
		{/*纵向的ScrollView*/}
		<ScrollView>
			<View style={styles.headerView}>
					<View>
						{/*横向的ScrollView,淘宝轮播图*/}
						<TouchableOpacity onPress={() =>this.onBannerPressed()}  activeOpacity={0.9} >
						<ScrollView  
							ref='scrollView'
							horizontal={true}  
							showsHorizontalScrollIndicator={false}
							pagingEnabled={true}
							onMomentumScrollEnd={this.changeNumber.bind(this)}  //大括号里可以放js代码
							>
							
							<Image source={this.state.images[0]} style={{width: width, height: 160 ,marginTop:10}}/>   
							<Image source={this.state.images[1]} style={{width: width, height: 160 ,marginTop:10}}/>
							<Image source={this.state.images[2]} style={{width: width, height: 160 ,marginTop:10}}/>
							<Image source={this.state.images[3]} style={{width: width, height: 160 ,marginTop:10}}/>
							<Image source={this.state.images[4]} style={{width: width, height: 160 ,marginTop:10}}/>
							<Image source={this.state.images[5]} style={{width: width, height: 160 ,marginTop:10}}/>
							<Image source={this.state.images[6]} style={{width: width, height: 160 ,marginTop:10}}/>
						</ScrollView>
						</TouchableOpacity>
						
						<View style={styles.indicatorContainer}>
							<Text style={this.state.selectedImageIndex ==0?styles.active_indicator:styles.indicator}> &bull;</Text>
							<Text style={this.state.selectedImageIndex ==1?styles.active_indicator:styles.indicator}> &bull;</Text>
							<Text style={this.state.selectedImageIndex ==2?styles.active_indicator:styles.indicator}> &bull;</Text>
							<Text style={this.state.selectedImageIndex ==3?styles.active_indicator:styles.indicator}> &bull;</Text>
							<Text style={this.state.selectedImageIndex ==4?styles.active_indicator:styles.indicator}> &bull;</Text>
							<Text style={this.state.selectedImageIndex ==5?styles.active_indicator:styles.indicator}> &bull;</Text>
							<Text style={this.state.selectedImageIndex ==6?styles.active_indicator:styles.indicator}> &bull;</Text>
						</View>
					
					</View>
					
					
				
					<TouchableWithoutFeedback onPress={() => this.onBannerPressed()}><Image source={pic} style={{width: width, height: 110 ,marginTop:10 }} /></TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => this.onBannerPressed()}><Image source={require('./image/image1.jpg')} style={{width: width, height: 110 ,marginTop:10}} /></TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => this.onBannerPressed()}><Image source={require('./image/image2.jpg')} style={{width: width, height: 110 ,marginTop:10}} /></TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => this.onBannerPressed()}><Image source={require('./image/image3.jpg')} style={{width: width, height: 110 ,marginTop:10}} /></TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => this.onBannerPressed()}><Image source={require('./image/image4.jpg')} style={{width: width, height: 110 ,marginTop:10}} /></TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => this.onBannerPressed()}><Image source={require('./image/image5.jpg')} style={{width: width, height: 110 ,marginTop:10}} /></TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => this.onBannerPressed()}><Image source={require('./image/image6.jpg')} style={{width: width, height: 110 ,marginTop:10}} /></TouchableWithoutFeedback>
				
			</View>
			
			{/*输入框*/}
			<View style={styles.inputView}>
				<TextInput  style={styles.textInputStyle}
					placeholder={"邮箱: "}
				
				/>
				<TextInput  style={styles.textInputStyle} 
					placeholder={"密码: "}
					secureTextEntry={true}
				/>
			</View>
			
			{/*按钮*/}
			<TouchableOpacity  activeOpacity={0.8} onPress={() => this.loginClicked()}>
			<View style={styles.btnView}>
				<Text style={styles.btnText} onPress={() => this.loginClicked()}>
					登  陆
				 </Text>
			</View>
			</TouchableOpacity>
		</ScrollView>
      </View>
    );
  }
  
  
	//js 
	
	//html里调用loginClicked加括号就会出现奇怪的问题
	loginClicked(){
	  //alert('我被点击了');
	  
	   Alert.alert('温馨提醒','确认登录？',[

            {text:'取消',onPress:()=>ToastAndroid.show('你点击了取消~',ToastAndroid.SHORT)},

            {text:'确定',onPress:()=>ToastAndroid.show('你点击了确定~',ToastAndroid.SHORT)}]);
	}
  
  	
	//手动滑动
	changeNumber(e){
		var e = e.nativeEvent;
		console.log(e);
		var scrolledX = e.contentOffset.x;
		var scrolledImageIndex = Math.round(scrolledX/width);
		this.setState({ //state赋值,属性默认有set方法。
			selectedImageIndex: scrolledImageIndex
		})
		//滑动对定时指示器的影响
		this._index = scrolledImageIndex;
	}
	
	//程序加载 组件装载完成,系统自己调
    componentDidMount(){
        this.startRunImage();
    }

   //自动轮播
   startRunImage(){
	    var scrollView = this.refs.scrollView;
		
        if(this._max <= 1){ // 只有一个则不启动定时任务
            return;
        }
        this._timer = setInterval(function () {
            this._index++;
            if(this._index >= this._max){
                this._index = 0;
            }
            scrollView.scrollTo({x:this._index * width},true);
            // 重置小圆点指示器
            this.refreshFocusIndicator();
        }.bind(this), 2000);
    }

	//刷新指示器
    refreshFocusIndicator(){
        this.setState({selectedImageIndex:this._index});
    }

	//程序退出
	 // 组件即将卸载
    componentWillUnmount(){
        clearInterval(this._timer);
    }

	onBannerPressed(){
        Alert.alert('温馨提醒','你点击了第'+(this._index+1)+'张图片',[

            {text:'取消',onPress:()=>ToastAndroid.show('你点击了取消~',ToastAndroid.SHORT)},

            {text:'确定',onPress:()=>ToastAndroid.show('你点击了确定~',ToastAndroid.SHORT)}]);
	}
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,      //表示 weight=1
	backgroundColor:'#f2f2f2'
  },
  topView:{
	  height:44,
	  backgroundColor:'#ff5400',
	  justifyContent:'center',
	  alignItems:'center'
  },
  topTitile:{
	  fontSize:20,
	  color:'white'
  },
  headerView:{
	  
	  
  },
  
  indicatorContainer:{
	  height:30,
	  backgroundColor:'rgba(0,0,0,0.1)',
	  position:'absolute',
	  width:width,
	  bottom:0,
	  flexDirection:'row',  //里面子控件的排列方式，水平排列
	  justifyContent:'center',
	  alignItems:'center'
	  
  },
 
  inputView:{
	  marginTop:10
  },
  textInputStyle:{
	  backgroundColor:'#fff',
	  height:44,
	  borderBottomColor:'#ddd',
	  borderBottomWidth:1,
	  paddingLeft:15,
	  paddingRight:15
  },
  
  btnView:{
	width:width-30,
	height:44,
	backgroundColor:'#ff5400',
	justifyContent:'center',
	alignItems:'center',
	marginTop:20,
	marginLeft:15,
	marginBottom:20
  },
  btnText:{
	color:'white',
	fontSize:16
  },
  
  //轮播图相关
   indicator:{
	  fontSize:38,
	  color:'white'
  },
  
  active_indicator:{
	  fontSize:38,
	  color:'#ff5400'
  }

});

AppRegistry.registerComponent('Demo1', () => Demo1);
