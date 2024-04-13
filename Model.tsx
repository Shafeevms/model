import React, { useState } from 'react';


interface IEditor {
    id: number,
    name: string,
    value: string,
}

export interface IParam {
    id: number;
    name: string;
}

export interface IParamValue {
    paramId: number;
    value: string;
}

export interface IModelData {
    params: IParam[];
    model: {
        paramValues: IParamValue[];
    };
}

const normalizedMap = (arr: IParam[]) => {
    return arr.reduce((acc: Record<string, IParam>, element) => {
        const id = element.id.toString();
        acc[id] = element;
        return acc;
    }, {});
};

const Input = ({ id, name, value }: IEditor) => {
    const [editorValue, setEditorValue] = useState(value);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditorValue(event.target.value);
    };
    return (
        <>
            <label htmlFor={id.toString()}>{name}</label>
            <input id={id.toString()} value={editorValue} onChange={handleChange}/>
        </>
    );
};

const Model = ({ modelData }: { modelData: IModelData }) => {
    const { params, model } = modelData;
    const { paramValues } = model;
    const paramsMap = normalizedMap(params);

    return (
        <>
            {paramValues.map(input => {
                const { paramId, value } = input;
                return <Input key={paramId} id={paramId} name={paramsMap[paramId].name} value={value}/>;
            })}
        </>
    );
};

export default Model;
