export interface RandomTask {
  id: string;
  description: string;
  required: boolean;
  deactivated: boolean;
  comment: string | null;
}

export interface CreateRandomTaskInput {
  description: string;
  required?: boolean;
  comment?: string;
}

export function createRandomTask(input: CreateRandomTaskInput): RandomTask {
  return {
    id: generateId(),
    description: input.description,
    required: input.required ?? false,
    deactivated: false,
    comment: input.comment ?? null,
  };
}

function generateId(): string {
  return crypto.randomUUID();
}