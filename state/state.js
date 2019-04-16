// get JWT
// send binding data
// like and collect
// join circle
// publish post
// reply comment

const state = {
   mine: {
      gender: '',
      nickname: '',
      joined: [],
      published: [],
      collects: [],
      likes: []
   },
   circles: [
      {
         name: '',
         avatar: '',
         joinCount: '',
         talkingCount: '',
         isJoin: '',
         top: {
            title: '',
            post: {},
            comments: []
         }
      }
   ],
   notices: [
      {
         type: '',
         nickname: '',
         createdTime: ''
      }
   ],
   posts: [
      {
         gender: 1,
         nickname: '',
         createdTime: '',
         circleName: '',
         content: '',
         images: [],
         agreeCount: 0,
         commitCount: 0,
         collectionCount: 0,
         isAgree: false,
         isCollection: false,
         isTop: false
      }
   ],
   comments: [
      {
         gender: 1,
         nickname: '',
         createdTime: '',
         content: '',
         agreeCount: 0,
         isAgree: false,
         childComments: [
            {
               sender: '',
               recipient: '',
               content: ''
            }
         ]
      }
   ]
}