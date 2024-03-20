import { z } from "zod";

const TodoScheme = z.object({
    id: z.string(),
    name: z.string({required_error: "Name is a required parameter"}).min(3, 'project name needs to be longer'),
    description: z.string(),
    createdDate: z.coerce.date(),
    deadlineDate: z.coerce.date({invalid_type_error: "Date format is not valid", required_error: "Deadline field is mandatory"}),
    searchString: z.string(),
    projectId: z.string(),
    finished: z.boolean(),
    sortedIndex: z.number()
})

export type TodoDao = z.infer<typeof TodoScheme>

export {
    TodoScheme
}