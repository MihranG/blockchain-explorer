import {FC, useEffect} from 'react';
// import {Row, Form, Button, InputGroup} from "react-bootstrap";
import {useRouteMatch} from "react-router-dom";
import {dataProvider} from "./api/dataProvider";

const Block:FC<{}> = () =>{
    const match = useRouteMatch<{id: string}>();
    useEffect(()=>{
        console.log('Block',match.params.id )
        dataProvider.getBlockData(match.params.id).then(res=>{
            console.log('res', res)
        }).catch(e=>{
            console.log('ee', e)
        })
    },[match.params])

    return <div> {match.params.id} </div>
}


export default Block
