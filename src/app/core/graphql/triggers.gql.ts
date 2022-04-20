import gql from 'graphql-tag';

const triggerBody = `

  _id
  image
  kindcode
  creator { email }
  result {
    _id
    code
    total
    subtotal
  }
  createdAt
  updatedAt
`;

export const makeTrigger = gql`
 mutation makeTrigger($image: Upload!){
  makeTrigger(image: $image){ ${triggerBody} }
 }
`;

export const myTriggers = gql`
  query myTriggers($params: ListParams){
    myTriggers(params: $params){ ${triggerBody} }
  }
`;

export const triggers = gql`
  query triggers {
    triggers { ${triggerBody} }
  }
`;

export const trigger = gql`
  query trigger($id: ObjectID!) {
    trigger(id: $id) { ${triggerBody} }
  }
`;
