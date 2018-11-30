import React from 'react';
import { FormGroup, Label, Input,  } from 'reactstrap';
import { InputGroup, InputGroupAddon,} from 'reactstrap';
//import firebase from '../../Database/firebase';


export default class Tranferir extends React.Component{
    render(){
       
        return(
          <div>
        <InputGroup>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input placeholder="Amount" type="number" step="1" />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
        </InputGroup>
        <FormGroup>
          <Label for="exampleSelect">Usuarios</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
          </div>
        );
    }
}