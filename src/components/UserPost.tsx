import styled from 'styled-components';

interface Props {
  name: string;
  username: string;
  title: string;
  body: string;
  width?: number;
}

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  line-height: 12px;
  @media (min-width: 500px) {
    font-size: 12px;
  }
`

const UserName = styled.div`
  color: #505056;
`

const UserNickname = styled.div`
  color: #0057FF;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 12px;
  padding-top: 8px;
  color: #505056;
  @media (min-width: 500px) {
    font-size: 14px;
    padding-top: 10px;
  }
`

const Body = styled.div`
  font-size: 12px;
  line-height: 12px;
  color: #505056;
  @media (min-width: 500px) {
    font-size: 14px;
  }
`

const Container = styled.div`
  max-width: 500px;
  min-width: 300px;
  padding: 16px;
  border-radius: 5px;
  background: #fcfcfc;
  box-sizing: border-box;
`

const DividerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 17px;
  @media (min-width: 500px) {
    font-size: 21px;
  }
`

const Divider = styled.div`
  height: 1px;
  background: #0057FF;
  width: 24px;
`

export default function UserPost(props: Props) {

  return <Container>
          <UserContainer>
            <UserName>
              {props.name.toUpperCase()}
            </UserName>
            <UserNickname>
              @{props.username}
            </UserNickname>
          </UserContainer>
          <Title>
            {props.title.toUpperCase()}
          </Title>
          <DividerContainer>
            <Divider />
          </DividerContainer>
          <Body>
            <div>{props.body}</div>
          </Body>
        </Container>;
}
