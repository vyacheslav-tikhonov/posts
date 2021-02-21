import React, { useState, createRef } from 'react';
import styled from 'styled-components';

interface Props {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  prefix?: React.ReactNode;
}

const InputStyle = styled.input`
  border: none;
  height: 24px;
  border-radius: 5px;
  background: none;
  outline: none;
  width: 100%;
`

const InputContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #A4A4A8;
  box-sizing: border-box;
  display: flex;
  background: none;
`

const Prefix = styled.div`
  background: none;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function TextInput(props: Props) {
  let [value, setValue] = useState<string>('')

  const ref: React.RefObject<HTMLInputElement> = createRef();

  function setFocus() {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }

  return <InputContainer>
            <Prefix
              onClick={setFocus}
            >
              {props.prefix}
            </Prefix>
            <InputStyle
              type="text"
              ref={ref}
              placeholder={props.placeholder}
              value={props.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {props.onChange(e.target.value)}}
            />
          </InputContainer>
}