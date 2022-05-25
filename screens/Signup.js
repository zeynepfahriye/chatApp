import React, { useState } from 'react'
import { View, Dimensions } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigation = useNavigation()
    const createAccount = async () => {
        try {
            setLoading(true)
            const response = await auth().createUserWithEmailAndPassword(email, password)
            await response.user.updateProfile({ displayName: name })
            navigation.popToTop()
        } catch (e) {
            setLoading(false)
            alert(e.message)
        }

    }
    return (
        <View style={{ backgroundColor: '#e1bee7', flex: 1 }}>
            <View style={{ marginTop: 150 }}>
                <TextInput
                    style={{ backgroundColor: 'transparent', marginTop: 12 }}
                    label="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={{ backgroundColor: 'transparent', marginTop: 12 }}
                    label="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}

                />
                <TextInput
                    style={{ backgroundColor: 'transparent', marginTop: 12 }}
                    label="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={{
                justifyContent: 'space-between',
                marginTop: 15
            }}>
                <Button mode='contained' color='white' onPress={() => createAccount()} loading={loading} style={{ width: 250, alignSelf: 'center', marginTop: 10 }}>Kayıt Ol</Button>
                <Button mode='contained' color='white' style={{ marginTop: 10, width: 250, alignSelf: 'center' }} onPress={() => navigation.navigate('SignIn')}>Giriş Yap</Button>

            </View>
        </View>
    )
}
export default Signup;