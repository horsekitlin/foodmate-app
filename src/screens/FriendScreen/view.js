import React, {Fragment, useEffect} from 'react';
import {View, SectionList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {
  useNavigationButtonPress,
  useNavigation,
} from 'react-native-navigation-hooks';
import {useFriends} from '~/models';
import colors from '~/theme/color';
import RowItem from './components/RowItem';
import ViewContainer from '~/components/ViewContainer';

const TOP_BAR_RIGHT_BUTTON_ID = '#$%_right_button';

const renderRowItem = (push) => ({item}) => {
  return <RowItem item={item} push={push} />;
};

const SectionTitle = ({title}) => {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionText}>{title}</Text>
    </View>
  );
};

const FriendScreen = (props) => {
  const {push} = useNavigation();
  const data = useFriends();

  useNavigationButtonPress((e) => {
    if (
      props.componentId === e.componentId &&
      e.buttonId === TOP_BAR_RIGHT_BUTTON_ID
    ) {
      push('SearchFriend');
    }
  });

  useEffect(() => {
    props.handleGetFriends();
  }, []);

  return (
    <ViewContainer>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={renderRowItem(push)}
        renderSectionHeader={({section: {title}}) => (
          <SectionTitle title={title} />
        )}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    padding: 15,
    borderColor: colors.greyLightest,
    borderBottomWidth: 1,
  },
  sectionText: {
    color: colors.grey
  }
});

FriendScreen.options = {
  topBar: {
    rightButtons: [
      {
        id: TOP_BAR_RIGHT_BUTTON_ID,
        icon: require('assets/icons/search.png'),
        color: colors.grey,
      },
    ],
  },
};

export default FriendScreen;
