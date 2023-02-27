import { createAsyncThunk } from '@reduxjs/toolkit';
import {addId, updateDidDocument, updateId} from '../slices/identifier';
import {identifier} from "../../models";
import {addMessage} from "../slices/chat";
import {sendMessage} from "../../helpers/messages";
import {MessageType} from "../../models/constants";
import ReactNative from "react-native";

const BASE_ID = 'ids/';
const BASE_DID = `${BASE_ID}did/`;
const CREATE_DID = `${BASE_DID}create`;
const CREATE_ADD_DID = `${BASE_DID}createAndAdd`;
const DID_DOCUMENT = `${BASE_DID}document/`;
const RESOLVE_DID_DOCUMENT = `${DID_DOCUMENT}resolve`;

export function createId (id: string, alias: string = "no alias supplied "+id, published: boolean = false) {
    const newId = {
        _id: id,
        alias: alias,
        published: published,
    };
    console.log("thunks/identifiers - Created id", newId)
    return newId;
}

export const createAndAddId = createAsyncThunk(
    CREATE_ADD_DID,
    async (id: identifier, thunkAPI: any) => {
        thunkAPI.dispatch(addId(id));
        console.log("thunks/identifiers - created and added id",id)
        return id;
    }
);

async function resolveId(id: identifier): Promise<string> {
    console.log("thunk/identifiers - resolving id",id)
    const result = await fireResolveIdEvent(id);
    console.log('thunk/identifiers - resolved ',id._id,'is', result);
    return result
}

export interface idDTO {
    id: identifier;
    callback: (id: identifier)=>void;
}

export const resolveAndAdd = createAsyncThunk(
    RESOLVE_DID_DOCUMENT,
    async (idAndCallback: idDTO, thunkAPI: any) => {
        const id = idAndCallback.id
        console.log("thunk/identifier - resolve and add did document",id)
        const didDoc = await resolveId(id)
        if(didDoc) {
            thunkAPI.dispatch(updateDidDocument(didDoc));
            // thunkAPI.dispatch(
            //     addMessage({
            //         chatId: prismDemoId,
            //         message: sendMessage(
            //             prismDemoId,
            //             rootsHelperId,
            //             "DID Document ",
            //             MessageType.PROMPT_DISPLAY_IDENTIFIER,
            //             false,
            //             {identifier: prismDid}
            //         ),
            //     })
            // )
            // id.didDoc = didDoc
            console.log("thunks/identifier - adding resolution to id", didDoc)
            const newId = {_id: id._id,alias: id.alias,published: id.published,resolution: didDoc}
            console.log("thunks/identifier - added resolution to id", newId)
            idAndCallback.callback(newId)
            console.log("thunks/identifier - callback complete for added did doc")
            return newId;
        } else {
            console.error("Could not add resolution to id",id)
        }
    }
);
