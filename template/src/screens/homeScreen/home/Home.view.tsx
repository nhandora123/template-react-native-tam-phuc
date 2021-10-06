import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid, 
  BackHandler,
  Alert,
} from 'react-native';
import {ButtonCustom} from '../../../components';
import {BackgroundBigScreen} from '../../../components/backgroundScreen/backgroundBigScreen/BackgroundBigScreen.view';
import styles from './Home.style';
import Ripple from 'react-native-material-ripple';
import {actionMain} from '../../../utils/mainActions';
import {
  RECIEVEDICON,
  WAITINGINVOICEICONLIST,
  DELIVERYMAN,
  COMPLETEDTASK,
  FILE,
} from '../../../assets';

const Home = (props: any) => {
  const transportion = name => {
    props.navigation.navigate(name);
  };
  const [exitApp, setExitApp] = useState(false);
  const backAction = () => {
    Alert.alert(
      'Thoát ứng dụng',
      'Bạn muốn thoát khỏi ứng dụng?', [{
          text: 'Hủy',
          onPress: () =>{},
          style: 'cancel'
      }, {
          text: 'Đồng ý',
          onPress: () => BackHandler.exitApp()
      }, ], {
          cancelable: false
      }
   )
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
}, []);
  return (
    <BackgroundBigScreen navigation={props.navigation}>
      <ScrollView>
        <View style={styles.groupButton}>
          <Ripple
            style={styles.buttonitem}
            onPress={() => transportion('Waiting')}>
            <View style={styles.VImageButton}>
              <View style={styles.ImageViewButton}>
                <Image
                  style={styles.ImageButton}
                  source={WAITINGINVOICEICONLIST}
                />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>1. Chờ nhận</Text>
            </View>
          </Ripple>
          <Ripple
            style={styles.buttonitem}
            onPress={() => transportion('Acceptance')}>
            <View style={styles.VImageButton}>
              <View style={styles.ImageViewButton}>
                <Image style={styles.ImageButton} source={RECIEVEDICON} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>2. Đã nhận</Text>
            </View>
          </Ripple>
        </View>
        <View style={styles.groupButton}>
          <Ripple
            style={styles.buttonitem}
            onPress={() => transportion('Transportion')}>
            <View style={styles.VImageButton}>
              <View style={styles.ImageViewButton}>
                <Image style={styles.ImageButton} source={DELIVERYMAN} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>3. Vận chuyển</Text>
            </View>
          </Ripple>
          <Ripple
            style={styles.buttonitem}
            onPress={() => transportion('Submission')}>
            <View style={styles.VImageButton}>
              <View style={styles.ImageViewButton}>
                <Image style={styles.ImageButton} source={FILE} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>4. Nộp phiếu</Text>
            </View>
          </Ripple>
        </View>
        <View style={styles.groupButton}>
          <Ripple
            style={styles.buttonitem}
            onPress={() => transportion('Finish')}>
            <View style={styles.VImageButton}>
              <View style={styles.ImageViewButton}>
                <Image style={styles.ImageButton} source={COMPLETEDTASK} />
              </View>
            </View>
            <View style={styles.VtitleButton}>
              <Text style={styles.titleButton}>5. Hoàn tất</Text>
            </View>
          </Ripple>
        </View>
      </ScrollView>
    </BackgroundBigScreen>
  );
};

export default Home;
