import marks from '@/app/linearview/tableau/extensions-api-types';

export default function getFilterDetails(worksheet: marks.Worksheet){
    worksheet.getFiltersAsync().then((response)=>{
        response.forEach((filter, filterIndex)=>{
            console.log(filterIndex);
            console.log(filter.fieldName);
            console.log(filter.filterType);
            console.log(filter.fieldId)
            filter.getFieldAsync().then(response => {
                console.log(response.columnType);
            })

        })
    }, (error) => console.log(error));
}

