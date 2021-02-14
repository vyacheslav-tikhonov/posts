import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

const InputStyle = styled.input`
  height: 24px;
`

export default function TextInput(props: Props) {
  let [value, setValue] = useState<string>('')

  return <div>
            <InputStyle
              type="text"
              placeholder={props.placeholder}
              value={props.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {props.onChange(e.target.value)}}
            />
          </div>
}