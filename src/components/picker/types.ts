export interface IPickerType {
    selectedValue: number | string,
    onValueChange: (value: string | number) => void,
    itemList: any[]
}