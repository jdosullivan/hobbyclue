import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLList as List} from 'graphql';
import EventType from '../../types/EventType';
import { EventsList } from './all';
import _ from 'lodash';

const event = {
  type: EventType,
  args: {
    id: { name: 'id', type: new NonNull(ID) }
  },
  resolve: function (root, params, options) {
    return _.find(EventsList, function(o) { return params.id == o.id; });
  }
};

export default event;
