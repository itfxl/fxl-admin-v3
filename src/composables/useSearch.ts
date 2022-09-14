import { onMounted, reactive, ref } from "vue";
import type { UserType } from "@/api/types";
import type { PageInfo, PaginationProps } from "tdesign-vue-next";
import userApi from "@/api/user";

export const useSearch = ()=>{
  const data = ref<Array<UserType>>([])
  const pagination = reactive<PaginationProps>({current:1,total:0,pageSize:10,});
  const searchKey = reactive({
    name:""
  })



  const loading = ref(false);

  const fetchData = ()=>{
    loading.value = true;
    userApi.list({
      name:searchKey.name,
      page: pagination.current,
      size: pagination.pageSize,
      total: pagination.total,
    }).then(res=>{
      data.value=res.data;
      pagination.current = res.paging.page;
      pagination.pageSize = res.paging.size;
      pagination.total = res.paging.total;
      loading.value = false;
    }).catch(error=>{
      loading.value = true;
      throw new Error(error);
    })
  }


  const onPageChange = (pageInfo:PageInfo)=>{
    pagination.current = pageInfo.current;
    pagination.pageSize = pageInfo.pageSize;
    fetchData();
  }
  onMounted(()=>{
    fetchData();
  })

}