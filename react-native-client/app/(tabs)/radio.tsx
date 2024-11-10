import { useContext } from 'react';
import RadioPage from '@/pages/RadioPage';
import StaticRadioPage from '@/pages/StaticRadioPage';
import RadioConfigContext from '@/contexts/RadioConfigContext';

export default function RadioScreen() {
  const { value, setValue } = useContext(RadioConfigContext);
  const {type} = value;
  return (
    type==="default"
    ?
    <RadioPage/>
    :
    <StaticRadioPage/>
  );
}
