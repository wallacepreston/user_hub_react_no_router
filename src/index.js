import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  Header,
  UserPosts,
  UserTodos
} from './components';

import {
  getUsers,
  getPostsByUser,
  getTodosByUser
} from './api';

const App = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    getUsers()
      .then(users => {
        setUserList(users)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setUserPosts([]);
      setUserTodos([]);
      return;
    }

    getPostsByUser(currentUser.id)
      .then(posts => {
        setUserPosts(posts);
      })
      .catch(error => {
        console.error(error);
      });

    getTodosByUser(currentUser.id)
      .then(todos => {
        setUserTodos(todos);
      })
      .catch(error => {
        console.error(error);
      });
  }, [currentUser]);

  return (
    <div id="App">
      <Header
        userList={ userList }
        currentUser={ currentUser }
        setCurrentUser={ setCurrentUser } />
      {
        currentUser
          ? <>
            <UserPosts
              userPosts={ userPosts }
              currentUser={ currentUser } />
            <UserTodos
              userTodos={ userTodos }
              currentUser={ currentUser } />
          </>
          : null
      }

    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);