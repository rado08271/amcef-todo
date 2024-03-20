import { z } from "zod";

const ProjectScheme = z.object({
    id: z.string(),
    name: z.string({required_error: "Name is a required parameter"}),
    createdDate: z.coerce.date(),
    searchString: z.string(),
})

export type ProjectDao = z.infer<typeof ProjectScheme>

export {
    ProjectScheme
}