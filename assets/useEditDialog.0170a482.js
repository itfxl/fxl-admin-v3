import{f as i,e as g,O as v,M as r}from"./vendor.7f30f3e6.js";const h=(s,o)=>{const t=i([]),a=g({current:1,total:0,pageSize:10}),n=i(!1),u=()=>{n.value=!0,s.list({page:a.current,size:a.pageSize,total:a.total,...o}).then(e=>{t.value=e.data,a.current=e.paging.page,a.pageSize=e.paging.size,a.total=e.paging.total,n.value=!1}).catch(e=>{throw n.value=!0,new Error(e)})};return v(u),{data:t,pagination:a,loading:n,fetchData:u,onPageChange:e=>{a.current=e.current,a.pageSize=e.pageSize,u()}}},p=(s,o="")=>{const t=i(!1),a=i(null),n=()=>{t.value=!0},u=l=>{a.value=l.row,t.value=!0},c=async l=>{a.value&&a.value.id?(await s.edit(a.value.id,l),await r.success(`${o}\u7F16\u8F91\u6210\u529F`)):(await s.create(l),await r.success(`${o}\u521B\u5EFA\u6210\u529F`)),e()},e=()=>{t.value=!1,a.value=null};return{showDialog:t,editData:a,handleCreate:n,handleEdit:u,onDialogClose:e,handleConfirm:c}};export{p as a,h as u};
