import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useEvents } from '~/models';
import { format } from '~/utils/timeUtil';
import { Icon, Image } from 'react-native-elements';
import {
  useNavigation,
  useNavigationButtonPress,
} from 'react-native-navigation-hooks';
import colors from '~/theme/color';
import Text from '~/components/Text';
import ViewContainer from '~/components/ViewContainer';
import socketClusterHelper from '~/helper/socketClusterHelpers';
import { getResolution, RESOLUTION } from '~/helper/imageResolutionHelper';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const { width } = Dimensions.get('window');

const EventCard = ({ event, push }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => push('EventDetail', { passProps: { eventId: event.id } })}>
      <View style={styles.card}>
        <Image source={{ uri: getResolution(event.logo.url, RESOLUTION.LARGE) }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <View style={styles.datetime}>
            <Text style={styles.datetimeText}>
              <Icon
                size={14}
                type='font-awesome'
                name='circle'
                style={styles.dotIcon}
                color={colors.primary}
              />
              {format(event.datingAt, 'yyyy-MM-dd EEEE')}
            </Text>
          </View>
          <View>
            <Text h3>{event.title}</Text>
            <Text h6>{`主辦人: ${event.creator.name}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EventsScreen = (props) => {
  const events = useEvents();
  const { push } = useNavigation();

  useEffect(() => {
    props.handleRegisterWebsocket();
    socketClusterHelper.basicSubscribe(props.userId);
    return () => {
      socketClusterHelper.basicUnsubscribe(props.userId);
    }
  }, []);

  useNavigationButtonPress((e) => {
    if (
      props.componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      push('CreateEvent');
    }
  });


  return (
    <ViewContainer>
      <FlatList
        keyExtractor={(item) => item.id}
        data={events}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                size={52}
                type='font-awesome'
                name='folder-open'
                style={styles.dotIcon}
                color={colors.primary}
              />
              <Text>List is Empty</Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          return <EventCard event={item} push={push} />;
        }}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    margin: 5,
  },
  cardContainer: {
    width: width / 2 - 5,
  },
  card: {
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  datetime: {
    // alignItems: 'center'
  },
  dotIcon: {
    marginRight: 5,
  },
  datetimeText: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
  },
});

EventsScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/create_event.png'),
        color: colors.primary,
      },
    ],
  },
};

export default EventsScreen;
