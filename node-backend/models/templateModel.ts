import { Schema, model } from "mongoose";

interface Template {
  name: string;
  imageUrl: string;
}

const templateSchema = new Schema<Template>({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const TemplateModel = model<Template>('Template', templateSchema);

export { TemplateModel, Template };
