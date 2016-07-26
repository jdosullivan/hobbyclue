import {GraphQLID as ID,GraphQLNonNull as NonNull,GraphQLList as List} from 'graphql';
import GroupType from '../../types/GroupType';
import { GroupList } from './all';
import _ from 'lodash';

const group = {
  type: GroupType,
  args: {
    id: { name: 'id', type: new NonNull(ID) }
  },
  resolve: function (root, params, options) {
    return _.find(GroupList, function(o) { return params.id == o.id; });
  }
};

export default group;
