import React, { Fragment, useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { StyleSheet, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import Text from '~/components/Text';
import colors from '~/theme/color';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Avatar from '~/components/Avatar';
import confirmImage from '~/assets/images/image-join-request.png';

const handleApprove = ({
  userId,
  onClose,
  eventId,
  handleValidEventMember,
}) => () => {
  handleValidEventMember({ eventId, userId });
  onClose();
};

const NotAdminButton = ({
  eventId,
  show,
  onClose,
  handleLeaveEvent,
}) => {
  if (!show) return <Fragment />;

  return (
    <Fragment>
      <View style={styles.cancelZone}>
        <Button
          title='離開'
          onPress={() => handleLeaveEvent({
            eventId,
            onSuccess: onClose
          })}
          buttonStyle={{ backgroundColor: colors.error, width: 200 }}
        />
        <Button
          title='返回'
          type='outline'
          onPress={onClose}
          buttonStyle={{ width: 200 }}
        />
      </View>
    </Fragment>
  );
};

const AdminButton = ({
  show,
  eventId,
  userId,
  onClose,
  handleValidEventMember,
  handleRejectEventMember,
}) => {
  if (!show) return <Fragment />;

  const onApprove = handleApprove({
    eventId,
    userId,
    onClose,
    handleValidEventMember,
  });

  return (
    <Fragment>
      <Button title='同意' onPress={onApprove} buttonStyle={{ width: 200 }} />
      <View style={styles.cancelZone}>
        <Button
          title='拒絕'
          onPress={() => handleRejectEventMember({ eventId, userId })}
          buttonStyle={{ backgroundColor: colors.error, width: 200 }}
        />
        <Button
          title='返回'
          type='outline'
          onPress={onClose}
          buttonStyle={{ width: 200 }}
        />
      </View>
    </Fragment>
  );
};

const VerifyButton = ({
  isAdmin,
  member,
  eventId,
  onClose,
  handleLeaveEvent,
  handleValidEventMember,
  handleRejectEventMember,  
}) => {
  if (isAdmin) return (
    <AdminButton
      show
      userId={member.info.id}
      eventId={eventId}
      member={member}
      onClose={onClose}
      handleValidEventMember={handleValidEventMember}
      handleRejectEventMember={handleRejectEventMember}
    />
  );

  return (
    <NotAdminButton
      show
      onClose={onClose}
      eventId={eventId}
      handleLeaveEvent={handleLeaveEvent}
    />
  );
}

const VerifyContent = ({
  show,
  eventId,
  isAdmin,
  member,
  onClose,
  handleLeaveEvent,
  handleValidEventMember,
  handleRejectEventMember,
}) => {
  if (!show) return <Fragment />;

  const { info } = member;
  return (
    <View style={styles.content}>
      <Image source={confirmImage} style={styles.headerImg} />
      <Text h3 style={styles.text}>
        {`${info.name} 想參與活動！`}
      </Text>
      <View style={styles.note}>
        <Text h6>希望可以參加這個優質的好活動！</Text>
      </View>
      <VerifyButton
        isAdmin={isAdmin}
        member={member}
        eventId={eventId}
        onClose={onClose}
        handleLeaveEvent={handleLeaveEvent}
        handleValidEventMember={handleValidEventMember}
        handleRejectEventMember={handleRejectEventMember}
      />
    </View>
  );
};

const DetailContent = ({ push, show, member, eventId, isAdmin, onClose, handleRejectEventMember }) => {
  if (!show) return <Fragment />;

  return (
    <View style={styles.content}>
      <Avatar rounded size='large' source={{ uri: member.info.avatar.url }} />
      <Text h2>{member.info.name}</Text>
      <Button
        title='檢視個人資料'
        onPress={() => {
          onClose();
          push('MemberDetail', { userId: member.info.id });
        }}
      />
      <View style={styles.cancelZone}>
        <Button
          title='踢除成員'
          disabled={!isAdmin}
          onPress={() => {
            handleRejectEventMember({ eventId, userId: member.info.id });
            onClose();
          }}
          buttonStyle={{ backgroundColor: colors.error, width: 200 }}
        />
        <Button
          title='返回'
          type='outline'
          onPress={onClose}
          buttonStyle={{ width: 200 }}
        />
      </View>
    </View>
  );
};

const MemberModal = ({
  push,
  users,
  visible,
  eventId,
  isAdmin,
  onClose,
  selectedId,
  handleLeaveEvent,
  handleValidEventMember,
  handleRejectEventMember,
}) => {
  const [member, setMember] = useState({ info: {} });
  useEffect(() => {
    if (visible && !isEmpty(selectedId)) {
      const user = users.find((user) => user.id === selectedId);
      setMember(user);
    } else {
      setMember({ info: {} });
    }
  }, [visible, selectedId]);

  const shouldVerify = member.status !== 1;

  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={onClose}>
      <Fragment>
        <VerifyContent
          member={member}
          eventId={eventId}
          isAdmin={isAdmin}
          onClose={onClose}
          show={shouldVerify}
          handleLeaveEvent={handleLeaveEvent}
          handleValidEventMember={handleValidEventMember}
          handleRejectEventMember={handleRejectEventMember}
        />
        <DetailContent
          push={push}
          show={!isAdmin}
          member={member}
          eventId={eventId}
          isAdmin={isAdmin}
          onClose={onClose}
          show={!shouldVerify}
          handleRejectEventMember={handleRejectEventMember}
        />
      </Fragment>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelZone: {
    marginTop: 60,
    alignItems: 'center',
  },
  headerImg: {
    width: 200,
    height: 80,
    margin: 15,
    resizeMode: 'contain',
  },
  text: {
    paddingBottom: 10,
  },
  note: {
    width: '70%',
    padding: 15,
  },
  selectContainer: {
    padding: 12,
    width: 200,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.greyLightest,
  },
});

export default MemberModal;
