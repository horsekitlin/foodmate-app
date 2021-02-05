import React, { useState, useEffect, useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { Icon } from 'react-native-elements';
import { useMessages } from '~/models';
import colors from '~/theme/color';
import ViewContainer from '~/components/ViewContainer';


const renderBubble = (props) => {
  return (
    <TouchableWithoutFeedback>
      <View style={{ flex: 1 }}>
        <Bubble
          {...props}
          wrapperStyle={{
            left: styles.messageBubbleLeft,
            right: styles.messageBubbleRight,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const SendButton = (props) => {
  const buttonColor = isEmpty(props.text) ? '#707070' : colors.primary;

  return (
    <Send {...props}>
      <Icon
        containerStyle={{
          width: 40,
          height: 54,
          bottom: -10,
          paddingLeft: 0,
          paddingTop: 10,
        }}
        color={buttonColor}
        name='send'
        type='materialicon'
      />
    </Send>
  );
};

const ChatScreen = ({ userId, roomId, handleAddMessage, handleGetMessages }) => {
  const messages = useMessages(roomId);

  useEffect(() => {
    handleGetMessages({ roomId });
  }, []);

  const onSend = useCallback((messages = []) => {
    const [message] = messages;
    const payload = {
      text: message.text,
      roomId,
    };
    handleAddMessage(payload);
  }, []);

  return (
    <ViewContainer>
      <GiftedChat
        style={{ flex: 1 }}
        messages={messages}
        placeholder='请输入文字讯息'
        renderBubble={renderBubble}
        renderSend={(sendProps) => <SendButton {...sendProps} />}
        onQuickReply={(value) => console.log(`onQuickReply:`, value)}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
        }}
      />
    </ViewContainer>
  );
};

ChatScreen.options = {
  bottomTabs: {
    visible: false
  }
}

const styles = StyleSheet.create({
  messageBubbleLeft: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  messageBubbleRight: {
    backgroundColor: colors.primary,
  },
})

export default ChatScreen;
