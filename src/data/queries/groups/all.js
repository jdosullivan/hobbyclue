import {GraphQLID as ID,GraphQLNonNull as NonNull,GraphQLList as List} from 'graphql';
import GroupType from '../../types/GroupType';
import _ from 'lodash';

export var GroupList = [
  {
    "id": 1446412739541,
    "name": "Group 1",
    "coverImage": "cover1.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740882,
    "name": "Group 2",
    "coverImage": "cover2.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740883,
    "name": "Group 3",
    "coverImage": "cover3.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740884,
    "name": "Group 4",
    "coverImage": "cover5.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740885,
    "name": "Group 5",
    "coverImage": "cover5.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740886,
    "name": "Group 6",
    "coverImage": "cover6.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740887,
    "name": "Group 7",
    "coverImage": "cover7.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740888,
    "name": "Group 8",
    "coverImage": "cover8.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  },
  {
    "id": 1446412740889,
    "name": "Group 9",
    "coverImage": "cover9.jpg",
    "created": "2015-07-24T13:23:15.580Z"
  }
];



const groups = {
  type: new List(GroupType),
  resolve: function () {
    return GroupList;
  }
};


export default groups;
