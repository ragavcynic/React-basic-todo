import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { getProjects, getTodo, getTodoIds } from "./api";

export function useTodoIds(){
    return useQuery({
        queryKey:['todos'],
        queryFn : getTodoIds,
    })
}  

export function useTodo(ids:(number | undefined)[] | undefined){
    return useQueries({
        queries: (ids ?? [] ).map((id)=>{
            return {
                queryKey : ['todo',{id}],
                queryFn: ()=> getTodo(id!)
            }
        })
    })

}
export function useProjects(page:number){
    return useQuery({
        queryKey:['projects',{page}],
        queryFn:()=>getProjects(page),
        placeholderData:keepPreviousData,
    })
}