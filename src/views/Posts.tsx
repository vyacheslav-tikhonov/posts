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

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
      <TextInput
        onChange={setSearchQuery}
        value={searchQuery}
        placeholder="Search"
      />
      { renderPosts() }
    </PostsContainer>
  )
}