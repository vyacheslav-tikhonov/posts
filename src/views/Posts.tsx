import React, { useEffect, useState } from 'react';
import { User } from '../interfaces/User/types';
import { Post } from '../interfaces/Post/types';
import axios, { AxiosResponse } from 'axios';
import UserPost from '../components/UserPost';
import styled from 'styled-components';
import TextInput from '../components/TextInput';

interface UsersById {
  [id: number]: User;
}

const icon = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">                                                                               
        <path d="M11.6625 11.6745C11.2126 12.1085 10.4885 12.1085 10.0386 11.6745L7.58191 9.30464L9.20588 7.73807L11.6625 10.1079C12.1125 10.5419 12.1125 11.2404 11.6625 11.6745Z" fill="#A4A4A8"/>                                                                                                                                                                
        <path fillRule="evenodd" clipRule="evenodd" d="M5.37358 0.997817C2.9771 0.997817 1.03438 2.87188 1.03438 5.18366C1.03438 7.49544 2.9771 9.3695 5.37358 9.3695C7.77006 9.3695 9.71278 7.49544 9.71278 5.18366C9.71278 2.87188 7.77006 0.997817 5.37358 0.997817ZM0 5.18366C0 2.3208 2.40583 0 5.37358 0C8.34133 0 10.7472 2.3208 10.7472 5.18366C10.7472 8.04651 8.34133 10.3673 5.37358 10.3673C2.40583 10.3673 0 8.04651 0 5.18366Z" fill="#A4A4A8"/>                                                                                  
      </svg>


const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 26px 15px;
`

const InputContainer = styled.div`
  width: 100%;
  max-width: 500px;
`

export default function HomeView() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<UsersById>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  function modifyUserArrayToObject(users: User[]): UsersById {
    return users.reduce((usersObject: UsersById, user: User) => {
      return {...usersObject, [user.id]: user};
    }, {});
  }

  function setPostsData(): void {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response: AxiosResponse<Post[]>) => {
        setPosts(response.data);
      });
  }

  function setUsersData(): void {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response: AxiosResponse<User[]>) => {
        setUsers(response.data);
      });
  }

  function filterPosts(): Post[] {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      return posts.filter((post: Post) => {
        return post.body.toLowerCase().indexOf(query) !== -1 ||
          post.title.toLowerCase().indexOf(query) !== -1;
      })
    }
    return posts;
  }

  function renderPosts(): React.ReactNode {
    const postsComponents = [];

    for (const post of filteredPosts) {
      const user = users[post.userId];
      if (user) {
        postsComponents.push(
          <UserPost
            key={post.id}
            name={user.name}
            username={user.username}
            title={post.title}
            body={post.body}
          />
        )
      }
    }
    return postsComponents;
  }

  useEffect(() => {
    setFilteredPosts(filterPosts());
  }, [searchQuery, posts])

  useEffect(() => {
    setUsersData();
  }, [])

  useEffect(() => {
    setPostsData();
  }, [])

  return (
    <PostsContainer>
      <InputContainer>
        <TextInput
          onChange={setSearchQuery}
          value={searchQuery}
          placeholder="Search"
          prefix={icon}
        />
      </InputContainer>
      { renderPosts() }
    </PostsContainer>
  )
}