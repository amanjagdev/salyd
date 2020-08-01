import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList
} from 'react-native';
import { colors } from '../../../constants/constant';
import { apiUrl } from '../../../config/keys';
import { GlobalContext } from '../../../context/GlobalState';

 const GenerateBill = () => {
    const {globalTableId } = React.useContext(GlobalContext)
  // initial state
    const [isVisible,setIsVisible] = useState(false);
    const [order,setOrder] = useState([]);

    // hide show modal
    const displayModal = (show) => {
        setIsVisible(show);
    }

    useEffect(() => {
        fetch(`${apiUrl}/generatebill`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "tableId": globalTableId
            })
        }).then((res) => res.json())
        .then((data) => {
            console.log(data,"hello");
            setOrder(data);                 
        }).catch((err) => {
            console.log(err);
        })
    },[])
    return (
      <View style = { styles.container }>
        <Modal
            animationType = {"slide"}
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
              displayModal(false);
            }}>
                
                <View style={{ margin: 15, marginTop: 0 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Your Order : </Text>
                    <View style={{
                        maxHeight: 300,
                    }}>
                        <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ flex: 1, fontWeight: "bold" }}>Name</Text>
                            <Text style={{ flex: 1, fontWeight: "bold" }}>Quantity</Text>
                            <Text style={{ flex: 1, fontWeight: "bold" }}>Price</Text>
                            <Text style={{ flex: 1, fontWeight: "bold" }}>Total Price</Text>
                        </View>
                        <FlatList
                            data={order}
                            renderItem={({ item }) => (
                                item.count ?
                                    <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <Text style={{ flex: 1 }}>{item.item}</Text>
                                        <Text style={{ flex: 1 }}>{item.count}</Text>
                                        <Text style={{ flex: 1 }}>{item.price}</Text>
                                        <Text style={{ flex: 1 }}>{item.price * item.count}</Text>
                                    </View> : null
                            )}
                        />
                    </View>
                </View>

          </Modal>
            
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                displayModal(true);
              }}>
              <Text style={styles.buttonText}>Show Modal</Text>
          </TouchableOpacity>          
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.accentPrimary,
    // shadowColor: "black",
    // shadowOpacity: 0.6,
    // shadowOffset: { 
    //   height: 1000, 
    //   width: 100 
    // },
    // shadowRadius: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  }
});

export default GenerateBill;