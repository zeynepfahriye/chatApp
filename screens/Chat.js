import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const Chat = () => {
    const router = useRoute();
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [uid, setUID] = useState('')

    useEffect(() => {
        return firebase
            .auth().onAuthStateChanged((user) => {
                setUID(user?.uid)
                setName(user.displayName)
            })
    }, [])


    useEffect(() => {
        return firebase
            .firestore()
            .doc("chats/" + router.params.chatId)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.data()?.messages ?? [])
            })
    }, [router.params.chatId])

    const onSend = (m = []) => {
        firestore()
            .doc("chats/" + router.params.chatId)
            .set(
                { messages: GiftedChat.append(messages, m) },
                { merge: true }
            )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GiftedChat
                messages={messages.map(x => ({
                    ...x, createdAt: x.createdAt?.toDate()
                }))}
                onSend={messages => onSend(messages)}
                user={{
                    _id: uid,
                    name: name,
                }}
            />
        </View>
    )
}
export default Chat;