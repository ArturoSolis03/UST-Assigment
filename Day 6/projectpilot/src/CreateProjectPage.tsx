
import { useForm } from 'react-hook-form';
import { projectAPI } from '../api/projectAPI';

type FormValues ={
      name: string;
      description: string;
      budget: number;
      isActive : boolean;
}
 
export default function CreateProjectPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
 
  const onSubmit = async (data: any) => {
    await projectAPI.create(data);
    alert("Project Created");
    reset();
  };
 
  return (
<form onSubmit={handleSubmit(onSubmit)}>
<h2>Create Project</h2>
 
<div>
<label>Project name:</label>
<input {...register('name', { required: 'Name is required', 
      maxLength: 100,
      validate: (value) =>
      value.trim().length > 0 || 'Name must not be just spaces' })} />
        {errors.name && <p style={{color: 'red'}}>{errors.name.message}</p>}
</div>
 
      <div>
<label>Project description:</label>
<input {...register('description', { required: true, 
maxLength: 2000,
validate: (value) => 
value.trim().length > 0 || 'Description must not be just spaces' })} />
        {errors.description && <p style={{color: 'red'}}>{errors.description.message}</p>}
</div>
 
      <div>
<label>Project budget:</label>
<input type="number" {...register('budget', { required: true, min: 1 })} />
        {errors.budget && <span> Project budget required </span>}
</div>
 
      <div>
<label>
<input type="checkbox" {...register('isActive')} />
          Active?
</label>
</div>
 
      <button type="submit">Create</button>
</form>
  );

  //this new project
}



