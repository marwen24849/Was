import { ComponentType, Properties, Step } from "sequential-workflow-designer";


// export interface TaskProperties extends Step {
//     id: string
//     name: string;
//     properties: Properties;
//     componentType?: ComponentType;
//     type: string;
// }

export interface Task extends Step {
    id: string
    name: string;
    properties: Properties;
    componentType?: ComponentType;
    type: string;
}