import React, {Fragment, useState} from 'react';
import {View, SectionList, Text, StyleSheet} from 'react-native';
import colors from '~/theme/color';
import isEmpty from 'lodash/isEmpty';
import {useNavigation} from 'react-native-navigation-hooks';
import {useEventDetail} from '~/models';
import RowItem from './components/RowItem';
import MemberModal from './components/MemberModal';
import ViewContainer from '~/components/ViewContainer';

const SectionTitle = ({title}) => {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionText}>{title}</Text>
    </View>
  );
};

const renderRowItem = (onOpen, authUserId) => ({item}) => {
  return <RowItem item={item} authUserId={authUserId} onPress={onOpen(item.id)} />;
};

const getSectionData = (data = []) => {
  return data.reduce(
    (rs, user) => {
      const pushIndex = user.status === 1 ? 1 : 0;
      rs[pushIndex].data.push(user);
      return rs;
    },
    [
      {title: '待審核', data: []},
      {title: '成員', data: []},
    ]
  );
};

const handleOpenModal = (setVisible, setSelectedId) => (id) => () => {
  setVisible(true);
  setSelectedId(id);
}

const handleCloseModal = setVisible => () => {
  setVisible(false);
}

const EventMemberScreen = ({ authUserId, eventId, handleValidEventMember,handleRejectEventMember, handleLeaveEvent }) => {
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (isEmpty(eventId)) return <Fragment />;

  const {push} = useNavigation();
  const event = useEventDetail(eventId);
  if (isEmpty(event)) return <Fragment />;

  const data = getSectionData(event.users);
  const onClose = handleCloseModal(setVisible);
  const onOpen = handleOpenModal(setVisible, setSelectedId)
  const isAdmin = authUserId === event.creator.id;

  return (
    <ViewContainer>
      <MemberModal
        push={push}
        eventId={event.id}
        onClose={onClose}
        visible={visible}
        isAdmin={isAdmin}
        users={event.users}
        selectedId={selectedId}
        handleLeaveEvent={handleLeaveEvent}
        handleValidEventMember={handleValidEventMember}
        handleRejectEventMember={handleRejectEventMember}
      />
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={renderRowItem(onOpen, authUserId)}
        renderSectionHeader={({section: {title}}) => (
          <SectionTitle title={title} />
        )}
      />
    </ViewContainer>
  );
};

EventMemberScreen.options = (props) => ({
  topBar: {
    title: {
      component: {
        name: 'TopBar',
        color: colors.grey,
        aligment: 'center',
        passProps: {
          title: props.title,
        },
      },
    },
  },
});

const styles = StyleSheet.create({
  sectionTitle: {
    padding: 15,
    borderColor: colors.greyLightest,
    borderBottomWidth: 1,
  },
  sectionText: {
    color: colors.grey,
  },
});

export default EventMemberScreen;
