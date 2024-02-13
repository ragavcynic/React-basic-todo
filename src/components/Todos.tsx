import React from 'react'
import { useTodo, useTodoIds } from '../services/queries'
import { useIsFetching } from '@tanstack/react-query';
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from '../services/mutations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Todo } from '../types/todo';


const Todos = () => {
    const todoIdsQuery = useTodoIds();
    const todoQuery = useTodo(todoIdsQuery.data)
    const isFetching = useIsFetching();
    const createTodoMutation = useCreateTodo();
    const {register , handleSubmit} = useForm<Todo>();
    const updateTodoMutation = useUpdateTodo();
    const deleteTodoMutation = useDeleteTodo();

    const handleCreateTodoSubmit : SubmitHandler<Todo> = (data)=>{
      createTodoMutation.mutate(data)
    }

    const handleMarkAsDoneSubmit = (data:Todo | undefined)=>{
      if(data){
      updateTodoMutation.mutate({...data,checked:true})
    }};

    const handleDeleteTodoSubmit = (id:number | undefined)=>{
      if(id){
        deleteTodoMutation.mutate(id)
      }
    }

    if(todoIdsQuery.isPending){
        return <span>...Loading</span>
    }
    if(todoIdsQuery.isError){
        return <span>Error occured</span>
    }


  return (
<>
    <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>

      <h4>Create TODO</h4>
      <input placeholder='Title' {...register("title")} />
      <br/>
      <input placeholder='Description' {...register("description")} />
      <br />
   <input type='submit' disabled={createTodoMutation.isPending} value={createTodoMutation.isPending?"creating...":"create todo"} />
    </form>





    <div>
      {todoIdsQuery.data.map((id)=>(
        <p>{id}</p>
      ))}
      <div>
        <ul>
        {todoQuery.map(({data})=>(
            <li key={data?.id}>
                <h1>Id : {data?.id}</h1>
                <strong>Title : {data?.title}</strong>
                <p>Descp : {data?.description}</p>
                <div>
                  <button onClick={()=>handleMarkAsDoneSubmit(data)} disabled={data?.checked}>
                    {data?.checked ? "Done":"Mark as Done"}
                  </button>
                  {data && data.id && (<button onClick={()=>handleDeleteTodoSubmit(data.id!)}>
                    Delete the section
                  </button>)}
                  
                </div>
            </li>
        ))}
        </ul>
      </div>
      <p>Global isFetching : {isFetching}</p>
    </div>
    </>
  )
}

export default Todos;
