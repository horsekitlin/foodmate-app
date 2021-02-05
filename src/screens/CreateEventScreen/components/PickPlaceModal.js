import React, {Fragment, useEffect, useState} from 'react';
import {Modal, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import colors from '~/theme/color';
import Config from 'react-native-config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Header, Input, Icon, ListItem, Button} from 'react-native-elements';

const LeftIcon = ({leftIcon}) => {
  if (isEmpty(leftIcon)) return <Fragment />;
  return <View style={styles.icon}>{leftIcon}</View>;
};

const getContent = (place) => {
  if (isEmpty(place)) return {title: '請選擇聚會地點', subtitle: ''};
  return {
    title: place.structured_formatting.main_text,
    subtitle: place.structured_formatting.secondary_text,
  };
};

const PlaceField = ({place, leftIcon, onPress}) => {
  const {title, subtitle} = getContent(place);

  return (
    <TouchableOpacity onPress={onPress} style={styles.touch}>
      <View style={styles.fieldContainer}>
        <LeftIcon leftIcon={leftIcon} />
        <View style={styles.placeText}>
          <Text
            style={[
              styles.placeTitle,
              isNull(place) ? styles.placeholder : {},
            ]}>
            {title}
          </Text>
          {!isEmpty(subtitle) && (
            <Text style={styles.placeSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PlaceListItem = ({descriptionProps}) => {
  return (
    <ListItem>
      <Icon type='font-awesome' name='map-marker' />
      <ListItem.Content>
        <ListItem.Title>
          {descriptionProps.structured_formatting.main_text}
        </ListItem.Title>
        <ListItem.Subtitle>
          {descriptionProps.structured_formatting.secondary_text}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const PickPlaceModal = ({
  place,
  leftIcon,
  defaultVisible,
  onConfirm,
  onFail,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (defaultVisible) setVisible(defaultVisible);
  }, []);

  return (
    <Fragment>
      <PlaceField
        place={place}
        leftIcon={leftIcon}
        onPress={() => {
          setVisible(true);
        }}
      />
      <Modal
        visible={visible}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: '#000',
        }}>
        <Header
          rightComponent={() => (
            <Button title='關閉' onPress={() => setVisible(false)} />
          )}
        />
        <GooglePlacesAutocomplete
          debounce={2000}
          enablePoweredByContainer={false}
          renderRow={(descriptionProps) => {
            return (
              <PlaceListItem
                key={descriptionProps.place_id}
                descriptionProps={descriptionProps}
              />
            );
          }}
          onFail={onFail}
          query={{
            key: Config.GOOGLE_MAPS_API_KEY,
            language: 'zh-TW', // language of the results
          }}
          onPress={(data) => {
            const {description, place_id, terms, types} = data;
            const structured_formatting = pick(data.structured_formatting, [
              'main_text',
              'secondary_text',
            ]);
            onConfirm({
              description,
              place_id,
              terms,
              types,
              structured_formatting,
            });
            setVisible(false);
          }}
          textInputProps={{
            InputComp: Input,
            placeholder: '活動地點',
            leftIcon: {type: 'font-awesome', name: 'map-marker'},
            errorStyle: {color: 'red'},
          }}
        />
      </Modal>
    </Fragment>
  );
};

PickPlaceModal.defaultProps = {
  defaultVisible: false,
  onFail: () => false,
};

const styles = StyleSheet.create({
  fieldContainer: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.greyLightest,
  },
  icon: {
    paddingRight: 10,
  },
  touch: {
    width: '100%',
  },
  placeTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  placeholder: {
    color: colors.greyLight,
  },
  placeSubtitle: {
    fontSize: 12,
  },
});

export default PickPlaceModal;
