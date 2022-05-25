import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar, Title, Subheading, Button } from 'react-native-paper'
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';

const Settings = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            setName(user?.displayName ?? "")
            setEmail(user?.email ?? "")
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: '#e1bee7' }}>
            <View style={{ alignItems: 'center', backgroundColor: 'purple', borderRadius: 55, margin: 40, height: 200, marginTop: 150 }}>
                <Avatar.Text
                    style={{ marginTop: 15 }}
                    label={name.split(" ").reduce((prev, current) => prev + current[0], '')} />
                <Title>{name}</Title>
                <Subheading>{email}</Subheading>
                <Button onPress={() => auth().signOut()}>Sign Out</Button>
            </View>
        </View>
    )
}
export default Settings;