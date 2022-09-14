import type { Directive, DirectiveBinding } from "vue";
import { userUserState } from "@/store";

const hasNotPermission = (value:string)=>{
  return userUserState().currentUser?.permissions.indexOf(value) === -1
}


export const permissionDirective: Directive = {
  mounted(el: Element, { value }: DirectiveBinding) {
    hasNotPermission(value) && el.parentNode?.removeChild(el);
  }
};