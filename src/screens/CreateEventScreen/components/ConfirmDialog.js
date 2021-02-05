import React, {Fragment} from 'react';
import isEmpty from 'lodash/isEmpty';
import {StyleSheet, View} from 'react-native';
import {Overlay, Text} from 'react-native-elements';
import propTypes from 'prop-types';
import Button from '~/components/Button';
import colors from '~/theme/color';
import format from 'date-fns/format';
import Image from '~/components/Image';
import confirmImage from '~/assets/images/image-comfirm-activity.png';

const LabelText = ({label, content}) => {
  return (
    <Text style={[styles.text, styles.label]}>{`${label}: ${content}`}</Text>
  );
};

const getMainText = (place) => {
  if (isEmpty(place)) return '';

  return place.structured_formatting.main_text;
};

const ConfirmDialog = ({visible, payload, handleCreateEvent, onClose}) => {
  if (!visible) return <Fragment />;
  return (
    <Overlay
      isVisible={visible}
      overlayStyle={styles.overlay}
      onClose={onClose}>
      <Fragment>
        <Image source={confirmImage} style={styles.headerImg} />
        <Text h3 style={styles.text}>
          確認活動資訊
        </Text>
        <View style={styles.container}>
          <LabelText label='活動名稱' content={payload.title} />
          <LabelText
            label='活動日期'
            content={format(payload.datingAt, 'yyyy-MM-dd HH:mm')}
          />
          <LabelText
            label='審核截止'
            content={format(payload.finalReviewAt, 'yyyy-MM-dd HH:mm')}
          />
          <LabelText label='參與人數' content={payload.userCountMax} />
          <LabelText label='活動類型' content={payload.type} />
          <LabelText label='每人預算' content={payload.budget} />
          <LabelText label='費用分攤' content={payload.paymentMethod} />
          <LabelText label='活動地點' content={getMainText(payload.place)} />
        </View>
        <Button title='建立活動' onPress={handleCreateEvent} />
        <Button title='取消返回' type='outline' onPress={onClose} />
      </Fragment>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  headerImg: {
    width: 200,
    height: 80,
    margin: 15,
    resizeMode: 'contain',
  },
  container: {
    padding: 15,
    justifyContent: 'flex-start',
  },
  overlay: {
    width: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.grey,
  },
  label: {
    marginBottom: 5,
  },
});

ConfirmDialog.propTypes = {
  visible: propTypes.bool.isRequired,
  payload: propTypes.object,
  handleCreateEvent: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
  payload: {},
};

export default ConfirmDialog;
