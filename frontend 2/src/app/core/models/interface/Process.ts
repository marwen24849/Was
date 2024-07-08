import { Sequence, SequentialStep } from "sequential-workflow-designer";

export interface Process extends SequentialStep {
    children?: Sequence,
    templateId: string
}