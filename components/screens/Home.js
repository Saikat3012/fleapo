import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import avatar from '../../images/1.jpg'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { TextInput } from 'react-native-paper';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Axios from 'axios';


const Home = () => {
    const data = {
        name: 'Dherraj'
    }
    const [selectedSection, setSelectedSection] = useState( 'out-station' )
    const [trip, setTrip] = useState( 'round-trip' )
    const [form, setform] = useState( '' )
    const [to, setTo] = useState( '' )
    const [returns, setReturns] = useState( '' );


    const [pickUp, setPickUp] = useState( false )
    const [photo, setPhoto] = useState( false )
    const [deliver, setDeliver] = useState( false )

    const [latitudePress, setLatitude] = useState( 15.230810 );
    const [longitudePress, setLongitude] = useState( 88.724541 );
    const [address, setAddress] = useState( 'Krishnagar' )

    const KEY = 'pk.8d009e0ad9814d811d4be2156f1b1eff'

    const getAddress = async ( lat, lon ) => {
        try {
            if ( lon ) {
                console.log( "lat: " + lat + "   lon: " + lon )
                const api = `https://us1.locationiq.com/v1/reverse.php?key=${ KEY }&lat=${ lat }&lon=${ lon }&format=json`
                // console.log("Hi" + api)
                const { data } = await Axios.get( api );
                console.log( data )
                setAddress( data.display_name )
                // console.log("add: " + address)
                // setLatDone(true)
            }
        } catch ( error ) {
            // console.log("eee: " + error)
        }
    }


    const fetchLocation = async () => { // will fetch current location
        await Geolocation.getCurrentPosition( async ( info ) => {
            // console.log(info)
            setLatitude( info.coords.latitude )
            setLongitude( info.coords.longitude )
            getAddress( info.coords.latitude, info.coords.longitude )
        } );

    }
    fetchLocation()
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerConatiner}>
                <Ionicons name='md-pin' size={40} color={'#c48c54'} />
                <View>
                    <Text style={{
                        color: '#B9B0B0',
                        fontSize: 18
                    }}>Your current location</Text>
                    <Text style={{
                        color: '#000',
                        fontSize: 18
                    }}>6, Ballygunge place, Kolkata</Text>
                </View>
                <Image source={avatar} style={styles.avatar} />
            </View>
            <View style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 100,
                backgroundColor: 'rgba( 251, 219, 90, 0.2)',
                paddingHorizontal: 15,
                marginTop: 20
            }}>
                <Text style={{
                    color: '#000',
                    fontSize: 18
                }}>Contact ZORRRO Admin</Text>
                <TouchableOpacity>
                    <Ionicons name='call' size={38} color={'#c48c54'} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>

                <View style={{ height: 250, width: '100%', alignSelf: 'center' }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: Number( latitudePress ),
                            longitude: Number( longitudePress ),
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: Number( latitudePress ),
                                longitude: Number( longitudePress )
                            }}
                            title={address}
                            description="You are here"
                        />
                    </MapView>
                    <TouchableOpacity style={{
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        width: 120,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 5,
                        borderRadius: 8,
                        position: 'absolute',
                        bottom: 35,
                        left: 10
                    }}>
                        <Text style={{
                            fontSize: 12
                        }}>Open in maps</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ paddingHorizontal: 12 }}>
                        <Text style={{ color: '#000', marginTop: 18, fontSize: 20 }}>Delivery Details</Text>
                        <Text style={{ color: '#B4AFAB', marginTop: 18, fontSize: 18 }}>Status</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        marginTop: 10
                    }}>
                        <TouchableOpacity onPress={() => setPickUp( !pickUp )}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            {pickUp ? <AntDesign name="checkcircle" size={25} color={'#c48c54'} /> : <Entypo name="circle" size={25} color={'#c48c54'} />}
                            <Text style={{ color: '#000', marginLeft: 8 }}>Pick Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPhoto( !photo )}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            {photo ? <AntDesign name="checkcircle" size={25} color={'#c48c54'} /> : <Entypo name="circle" size={25} color={'#c48c54'} />}
                            <Text style={{ color: '#000', marginLeft: 8 }}>Pick Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setDeliver( !deliver )}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            {deliver ? <AntDesign name="checkcircle" size={25} color={'#c48c54'} /> : <Entypo name="circle" size={25} color={'#c48c54'} />}
                            <Text style={{ color: '#000', marginLeft: 8 }}>Pick Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: '94%',
                    height: 1,
                    backgroundColor: '#B4AFAB',
                    alignSelf: 'center',
                    marginTop: 15
                }} />
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginVertical: 18
                }}>
                    <View>
                        <Text style={{ color: '#000' }}>Rajarshi Banerjee</Text>
                        <Text style={{ color: '#000' }}>34, New Alipore, Kolkata 700029</Text>
                    </View>
                    <TouchableOpacity style={{
                        borderRadius: 5,
                        backgroundColor: '#00ff00',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Ionicons name="call" color={"#fff"} size={20} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: '94%',
                    height: 1,
                    backgroundColor: '#B4AFAB',
                    alignSelf: 'center',
                    marginTop: 15
                }} />

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: 15
                }}>
                    <View>
                        <Text style={{ color: '#B4AFAB', marginTop: 20, fontSize: 18 }}>Amount</Text>
                        <Text style={{ color: '#000', marginTop: 5, fontSize: 16 }}>Rs. 250</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#B4AFAB', marginTop: 20, fontSize: 18 }}>Payment Method</Text>
                        <Text style={{ color: '#000', marginTop: 5, fontSize: 16 }}>Cash on Delivery</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: 15
                }}>
                    <View>
                        <Text style={{ color: '#B4AFAB', marginTop: 20, fontSize: 18 }}>Total Kms Travelled</Text>
                        <Text style={{ color: '#000', marginTop: 5, fontSize: 16 }}>16.2 Kms</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#B4AFAB', marginTop: 20, fontSize: 18 }}>Deliver Time</Text>
                        <Text style={{ color: '#000', marginTop: 5, fontSize: 16 }}>16:20</Text>
                    </View>
                </View>

                <TouchableOpacity style={{
                    backgroundColor: '#c48c54',
                    paddingVertical: 10,
                    borderRadius: 8,
                    alignSelf: 'center',
                    width: '85%',
                    marginTop: 36,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>DELIVER</Text>
                </TouchableOpacity>




            </View>

        </ScrollView>
    )
}
export default Home;

