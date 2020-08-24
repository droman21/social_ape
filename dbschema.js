let db = {
    screams: [
        {
            userHandle: 'user',
            body: 'this is the scream body',
            createdAt: '2020-08-23T19:52:55.339Z',
            likeCount: 5,
            commentCount: 2
        }
    ],
    users: [
        {
            userId: 'E90TXA6vaWfddTLEQEcdM6W812J3',
            email: 'test@email.com',
            handle: 'Bob',
            createdAt: '2020-08-24T15:19:26.601Z',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/socialape-a01e4.appspot.com/o/942705289964.png?alt=media&token=705ae9f3-a65e-425b-8310-b050d5308dad',
            bio: 'Hey whats up world! My name is Bob. First user here (woot woot), nice to meet you',
            website: 'https://user.com',
            location: 'Cleveland, OH'
        }
    ]
};
const userDetails = {
    // Redux Data
    credentials: {
      userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2019-03-15T10:59:52.798Z',
      imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
      bio: 'Hi, my name is User, nice to meet you!',
      website: 'https://user.com',
      location: 'Lonodn, UK'
    },
    likes: [
      {
        userHandle: 'user',
        screamId: 'hh7O5oWfWucVzGbHH2pa'
      },
      {
        userHandle: 'user',
        screamId: '3IOnFoQexRcofs5OhBXO'
      }
    ]
};
