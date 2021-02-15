import styled from 'styled-components';

interface Props {
  name: string;
  username: string;
  title: string;
  body: string;
  width?: number;
}

const User = styled.div`
  display: flex;
  color: gray;
  justify-content: space-between;
  padding: 5px 0;
  font-family: Monserat, sans-serif;
  font-size: 18px;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding-top: 10px;
`

const Body = styled.div`
  padding: 20px 0;
`

const Container = styled.div`
  max-width: 500px;
  min-width: 200px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 2px #c6c6c6;
`


export default function UserPost(props: Props) {

  return <Container>
          <User>
            <div>{props.name}</div>
            <div>@{props.username}</div>
          </User>
          <Title>
            {props.title}
          </Title>
          <Body>
            <div>{props.body}</div>
          </Body>
        </Container>;
}
