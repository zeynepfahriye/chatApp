import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigation = useNavigation()
    const signIn = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password)
            navigation.popToTop()
        } catch (e) {
            setLoading(false)
            alert(e.message)
        }

    }
    return (
        <View style={{ backgroundColor: '#e1bee7', flex: 1 }}>
            <View style={{ marginTop: 150 }}>
                <TextInput label="Email" style={{ marginTop: 12, backgroundColor: 'transparent' }}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor='black'
                />
                <TextInput label="Password" style={{ marginTop: 12, backgroundColor: 'transparent' }}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={{
                justifyContent: 'space-between',
                marginTop: 15
            }}>
                <Button mode='contained' color='white' style={{ width: 250, alignSelf: 'center', marginTop: 10 }} onPress={() => signIn()}>Giriş Yap</Button>
                <Button mode='contained' color='white' onPress={() => navigation.navigate("ChatList")} loading={loading} style={{ width: 250, alignSelf: 'center', marginTop: 10 }}>Kayıt Ol</Button>
            </View>
        </View>
    )
}
export default Signin;