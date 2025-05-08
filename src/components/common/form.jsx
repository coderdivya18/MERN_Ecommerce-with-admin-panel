import React from 'react';
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";


const CommonForm = ({formControls, formData, setFormData, onSubmit , buttonText}) => {

    const renderInputsByComponentType=(getControlItem)=>{
        let element=null;
        const value = formData[getControlItem.name] || "";

        switch(getControlItem.componentType){
            case "input":
                element=(<Input
                    type={getControlItem.type}
                    name={getControlItem.name}
                    id={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    value={value}
                    onChange={(e)=>setFormData({...formData, [getControlItem.name]: e.target.value})}
                />)
            break;

            case "select":
                element=(<Select value={value}  onValueChange={(val) =>
                        setFormData({ ...formData, [getControlItem.name]: val })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder}/>
                            <SelectContent>
                                {getControlItem.options && getControlItem.options.length > 0 ?
                                    getControlItem.options.map((optionItem) => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>):null}
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                    )
            break;


            case "textarea":
                element=(<Textarea name={getControlItem.name}
                                   placeholder={getControlItem.placeholder}
                                   id={getControlItem.name}
                                   value={value}
                                   onChange={(e)=>setFormData({...formData, [getControlItem.name]: e.target.value})}
                />)
            break;


            default:
                element=(<Input
                    type={getControlItem.type}
                    name={getControlItem.name}
                    id={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    value={value}
                    onChange={(e)=>setFormData({...formData, [getControlItem.name]: e.target.value})}
                />)
            break;

        }
        return element
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => <div key={controlItem.name} className="grid w-full gap-1.5">
                    <Label className="mb-1">{controlItem.label}</Label>
                    {renderInputsByComponentType(controlItem)}

                </div>)}
            </div>
            <Button className="mt-2 w-full" type="submit">{buttonText || 'Submit'}</Button>
        </form>
    );
};

export default CommonForm;