import {FC, useEffect} from 'react';
// import {Row, Form, Button, InputGroup} from "react-bootstrap";
import {useRouteMatch} from "react-router-dom";
import {dataProvider} from "./api/dataProvider";
import {IResponseData, IResponseResult} from "./types/Interfaces";
import {numberFromHexString} from "./utils/helpers";
import {setOfHashes} from "./utils/exceptions";

const Block:FC<{}> = () =>{
    const match = useRouteMatch<{id: string}>();
    useEffect(()=>{
        dataProvider.getBlockData<{ data: IResponseData }>(match.params.id).then(res=>{
            console.log('res', res)
            if(res?.data?.result){
                Object.keys(res.data.result).forEach((e, index)=>{
                    const elementKey = e as keyof IResponseResult;
                    if(res?.data?.result &&  res.data.result[elementKey]){
                        const element = res.data.result[elementKey];
                        if(typeof element === 'string' && !setOfHashes.has(elementKey) && element.includes('0x') ){
                            const number = numberFromHexString(element);
                            console.log(88, e, index, number, element, elementKey)
                        }
                    }



                })
            }

        }).catch(e=>{
            console.log('error', e)
        })
    },[match.params])

    return <div> {match.params.id} </div>
}


export default Block
