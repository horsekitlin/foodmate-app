import { connect } from 'react-redux';
import { addMessageByWebsocketAction } from '~/actions/messageActions';
import { getRoomsAction } from '~/actions/roomActions';
import MessageScreen from './view';


const mapStateToProps = ({ auth, setting }) => {
  const database = setting.get('database');
  // const roomQuery = database.rooms.find();
  const userId = auth.get('_id');
  const socket = setting.get('socket');
  return {
    userId,
    socket,
    isAuth: auth.get('isAuth'),
    // roomQuery,
  };
};

const mapDispatchToProps = dispatch => ({
  handleGetRooms: payload => {
    dispatch(getRoomsAction(payload));
  },
  handleAddMessageByWebsocket: payload => {
    dispatch(addMessageByWebsocketAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);