const styles = StyleSheet.create( {
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    mainContainer: {
        paddingHorizontal: 5,
        paddingBottom: 20
    },
    row: {
        flexDirection: 'row'
    },
    headerConatiner: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        paddingBottom: 8,
        marginTop: 20
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    headingText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    topSelectionContainer: {
        backgroundColor: '#313134',
        flexDirection: 'row',
        borderRadius: 12,
        marginTop: 25
    },
    selectionButtonConatiner: {
        width: "33%",
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 30
    },
    optionButtonContainer: {
        flexDirection: 'row',
        height: 50,
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRightWidth: 0.25,
        borderColor: '#fff'
    },
    h2: {
        color: '#fff',
        fontSize: 11,
        marginLeft: 5
    },
    tripSelectionContainer: {
        flexDirection: 'row',
        width: '75%',
        borderColor: '#D8D107',
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: -110,
        alignSelf: 'center',
        backgroundColor: '#000'
    },
    tripButton: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: '50%'
    },
    devider: {
        width: '93%',
        borderColor: '#D8D107',
        borderWidth: 1,
        height: 60,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 80
    },
    tripDetailsContainer: {
        width: '85%',
        marginTop: 15,
        alignSelf: 'center',
        borderWidth: 0.3,
        borderColor: '#fff',
        backgroundColor: '#1B1B1C',
        borderRadius: 5,
        paddingVertical: 10
    },
    tripInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    input: {
        width: '100%',
        borderBottomColor: '#D8D107',
        borderBottomWidth: 0.8,
        height: 35,
        fontSize: 12,
        backgroundColor: '#1B1B1C'
    },
    inputContainer: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    inputContainer1: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000'
    },
} )