import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { List, Avatar, Divider, FAB, Portal, Dialog, Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [chats, setChats] = useState([])
    const navigation = useNavigation();
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            setName(user?.displayName ?? "")
            setEmail(user?.email ?? "")
        })
    }, [])

    useEffect(() => {
        firestore()
            .collection('chats')
            .where("users", "array-contains", email)
            .onSnapshot((querySnapshot) => {
                setChats(querySnapshot.docs)
            })
    }, [email])

    const createChat = async () => {
        if (!email || !userEmail) return;
        setLoading(true)
        const response = await
            firestore()
                .collection("chats")
                .add({
                    users: [email, userEmail]
                })
        setLoading(false)
        setIsDialogVisible(false)
        navigation.navigate('Chat', { chatId: response.id })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#e1bee7' }}>
            {chats.map(chat => (
                <React.Fragment>
                    <List.Item
                        title={chat.data().users.find(x => x !== email)}
                        description={chat.data().messages ?? [].text ?? undefined}
                        left={() => <Avatar.Text label={
                            chat
                                .data()
                                .users.find((x) => x !== email)
                                .split(" ")
                                .reduce((prev, current) => prev + current[0], "")}
                            size={56}
                        />}
                        onPress={() => navigation.navigate('Chat', { chatId: chat.id })}
                    />
                    <Divider inset />
                </React.Fragment>
            ))}

            <Portal>
                <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
                    <Dialog.Title>New Message</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Enter user email"
                            value={userEmail}
                            onChangeText={text => setUserEmail(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsDialogVisible(false)}>İptal</Button>
                        <Button onPress={() => createChat()} loading={loading}>Gönder</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <FAB icon="plus" style={{ position: 'absolute', right: 15, bottom: 15, backgroundColor: 'purple' }}
                onPress={() => setIsDialogVisible(true)} />
        </View>
    )
}
export default ChatList;