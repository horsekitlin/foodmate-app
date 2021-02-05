import React, {useState, Fragment, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button as BaseButton} from 'react-native-elements';
import isDate from 'lodash/isDate';
import DatePicker from 'react-native-date-picker';
import Text from '~/components/Text';
import Modal from 'react-native-modal';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import colors from '~/theme/color';
import ErrorMessage from '~/components/Inputs/ErrorMessage';

const LeftIcon = ({leftIcon}) => {
  if (isEmpty(leftIcon)) return <Fragment />;
  return <View style={styles.icon}>{leftIcon}</View>;
};

const DateText = ({date, placeholder}) => {
  if (isNull(date))
    return <Text style={styles.placeholder}>{placeholder}</Text>;

  return (
    <Text style={styles.dateText}>{format(date, 'yyyy-MM-dd HH:mm')}</Text>
  );
};

const InputField = ({
  date,
  leftIcon,
  placeholder,
  errorMessage,
  setShowModal,
}) => {
  return (
    <Fragment>
      <View style={styles.inputContainer}>
        <LeftIcon leftIcon={leftIcon} />
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <DateText date={date} placeholder={placeholder} />
        </TouchableOpacity>
      </View>
      <ErrorMessage errorMessage={errorMessage} />
    </Fragment>
  );
};

const DatetimeModal = ({
  placeholder,
  leftIcon,
  onConfirm,
  onCancel,
  defaultDate,
  errorMessage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (isDate(defaultDate)) {
      setDate(defaultDate);
    }
  }, []);

  return (
    <View style={styles.container}>
      <InputField
        date={date}
        leftIcon={leftIcon}
        placeholder={placeholder}
        setShowModal={setShowModal}
        errorMessage={errorMessage}
      />
      <Modal isVisible={showModal} style={styles.modal}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerColumn}>
              <BaseButton
                onPress={() => {
                  setShowModal(false);
                  onConfirm(date);
                }}
                titleStyle={styles.titleStyle}
                title='Confirm'
                type='clear'
              />
            </View>
            <View style={styles.headerColumn}>
              <Text>title</Text>
            </View>
            <View style={styles.headerColumn}>
              <BaseButton
                onPress={() => {
                  setShowModal(false);
                  onCancel();
                }}
                titleStyle={styles.titleStyle}
                title='Cancel'
                type='clear'
              />
            </View>
          </View>
          <DatePicker mode='datetime' date={date} onDateChange={setDate} />
        </View>
      </Modal>
    </View>
  );
};

DatetimeModal.defaultProps = {
  onConfirm: () => false,
  onCancel: () => false,
  defaultDate: '',
  title: '',
};
const styles = StyleSheet.create({
  modal: {justifyContent: 'flex-end', margin: 0},
  content: {
    flex: 1,
    backgroundColor: 'white',
    maxHeight: 250,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e4e4e4',
    maxHeight: 50,
  },
  headerColumn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  titleStyle: {color: 'black'},
  container: {
    display: 'flex',
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 54,
    width: '100%',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: colors.greyLightest,
  },
  icon: {
    paddingRight: 10,
  },
  placeholder: {
    fontSize: 16,
    color: colors.greyLight,
  },
  dateText: {
    color: colors.black,
  },
});

export default DatetimeModal;
