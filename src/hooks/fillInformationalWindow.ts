import type {InformationalFieldParams} from "@/Components/InformationalWindow.vue";
interface ParseTemplate{title:string,field:string,adapterFunction?: (val:any)=>string}

//==================================ADAPTERS===========================================//

const booleanAdapter = (val:any):string => {
    return Boolean(val) ? "Да" : "Нет";
}
//======================== CHANGE OBJECT BELOW TO FIT A SERVER RESPONSE ===============//

const templates : Array<ParseTemplate> = [
    {
        title: 'Наименование организации',
        field: 'name',
    },
    {
        title: 'ФИО менеджера',
        field: 'manager',
    },
    {
        title: 'Уникальный идентификатор',
        field: 'uid',
    },
    {
        title: 'Электронная почта',
        field: 'email',
    },
    {
        title: 'ИНН',
        field: 'inn',
    },
    {
        title: 'КПП',
        field: 'kpp',
    },
    {
        title: 'Номер документа',
        field: 'serial_doc',
    },
    {
        title: 'Серия документа',
        field: 'number_doc',
    },
    {
        title: 'Юридическое лицо',
        field: 'is_company',
        adapterFunction: booleanAdapter,
    },
    {
        title: 'Контактное лицо',
        field: 'contact_name',
    },
    {
        title: 'Телефон контактного лица',
        field: 'contact_phone',
    }
];

//=======================================================================================//

export default function fillInformationalWindowData(fromObject : any) {
    let data:Array<InformationalFieldParams> = [];
    for (let template of templates) {
        let field: InformationalFieldParams = {title: template.title};
        let parsingObjectField = fromObject[template.field];
        if (parsingObjectField) {
            if (template.adapterFunction) {
                field.text = template.adapterFunction(parsingObjectField);
            } else {
                field.text = String(fromObject[template.field]).trim();
            }
        }
        data.push(field)
    }
    return data;
}
