import { markRaw , ref } from 'vue'
import InputComponent from '@/InputComponent.vue'
import SelectComponent from '@/SelectComponent.vue';
import RadioComponent from '@/RadioComponent.vue';
import CheckBoxComponent from '@/CheckBoxComponent.vue';
export function looseJsonParse(data:Object,jsString:String){
  return new Function('data',`return ${jsString}` )(data);
}

export type Response = {
  id: number;
  name: string;
};
const radio1Response:Response=await (await fetch('/radio1.json')).json();
const checkbox1Response:Response=await (await fetch('/checkbox1.json')).json();
const select1Response:Response=await (await fetch('/select1.json')).json();
const checkbox2Response:Response=await (await fetch('/checkbox1.json')).json();
console.log(radio1Response);

export function useTest() {
  
  const formInputs = ref([
    {name:"radio1",type:markRaw(RadioComponent),labelName:"單選1",default:1,option:radio1Response,validate:"data.value.select1==='3'?'999':'888'"},
    {name:"checkbox1",type:markRaw(CheckBoxComponent),labelName:"複選1",default:[2,3],option:checkbox1Response,validate:"'required'"},
    {name:"input1",type:markRaw(InputComponent),labelName:"輸入框1",default:"輸入框1",option:null,validate:"'required'"},
    {name:"input2",type:markRaw(InputComponent),labelName:"輸入框2",default:"輸入框2",option:null,validate:"'required'"},
    {name:"select1",type:markRaw(SelectComponent),labelName:"下拉1",default:5,option:select1Response,validate:"'required'"},
    {name:"input3",type:markRaw(InputComponent),labelName:"輸入框2",default:"輸入框3",option:null,validate:"'required'"},
    {name:"checkbox2",type:markRaw(CheckBoxComponent),labelName:"複選2",default:[2,5],option:checkbox2Response,validate:"'required'"},
  ])
  return { looseJsonParse,formInputs,Response }
}
