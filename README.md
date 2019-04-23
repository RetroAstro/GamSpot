![](https://s2.ax1x.com/2019/04/17/Az4r7j.png)

![](https://s2.ax1x.com/2019/04/17/Az4chq.png)

**Generating Action Creators** 

```js
function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

const ADD_TODO = 'ADD_TODO'
const EDIT_TODO = 'EDIT_TODO'
const REMOVE_TODO = 'REMOVE_TODO'

export const addTodo = makeActionCreator(ADD_TODO, 'text')
export const editTodo = makeActionCreator(EDIT_TODO, 'id', 'text')
export const removeTodo = makeActionCreator(REMOVE_TODO, 'id')
```

**Async Action Creators** 

However, this quickly gets repetitive because different components request data from the same API endpoints. Moreover, we want to reuse some of this logic (e.g., early exit when there is cached data available) from many components.

**Generating Reducers** 

```js
export const todos = createReducer([], {
  [ActionTypes.ADD_TODO]: (state, action) => {
    const text = action.text.trim()
    return [...state, text]
  }
})

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
```

**Computing Derived Data** 

Reselect is a simple library for creating memoized, composable **selector** functions. Reselect selectors can be used to efficiently compute derived data from the Redux store.

the state tree is large, or the calculation expensive, repeating the calculation on every update may cause performance problems. Reselect can help to avoid these unnecessary recalculations.

**Structuring Reducers**

```js
// Reusable utility functions

function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues)
}

function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })

  return updatedItems
}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

// Handler for a specific case ("case reducer")
function setVisibilityFilter(visibilityState, action) {
  // Technically, we don't even care about the previous state
  return action.filter
}

// Handler for an entire slice of state ("slice reducer")
const visibilityReducer = createReducer('SHOW_ALL', {
  SET_VISIBILITY_FILTER: setVisibilityFilter
})

// Case reducer
function addTodo(todosState, action) {
  const newTodos = todosState.concat({
    id: action.id,
    text: action.text,
    completed: false
  })

  return newTodos
}

// Case reducer
function toggleTodo(todosState, action) {
  const newTodos = updateItemInArray(todosState, action.id, todo => {
    return updateObject(todo, { completed: !todo.completed })
  })

  return newTodos
}

// Case reducer
function editTodo(todosState, action) {
  const newTodos = updateItemInArray(todosState, action.id, todo => {
    return updateObject(todo, { text: action.text })
  })

  return newTodos
}

// Slice reducer
const todosReducer = createReducer([], {
  ADD_TODO: addTodo,
  TOGGLE_TODO: toggleTodo,
  EDIT_TODO: editTodo
})

// "Root reducer"
const appReducer = combineReducers({
  visibilityFilter: visibilityReducer,
  todos: todosReducer
})
```

**Designing a Normalized State** 

```js
{
    posts : {
        byId : {
            "post1" : {
                id : "post1",
                author : "user1",
                body : "......",
                comments : ["comment1", "comment2"]
            },
            "post2" : {
                id : "post2",
                author : "user2",
                body : "......",
                comments : ["comment3", "comment4", "comment5"]
            }
        },
        allIds : ["post1", "post2"]
    },
    comments : {
        byId : {
            "comment1" : {
                id : "comment1",
                author : "user2",
                comment : ".....",
            },
            "comment2" : {
                id : "comment2",
                author : "user3",
                comment : ".....",
            },
            "comment3" : {
                id : "comment3",
                author : "user3",
                comment : ".....",
            },
            "comment4" : {
                id : "comment4",
                author : "user1",
                comment : ".....",
            },
            "comment5" : {
                id : "comment5",
                author : "user3",
                comment : ".....",
            },
        },
        allIds : ["comment1", "comment2", "comment3", "commment4", "comment5"]
    },
    users : {
        byId : {
            "user1" : {
                username : "user1",
                name : "User 1",
            },
            "user2" : {
                username : "user2",
                name : "User 2",
            },
            "user3" : {
                username : "user3",
                name : "User 3",
            }
        },
        allIds : ["user1", "user2", "user3"]
    }
}
```

```js
{
    entities: {
        authors : { byId : {}, allIds : [] },
        books : { byId : {}, allIds : [] },
        authorBook : {
            byId : {
                1 : {
                    id : 1,
                    authorId : 5,
                    bookId : 22
                },
                2 : {
                    id : 2,
                    authorId : 5,
                    bookId : 15,
                },
                3 : {
                    id : 3,
                    authorId : 42,
                    bookId : 12
                }
            },
            allIds : [1, 2, 3]

        }
    }
}
    // Look up all books by this author
    let books = []
    
    entities.authorBook.allIds.map((id) => {
        if (entities.authorBook.byId[id].authorId === 5) {
            books.push(
                entities.books[entities.authorBook.byId[id].bookId]
            )
        }
    })
```

**Slice Reducer Composition**

```js
// actions.js
function addComment(postId, commentText) {
  // Generate a unique ID for this comment
  const commentId = generateId('comment')

  return {
    type: 'ADD_COMMENT',
    payload: {
      postId,
      commentId,
      commentText
    }
  }
}

// reducers/posts.js
function addComment(state, action) {
  const { payload } = action
  const { postId, commentId } = payload

  // Look up the correct post, to simplify the rest of the code
  const post = state[postId]

  return {
    ...state,
    // Update our Post object with a new "comments" array
    [postId]: {
      ...post,
      comments: post.comments.concat(commentId)
    }
  }
}

function postsById(state = {}, action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return addComment(state, action)
    default:
      return state
  }
}

function allPosts(state = [], action) {
  // omitted - no work to be done for this example
}

const postsReducer = combineReducers({
  byId: postsById,
  allIds: allPosts
})

// reducers/comments.js
function addCommentEntry(state, action) {
  const { payload } = action
  const { commentId, commentText } = payload

  // Create our new Comment object
  const comment = { id: commentId, text: commentText }

  // Insert the new Comment object into the updated lookup table
  return {
    ...state,
    [commentId]: comment
  }
}

function commentsById(state = {}, action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return addCommentEntry(state, action)
    default:
      return state
  }
}

function addCommentId(state, action) {
  const { payload } = action
  const { commentId } = payload
  // Just append the new Comment's ID to the list of all IDs
  return state.concat(commentId)
}

function allComments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return addCommentId(state, action)
    default:
      return state
  }
}

const commentsReducer = combineReducers({
  byId: commentsById,
  allIds: allComments
})
```

**Reusing Reducer Logic** 

Create Higher-Order Reducers

**Immutable Update Patterns** 

```js
function updateVeryNestedField(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
}
```

```js
function removeItem(array, action) {
  return array.filter((item, index) => index !== action.index)
}
```

```js
function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item
    }
  })
}
```
