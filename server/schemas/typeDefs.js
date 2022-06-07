const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    decks: [Deck]
  }
  type Auth {
    token: ID!
    user: User
  }

  type Category {
    _id: ID
    category: String
  }

  type Deck {
    _id: ID
    title: String
    category: [Category]
    description: String
    creator: User
    date_created: String
    cards: [Card]
  }
  type Card {
    _id: ID
    sideA: String!
    sideB: String!
    deck: ID
  }

  type Query {
    user: User
    categories: [Category]
    category(categoryID: ID, category: String): Category
    decks: [Deck]
    deck(deckId: ID!): Deck
    deckTitle(deckTitle: String!): Deck 
    card(deckId: ID!, cardId: ID!): Deck
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addCategory(category: String!): Category
    addDeck(title: String!, category: String!, description: String): Deck
    addCard(deckId: ID!, sideA: String!, sideB: String!): Deck

    updateUser(username: String, email: String, password: String, deckId: ID): Auth
    login( username: String, email: String!, password: String!): Auth
    updateCategory(categoryID: ID!, category: String!): Category
    updateDeck(deckId: ID!, title: String, category: String, description: String): Deck
    updateCard(deckId: ID!, cardId: ID!, sideA: String!, sideB: String!): Deck
  }
`;

module.exports = typeDefs;
